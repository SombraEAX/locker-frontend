<template>
	<page-body>
		<page-header title="Surcharge" :back="ROUTE_NAME.HOME" />

		<div class="page__body-center">
			<p>Storage time exceeded by {{ timeout }}</p>
			<p>To continue, please pay the storage fee</p>
			<p>
				Tap your card or phone to the reader. ${{ penalty }} will be
				charged.
			</p>
		</div>
	</page-body>
</template>

<style scoped>
p {
	font-size: 2.93vw;
	margin-top: 1.46vw;
	text-align: center;
}
</style>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import PageHeader from "@components/PageHeader.vue";
import PageBody from "@components/PageBody.vue";
import { useOrderStore } from "@/store/modules/order";
import * as api from "@/api";
import * as timer from "@/helpers/timer";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		PageHeader,
		PageBody,
	},
	data() {
		return {
			ROUTE_NAME,
			timeout: "",
			penalty: "",
			pollTimer: null,
			processing: false,
		};
	},
	async mounted() {
		//get penalty data
		try {
			const res = await api.getPenaltyInfo(this.store.cell);
			this.timeout = res.timeout.replace("h", "hr").replace("m", "min");
			this.penalty = res.penalty;

			//issue invoice
			const status = await api.invoice(this.penalty);
			if (!status) return this.internalError();
			this.pollTimer = timer.interval(() => this.timer(), 1000);
		} catch (error) {
			return this.internalError();
		}
	},
	methods: {
		internalError() {
			this.$router.push({ name: this.ROUTE_NAME.INTERNAL_ERROR });
		},

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
		error(error) {
			if (error === "not enough money")
				this.$router.push({ name: this.ROUTE_NAME.NOT_ENOUGH_MONEY });
			else this.$router.push({ name: this.ROUTE_NAME.INTERNAL_ERROR });
		},

		//on successful payment
		async success() {
			if (this.processing) return;
			this.processing = true;
			if (this.pollTimer) this.pollTimer.clear();
			//reset fine
			try {
				const res = await api.finePaid(this.store.cell);
				if (!res) return this.internalError();
				this.$router.push({
					name: this.ROUTE_NAME.FINE_PAID,
					query: { action: this.$route.query.action },
				});
			} catch (error) {
				return this.internalError();
			}
		},
	},
	beforeUnmount() {
		if (this.pollTimer) this.pollTimer.clear();
		api.close().catch(() => {});
	},
};
</script>
