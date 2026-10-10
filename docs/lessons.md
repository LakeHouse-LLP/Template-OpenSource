# Lessons log

Short dated entries from agent and maintainer work. Any lesson that comes up repeatedly gets **promoted** to a house rule (AGENTS.md), a script under `scripts/`, or a CI check.

Status values: `open` | `fixed` | `promoted`.

## Format

```markdown
### YYYY-MM-DD - short title

- **Lesson:** what hurt or surprised us
- **Action:** what to do next (or what we already did)
- **Status:** open | fixed | promoted
```

## Entries

### 2026-10-09 - brand docs and org slug lint

- **Lesson:** Pointing at the org brand kit with a hardcoded owner login fails `check:org-slug`. Use `{owner}/.github/brand` (or `org.json` / `github.repository_owner`) in prose.
- **Action:** Rewrote brand/docs pointers to `{owner}`; kept slug only in allowlisted identity files.
- **Status:** promoted

### 2026-10-09 - writing-style ban list in prose

- **Lesson:** Listing banned hype words in AGENTS/CONTRIBUTING triggers `check:writing-style` on those same files.
- **Action:** Point readers at `scripts/check-writing-style.mjs` instead of repeating the word list in prose.
- **Status:** fixed
