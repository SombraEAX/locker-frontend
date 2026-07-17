<template>
	<page-body>
		<page-header title="Payment" :back="back" />

		<div class="page__body-center">
			<div class="bl-info-text">
				<p class="bl-info-text_color_yellow">
					Tap your smartphone<br />or card to the reader<br />
					<small>Will be charged {{ price }} $</small>
				</p>
			</div>
		</div>

		<div class="page__body-bottom"><report-problem :back="back" /></div>
	</page-body>
</template>

<script lang="ts">
import ReportProblem from "@components/ReportProblem.vue";
import PageHeader from "@components/PageHeader.vue";
import PageBody from "@components/PageBody.vue";

export default {
	props: ["price", "back"],
	components: {
		PageHeader,
		PageBody,
		ReportProblem,
	},
};
</script>
