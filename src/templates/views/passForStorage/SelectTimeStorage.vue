<template>
	<page-body>
		<page-header
			title="Select storage time"
			:back="ROUTE_NAME.SELECT_CELL"
		/>

		<div class="page__body-center">
			<time-counter @changeHandler="setTime" :initial="store.time || 1" />
			<div class="price">${{ priceTotal }}</div>
		</div>

		<div class="page__body-bottom">
			<router-link
				:to="{ name: ROUTE_NAME.LICENSE }"
				custom
				v-slot="{ navigate }"
			>
				<button class="btn btn-primary" @click="navigate">next</button>
			</router-link>
		</div>
	</page-body>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import { useOrderStore } from "@/store/modules/order";
import TimeCounter from "@components/TimeCounter.vue";
import PageHeader from "@components/PageHeader.vue";
import PageBody from "@components/PageBody.vue";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		PageHeader,
		PageBody,
		TimeCounter,
	},
	data() {
		return {
			ROUTE_NAME,
			priceTotal: 0,
		};
	},
	mounted() {
		this.store.setTime(this.store.time || 1);
		this.priceTotal = this.store.priceTotal;
	},
	methods: {
		setTime(time) {
			this.store.setTime(time);
			this.priceTotal = this.store.priceTotal;
		},
	},
};
</script>
