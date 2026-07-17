<template>
	<page-body>
		<page-header title="Select size" :back="ROUTE_NAME.HOME" />
		<div class="sizes-cell">
			<div class="sizes-cell__items">
				<size-cell-button
					v-for="size in sizes || []"
					:active="size.available"
					:symbol="size.id"
					:size="size.size"
					:price="size.price"
					:key="size.id"
					@click="click($event)"
				/>
			</div>
		</div>
	</page-body>
</template>

<style scoped>
.sizes-cell {
	flex-grow: 1;
	display: flex;
}
.sizes-cell button {
	height: 13.02vh;
	min-height: 13.02vh;
}
.sizes-cell__items {
	margin: auto;
	display: flex;
	width: 100%;
}
@media (orientation: portrait) {
	.sizes-cell__items {
		padding: 0 2rem;
		justify-content: center;
	}
}
</style>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import PageBody from "@components/PageBody.vue";
import PageHeader from "@components/PageHeader.vue";
import SizeCellButton from "@components/SizeCellButton.vue";
import { useOrderStore } from "@/store/modules/order";
import { getSizes } from "@/api";
import type { Size } from "@/api/types";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		PageBody,
		PageHeader,
		SizeCellButton,
	},
	data() {
		return {
			ROUTE_NAME,
			sizes: null as Size[] | null,
		};
	},
	methods: {
		click(event: { size: string; price: string }) {
			this.store.setSize(event.size, Number(event.price));
			this.$router.push({ name: this.ROUTE_NAME.SELECT_CELL });
		},
	},
	async mounted() {
		try {
			const data = await getSizes();
			this.sizes = data.sizes;
		} catch (error) {
			this.$router.push({ name: this.ROUTE_NAME.INTERNAL_ERROR });
		}
	},
};
</script>
