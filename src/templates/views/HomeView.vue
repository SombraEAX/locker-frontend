<template>
	<div class="page">
		<div class="container">
			<div class="page__body">
				<div class="main-buttons">
					<secret-button @activate="secretMenu" />
					<button
						class="btn btn-primary main-buttons__item"
						@click="passForStorage"
					>
						store items
					</button>

					<router-button :page="ROUTE_NAME.EXTEND_MENU" :main="true">
						extend storage
					</router-button>

					<router-button
						:page="ROUTE_NAME.COMPLETE_MENU"
						:main="true"
					>
						pick up items
					</router-button>
				</div>
				<report-problem :back="ROUTE_NAME.HOME" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import { cellsBusy } from "@/api";
import ReportProblem from "@components/ReportProblem.vue";
import RouterButton from "@components/RouterButton.vue";
import SecretButton from "@components/SecretButton.vue";

import { useOrderStore } from "@/store/modules/order";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		ReportProblem,
		RouterButton,
		SecretButton,
	},
	data() {
		return {
			ROUTE_NAME,
		};
	},
	methods: {
		async passForStorage() {
			try {
				this.store.reset();
				const data = await cellsBusy();
				let name = data.busy
					? ROUTE_NAME.CELLS_BUSY
					: ROUTE_NAME.SIZE_CELL;

				this.$router.push({ name });
			} catch (error) {
				this.$router.push({ name: ROUTE_NAME.INTERNAL_ERROR });
			}
		},
		secretMenu() {
			this.$router.push({ name: ROUTE_NAME.SECRET_MENU });
		},
	},
};
</script>
