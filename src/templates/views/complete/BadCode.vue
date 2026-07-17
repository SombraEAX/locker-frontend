<template>
	<error-page :back="2">Invalid code</error-page>
</template>

<script lang="ts">
import ErrorPage from "@/components/ErrorPage.vue";

export default {
	components: {
		ErrorPage,
	},
};
</script>
