<template>
	<div class="log">
		<list-box-button
			direction="up"
			@mousedown="upPress"
			@mouseup="clearTimer"
			@mouseleave="clearTimer"
			@touchend="clearTimer"
			v-if="upVisible"
		/>

		<div class="log-list" ref="list">
			<log-item
				v-for="(item, index) in log"
				:key="index"
				:datetime="f(item.datetime)"
				:cell="item.cell"
				:action="dict[item.action]"
				:mail="item.mail"
				:phone="item.phone"
				ref="item"
			/>
			<div style="height: 1000px; color: transparent">.</div>
		</div>

		<list-box-button
			direction="dn"
			@mousedown="dnPress"
			@mouseup="clearTimer"
			@mouseleave="clearTimer"
			@touchend="clearTimer"
			v-if="dnVisible"
		/>
	</div>
</template>
<style scoped>
.log-list {
	width: 100%;
	height: 100%;
	position: absolute;
	overflow-y: hidden;
	z-index: 25;
}
.log {
	position: relative;
	overflow-y: hidden;
	height: 100%;
}
</style>
<script lang="ts">
const SIZE = 30;
const SCROLL_INTERVAL_MS = 16;
const SCROLL_STEP_PX = 3;
const SCROLL_THRESHOLD_PX = 300;
import ListBoxButton from "./ListBoxButton.vue";
import * as api from "@/api";
import LogItem from "@/components/LogItem.vue";
import { formatTimestamp } from "@/helpers/format";

export default {
	name: "ActivityLog",
	components: { ListBoxButton, LogItem },

	data() {
		return {
			dict: {
				open: "open",
				close: "closed",
			},
			log: [] as Record<string, unknown>[],
			timer: null as ReturnType<typeof setInterval> | null,
			upVisible: false,
			dnVisible: false,
			start: null as string | null,
			end: null as string | null,
			page: 0,
			large: false,
			topLimit: true,
			bottomLimit: false,
			flag: false,
			_onMouseup: null as (() => void) | null,
			_onTouchend: null as (() => void) | null,
		};
	},

	mounted() {
		this._onMouseup = () => clearInterval(this.timer);
		this._onTouchend = () => clearInterval(this.timer);
		window.addEventListener("mouseup", this._onMouseup);
		window.addEventListener("touchend", this._onTouchend);
	},

	beforeUnmount() {
		clearInterval(this.timer);
		if (this._onMouseup)
			window.removeEventListener("mouseup", this._onMouseup);
		if (this._onTouchend)
			window.removeEventListener("touchend", this._onTouchend);
	},

	updated() {
		if (this.flag) this.refresh();
	},

	methods: {
		getItemHeight(): number {
			const items = this.$refs.item as { $el: HTMLElement }[] | undefined;
			if (items && items.length) return items[0].$el.offsetHeight;
			return 0;
		},
		getScrollHeight(): number {
			let el = this.$refs.list as HTMLDivElement;
			return el.scrollHeight - 1000;
		},

		f: formatTimestamp,

		async load(start: string, end: string) {
			this.start = start;
			this.end = end;
			this.page = 0;

			try {
				const log = await api.getLog(start, end, 0);
				this.log = log;
				this.home();
			} catch (error) {
				console.error(error);
			}
		},

		//load next page
		async loadNext(callback: () => void) {
			this.topLimit = false;
			if (
				(this.large && this.log.length < 2 * SIZE) ||
				(!this.large && this.log.length < SIZE)
			) {
				this.bottomLimit = true;
				return callback();
			} else if (!this.large) {
				try {
					const log = await api.getLog(this.start, this.end, 1);
					this.large = true;
					for (let item of log) this.log.push(item);
					return callback();
				} catch (error) {
					console.error(error);
				}
			} else {
				let x = -this.getItemHeight() * SIZE;
				this.scroll(x);
				this.log.splice(0, SIZE);
				try {
					const log = await api.getLog(
						this.start,
						this.end,
						this.page + 2
					);
					for (let item of log) this.log.push(item);
					this.page++;
					return callback();
				} catch (error) {
					console.error(error);
				}
			}
		},

		//load previous page
		async loadPrev(callback: () => void) {
			this.bottomLimit = false;

			if (this.page === 0) {
				this.topLimit = true;
				return callback();
			}
			let el = this.$refs.list as HTMLDivElement;
			let x = this.getItemHeight() * SIZE;
			let scrollTo = el.scrollTop + x;
			const tail = this.log.splice(SIZE, this.log.length - SIZE);
			try {
				const log = await api.getLog(
					this.start,
					this.end,
					this.page - 1
				);
				this.log.splice(0, 0, ...log);
				setTimeout(() => {
					el.scrollTop = scrollTo;
					this.refresh();
					this.page--;
					return callback();
				}, 0);
			} catch (error) {
				this.log.splice(SIZE, 0, ...tail);
				console.error(error);
			}
		},

		up() {
			let el = this.$refs.list as HTMLDivElement;
			this.scroll(-SCROLL_STEP_PX);
			if (el.scrollTop < SCROLL_THRESHOLD_PX) {
				if (!this.flag) {
					this.flag = true;
					this.loadPrev(() => {
						this.flag = false;
					});
				}
			}
		},
		dn() {
			this.scroll(SCROLL_STEP_PX);
			let el = this.$refs.list as HTMLDivElement;
			let scrollHeight = this.getScrollHeight();
			let scrollBottom = el.scrollTop + el.clientHeight; //distance from top of list to bottom of window
			let pad = scrollHeight - scrollBottom; //remaining gap
			if (pad < SCROLL_THRESHOLD_PX) {
				if (!this.flag) {
					this.flag = true;
					this.loadNext(() => {
						this.flag = false;
					});
				}
			}
			if (pad <= 0) {
				clearInterval(this.timer);
			}
		},
		clearTimer() {
			clearInterval(this.timer);
		},
		upPress() {
			clearInterval(this.timer);
			this.up();
			this.timer = setInterval(() => this.up(), SCROLL_INTERVAL_MS);
		},
		dnPress() {
			clearInterval(this.timer);
			this.dn();
			this.timer = setInterval(() => this.dn(), SCROLL_INTERVAL_MS);
		},
		scroll(val: number) {
			const el = this.$refs.list as HTMLDivElement;
			el.scrollTop += val;
			this.refresh();
		},
		//when the list changes, call this function to show/hide scroll buttons
		refresh() {
			let el = this.$refs.list as HTMLDivElement;
			this.upVisible = !!el.scrollTop;
			this.dnVisible = !(
				this.getScrollHeight() <=
				el.scrollTop + el.clientHeight
			);
		},
		home() {
			const el = this.$refs.list as HTMLDivElement;
			el.scrollTop = 0;
			this.$nextTick(() => this.refresh());
		},
	},
};
</script>
