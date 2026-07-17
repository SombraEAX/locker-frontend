import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
	plugins: [vue()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@components": path.resolve(__dirname, "src/components"),
		},
	},
	css: {
		postcss: {
			plugins: [
				(await import("autoprefixer")).default(),
				(await import("postcss-sort-media-queries")).default(),
			],
		},
	},
	server: {
		host: "0.0.0.0",
		port: 8081,
	},
	build: {
		target: "es2015",
	},
});
