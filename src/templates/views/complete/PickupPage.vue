<template>
	<page-body>
		<page-header title="" :back="ROUTE_NAME.SELECT_RENEWAL_ACTION" />
		<div
			class="page__body-center"
			style="font-size: 5.86vw; text-align: center"
		>
			{{ text }}
		</div>
	</page-body>
</template>

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
		PageBody,
		PageHeader,
	},
	data() {
		return {
			ROUTE_NAME,
			text: "",
			pollTimer: null,
		};
	},
	async mounted() {
		try {
			const cell = await api.getCellInfo(this.store.code);
			await api.openCell({
				cell: this.store.cell,
				phone: cell.phone,
				mail: cell.mail,
			});
			this.text =
				this.store.action === "open-temp"
					? "Close the cell"
					: "Take your items and close the cell";

			this.pollTimer = timer.interval(async () => {
				try {
					const open = await api.isOpen(this.store.cell);
					if (!open) {
						if (this.store.action === "complete") {
							await api.complete(this.store.cell);
							this.$router.push({ name: this.ROUTE_NAME.HOME });
						} else {
							this.$router.push({ name: this.ROUTE_NAME.HOME });
						}
					}
				} catch (error) {
					console.error(error);
					this.$router.push({ name: this.ROUTE_NAME.INTERNAL_ERROR });
				}
			}, 1000);
		} catch (error) {
			console.error(error);
			this.$router.push({ name: this.ROUTE_NAME.INTERNAL_ERROR });
		}
	},
	beforeUnmount() {
		if (this.pollTimer) this.pollTimer.clear();
	},
};
</script>
