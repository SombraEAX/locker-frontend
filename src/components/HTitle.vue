<template>
	<div class="title">
		<h1>{{ txt }}</h1>
		<slot name="subtitle"></slot>
	</div>
</template>

<style scoped>
.title {
	text-align: center;
}
.title h1 {
	font-size: 6.8rem;
	font-weight: 600;
	line-height: 1;
}
.title h2 {
	display: block;
	font-size: 5.4rem;
	font-weight: 100;
	line-height: 1;
}
@media (orientation: portrait) {
	.title h1 {
		font-size: 10.2rem;
	}
	.title h2 {
		font-size: 8.1rem;
	}
}
</style>

<script lang="ts">
export default {
	props: {
		txt: {
			type: String,
			required: true,
		},
	},
};
</script>
