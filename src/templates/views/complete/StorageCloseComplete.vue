<template>
	<info-page title="Cell is closed">
		Storage<br />
		continues
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
