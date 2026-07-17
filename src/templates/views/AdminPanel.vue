<template>
	<page-with-keyboard>
		<main>
			<header>
				<button class="exit" @click="exit">‹ back</button>
				<h1>
					<span>{{ title }}</span>
				</h1>
				<button class="poweroff nerd" @click="showPowerMenu">襤</button>
			</header>
			<div class="main">
				<aside>
					<button
						v-for="tab in tabs"
						:key="tab.id"
						:class="{ active: activeTab === tab.id, tab: true }"
						:data-id="tab.id"
						@click="tabClick"
					>
						<div class="nerd tab-icon">
							<div class="tab-icon-inner">{{ tab.icon }}</div>
						</div>
						<div class="tab-caption">{{ tab.caption }}</div>
					</button>
					<div class="placeholder"></div>
					<div class="status-data">
						<span class="nerd" style="color: #33f"></span>
						{{ temp }} °C |
						<span
							class="nerd"
							:class="online ? 'online' : 'offline'"
							></span
						>
						{{ online ? "Online" : "Offline" }}
					</div>
				</aside>
				<div class="body">
					<component :is="'admin-' + activeTab" />
				</div>
			</div>
		</main>
		<div
			class="power-menu"
			:style="{ display: powerMenuVisible ? 'flex' : 'none' }"
		>
			<div class="power-header"></div>
			<div class="power-buttons">
				<div class="power-buttons-inner">
					<button class="power-button shutdown" @click="shutdown">
						<div class="power-icon nerd shutdown-icon">襤</div>
						<div class="power-caption">Shut down</div>
					</button>
					<button class="power-button reboot" @click="reboot">
						<div class="power-icon nerd reboot-icon">勒</div>
						<div class="power-caption">Reboot</div>
					</button>
				</div>
			</div>
			<div class="power-footer">
				<div class="power-footer-inner">
					<button class="power-undo" @click="hidePowerMenu">
						Cancel
					</button>
				</div>
			</div>
		</div>
	</page-with-keyboard>
</template>
<style scoped>
.placeholder {
	flex: 1;
}
.status-data {
	font-size: 1.46vw;
	padding: 0.73vw;
	margin: 0.73vw;
	background: #aaa;
	color: #000;
	border-radius: 0.73vw;
}
.online {
	color: green;
}
.offline {
	color: red;
}
.power-button {
	border: 0px;
	background: transparent;
	color: #fff;
	padding: 3.66vw;
	padding-bottom: 0px;
}
.power-undo {
	font-size: 2.93vw;
	padding: 1.46vw;
	padding-left: 2.2vw;
	padding-right: 2.2vw;
	background: #fff;
	color: #000;
	border: 0px;
	border-radius: 0.37vw;
}
.power-undo:active {
	background: #888;
}
.power-footer {
	display: flex;
}
.power-footer-inner {
	margin: auto;
}
.power-caption {
	font-size: 2.93vw;
}
.power-icon {
	font-size: 21.96vw;
	padding: 0px;
	line-height: 21.96vw;
	margin-bottom: -5.21vh;
}
.shutdown-icon {
	color: red;
}
.reboot-icon {
	color: green;
}
.power-footer,
.power-buttons {
	flex: 1;
}
.power-header {
	flex: 0.5;
}
.power-buttons {
	display: flex;
}
.power-buttons-inner {
	margin: auto;
}
.power-menu {
	z-index: 300;
	background: RGBA(0, 0, 0, 0.8);
	position: fixed;
	left: 0px;
	top: 0px;
	bottom: 0px;
	right: 0px;
	display: none;
	flex-direction: column;
}
.tab {
	display: flex;
	padding: 0px;
}
.tabBody {
	height: 100%;
	display: none;
	color: #000;
}
.tabBody[data-visible] {
	display: block !important;
}
.tab-icon-inner {
	margin: auto;
}
.tab-icon {
	width: 5.86vw;
	display: flex;
	min-width: 5.86vw;
	font-size: 4.39vw;
}
.tab-caption {
	font-size: 2.93vw;
	padding: 1.46vw;
	padding-left: 0px;
}
.poweroff {
	font-size: 5.86vw;
	color: #fff;
	text-align: center;
	width: 7.32vw;
}
.exit {
	color: #fff;
	font-size: 3.66vw;
	padding-left: 4.39vw;
	padding-right: 4.39vw;
}
header button {
	background-color: transparent;
	border: 0px;
	border-radius: 0px;
}
header button:active {
	background-color: #0f4c7e;
}
main {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}
header h1 {
	flex: 1;
	display: flex;
	font-size: 4.39vw;
	font-weight: normal;
}
header h1 span {
	margin: auto;
}
header {
	width: 100%;
	height: 13.02vh;
	background: #1d89e4;
	display: flex;
}
.main {
	display: flex;
	min-height: 0;
	flex: 1;
}
aside {
	width: 29.28vw;
	height: 100%;
	background: #28373e;
	display: flex;
	flex-direction: column;
}
aside button {
	text-align: left;
	border: 0px;
	background: transparent;
	padding: 2.93vw;
	margin: 1.46vw;
	margin-bottom: 0px;
	color: #fff;
	border-radius: 0.73vw;
}
aside button.active {
	background: #1d89e4;
}
.body {
	background: #fff;
	height: 100%;
	color: #000;
	flex: 1;
}
.power-button:active {
	color: orange;
}
.power-button:active .power-icon {
	color: orange;
}
@media (orientation: portrait) {
	header {
		height: 4.34vh;
	}
	header h1 {
		font-size: 5vw;
	}
	.exit {
		font-size: 4vw;
		padding-left: 3vw;
		padding-right: 3vw;
	}
	.poweroff {
		font-size: 5vw;
		width: 6vw;
	}
	.status-data {
		font-size: 2.67vw;
	}
	.power-icon {
		font-size: 14vw;
		line-height: 14vw;
		margin-bottom: 0;
	}
	.power-caption {
		font-size: 3.5vw;
	}
}
</style>
<script lang="ts">
import AdminManage from "@/components/AdminManage.vue";
import AdminHardware from "@/components/AdminHardware.vue";
import PageWithKeyboard from "@/components/PageWithKB.vue";
import { ROUTE_NAME } from "@/helpers/constants";
import * as api from "@/api";

export default {
	components: {
		PageWithKeyboard,
		AdminHardware,
		AdminManage,
	},
	data() {
		return {
			activeTab: "manage",
			temp: null,
			online: null,
			pollTimer: null,
			powerMenuVisible: false,
			tabs: [
				{ caption: "Cell Management", id: "manage", icon: "\uf00a" },
				{ caption: "Hardware Status", id: "hardware", icon: "\uf108" },
			],
		};
	},
	computed: {
		title() {
			return this.tabs.find((tab) => tab.id === this.activeTab).caption;
		},
	},

	mounted() {
		const fetch = () =>
			api
				.getHardwareInfo()
				.then((data) => {
					this.temp = data.temp;
					this.online = data.online;
				})
				.catch(() => {
					// hardware info unavailable, keep previous values
				});
		fetch();
		this.pollTimer = setInterval(fetch, 5000);
	},

	beforeUnmount() {
		clearInterval(this.pollTimer);
	},

	methods: {
		tabClick(event) {
			const id = event.currentTarget.dataset.id;
			if (this.tabs.some((tab) => tab.id === id)) this.activeTab = id;
		},

		exit() {
			this.$router.push({ name: ROUTE_NAME.HOME });
		},

		showPowerMenu() {
			this.powerMenuVisible = true;
		},

		hidePowerMenu() {
			this.powerMenuVisible = false;
		},

		shutdown() {
			this.$router.push({
				name: ROUTE_NAME.SHUTDOWN,
				query: { action: "shutdown" },
			});
		},

		reboot() {
			this.$router.push({
				name: ROUTE_NAME.SHUTDOWN,
				query: { action: "reboot" },
			});
		},
	},
};
</script>
