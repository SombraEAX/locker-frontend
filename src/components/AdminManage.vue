<template>
	<div class="manage-main">
		<div class="manage-body">
			<LockerGrid
				ref="locker"
				@click="click"
				:cells="lockerCells"
				mode="admin"
				:width="lockerWidth"
				:height="lockerHeight"
				:padding="10"
			/>
		</div>
		<bubble-window ref="bubble" :title="'Cell # ' + cell" @close="close">
			<div class="bubble-inner">
				<button @click="open">Open</button>
				<button class="manage-block" @click="block">
					{{ text }}
				</button>
				<p v-if="show">
					<b class="bubble-caption">Storage start:</b> {{ start }}
				</p>
				<p v-if="show">
					<b class="bubble-caption">Storage end:</b> {{ end }}
				</p>
			</div>
		</bubble-window>

		<div class="manage-footer" ref="footer">
			<the-legend icon="&#xF00C;" text="Available" color="#008700" />
			<the-legend icon="&#xF83D;" text="Occupied" color="#1064ff" />
			<the-legend icon="&#xF5AC;" text="Blocked" color="#ff3030" />
			<the-legend icon="&#xF017;" text="Time expired" color="#ff8000" />
		</div>
	</div>
</template>
<style scoped>
.manage-block {
	width: 21.96vw;
}
.bubble-inner {
	margin: 1.46vw;
	margin-top: 0px;
}
.bubble-inner button {
	padding: 1.46vw;
	margin: 0.73vw;
	border: 1px solid grey;
	background: #fff;
	border-radius: 0.73vw;
	color: #000;
	margin-top: 0px;
}
.bubble-inner button:disabled {
	color: #aaa;
	border-color: #aaa;
}
.bubble-inner button:not(:disabled):active {
	background: yellow;
}
.manage-main {
	display: flex;
	flex-direction: column;
}
.manage-body {
	flex: 1;
}
.manage-footer {
	display: flex;
}
.bubble-caption {
	width: 21.96vw;
	display: inline-block;
}
</style>
<script lang="ts">
import LockerGrid from "@/components/LockerGrid.vue";
import { getLocker, openCell, block, unblock, getTimes } from "@/api";
import TheLegend from "@/components/TheLegend.vue";
import BubbleWindow from "@/components/BubbleWindow.vue";

const months = "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(",");

function pad(n) {
	return n < 10 ? "0" + n : String(n);
}

function format(date) {
	return (
		date.getDate() +
		" " +
		months[date.getMonth()] +
		" " +
		pad(date.getHours()) +
		":" +
		pad(date.getMinutes())
	);
}

export default {
	name: "AdminManage",
	components: { LockerGrid, TheLegend, BubbleWindow },
	data() {
		return {
			cell: null,
			status: null,
			start: null,
			end: null,
			blocked: false,
			lockerCells: null,
			lockerWidth: 0,
			lockerHeight: 0,
		};
	},
	async mounted() {
		let body = this.$el.closest(".body");
		let footer = this.$refs.footer;
		let height =
			body.offsetHeight -
			footer.offsetHeight -
			window.innerWidth * 0.00625;
		let width = body.offsetWidth;

		try {
			const cells = await getLocker();
			this.lockerCells = cells;
			this.lockerWidth = width;
			this.lockerHeight = height;
			this.blocked = false;
		} catch (error) {
			console.error(error);
		}
	},
	computed: {
		text() {
			return this.blocked ? "Unblock" : "Block";
		},
		show() {
			return this.status === "occupied" || this.status === "timeout";
		},
	},
	methods: {
		async click(cell) {
			try {
				const times = await getTimes(Number(cell.dataset.id));
				this.start = format(new Date(times.start));
				this.end = format(new Date(times.end));

				this.$refs.bubble.show(cell);
				this.cell = Number(cell.dataset.id);
				this.status = cell.dataset.status;
				this.blocked = cell.dataset.blocked === "true";
			} catch (error) {
				console.error(error);
			}
		},
		close() {
			this.$refs.locker.unselect();
		},
		async open() {
			try {
				await openCell({ cell: this.cell, mail: "admin" });
			} catch (error) {
				console.error(error);
			}
		},
		async block() {
			let id = this.cell;

			try {
				if (!this.blocked) {
					await block(id);
					this.$refs.locker.block(id);
					this.blocked = true;
				} else {
					await unblock(id);
					this.$refs.locker.unblock(id);
					this.blocked = false;
				}
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
