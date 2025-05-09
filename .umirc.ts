import { defineConfig } from "umi";

export default defineConfig({
  routes: [{ path: "/", component: "home/index" }],

  npmClient: "npm",
  tailwindcss: {},
  plugins: ["@umijs/plugins/dist/tailwindcss"],
});
