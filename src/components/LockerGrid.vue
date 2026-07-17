<template>
	<div
		v-if="depth === 0 && cells"
		class="locker-container nerd"
		:style="rootContainerStyle"
	>
		<div class="locker" :style="rootLockerStyle" :data-mode="effectiveMode">
			<LockerGrid
				v-for="(child, i) in cells.childs"
				:key="i"
				:data="child"
				:depth="1"
				:current-mode="effectiveMode"
				:current-size="effectiveSize"
				:direction="childDirection"
				:sel-id="localSelId"
				:blocked-cells="blocked"
				@click="onCellClick"
			/>
		</div>
	</div>

	<div
		v-else-if="data && data.childs"
		class="locker-group"
		:style="groupStyle"
	>
		<LockerGrid
			v-for="(child, i) in data.childs"
			:key="i"
			:data="child"
			:depth="depth + 1"
			:current-mode="currentMode"
			:current-size="currentSize"
			:direction="childDirection"
			:sel-id="selId"
			:blocked-cells="blockedCells"
			@click="forwardClick"
		/>
	</div>

	<div v-else-if="data" class="locker-cell" :style="leafBoxStyle">
		<div
			class="locker-cell-inner"
			:class="leafClasses"
			:data-id="data.id"
			:data-status="leafStatus"
			:data-blocked="leafBlocked"
			:data-selected="leafSelected"
			:style="leafInnerStyle"
			@click.stop="handleLeafClick"
		>
			<span
				v-if="effectiveMode === 'admin'"
				class="nerd"
				v-text="leafIcon"
			/>
		</div>
	</div>
</template>

<style scoped>
.locker-container {
	box-sizing: border-box;
	display: flex;
	color: #fff;
	font-size: 2.93vw;
}

.locker {
	margin: auto;
	box-sizing: border-box;
	padding: 0.15vw;
	background: #fff;
}

.locker-group,
.locker-cell {
	box-sizing: border-box;
}

.locker-cell-inner {
	height: 100%;
	box-sizing: border-box;
	display: flex;
	cursor: pointer;
	border: 0;
}

.locker-cell-inner > span {
	margin: auto;
	font-size: 2.2vw;
	line-height: 2.2vw;
}

.cell-available {
	background: #3c3e8c;
}
.cell-disabled {
	background: #c1bee0;
}
.cell-selected {
	background: #e8d675;
}

.locker-cell-inner[data-selected="true"] {
	border: 0;
	box-shadow: inset 0 0 0 0.37vw #000;
}
</style>

<script lang="ts">
import type { Locker, LockerNode } from "@/api/types";
import type { PropType } from "vue";

export default {
	name: "LockerGrid",
	emits: ["click"],

	props: {
		data: { type: Object as PropType<LockerNode>, default: undefined },
		depth: { type: Number, default: 0 },
		currentMode: String,
		currentSize: String,
		direction: String as PropType<string | undefined>,
		selId: { type: Number as PropType<number | null>, default: null },
		blockedCells: {
			type: Object as PropType<Record<number, boolean> | undefined>,
			default: undefined,
		},
		cells: { type: Object as PropType<Locker>, default: undefined },
		mode: { type: String, default: "user" },
		width: Number,
		height: Number,
		padding: { type: Number, default: 10 },
		size: String,
	},

	data() {
		return {
			localSelId: null as number | null,
			blocked: {} as Record<number, boolean>,
		};
	},

	computed: {
		effectiveMode() {
			return this.depth === 0 ? this.mode : this.currentMode;
		},

		effectiveSize() {
			return this.depth === 0 ? this.size : this.currentSize;
		},

		effectiveSelId() {
			return this.depth === 0 ? this.localSelId : this.selId;
		},

		effectiveBlocked(): Record<number, boolean> {
			return this.depth === 0 ? this.blocked : this.blockedCells ?? {};
		},

		rootContainerStyle() {
			if (this.depth !== 0) return {};
			return {
				width: this.width + "px",
				height: this.height + "px",
			};
		},

		rootLockerStyle() {
			if (this.depth !== 0) return {};
			const cells = this.cells;
			if (!cells) return {};
			const proportions = this.calcProportions(
				cells,
				this.rootDirection!
			);
			const sizes = this.calcSize(
				{ width: this.width!, height: this.height! },
				proportions,
				this.padding
			);
			return {
				width: sizes.width + "px",
				height: sizes.height + "px",
				display: "flex",
				flexDirection: this.rootDirection as
					| "row"
					| "column"
					| undefined,
			};
		},

		rootDirection() {
			if (this.depth !== 0) return this.direction;
			if (!this.cells || !this.cells.childs.length) return "row" as const;
			return this.cells.childs[0].height
				? ("column" as const)
				: ("row" as const);
		},

		childDirection() {
			if (this.depth === 0)
				return this.rootDirection === "row" ? "column" : "row";
			return this.direction === "row" ? "column" : "row";
		},

		groupStyle() {
			return {
				display: "flex",
				flexDirection: this.direction as "row" | "column" | undefined,
				flex: this.data?.width || this.data?.height || 1,
			};
		},

		leafBoxStyle() {
			const v = this.data?.height || this.data?.width || 1;
			return {
				flex: v,
				padding: "0.15vw",
				boxSizing: "border-box" as const,
			};
		},

		leafStatus() {
			if (this.effectiveMode === "user") {
				const available =
					this.data?.type === this.effectiveSize &&
					this.data?.available;
				return available ? "available" : "disabled";
			}
			if (this.data?.type === "none") return "none";
			const id = this.data?.id;
			if (id != null && this.effectiveBlocked[id]) return "blocked";
			return this.data?.status || "disabled";
		},

		leafBlocked() {
			const id = this.data?.id;
			return id != null && this.effectiveBlocked[id] ? "true" : undefined;
		},

		leafSelected() {
			return this.effectiveSelId === this.data?.id ? "true" : undefined;
		},

		leafClasses() {
			if (this.effectiveMode !== "user") return [];
			if (this.effectiveSelId === this.data?.id) return ["cell-selected"];
			const available =
				this.data?.type === this.effectiveSize && this.data?.available;
			return available ? ["cell-available"] : ["cell-disabled"];
		},

		leafInnerStyle() {
			if (this.effectiveMode === "user") return {};
			const status = this.leafStatus;
			const colors: Record<string, string> = {
				free: "#008700",
				occupied: "#1064ff",
				blocked: "#ff3030",
				timeout: "#ff8000",
				none: "#c0c0c0",
			};
			return { background: colors[status] || "#c0c0c0" };
		},

		leafIcon() {
			const icons: Record<string, string> = {
				free: "\uF00C",
				occupied: "\uF83D",
				blocked: "\uF5AC",
				timeout: "\uF017",
				none: "",
			};
			return icons[this.leafStatus] || "";
		},
	},

	methods: {
		block(id: number) {
			this.blocked = { ...this.blocked, [id]: true };
		},

		unblock(id: number) {
			const copy = { ...this.blocked };
			delete copy[id];
			this.blocked = copy;
		},

		unselect() {
			this.localSelId = null;
		},

		handleLeafClick(event: MouseEvent) {
			if (!this.data || this.data.type === "none") return;

			if (this.effectiveMode === "user") {
				const available =
					this.data.type === this.effectiveSize &&
					this.data.available;
				if (!available) return;
				this.$emit("click", { id: this.data.id, admin: false });
			} else {
				this.$emit("click", {
					id: this.data.id,
					admin: true,
					el: event.currentTarget,
				});
			}
		},

		forwardClick(payload: unknown) {
			this.$emit("click", payload);
		},

		onCellClick(payload: { id: number; admin: boolean; el?: HTMLElement }) {
			this.localSelId = payload.id;
			this.$emit("click", payload.admin ? payload.el : payload.id);
		},

		calcProportions(cells: Locker, direction: string) {
			const temp = { width: 0, height: 0 };
			const key = (direction === "column" ? "height" : "width") as
				| "width"
				| "height";
			const key2 = key === "width" ? "height" : "width";
			for (const child of cells.childs) temp[key] += child[key] ?? 0;
			for (const child of cells.childs[0]?.childs ?? [])
				temp[key2] += child[key2] ?? 0;
			return temp;
		},

		calcSize(
			outerSize: { width?: number; height?: number },
			proportions: { width: number; height: number },
			padding: number
		) {
			let outerWidth = (outerSize.width ?? 0) - padding * 2;
			let outerHeight = (outerSize.height ?? 0) - padding * 2;
			let width = (outerHeight / proportions.height) * proportions.width;
			let height = outerHeight;
			if (width <= outerWidth) return { width, height };
			height = (outerWidth / proportions.width) * proportions.height;
			width = outerWidth;
			return { height, width };
		},
	},
};
</script>
