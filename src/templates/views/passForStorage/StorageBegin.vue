<template>
	<info-page title="Storage started!">
		You'll need the code<br />
		on your receipt<br />
		to open your cell
		<template #bottom>
			<router-link
				:to="{ name: ROUTE_NAME.HOME }"
				custom
				v-slot="{ navigate }"
			>
				<button class="btn btn-primary" @click="navigate">
					home screen
				</button>
			</router-link>
		</template>
	</info-page>
</template>

<style scoped>
@media (orientation: portrait) {
	.btn {
		font-size: 10rem !important;
		padding: 0 16rem 2rem 16rem !important;
	}
}
</style>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import InfoPage from "@components/InfoPage.vue";

export default {
	components: {
		InfoPage,
	},
	data() {
		return {
			ROUTE_NAME,
		};
	},
};
</script>
