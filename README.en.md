[简体中文](README.md) | [English](README.en.md)

# yihang-design-pilot

An open-source collection of **professional AI Design Skills** ([MIT License](LICENSE)).

Built for AI **Agent Hosts** such as **Cursor**, **Claude Code**, and **Codex**, this repository ships standalone design Skills and composable end-to-end workflows. The goal is to help agents follow a real design process—not to emit generic advice.

> **This project is not** an Agent Runtime, multi-agent orchestrator, standalone design engine, SaaS product, account system, or cloud design platform.  
> **Its value** is professional methodology, verifiable Skill quality, workflow orchestration, deterministic helper scripts, and maintainable knowledge assets.

## Contents

- [Positioning](#positioning)
- [Capabilities](#capabilities)
- [Supported Agent Hosts](#supported-agent-hosts)
- [Current Skills](#current-skills)
- [Installation](#installation)
- [Usage](#usage)
- [Repository Layout](#repository-layout)
- [Project Status](#project-status)
- [Contributing](#contributing)
- [Documentation Languages](#documentation-languages)
- [License](#license)

---

## Positioning

| Problem | How this project responds |
|---|---|
| Agent design output is vague and hard to hand off | Skills define inputs, methods, steps, deliverables, and quality checks |
| You want a full marketing-site flow without a monolith | Standalone Skills for one step; a Workflow Skill for orchestration |
| Fear of “yet another agent framework” | Skills-first: Skills, scripts, and docs only—no Runtime |

Why Skills:

1. Discoverable across hosts without locking to one vendor product.  
2. Clear ownership boundaries for open-source collaboration and validation.  
3. Methodology lives in the Skill so outcomes are reviewable and testable.

---

## Capabilities

| Capability | Description |
|---|---|
| **Standalone Skills** | One professional step with a sharp boundary—e.g. Design Brief, Information Architecture, Visual Direction, Design System |
| **Workflow Skill** | Stages multiple Skills with confirmation gates and honest `planned` dependencies |
| **Professional methodology** | Fact vs hypothesis labeling, task-first IA, semantic Design Tokens, and more |
| **Deterministic helpers** | Install/uninstall scripts, Skill Validator, automated tests—**not** a design engine |

---

## Supported Agent Hosts

| Host | Official Skills docs | Isolated install test | Runtime verification |
|---|---|---|---|
| **Cursor** | Checked against official docs | **PASS** (layout + overwrite protection) | **PARTIAL**: Agent can follow a Skill; UI auto-discovery not fully proven in a separate GUI session |
| **Claude Code** | Checked against official docs | **PASS** (layout) | **BLOCKED**: `claude` CLI not installed on the verification machine |
| **Codex** | Checked against official docs | **PASS** (layout) | **BLOCKED**: `codex` CLI not installed on the verification machine |

See [`docs/HOST_COMPATIBILITY_REPORT.md`](docs/HOST_COMPATIBILITY_REPORT.md) and [`docs/AGENT_COMPATIBILITY.md`](docs/AGENT_COMPATIBILITY.md).

Do **not** read the table as “production-ready on all three hosts.” Install layout is tested; runtime status is what the report says.

---

## Current Skills

Authoritative source: `skills/`. Status must match each Skill / Workflow `SKILL.md`.

### Web Design

| Skill | Description | Status |
|---|---|---|
| `web-design-brief` | Business goals and design requirements → `design-output/01-design-brief.md` | **Available** |
| `web-information-architecture` | Sitemap, navigation, and user paths → `02-information-architecture.md` | **Available** |
| `web-visual-direction` | Visual direction exploration and selection | **Available** |
| `web-design-system` | Design Tokens, components, and implementation rules → `03-design-system.md` + `design-tokens.json` | **Available** |
| `web-page-design` | Page-level structure, layout, interaction, and content specs → `04-page-design/` | **Available** |
| `web-responsive-design` | Cross-viewport layout, navigation, components, and validation → `05-responsive-design/` | **Available** |
| `web-design-review` | Evidence-driven design review and remediation gate → `06-design-review/` | **Available** |
| `web-design-workflow` | Orchestrates Brief → … → Page → Responsive → Design Review | **Available** |

### Planned (no empty Skill directories)

No new Planned empty shells for Web atomic Skills. Future Web Implementation / Visual Verification must ship before being marked Available.

Brand and Presentation domains are planning placeholders only—**no** Available Skills yet.

End-to-end sample: [`examples/web/online-education-site/`](examples/web/online-education-site/).

---

## Installation

### Requirements

- Node.js **22+** (for development and `pnpm verify`)  
- [pnpm](https://pnpm.io/) **9+** (see `packageManager`)  
- Host install: **PowerShell** (`install.ps1`) is verified on Windows; Bash scripts mirror the layout and are **not** host-runtime-verified on the Windows verification machine

### Clone

```bash
git clone <your-fork-or-upstream-url>/yihang-design-pilot.git
cd yihang-design-pilot
```

Optional (contribute / validate):

```bash
pnpm install
pnpm verify
```

### Conventions

- **`skills/` is the single source of truth.** Do not maintain parallel content trees.  
- Install scripts only copy into host discovery directories.  
- Default target is an isolated fixture—**not** `~/.cursor/skills` (unless you pass `-TargetRoot`).  
- Existing destinations are **refused** by default; PowerShell `-ForceBackup` backs up then replaces.

### Recommended: isolated fixture install (verified)

```powershell
pwsh -File scripts/install/install.ps1 -HostName all
```

Preview only:

```powershell
pwsh -File scripts/install/install.ps1 -HostName cursor -WhatIf
```

### Install a single Skill (verified parameters)

```powershell
pwsh -File scripts/install/install.ps1 -HostName cursor -Skill web-design-brief
```

Filter by domain:

```powershell
pwsh -File scripts/install/install.ps1 -HostName cursor -Domain web
```

### Project-level install for a host (verified; paths gitignored)

```powershell
pwsh -File scripts/install/install.ps1 -HostName cursor -ProjectInstall
pwsh -File scripts/install/install.ps1 -HostName claude -ProjectInstall
pwsh -File scripts/install/install.ps1 -HostName codex -ProjectInstall
```

### Install all Available Skills into fixtures

```powershell
pwsh -File scripts/install/install.ps1 -HostName all
```

### Bash (Linux / macOS; layout mirrored, host runtime not verified here)

```bash
bash scripts/install/install.sh cursor
bash scripts/install/install.sh all
```

### Manual install (paths checked against official docs; self-test on your host)

Copy the leaf folder (with `SKILL.md`) into the host discovery root. Example for `web-design-brief`:

| Host | Example path |
|---|---|
| Cursor | `.cursor/skills/web/web-design-brief/` (nested OK) or `.cursor/skills/web-design-brief/` |
| Claude Code | `.claude/skills/web-design-brief/` (flat) |
| Codex | `.agents/skills/web-design-brief/` (flat) |

### Update

1. `git pull` in the source repo.  
2. Re-run the install script.  
3. If the target exists and must be replaced: add `-ForceBackup` on PowerShell.

### Uninstall

Removes only directories marked with `.ydp-installed.json`:

```powershell
pwsh -File scripts/install/uninstall.ps1 -TargetRoot .cursor/skills
```

Fixture example:

```powershell
pwsh -File scripts/install/uninstall.ps1 -TargetRoot tests/fixtures/host-compatibility/cursor-project/.cursor/skills
```

### Verify installation

1. Confirm `SKILL.md` exists at the destination.  
2. Run `pnpm validate:skills` in this repo.  
3. In the host, explicitly ask to use a Skill (e.g. “Use the `web-design-brief` Skill …”).

More detail: [`scripts/install/README.md`](scripts/install/README.md).

---

## Usage

Example: greenfield marketing site. Follow each Skill’s `SKILL.md`. A full sample lives at `examples/web/online-education-site/`.

### Recommended sequence

```text
Raw project materials
    → web-design-brief                 → design-output/01-design-brief.md
    → web-information-architecture     → design-output/02-information-architecture.md
    → web-visual-direction (∥ IA OK)   → visual-directions.md → then visual-direction.md + direction-approved.md
    → web-design-system                → design-output/03-design-system.md + design-tokens.json
    → web-page-design                  → design-output/04-page-design/<page-id>/page-design.md
    → web-responsive-design            → design-output/05-responsive-design/<page-id>/responsive-design.md
    → web-design-review               → design-output/06-design-review/<page-id>/design-review.md
```

You may also invoke `web-design-workflow`; the agent should **Read** each stage `SKILL.md` (this repo does not ship a multi-agent Runtime).

### Example prompts (conceptual)

1. **Design Brief** — “Use `web-design-brief` to turn my product notes into a Design Brief; label facts vs hypotheses.” → `01-design-brief.md`  
2. **Information Architecture** — “Use `web-information-architecture` on the Brief for Sitemap, navigation, and primary paths.” → `02-information-architecture.md`  
3. **Visual Direction** — “Use `web-visual-direction` for three meaningfully different directions; do not finalize a full Design System before approval.” → explore, then `direction-approved.md`  
4. **Design System** — “Use `web-design-system` with Brief, IA, and the approved direction.” → `03-design-system.md` + valid `design-tokens.json`  
5. **Page Design** — “Use `web-page-design` for Home (and course detail / pricing strategy pages); differentiate page types; inherit tokens; do not invent prices or reviews.” → `04-page-design/<page-id>/page-design.md`  
6. **Responsive Design** — “Use `web-responsive-design` on page-design + tokens for breakpoint rationale, layout transforms, and mobile nav; mark NOT TESTED if browsers were not run.” → `05-responsive-design/<page-id>/responsive-design.md`  
7. **Design Review** — “Use `web-design-review` for a nine-dimension evidence review; do not mark Visual PASS without screenshots; include severity and remediation.” → `06-design-review/<page-id>/design-review.md`

### Output convention

Prefer writing into the **user project** `design-output/` folder. Do not commit client deliverables into this Skills repository (`examples/` holds fixed samples only).

---

## Repository Layout

```text
skills/           # Authoritative Skills source (by domain)
scripts/install/  # Install / uninstall
scripts/common/   # Skill Validator and shared tooling
templates/        # Skill / Workflow authoring templates
knowledge/        # Knowledge conventions (styles not fully migrated)
examples/         # End-to-end samples (e.g. online-education-site)
tests/            # Automated tests and install fixture notes
docs/             # Guides, audits, compatibility, decision log
```

---

## Project Status

| Phase | Status |
|---|---|
| P1 Skills-first scaffolding | Done |
| P1.5 MIT, installers, host compatibility report | Done |
| P2.0 First Web Design batch (Brief / IA / Design System) | Done |
| P2.1 `web-page-design` and workflow integration | Done |
| P2.2 `web-responsive-design` and workflow integration | Done |
| P2.3 `web-design-review` and workflow integration | Done |

Next: optional implementation / visual verification capabilities and more host runtime evidence. See [`docs/ROADMAP.md`](docs/ROADMAP.md).

---

## Contributing

1. Read [`CONTRIBUTING.md`](CONTRIBUTING.md) (includes **Git commit conventions**).  
2. Before authoring Skills, read [`docs/SKILL_AUTHORING_GUIDE.md`](docs/SKILL_AUTHORING_GUIDE.md) and [`docs/WORKFLOW_AUTHORING_GUIDE.md`](docs/WORKFLOW_AUTHORING_GUIDE.md).  
3. Locally:

```bash
pnpm install
pnpm verify
```

4. Use Issues for bugs/ideas and PRs for changes.  
5. New Skills: directory name = frontmatter `name`; mark unimplemented dependencies **planned**; no empty shells.  
6. Follow [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md).

Out of scope: Agent Runtimes, SaaS, billing, and assets without clear licenses.

---

## Documentation Languages

- [`README.md`](README.md) — Simplified Chinese (primary)  
- [`README.en.md`](README.en.md) — English  

These are **two complete editions of the same project documentation**. When you add features, change install steps, update compatibility, or edit the Skill list, **update both files** so they do not drift.

---

## License

[MIT](LICENSE) © 2026 yihang-design-pilot contributors.

Third-party constraints: [`docs/THIRD_PARTY_LICENSES.md`](docs/THIRD_PARTY_LICENSES.md) and [`NOTICE`](NOTICE).  
**MIT does not** authorize redistributing third-party assets whose licenses remain unconfirmed.
