<template>
	<page-body>
		<page-header
			title="Confirmation"
			:back="ROUTE_NAME.SELECT_TIME_STORAGE_EXTEND"
		/>

		<div class="page__body-center">
			<div class="place-label">
				<div class="place-label__item">Hours: {{ time }}</div>
				<div class="place-label__item">Price: ${{ price }}</div>
			</div>
		</div>

		<div class="page__body-bottom">
			<button class="btn btn-primary" @click="next">pay</button>
		</div>
	</page-body>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import PageBody from "@components/PageBody.vue";
import PageHeader from "@components/PageHeader.vue";
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
			time: 0,
			price: 0,
		};
	},
	mounted() {
		this.time = this.store.hours;
		this.price = this.store.priceTotal;
	},
	methods: {
		next() {
			this.$router.push({
				name: this.ROUTE_NAME.PAYMENT,
				query: { action: "extend" },
			});
		},
	},
};
</script>
