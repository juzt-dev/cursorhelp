# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.2](https://github.com/juzt-dev/cursorhelp/compare/v1.0.1...v1.0.2) (2025-12-03)

### 🎯 Cursor Compatibility

- **100% Cursor compatibility** - Remove all Open Code CLI references and dependencies
- Remove `.opencode/` directory and all related files
- Update all documentation to focus exclusively on Cursor IDE
- Clarify that Cursor includes Claude AI built-in - no API keys needed for core functionality
- Update CLAUDE.md to reflect Cursor environment instead of Claude Code CLI
- Update package.json to remove `.opencode/` from files array
- Update release scripts to exclude `.opencode/` from archives

### 📚 Documentation Updates

- Update README.md to clarify Cursor integration and optional API keys
- Update all docs files (project-overview-pdr.md, project-roadmap.md, codebase-summary.md, system-architecture.md, code-standards.md) to remove Open Code references
- Update guide/COMMANDS.md to remove Open Code references
- Clarify that Gemini skills are optional and only require API keys if used
- Update CLAUDE.md description to reference Cursor IDE instead of Claude Code CLI

### 🔧 Configuration Updates

- Update `.claude/metadata.json` description
- Update `scripts/prepare-release-assets.cjs` to exclude `.opencode/`

**Note:** This release makes cursorhelp fully compatible with Cursor IDE. All Open Code CLI support has been removed as it's not required for Cursor.

## [1.0.1](https://github.com/juzt-dev/cursorhelp/compare/v1.0.0...v1.0.1) (2025-12-02)

### 🔄 Rebranding

- Rebrand from ClaudeKit Engineer to Cursorhelp
- Update repository to juzt-dev/cursorhelp
- Change license to Proprietary
- Update author information to Peter Ho (juzt-dev)

## Types of Changes

- 🚀 **Features** - New features
- 🐛 **Bug Fixes** - Bug fixes
- 📚 **Documentation** - Documentation changes
- 💄 **Styles** - Code style changes
- ♻️ **Code Refactoring** - Code refactoring
- ⚡ **Performance Improvements** - Performance improvements
- ✅ **Tests** - Test additions/changes
- 🏗️ **Build System** - Build system changes
- 👷 **CI** - CI configuration changes
- 🎯 **Cursor Compatibility** - Cursor IDE compatibility improvements

## How to Contribute

Please use [Conventional Commits](https://conventionalcommits.org/) format for your commit messages:

- `feat: add new feature` - for new features
- `fix: resolve bug in authentication` - for bug fixes
- `docs: update README with new examples` - for documentation
- `refactor: simplify user service logic` - for refactoring
- `test: add unit tests for user service` - for tests
- `ci: update GitHub Actions workflow` - for CI changes

---

_Releases and changelogs are automatically generated when changes are pushed to the main branch._
