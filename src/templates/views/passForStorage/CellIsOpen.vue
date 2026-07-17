<template>
	<info-page title="Cell is open">
		Place your items<br />
		and close the cell
	</info-page>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import InfoPage from "@components/InfoPage.vue";
import * as timer from "@/helpers/timer";
import * as api from "@/api";
import { useOrderStore } from "@/store/modules/order";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		InfoPage,
	},
	data() {
		return {
			ROUTE_NAME,
			pollTimer: null as ReturnType<typeof timer.interval> | null,
		};
	},
	async mounted() {
		this.pollTimer = timer.interval(() => this.timer(), 1000);
	},
	beforeUnmount() {
		if (this.pollTimer) this.pollTimer.clear();
	},
	methods: {
		async timer() {
			try {
				const isOpen = await api.isOpen(this.store.cell as number);
				if (!isOpen)
					return this.$router.push({
						name: this.ROUTE_NAME.STORAGE_BEGIN,
					});
			} catch (error) {
				return this.$router.push({
					name: this.ROUTE_NAME.INTERNAL_ERROR,
				});
			}
		},
	},
};
</script>
