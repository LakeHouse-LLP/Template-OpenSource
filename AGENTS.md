# Agent instructions (Template-Widget)

This repository is **Template-Widget** — a standalone, agent-friendly **LakeHouse Studio widget** (public). Org identity: [`.lakehouse/org.json`](./.lakehouse/org.json).

**Retired name:** `Template-OpenSource` → `Template-Widget` (see [docs/retired-names.md](./docs/retired-names.md)). Update remotes if your clone still points at the old URL.

Projects created from this template must use **plain repository names** (no `Template-` prefix). The `Template-` prefix is reserved for template repositories only.

Org runbook / shared defaults: `{owner}/.github` (owner from `github.repository_owner` or `org.json`). See [docs/org.md](./docs/org.md).

## Agent flow — fork, customize, load into my office

1. **Fork** this repo (or copy from the template) under a plain name.
2. **Customize safely**
   - Edit `src/` (UI/behavior), `widget.json` metadata (`name`, `description`, `inputs`, `settingsSchema`, `agentHints`).
   - Keep **dark mode only** and accent token `#7DFFFF`.
   - Do **not** expand `stubs/widget-sdk/` (placeholder until `@lakehouse/widget-sdk` publishes).
   - Do **not** vendor the real SDK from the monorepo.
3. **Bump version** in **both** `widget.json` and `package.json` (same SemVer). Add a changeset.
4. **Validate locally**
   ```bash
   npm ci
   npm run hooks:install
   npm run check:all
   npm run preview   # mock host at http://127.0.0.1:4173/preview/
   ```
5. **Build loadable assets** — `npm run build` → `dist/widget.js` + `dist/widget.json`.
6. **Load into office** — point the LakeHouse host at the release assets (bundle + `widget.json`) or a local `dist/` path. Host checks `engines.lakehouse`, permissions, and checksums/attestations on releases.
7. Open a **draft PR**; Sen merges with a **merge commit**. Do not merge `Template-*` yourself.

### Safe to change

- `src/`, `preview/`, `widget.json` (metadata + schemas you own), docs prose, tests for your behavior

### Do not change (unless Sen asks)

- `.lakehouse/`, workflow pins, release/OIDC wiring, `stubs/widget-sdk/` shape beyond TODO replacement, org secrets/settings

## Cost and hosting

- **ZERO COST** on GitHub Free.
- Public repos use **GitHub-hosted runners only**.
- Never introduce paid GitHub features, third-party CI that requires billing, or self-hosted runners.

## Merge policy

- **Merge commits only** (no squash, no rebase-merge on GitHub).
- Prefer small **stacked PRs**, merged bottom-up. See [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

- `LICENSE` is a placeholder until the owner (Sen / `@zsenarchitect`) chooses.
- **Suggested default: Apache-2.0.** See `LICENSE` and `docs/license.md`.

## Never do

Agents and automation must **never**:

1. Change repository **visibility**, **settings**, **rulesets**, or **secrets**.
2. **Force-push** to any branch on any remote.
3. **Delete or rename** repositories, branches, or tags.
4. **Merge** into `Template-*` repositories or into the org `.github` repository.
5. **Vendor** the real `@lakehouse/widget-sdk` or other shared monorepo packages into this tree.
6. **Push to an unexpected remote** (see `npm run check:remote`).
7. **Hardcode the GitHub org slug** in workflows, docs, or badges (use `org.json`, `github.repository_owner`, brand, or custom domain).

## Required local checks

```bash
npm install
npm run hooks:install
npm run check:remote
npm run check:tier
npm run check:runners
npm run check:org-slug
npm run check:pins
npm run check:widget
npm run build
npm test
npm run readme:gen
npm run citation:gen
npm run readme:check
npm run check:all
```

## Widget contract

- Manifest: [`widget.json`](./widget.json) validated by [`widget.schema.json`](./widget.schema.json) (temporary — **TODO** use schema from published `@lakehouse/widget-sdk`).
- Canonical SDK: monorepo `packages/widget-sdk`. Until published, depend on `file:./stubs/widget-sdk` (placeholder version `0.0.0-placeholder.0`).
- Sandboxing model: iframe + postMessage (see `preview/`). Host enforces permissions.
- Guide: [docs/widget.md](./docs/widget.md).

## Discoverability & contributors

- [docs/discoverability.md](./docs/discoverability.md) — Sen sets description/topics.
- [CONTRIBUTING.md](./CONTRIBUTING.md), [GOVERNANCE.md](./GOVERNANCE.md), [docs/maintainer-playbook.md](./docs/maintainer-playbook.md).

## Changelog and releases

Every PR must add a **changeset** and/or update `CHANGELOG.md`, **or** carry `skip-changelog`.

Release tags (`vX.Y.Z`) are **CI-only**. Release assets include the **loadable widget bundle** + `widget.json` + checksums + provenance. See [docs/releasing.md](./docs/releasing.md).

## Ownership

- CODEOWNERS: `@zsenarchitect`
- Do not merge this template's PR yourself; the owner reviews draft PRs.
