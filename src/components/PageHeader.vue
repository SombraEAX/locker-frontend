<template>
	<div class="header">
		<div class="back-button-container header-block">
			<div class="back" @click="gotoback">
				<p class="back__text">‹ back</p>
			</div>
		</div>

		<div class="title-container header-block">
			<slot>
				<h-title :txt="title" />
				<h2 v-if="subtitle">{{ subtitle }}</h2>
			</slot>
		</div>

		<div class="placeholder" v-if="!noPlaceholder"></div>
	</div>
</template>

<script lang="ts">
import HTitle from "@components/HTitle.vue";

export default {
	props: ["title", "subtitle", "back", "no-placeholder"],
	components: {
		HTitle,
	},
	methods: {
		gotoback() {
			try {
				this.$router.push({ name: this.back });
			} catch (error) {
				this.$router.push({ name: "home" });
			}
		},
	},
};
</script>

<style scoped>
.header-block {
	display: flex;
	flex-direction: column;
}
h2 {
	font-size: 2.2vw;
	padding-top: 0.73vw;
}
.header-block > * {
	margin: auto;
}
.header {
	display: flex;
	width: 100%;
	margin-bottom: 2.2vw;
}
.title-container {
	flex: 1;
	text-align: center;
}
.placeholder,
.back-button-container {
	width: 10.98vw;
}
@media (orientation: portrait) {
	.back-button-container {
		width: 20vw;
	}
	.back {
		white-space: nowrap;
	}
	h2 {
		font-size: 3.3vw;
	}
}
</style>
