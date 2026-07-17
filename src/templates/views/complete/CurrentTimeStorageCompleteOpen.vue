<template>
	<div class="page">
		<div class="container">
			<div class="page__body">
				<div class="page__body-top">
					<back-button
						:route-name="ROUTE_NAME.SELECT_RENEWAL_ACTION"
					/>
					<h-title txt="Current<br />storage time" />
				</div>
				<div class="page__body-center">
					<div class="time-readonly">{{ currentTime }}</div>
				</div>
				<div class="page__body-bottom">
					<router-link
						:to="{ name: ROUTE_NAME.CELL_IS_OPEN_COMPLETE_TIME }"
						custom
						v-slot="{ navigate }"
					>
						<button class="btn btn-primary" @click="navigate">
							open cell
						</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import BackButton from "@components/BackButton.vue";
import HTitle from "@components/HTitle.vue";
import { useOrderStore } from "@/store/modules/order";
import * as api from "@/api";

export default {
	computed: {
		store() {
			return useOrderStore();
		},
	},
	components: {
		BackButton,
		HTitle,
	},
	data() {
		return {
			ROUTE_NAME,
			currentTime: "--:--",
		};
	},
	async mounted() {
		try {
			const seconds = await api.getTime(this.store.cell);
			const h = Math.floor(seconds / 3600);
			const m = Math.floor((seconds % 3600) / 60);
			this.currentTime =
				String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
		} catch (error) {
			console.error(error);
		}
	},
};
</script>
