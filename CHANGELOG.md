# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.4](https://github.com/juzt-dev/cursorhelp/compare/v1.0.3...v1.0.4) (2025-12-03)

### 🚀 Features

- **Add CLI tool for global installation** - New `cursorhelp` CLI command for global installations
- Add `cursorhelp update` command to setup Cursor configuration in any project
- Add `cursorhelp new --dir <directory>` command to create new projects with cursorhelp setup
- Add `cursorhelp help` command to display usage information

### 🐛 Bug Fixes

- **Fix global installation issue** - Commands now work when installed globally via `npm install -g cursorhelp`
- Fix postinstall script to gracefully handle global installations
- Improve project root detection for both local and global installations

### 🔧 Improvements

- Add `bin` field to package.json to register CLI command
- Enhanced postinstall script to detect and handle global vs local installations
- Better error messages when package cannot find project root

## [1.0.3](https://github.com/juzt-dev/cursorhelp/compare/v1.0.2...v1.0.3) (2025-12-03)

### 🐛 Bug Fixes

- **Fix postinstall script** - Improve error handling and logging for npm install method
- Fix commands not appearing after npm install by enhancing postinstall script verification
- Add debug mode (`CURSORHELP_DEBUG=1`) for troubleshooting installation issues
- Improve project root detection logic in postinstall script
- Add verification checks to ensure commands directory is properly copied

### 🔧 Improvements

- Enhanced error messages with actionable debugging steps
- Better logging to help diagnose installation issues
- Improved file copy error handling in postinstall script
- Add commands count verification after installation

### 📚 Documentation Updates

- Update MCP configuration documentation for Cursor manual setup
- Add comprehensive troubleshooting section for npm install method
- Update README with detailed debugging instructions
- Clarify MCP configuration is done in Cursor settings, not project files

## [1.0.2](https://github.com/juzt-dev/cursorhelp/compare/v1.0.1...v1.0.2) (2025-12-03)

### 🐛 Bug Fixes

- **Fix postinstall script** - Improve error handling and logging for npm install method
- Fix commands not appearing after npm install by enhancing postinstall script verification
- Add debug mode (`CURSORHELP_DEBUG=1`) for troubleshooting installation issues
- Improve project root detection logic in postinstall script
- Add verification checks to ensure commands directory is properly copied

### 🔧 Improvements

- Enhanced error messages with actionable debugging steps
- Better logging to help diagnose installation issues
- Improved file copy error handling in postinstall script
- Add commands count verification after installation

### 📚 Documentation Updates

- Update MCP configuration documentation for Cursor manual setup
- Add comprehensive troubleshooting section for npm install method
- Update README with detailed debugging instructions
- Clarify MCP configuration is done in Cursor settings, not project files

### 🎯 Cursor Compatibility

- **100% Cursor compatibility** - Remove all Open Code CLI references and dependencies
- Remove `.opencode/` directory and all related files
- Update all documentation to focus exclusively on Cursor IDE
- Clarify that Cursor includes Claude AI built-in - no API keys needed for core functionality
- Update CLAUDE.md to reflect Cursor environment instead of Claude Code CLI
- Update package.json to remove `.opencode/` from files array
- Update release scripts to exclude `.opencode/` from archives

**Note:** This release fixes the npm install method and makes cursorhelp fully compatible with Cursor IDE. All Open Code CLI support has been removed as it's not required for Cursor.

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
