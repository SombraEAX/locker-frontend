<template>
	<div class="page">
		<div class="container">
			<div class="page__body">
				<div class="page__body-top">
					<back-button :route-name="ROUTE_NAME.CONFIRMATION_EXTEND" />
					<h-title txt="Payment" />
				</div>
				<div class="page__body-center">
					<div class="bl-info-text">
						<p class="bl-info-text_color_yellow">
							Follow the<br />instructions<br />on the terminal
						</p>
					</div>
				</div>
				<div class="page__body-bottom">
					<report-problem />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import * as timer from "@/helpers/timer";
import BackButton from "@components/BackButton.vue";
import HTitle from "@components/HTitle.vue";
import ReportProblem from "@components/ReportProblem.vue";

export default {
	components: {
		ReportProblem,
		BackButton,
		HTitle,
	},
	data() {
		return {
			ROUTE_NAME,
		};
	},
	mounted() {
		this._redirectTimer = timer.timeout(() => {
			this.$router.push({
				name: this.ROUTE_NAME.PAID_SUCCESSFULLY_STORAGE_EXTEND,
			});
		}, 3000);
	},
	beforeUnmount() {
		if (this._redirectTimer) this._redirectTimer.clear();
	},
};
</script>
