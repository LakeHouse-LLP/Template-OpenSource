import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { isHostCompatible } from "@lakehouse/widget-sdk";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function load(rel) {
  return JSON.parse(readFileSync(path.join(root, rel), "utf8"));
}

describe("widget contract", () => {
  it("widget.json matches package version and required identity fields", () => {
    const manifest = load("widget.json");
    const pkg = load("package.json");
    assert.equal(manifest.version, pkg.version);
    assert.match(manifest.id, /^[a-z0-9]+([._-][a-z0-9]+)*$/);
    assert.ok(manifest.entry?.path);
    assert.ok(manifest.ui?.surfaces?.length);
    assert.ok(manifest.engines?.lakehouse);
  });

  it("engines.lakehouse accepts the default CI host version", () => {
    const manifest = load("widget.json");
    assert.equal(isHostCompatible("0.1.0", manifest.engines.lakehouse), true);
    assert.equal(isHostCompatible("1.0.0", manifest.engines.lakehouse), false);
    assert.equal(isHostCompatible("0.0.1", manifest.engines.lakehouse), false);
  });

  it("schema file is present and declares temporary TODO provenance", () => {
    const schema = load("widget.schema.json");
    assert.equal(schema.type, "object");
    assert.match(String(schema.description ?? ""), /TODO\(widget-sdk\)/);
  });
});
