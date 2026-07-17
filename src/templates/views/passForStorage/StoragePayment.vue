<template>
	<payment-terminal :back="back" :price="price"></payment-terminal>
</template>
<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";

import * as api from "@/api";
import { useOrderStore } from "@/store/modules/order";
import * as timer from "@/helpers/timer";
import PaymentTerminal from "@components/PaymentTerminal.vue";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		PaymentTerminal,
	},

	data() {
		return {
			ROUTE_NAME,
			back: null as string | null,
			price: null as number | null,
			pollTimer: null as ReturnType<typeof timer.interval> | null,
			processing: false,
		};
	},
	async mounted() {
		this.price = this.store.priceTotal;
		try {
			const status = await api.invoice(this.price);
			if (!status) {
				this.error("internal");
			} else {
				this.pollTimer = timer.interval(() => this.timer(), 1000);
				this.back =
					this.$route.query.action === "extend"
						? this.ROUTE_NAME.CONFIRMATION_EXTEND
						: this.ROUTE_NAME.CONFIRMATION;
			}
		} catch (error) {
			this.error("internal");
		}
	},

	methods: {
		//poll server to check if user has paid
		async timer() {
			try {
				const res = await api.isPaid();
				if (res === "wait") return;
				if (res === "success") return this.success();
				this.error(res);
			} catch (error) {
				return this.error(error);
			}
		},

		//on error
		error(error: unknown) {
			if (error === "not enough money")
				this.$router.push({ name: this.ROUTE_NAME.NOT_ENOUGH_MONEY });
			else this.$router.push({ name: this.ROUTE_NAME.INTERNAL_ERROR });
		},

		//on successful payment
		async success() {
			if (this.processing) return;
			this.processing = true;
			if (this.pollTimer) this.pollTimer.clear();
			try {
				if (this.$route.query.action === "extend") {
					const res = await api.extend(
						this.store.cell as number,
						this.store.hours
					);
					if (!res)
						return this.$router.push({
							name: this.ROUTE_NAME.INTERNAL_ERROR,
						});

					return this.$router.push({
						name: this.ROUTE_NAME.PAID_SUCCESSFULLY_STORAGE_EXTEND,
					});
				}

				const res = await api.storageBegin(
					this.store as unknown as Record<string, unknown>
				);
				if (!res)
					return this.$router.push({
						name: this.ROUTE_NAME.INTERNAL_ERROR,
					});

				this.$router.push({
					name: this.ROUTE_NAME.PAID_SUCCESSFULLY_STORAGE,
				});
			} catch (error) {
				return this.$router.push({
					name: this.ROUTE_NAME.INTERNAL_ERROR,
				});
			}
		},
	},
	beforeUnmount() {
		if (this.pollTimer) this.pollTimer.clear();
		api.close().catch(() => {});
	},
};
</script>
