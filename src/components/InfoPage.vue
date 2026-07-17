<template>
	<div class="page">
		<div class="container">
			<div class="page__body">
				<div class="page__body-top">
					<slot name="top">
						<br />
					</slot>
					<h-title :txt="title" />
				</div>
				<div class="page__body-center">
					<div class="bl-info-text">
						<p class="bl-info-text_color_yellow">
							<slot />
						</p>
					</div>
				</div>
				<div class="page__body-bottom">
					<slot name="bottom" />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import HTitle from "@components/HTitle.vue";

export default {
	components: {
		HTitle,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
	},
};
</script>
