<template>
	<page-body>
		<page-header
			title="Select additional storage time"
			:back="ROUTE_NAME.CURRENT_TIME_STORAGE_EXTEND"
		/>

		<div class="page__body-center">
			<time-counter
				@changeHandler="setPrice"
				:initial="store.hours || 1"
			/>
			<div class="price">${{ priceTotal }}</div>
		</div>

		<div class="page__body-bottom">
			<button class="btn btn-primary" @click="next">next</button>
		</div>
	</page-body>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import TimeCounter from "@components/TimeCounter.vue";
import PageBody from "@components/PageBody.vue";
import PageHeader from "@components/PageHeader.vue";
import { useOrderStore } from "@/store/modules/order";
import { getPrice } from "@/api";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		TimeCounter,
		PageBody,
		PageHeader,
	},
	data() {
		return {
			ROUTE_NAME,
			price: 0,
			priceTotal: 0,
			hours: 1,
		};
	},
	methods: {
		setPrice(value) {
			this.priceTotal = value * this.price;
			this.hours = value;
		},
		error() {
			this.$router.push({ name: this.ROUTE_NAME.INTERNAL_ERROR });
		},
		next() {
			this.store.setHours(this.hours, this.priceTotal);
			this.$router.push({ name: this.ROUTE_NAME.CONFIRMATION_EXTEND });
		},
	},
	async mounted() {
		//get hourly storage price
		try {
			const price = await getPrice(this.store.cell);
			this.priceTotal = this.price = price;
		} catch (error) {
			return this.error();
		}
	},
};
</script>
