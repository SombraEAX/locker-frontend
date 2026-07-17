<template>
	<info-page title="Storage<br />complete!">
		You can<br />
		collect your items
		<template #bottom>
			<router-link
				:to="{ name: ROUTE_NAME.CELL_IS_OPEN_COMPLETE_OPEN }"
				custom
				v-slot="{ navigate }"
			>
				<button class="btn btn-primary" @click="navigate">
					open cell
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
