<template>
	<page-body>
		<page-header title="Confirmation" :back="ROUTE_NAME.INPUT_MAIL" />

		<div class="page__body-center">
			<div class="place-label">
				<div class="place-label__item">Cell: {{ size }}</div>
				<div class="place-label__item">Hours: {{ time }}</div>
				<div class="place-label__item">Price: ${{ price }}</div>
				<div class="place-label__item small">Phone: {{ phone }}</div>
				<div class="place-label__item small">
					Email: <br />
					{{ mail }}
				</div>
			</div>
		</div>

		<div class="page__body-bottom">
			<button class="btn btn-primary" @click="next">pay</button>
		</div>
	</page-body>
</template>

<style scoped>
.small {
	font-size: 2.56vw;
}
@media (orientation: portrait) {
	.small {
		font-size: 5.12vw;
	}
}
</style>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import PageHeader from "@components/PageHeader.vue";
import PageBody from "@components/PageBody.vue";
import { useOrderStore } from "@/store/modules/order";
import { formatPhone, formatMail } from "@/helpers/format";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
		size() {
			return this.store.size;
		},
		time() {
			return this.store.time;
		},
		price() {
			return this.store.priceTotal;
		},
		phone() {
			return formatPhone(this.store.phone) || "not specified";
		},
		mail() {
			return formatMail(this.store.mail) || "not specified";
		},
	},
	components: {
		PageHeader,
		PageBody,
	},
	data() {
		return {
			ROUTE_NAME,
		};
	},
	methods: {
		next() {
			this.$router.push({ name: this.ROUTE_NAME.PAYMENT });
		},
	},
};
</script>
