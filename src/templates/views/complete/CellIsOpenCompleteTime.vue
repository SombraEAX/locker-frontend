<template>
	<info-page title="Cell is open">
		Place your items<br />
		and close the cell
		<template #bottom>
			<waiting-time
				@stopTime="
					$router.push({ name: ROUTE_NAME.STORAGE_CLOSE_COMPLETE })
				"
			/>
		</template>
	</info-page>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import InfoPage from "@components/InfoPage.vue";
import WaitingTime from "@components/WaitingTime.vue";

export default {
	components: {
		InfoPage,
		WaitingTime,
	},
	data() {
		return {
			ROUTE_NAME,
		};
	},
};
</script>
