<template>
	<router-link :to="{ name: routeName }" custom v-slot="{ navigate }">
		<div class="back" @click="navigate">
			<p class="back__text">‹ back</p>
		</div>
	</router-link>
</template>

<script lang="ts">
export default {
	props: {
		routeName: {
			type: String,
			required: true,
		},
	},
};
</script>
