import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	base: "generatebmr/",
	plugins: [react()],
	build: {
		outDir: "build", // Output directory for the build
	},
	server: {
		proxy: {
			"/resolve": {
				target: "http://localhost:3001",
			},
		},
	},
});
