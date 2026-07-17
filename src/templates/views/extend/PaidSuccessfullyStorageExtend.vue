<template>
	<info-page title="Payment successful!">
		Your storage<br />
		has been extended<br />
		by {{ hours }} hr.
		<template #bottom>
			<router-link
				:to="{ name: ROUTE_NAME.HOME }"
				custom
				v-slot="{ navigate }"
			>
				<button class="btn btn-primary" @click="navigate">
					Home screen
				</button>
			</router-link>
		</template>
	</info-page>
</template>

<style scoped>
@media (orientation: portrait) {
	:deep(.btn) {
		font-size: 10rem !important;
	}
}
</style>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import InfoPage from "@components/InfoPage.vue";
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
			hours: 0,
		};
	},
	mounted() {
		this.hours = this.store.hours;
	},
};
</script>
