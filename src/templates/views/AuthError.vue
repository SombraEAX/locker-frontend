<template>
	<error-page back="/"> Invalid login or password </error-page>
</template>

<script lang="ts">
import ErrorPage from "@/components/ErrorPage.vue";

export default {
	components: {
		ErrorPage,
	},
};
</script>
