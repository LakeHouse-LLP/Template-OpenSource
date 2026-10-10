# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial **Template-OpenSource** scaffold (CI, OpenSSF Scorecard, CodeQL, DCO, gitleaks, README autogen, tier and runner guards). General-purpose OSS starter — no LakeHouse widget concepts.
- `.lakehouse/org.json` identity (orgName / brand / packageScope / domain) and `.lakehouse/pins.json` action + reusable-workflow catalog.
- Org-slug lint (`check:org-slug`), action-pin check (`check:pins`), and CITATION.cff generation from org.json.
- `docs/org.md` pointing at the organization `.github` runbook.
- Flagship release system: changesets, CI-only `vX.Y.Z` tags, draft GitHub Releases with SHA256 checksums and `attest-build-provenance`, npm OIDC trusted publishing, release-notes template, `.github/release.yml`, `docs/media/` convention, pre-release checklist, and rollback/yank docs.
- SEO / discoverability: dark-only `brand/` (accent `#7DFFFF`), social preview, keyword-rich README, `CITATION.cff`, docs for org Astro Starlight site, launch/awesome/search checklists, and `check:discoverability` CI (GitHub-hosted).
- Contributor growth: friendly CONTRIBUTING + Codespaces, ROADMAP/GOVERNANCE/SUPPORT, good first issue seeding guide, listings guide, maintainer playbook, all-contributors, and SHA-pinned welcome workflow (no PR checkout).
- Vercel env-var rule pointer (`docs/deploy/vercel-env.md`) + AGENTS Never-do; canonical detail in org `.github`.
- Merge queue preference for public `main`: `merge_group` on required workflows; CONTRIBUTING / AGENTS / Sen-only ruleset checklist (merge commits only).
- Brand kit v0.3 subset: `brand/readme-header` README `<picture>`, palette base `#1E1E1E` / accent `#7DFFFF` / Geist, docs-site theme notes, WRITING-STYLE rules in AGENTS/CONTRIBUTING, and `check:writing-style` CI.
- Continuous self-improvement: AGENTS house rule, [`docs/lessons.md`](./docs/lessons.md) log, and **What did we learn?** on the PR template.
- Welcome workflow: `first-interaction` v3 snake_case inputs (`issue_message` / `pr_message` / `repo_token`).

### Fixed

- Remote URL parsing avoids host substring checks (CodeQL).
- Lychee config uses `include_mail = false` (CLI no longer accepts `--exclude-mail`).
- Dependency-review Action deferred until the owner enables Dependency graph (agents do not change settings).
- Guards, README AUTO badges, and citations no longer hardcode the GitHub org slug (brand + custom domain instead).
- `org.json` domain is `REPLACE_WITH_CUSTOM_DOMAIN` (no assumed hostname); brand set to `LakeHouse`.
- Changeset status on PRs compares against the PR base ref so stacked PRs validate.

[Unreleased]: https://github.com/LakeHouse-LLP/Template-OpenSource/compare/HEAD...HEAD
