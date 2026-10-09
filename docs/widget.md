# Widget template

This repo **is** a LakeHouse widget: `widget.json` + `src/` + loadable `dist/widget.js`.

## Layout

| Path | Role |
| --- | --- |
| `widget.json` | SemVer manifest (id, entry, UI, engines, permissions, agent hints) |
| `widget.schema.json` | Temporary local JSON Schema — **TODO** replace with `@lakehouse/widget-sdk` |
| `src/` | Hello-world widget (dark-only, accent `#7DFFFF`) |
| `preview/` | Mock host (iframe + postMessage) |
| `stubs/widget-sdk/` | Placeholder SDK — **not** the real SDK; delete when published |
| `tests/widget-contract.test.mjs` | Contract / host-range tests |
| `dist/` | Build output (bundle + copied `widget.json`) |

## SDK dependency

Canonical SDK: monorepo `packages/widget-sdk` → npm `@lakehouse/widget-sdk` (scope from `.lakehouse/org.json`).

Until publish:

```json
"@lakehouse/widget-sdk": "file:./stubs/widget-sdk"
```

Do **not** vendor the real SDK into this repo.

## Commands

```bash
npm run build          # dist/widget.js + dist/widget.json
npm run check:widget   # schema + engines.lakehouse + version sync
npm test               # contract tests
npm run preview        # mock host at http://127.0.0.1:4173/preview/
```

## Release assets

`npm run release:build` produces npm pack tarball **and** the widget bundle/`widget.json` under `release-assets/` with `SHA256SUMS` (provenance via existing release workflow).
