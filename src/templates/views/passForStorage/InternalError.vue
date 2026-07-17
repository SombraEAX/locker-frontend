<template>
	<error-page back="/">
		A service error occurred.<br />
		Please try again later.
	</error-page>
</template>

<script lang="ts">
import ErrorPage from "@/components/ErrorPage.vue";

export default {
	components: {
		ErrorPage,
	},
};
</script>
