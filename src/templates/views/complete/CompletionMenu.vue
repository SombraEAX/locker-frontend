<template>
	<page-body>
		<page-header title="Pick up items" :back="ROUTE_NAME.HOME" />

		<div class="main-buttons">
			<router-link
				:to="{ name: ROUTE_NAME.INPUT_CODE_COMPLETE }"
				custom
				v-slot="{ navigate }"
			>
				<button
					class="btn btn-primary main-buttons__item"
					@click="navigate"
				>
					Enter code
				</button>
			</router-link>

			<router-link
				:to="{ name: ROUTE_NAME.SCAN }"
				custom
				v-slot="{ navigate }"
			>
				<button
					class="btn btn-primary main-buttons__item"
					@click="navigate"
				>
					Scan
				</button>
			</router-link>
		</div>
	</page-body>
</template>

<script lang="ts">
import PageBody from "@components/PageBody.vue";
import PageHeader from "@components/PageHeader.vue";
import { ROUTE_NAME } from "@/helpers/constants";

export default {
	components: {
		PageBody,
		PageHeader,
	},
	data() {
		return {
			ROUTE_NAME,
		};
	},
};
</script>
