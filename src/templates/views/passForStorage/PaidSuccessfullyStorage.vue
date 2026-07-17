<template>
	<info-page title="Payment successful!">
		Keep your receipt!<br />
		It contains the code<br />
		to complete storage
		<template #bottom>
			<button class="btn btn-primary" @click="open">open cell</button>
		</template>
	</info-page>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import InfoPage from "@components/InfoPage.vue";
import { openCell } from "@/api";
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
		};
	},
	methods: {
		async open() {
			try {
				const status = await openCell(this.store);
				if (!status) {
					return this.$router.push({
						name: this.ROUTE_NAME.INTERNAL_ERROR,
					});
				} else {
					return this.$router.push({
						name: this.ROUTE_NAME.CELL_IS_OPEN,
					});
				}
			} catch (error) {
				return this.$router.push({
					name: this.ROUTE_NAME.INTERNAL_ERROR,
				});
			}
		},
	},
};
</script>
