<template>
	<page-body>
		<page-header
			title="Current storage time"
			:back="ROUTE_NAME.EXTEND_MENU"
		/>

		<div class="page__body-center">
			<div class="time-readonly">{{ currentTime }}</div>
		</div>

		<div class="page__body-bottom">
			<router-button :page="ROUTE_NAME.SELECT_TIME_STORAGE_EXTEND">
				extend storage
			</router-button>
		</div>
	</page-body>
</template>

<style>
@media (orientation: portrait) {
	.time-readonly {
		font-size: 20.7rem !important;
	}
}
</style>

<style scoped>
@media (orientation: portrait) {
	:deep(.btn) {
		font-size: 10rem !important;
	}
}
</style>

<script lang="ts">
import PageHeader from "@components/PageHeader.vue";
import PageBody from "@components/PageBody.vue";
import { ROUTE_NAME } from "@/helpers/constants";
import RouterButton from "@components/RouterButton.vue";
import { getTime } from "@/api";
import { useOrderStore } from "@/store/modules/order";
import { pad } from "@/helpers/format";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		PageHeader,
		PageBody,
		RouterButton,
	},
	data() {
		return {
			ROUTE_NAME,
			currentTime: "",
		};
	},
	async mounted() {
		if (this.store.timeout)
			return this.$router.push({
				name: this.ROUTE_NAME.PENALTY,
				query: { action: "extend" },
			});

		//format time for display
		try {
			const seconds = await getTime(this.store.cell);
			let minutes = Math.floor(seconds / 60);
			let hours = Math.floor(minutes / 60);
			minutes = minutes % 60;
			this.currentTime = this.pad(hours) + ":" + this.pad(minutes);
		} catch (e) {
			this.error();
		}
	},
	methods: {
		error() {
			this.$router.push({ name: this.ROUTE_NAME.INTERNAL_ERROR });
		},
		pad,
	},
};
</script>
