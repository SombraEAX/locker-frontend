<template>
	<div :class="{ 'sizes-cell__item-wrap': true, active }">
		<div class="sizes-cell__item">
			<button
				class="btn btn-primary sizes-cell__item-btn"
				@click="active && $emit('click', { price, size: symbol })"
			>
				{{ symbol }}
			</button>
			<div class="sizes-cell__item-info">
				<p class="sizes-cell__item-square">{{ size }}</p>
				<p class="sizes-cell__item-price price">{{ price }} $/hr</p>
			</div>
		</div>
	</div>
</template>

<style scoped>
.sizes-cell__item {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 0 0.75rem;
}
.sizes-cell__item-wrap {
	width: 33.33%;
}
.sizes-cell__item-btn {
	max-width: 24.1rem;
	width: 100%;
	max-height: 16.8rem;
	height: 100%;
	font-size: 6.9rem;
	flex: 1;
}
.sizes-cell__item-info {
	margin-top: 1.5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	max-height: 13rem;
	flex: 1;
}
.sizes-cell__item-square {
	font-size: 4.3rem;
	font-weight: 100;
	line-height: 1;
	margin-bottom: 1rem;
	white-space: nowrap;
	text-align: center;
}
button {
	height: 19.53vh !important;
	min-height: 19.53vh !important;
}

.sizes-cell__item-wrap:not(.active) button {
	background-color: #e8d675 !important;
}

.sizes-cell__item-wrap:not(.active) {
	opacity: 40%;
}
@media (orientation: portrait) {
	button {
		height: 9.77vh !important;
		min-height: 9.77vh !important;
		font-size: 8.28rem !important;
		padding: 0 2.88rem 1.2rem 2.88rem !important;
	}
	.sizes-cell__item-wrap {
		width: 30%;
		flex-shrink: 0;
	}
	.sizes-cell__item {
		padding: 0 0.25rem;
	}
	.sizes-cell__item-square {
		font-size: 6.45rem;
		margin-bottom: 0.5rem;
	}
	.sizes-cell__item-price {
		font-size: 6.45rem;
	}
	.sizes-cell__item-info {
		max-height: 8rem;
		margin-top: 0.5rem;
	}
}
</style>

<script lang="ts">
export default {
	emits: ["click"],
	props: {
		size: null,
		price: null,
		symbol: null,
		active: {
			type: Boolean,
			default() {
				return true;
			},
		},
	},
};
</script>
