<template>
	<page-body>
		<div class="page__body-center" style="font-size: 4.39vw">
			Service paid successfully
		</div>
		<button class="btn btn-primary main-buttons__item" @click="next">
			Next
		</button>
	</page-body>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
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
	},
	data() {
		return {
			ROUTE_NAME,
		};
	},
	methods: {
		next() {
			if (this.$route.query.action === "extend") {
				this.store.setHasTimeout(false);
				this.$router.push({
					name: this.ROUTE_NAME.CURRENT_TIME_STORAGE_EXTEND,
				});
			} else {
				this.$router.push({ name: this.ROUTE_NAME.PICKUP });
			}
		},
	},
};
</script>
