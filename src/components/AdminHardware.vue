<template>
	<div class="hw-main">
		<div class="hw-header">
			<div class="hw-placeholder"></div>
			<div class="hw-header-caption">Log from</div>

			<button class="hw-dp" @click="selectYear('start')">
				{{ start.year }}
			</button>

			<div class="hw-header-caption">.</div>

			<button class="hw-dp" @click="selectMonth('start')">
				{{ pad(start.month) }}
			</button>

			<div class="hw-header-caption">.</div>

			<button class="hw-dp" @click="selectDay('start')">
				{{ pad(start.day) }}
			</button>

			<div class="hw-header-caption">to</div>

			<button class="hw-dp" @click="selectYear('end')">
				{{ end.year }}
			</button>

			<div class="hw-header-caption">.</div>

			<button class="hw-dp" @click="selectMonth('end')">
				{{ pad(end.month) }}
			</button>

			<div class="hw-header-caption">.</div>

			<button class="hw-dp" @click="selectDay('end')">
				{{ pad(end.day) }}
			</button>

			<div class="hw-placeholder"></div>

			<button class="hw-ok" @click="reload">OK</button>

			<div class="hw-placeholder"></div>
		</div>
		<div class="hw-body">
			<activity-log ref="log" />
		</div>
<popup-window
		ref="popup"
		:wtitle="wtitle"
		wstyle="width:60vw;height:75vh"
	>
			<list-box style="height: 100%" ref="popupList">
				<div
					v-for="option in options"
					class="hw-option"
					:key="option.value"
					:data-value="option.value"
					@click="click($event.target.dataset.value)"
				>
					{{ option.text }}
				</div>
			</list-box>
		</popup-window>
	</div>
</template>
<style scoped>
.hw-placeholder {
	flex: 1;
}
.hw-option {
	text-align: left;
	font-size: 2.2vw;
	padding: 1.46vw;
	border-bottom: 0.15vw solid #ccc;
}
.hw-option:active {
	background: blue;
	color: #fff;
}

.hw-ok {
	border-radius: 0.73vw;
	border: 0px;
	background: #3a5ae8;
	color: #fff;
}
.hw-ok:active {
	background: yellow;
	color: #000;
}
.hw-header-caption {
	padding-top: 3.26vh;
	line-height: 2.2vw;
}
.hw-header button {
	margin: 0.37vw;
	min-width: 5.86vw;
	padding: 0.73vw;
	box-sizing: border-box;
}
.hw-dp {
	border-radius: 0px;
	border: 1px solid grey;
	background: #fff;
}
.hw-header {
	background: #ccc;
	border-bottom: 1px solid grey;
	height: 10.42vh;
	font-size: 2.2vw;
	box-sizing: border-box;
	display: flex;
}
.hw-main {
	height: 100%;
	display: flex;
	flex-direction: column;
}
.hw-body {
	flex: 1;
	overflow: hidden;
}
@media (orientation: portrait) {
	.hw-header {
		height: 3.47vh;
		font-size: 2.22vw;
	}
	.hw-header button {
		min-width: 6vw;
		padding: 1vw;
	}
	.hw-header-caption {
		padding-top: 1.09vh;
		line-height: 2.22vw;
	}
	.hw-option {
		font-size: 4vw;
		padding: 2vw;
		border-bottom-width: 0.05vw;
	}
}
</style>
<script lang="ts">
import ListBox from "@/components/ListBox.vue";
import PopupWindow from "@/components/PopupWindow.vue";
import ActivityLog from "@/components/ActivityLog.vue";
import { pad } from "@/helpers/format";

export default {
	name: "AdminHardware",
	components: { ListBox, PopupWindow, ActivityLog },

	async mounted() {
		const now = new Date();
		this.start.year = this.end.year = now.getFullYear();
		this.start.month = this.end.month = now.getMonth() + 1;
		this.start.day = this.end.day = now.getDate();

		this.$refs.log.load(this.start, this.end);
	},

	data() {
		return {
			start: { year: null, month: null, day: null },
			end: { year: null, month: null, day: null },
			months: [
				{ text: "January", value: 1 },
				{ text: "February", value: 2 },
				{ text: "March", value: 3 },
				{ text: "April", value: 4 },
				{ text: "May", value: 5 },
				{ text: "June", value: 6 },
				{ text: "July", value: 7 },
				{ text: "August", value: 8 },
				{ text: "September", value: 9 },
				{ text: "October", value: 10 },
				{ text: "November", value: 11 },
				{ text: "December", value: 12 },
			],
			wtitle: null,
			options: [],
			callback: null,
		};
	},

	methods: {
		pad,

		reload() {
			this.$refs.log.load(this.start, this.end);
		},

		fix(name) {
			let start = new Date(
				this.start.year,
				this.start.month - 1,
				this.start.day
			);
			let end = new Date(this.end.year, this.end.month - 1, this.end.day);

			if (start > end) {
				if (name === "start") {
					this.end.year = this.start.year;
					this.end.month = this.start.month;
					this.end.day = this.start.day;
				} else {
					this.start.year = this.end.year;
					this.start.month = this.end.month;
					this.start.day = this.end.day;
				}
			}
		},

		selectYear(name) {
			let years = [];
			const current = new Date().getFullYear();

			for (let i = 2022; i <= current; i++)
				years.push({
					text: i,
					value: i,
				});

			this.showSelect("Select year", years, (year) => {
				this[name].year = year;
				this.fix(name);
			});
		},

		selectMonth(name) {
			this.showSelect("Select month", this.months, (month) => {
				this[name].month = month;
				this.fix(name);
			});
		},
		selectDay(name) {
			let days = [];
			let y = this[name].year;
			let leap = false; //whether it's a leap year

			if (y % 4 == 0 && y % 100 != 0) {
				leap = true;
			} else if (y % 100 == 0 && y % 400 == 0) {
				leap = true;
			}

			let count = {
				1: 31,
				2: leap ? 29 : 28,
				3: 31,
				4: 30,
				5: 31,
				6: 30,
				7: 31,
				8: 31,
				9: 30,
				10: 31,
				11: 30,
				12: 31,
			}[this[name].month];

			for (let i = 1; i <= count; i++) days.push({ text: i, value: i });

			this.showSelect("Select day", days, (day) => {
				this[name].day = day;
				this.fix(name);
			});
		},

		click(value) {
			this.$refs.popup.hide();
			this.callback(value);
		},

		showSelect(title, options, callback) {
			this.wtitle = title;
			this.options = options;
			this.$refs.popup.show();
			this.callback = callback;
		},
	},
};
</script>
