<template>
	<div class="report-problem" @click="report">
		<span class="report-problem__icon">!</span>
		<p class="report-problem__text">report a problem</p>
	</div>
</template>

<style scoped>
.report-problem {
	display: flex;
	align-items: center;
	margin: 2rem auto 0;
	cursor: default;
}
.report-problem__icon {
	width: 6rem;
	height: 6rem;
	border-radius: 50%;
	background-color: #e8d675;
	color: #333956;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 2rem;
	font-size: 5rem;
	font-weight: 600;
}
.report-problem__text {
	color: #cac9c9;
	font-size: 4.3rem;
	line-height: 1;
	padding-bottom: 1rem;
}
@media (orientation: portrait) {
	.report-problem__icon {
		width: 9rem;
		height: 9rem;
		font-size: 7.5rem;
		margin-right: 3rem;
	}
	.report-problem__text {
		font-size: 6.45rem;
	}
}
</style>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";

export default {
	props: ["back"],
	methods: {
		report() {
			this.$router.push({
				name: ROUTE_NAME.REPORT,
				query: { back: this.back },
			});
		},
	},
};
</script>
