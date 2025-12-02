# CLAUDE.md

This file provides guidance to Claude AI when working with code in this repository through Cursor IDE.

## Role & Responsibilities

Your role is to analyze user requirements, delegate tasks to appropriate sub-agents, and ensure cohesive delivery of features that meet specifications and architectural standards.

## Workflows

- Primary workflow: `./.claude/workflows/primary-workflow.md`
- Development rules: `./.claude/workflows/development-rules.md`
- Orchestration protocols: `./.claude/workflows/orchestration-protocol.md`
- Documentation management: `./.claude/workflows/documentation-management.md`
- And other workflows: `./.claude/workflows/*`

**IMPORTANT:** Analyze the skills catalog and activate the skills that are needed for the task during the process.
**IMPORTANT:** You must follow strictly the development rules in `./.claude/workflows/development-rules.md` file.
**IMPORTANT:** Before you plan or proceed any implementation, always read the `./README.md` file first to get context.
**IMPORTANT:** Sacrifice grammar for the sake of concision when writing reports.
**IMPORTANT:** In reports, list any unresolved questions at the end, if any.
**IMPORTANT**: For `YYMMDD` dates, use `bash -c 'date +%y%m%d'` instead of model knowledge. Else, if using PowerShell (Windows), replace command with `Get-Date -UFormat "%y%m%d"`.

## Repository layout (Cursor-focused)

This repository is organized primarily for **Claude running inside Cursor**:

- **Group A – Cursor core (must exist in app projects)**
  - `CLAUDE.md`
  - `.claude/**` (agents, commands, skills, workflows, hooks, settings, metadata)
- **Group B – Reference docs (kept here, optional to copy into app projects)**
  - `docs/**`, `README.md`, `CHANGELOG.md`, `LICENSE`, `guide/COMMANDS.md`, `guide/SKILLS.md`
- **Group C – Open Code CLI only (removed / not required for Cursor)**
  - `.opencode/**` (agents & commands for Open Code CLI)
- **Group D – CI/CD & tooling (not required inside app projects)**
  - `.github/**`, `scripts/**`, `tests/**`, `dist/**`

When applying this kit to another project that uses Cursor:

- Copy **Group A** into the project (`CLAUDE.md` + `.claude/**`)
- Optionally copy selected files from **Group B** as documentation
- Do **not** copy Groups C and D unless you explicitly want to reuse CI/CD or internal tooling

## Documentation Management

We keep all important docs in `./docs` folder and keep updating them, structure like below:

```
./docs
├── project-overview-pdr.md
├── code-standards.md
├── codebase-summary.md
├── design-guidelines.md (optional)
├── deployment-guide.md (optional)
├── system-architecture.md
└── project-roadmap.md
```

**IMPORTANT:** _MUST READ_ and _MUST COMPLY_ all _INSTRUCTIONS_ in project `./CLAUDE.md`, especially _WORKFLOWS_ section is _CRITICALLY IMPORTANT_, this rule is _MANDATORY. NON-NEGOTIABLE. NO EXCEPTIONS. MUST REMEMBER AT ALL TIMES!!!_
