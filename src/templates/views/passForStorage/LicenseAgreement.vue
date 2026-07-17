<template>
	<page-body>
		<page-header
			title="Terms of Service"
			:back="ROUTE_NAME.SELECT_TIME_STORAGE"
		/>

		<div class="license_container">
			<div class="license">
				<div class="license-inner" ref="license">
					<license-text></license-text>
				</div>
			</div>
			<div class="license-scroll">
				<button
					class="scbtn up"
					@mousedown.prevent="onScrollStart(-1)"
					@mouseup="onScrollEnd"
					@mouseleave="onScrollEnd"
					@touchstart.prevent="onScrollStart(-1)"
					@touchend="onScrollEnd"
					@touchcancel="onScrollEnd"
					:disabled="btnUpDisabled"
				></button>
				<div class="license-scroll-placeholder"></div>
				<button
					class="scbtn dn"
					@mousedown.prevent="onScrollStart(1)"
					@mouseup="onScrollEnd"
					@mouseleave="onScrollEnd"
					@touchstart.prevent="onScrollStart(1)"
					@touchend="onScrollEnd"
					@touchcancel="onScrollEnd"
					:disabled="btnDnDisabled"
				></button>
			</div>
		</div>

		<div class="page__body-bottom">
			<router-link
				:to="{ name: ROUTE_NAME.INPUT_PHONE }"
				custom
				v-slot="{ navigate }"
			>
				<button class="btn btn-primary" @click="navigate">next</button>
			</router-link>
		</div>
	</page-body>
</template>

<style scoped>
.up {
	background-image: url(/up.png);
	background-color: #fff;
}

.dn {
	background-image: url(/dn.png);
	background-color: #fff;
}

button[disabled] {
	background-color: rgba(255, 255, 255, 0.3);
}

.scbtn {
	width: 7.32vw;
	height: 7.32vw;
	border: 0px;
	border-radius: 50%;
	background-repeat: no-repeat;
	background-size: 50%;
	background-position: center;
}

.license_container {
	display: flex;
	width: 100%;
	height: 100%;
	font-size: 2.2vw;
}

.license-scroll-placeholder {
	flex: 1;
}

.license-scroll {
	display: flex;
	flex-direction: column;
}

.license {
	flex: 1;
	position: relative;
}

.license-inner {
	position: absolute;
	top: 0px;
	bottom: 0px;
	left: 0px;
	right: 1.46vw;
	overflow-y: auto;
	overflow-x: hidden;
	-ms-overflow-style: none;
	scrollbar-width: none;
}
.license-inner::-webkit-scrollbar {
	display: none;
}
</style>

<script lang="ts">
import { ROUTE_NAME } from "@/helpers/constants";
import LicenseText from "@components/LicenseText.vue";
import PageHeader from "@components/PageHeader.vue";
import PageBody from "@components/PageBody.vue";

export default {
	components: {
		LicenseText,
		PageHeader,
		PageBody,
	},
	data() {
		return {
			ROUTE_NAME,
			btnUpDisabled: true,
			btnDnDisabled: false,
			scrollTimer: null as ReturnType<typeof setInterval> | null,
		};
	},
	methods: {
		updateButtons() {
			let el = this.$refs.license as HTMLElement;
			this.btnUpDisabled = !el.scrollTop;
			this.btnDnDisabled =
				el.scrollHeight == el.scrollTop + el.clientHeight;
		},
		scrollStep(dir: number) {
			let el = this.$refs.license as HTMLElement;
			let step = 40;
			el.scrollBy({ top: dir * step, behavior: "smooth" });
		},
		onScrollStart(dir: number) {
			this.scrollStep(dir);
			this.scrollTimer = setInterval(() => {
				this.scrollStep(dir);
				this.updateButtons();
				let el = this.$refs.license as HTMLElement;
				if (
					(dir < 0 && !el.scrollTop) ||
					(dir > 0 &&
						el.scrollHeight == el.scrollTop + el.clientHeight)
				) {
					this.onScrollEnd();
				}
			}, 100);
		},
		onScrollEnd() {
			if (this.scrollTimer) clearInterval(this.scrollTimer);
			this.scrollTimer = null;
			this.updateButtons();
		},
	},
	beforeUnmount() {
		if (this.scrollTimer) clearInterval(this.scrollTimer);
	},
};
</script>
