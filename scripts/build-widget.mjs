#!/usr/bin/env node
/**
 * Bundle src/index.ts → dist/widget.js (ESM) for host loading.
 */
import { mkdirSync, writeFileSync, copyFileSync, readFileSync } from "node:fs";
import path from "node:path";
import * as esbuild from "esbuild";
import { ROOT } from "./lib/repo.mjs";

async function main() {
  const outdir = path.join(ROOT, "dist");
  mkdirSync(outdir, { recursive: true });

  await esbuild.build({
    entryPoints: [path.join(ROOT, "src/index.ts")],
    outfile: path.join(outdir, "widget.js"),
    bundle: true,
    format: "esm",
    platform: "browser",
    target: ["es2022"],
    sourcemap: true,
    // Keep the stub/SDK external only if published; stub is bundled for preview.
    // When real SDK publishes as ESM peer, mark it external in a follow-up.
    logLevel: "info",
  });

  copyFileSync(path.join(ROOT, "widget.json"), path.join(outdir, "widget.json"));

  const manifest = JSON.parse(readFileSync(path.join(ROOT, "widget.json"), "utf8"));
  writeFileSync(
    path.join(outdir, "BUILD_INFO.json"),
    `${JSON.stringify(
      {
        id: manifest.id,
        version: manifest.version,
        entry: "widget.js",
        builtAt: new Date().toISOString(),
      },
      null,
      2,
    )}\n`,
  );

  console.log("build-widget: wrote dist/widget.js + dist/widget.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
