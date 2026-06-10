import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to your entry point
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      // Force Nitro to compile out of Cloudflare mode and target Vercel
      nitro({
        preset: "vercel",
      }),
    ],
  },
});