<template>
	<page-body>
		<page-header title="" :back="ROUTE_NAME.COMPLETE_MENU" />

		<div class="page__body-center">
			<div class="main-buttons main-buttons-min">
				<button
					class="btn btn-primary main-buttons__item"
					@click="openTemp"
				>
					open temporarily
				</button>

				<button
					class="btn btn-primary main-buttons__item"
					@click="complete"
				>
					finish and collect
				</button>
			</div>
		</div>
	</page-body>
</template>

<style scoped>
.main-buttons-min .main-buttons__item {
	font-size: 5.5rem;
}
.main-buttons-min .main-buttons__item span {
	font-size: 4.3rem;
	font-weight: 400;
	margin-top: 0.5rem;
}
</style>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import PageHeader from "@components/PageHeader.vue";
import PageBody from "@components/PageBody.vue";
import { useOrderStore } from "@/store/modules/order";

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
		};
	},
	methods: {
		openTemp() {
			this.store.setAction("open-temp");
			this.next();
		},
		complete() {
			this.store.setAction("complete");
			this.next();
		},
		next() {
			if (this.store.timeout)
				return this.$router.push({ name: this.ROUTE_NAME.PENALTY });
			else return this.$router.push({ name: this.ROUTE_NAME.PICKUP });
		},
	},
};
</script>
