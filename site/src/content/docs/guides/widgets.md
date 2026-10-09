---
title: Widgets
description: Template-Widget is a standalone LakeHouse widget you can fork, customize, and load into an office.
---

This repository **is** a widget (`widget.json` + `src/` + `dist/widget.js`).

- Contract and agent flow: see root [AGENTS.md](https://github.com) / repo `AGENTS.md` and `docs/widget.md`.
- SDK: `@lakehouse/widget-sdk` from the monorepo — until published, use the local stub under `stubs/widget-sdk/` (do not vendor the real SDK).
- Preview: `npm run preview` opens the mock host (iframe + postMessage).
