<template>
	<div class="page">
		<div class="container">
			<div class="page__body">
				<div class="page__body-top">
					<br />
					<h-title txt="Error" />
				</div>
				<div class="page__body-center">
					<div class="bl-info-text">
						<p class="bl-info-text_color_yellow">
							Waiting time<br />
							expired
						</p>
					</div>
				</div>
				<div class="page__body-bottom">
					<router-link
						:to="{ name: ROUTE_NAME.REPORT }"
						custom
						v-slot="{ navigate }"
					>
						<button class="btn btn-primary" @click="navigate">
							report a problem
						</button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import HTitle from "@components/HTitle.vue";

export default {
	components: {
		HTitle,
	},
	data() {
		return {
			ROUTE_NAME,
		};
	},
};
</script>
