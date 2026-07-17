<template>
	<error-page back="/">Unfortunately, all cells are occupied</error-page>
</template>

<script lang="ts">
import ErrorPage from "@/components/ErrorPage.vue";

export default {
	components: {
		ErrorPage,
	},
};
</script>
