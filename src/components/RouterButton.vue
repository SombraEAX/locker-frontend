<template>
	<router-link :to="{ name: page }" custom v-slot="{ navigate }">
		<button
			:class="{
				btn: true,
				'btn-primary': true,
				'main-buttons__item': main,
			}"
			@click="navigate"
		>
			<slot></slot>
		</button>
	</router-link>
</template>

<script lang="ts">
export default {
	props: ["page", "main"],
};
</script>
