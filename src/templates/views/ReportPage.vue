<template>
	<page-body>
		<page-header title="Report a problem" :back="back" />

		<div class="page__body-center">
			<div class="bl-info-text bl-info-text_color_yellow">
				<p>Contacts for reporting a problem:</p>
				<p>{{ SUPPORT_PHONE }}</p>
				<p>{{ SUPPORT_EMAIL }}</p>
			</div>
		</div>
	</page-body>
</template>

<script lang="ts">
import { SUPPORT_PHONE, SUPPORT_EMAIL } from "@/helpers/constants";
import PageHeader from "@components/PageHeader.vue";
import PageBody from "@components/PageBody.vue";

export default {
	components: {
		PageHeader,
		PageBody,
	},
	data() {
		return { back: this.$route.query.back, SUPPORT_PHONE, SUPPORT_EMAIL };
	},
};
</script>
