# Claude Code Boilerplate

A comprehensive boilerplate template for building professional software projects with **Cursor** and **Claude Code**. This template provides a complete development environment with AI-powered agent orchestration, automated workflows, and intelligent project management.

## What is Claude Code?

**Claude Code** is Anthropic's official CLI tool that brings AI-powered development assistance directly to your terminal. It enables natural language interaction with your codebase and provides intelligent automation for common development tasks.

- [Claude Code](https://claude.com/product/claude-code)
- [Docs](https://docs.claude.com/en/docs/claude-code/overview)

## Related Projects & Directories

- `cursorhelp-cli` - CLI tool for quick project setup
  - Directory: `../cursorhelp-cli`
  - Repo: https://github.com/juzt-dev/cursorhelp-cli

## Key Benefits

### 🚀 Accelerated Development
- **AI-Powered Planning**: Automated technical planning and architecture design
- **Intelligent Code Generation**: Context-aware code creation and modification
- **Automated Testing**: Comprehensive test generation and execution
- **Smart Documentation**: Synchronized docs that evolve with your code

### 🎯 Enhanced Quality
- **Multi-Agent Code Review**: Specialized agents for security, performance, and standards
- **Automated Quality Assurance**: Continuous testing and validation
- **Best Practices Enforcement**: Built-in adherence to coding standards
- **Security-First Development**: Proactive security analysis and recommendations

### 🏗️ Structured Workflow
- **Agent Orchestration**: Coordinated AI agents working in parallel and sequential workflows
- **Task Management**: Automated project tracking and progress monitoring
- **Documentation Sync**: Always up-to-date technical documentation
- **Clean Git Workflow**: Professional commit messages and branch management

## Documentation

### 📚 Core Documentation
- **[Project Overview & PDR](./docs/project-overview-pdr.md)** - Comprehensive project overview, goals, features, and product development requirements
- **[Codebase Summary](./docs/codebase-summary.md)** - High-level overview of project structure, technologies, and components
- **[Code Standards](./docs/code-standards.md)** - Coding standards, naming conventions, and best practices
- **[System Architecture](./docs/system-architecture.md)** - Detailed architecture documentation, component interactions, and data flow
- **[Commands Reference](./guide/COMMANDS.md)** - Complete guide to all available slash commands

### 📖 Additional Resources
- **[CLAUDE.md](./CLAUDE.md)** - Development instructions and workflows for AI agents
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and release notes
- **[Windows Statusline Support](./docs/statusline-windows-support.md)** - Windows compatibility guide for Claude Code statusline
- **[Statusline Architecture](./docs/statusline-architecture.md)** - Technical documentation for statusline implementation

## Using this kit with Cursor

This repository is optimized to be used as a **Cursor-first Claude kit**:

- **Kept for Cursor core**
  - `CLAUDE.md`
  - `.claude/**` (agents, commands, skills, workflows, hooks, settings, metadata)
  - Core docs in `docs/` (overview, standards, architecture, roadmap, codebase summary)
- **Kept for CI/CD & tooling (not required inside app projects)**
  - `.github/**`, `scripts/**`, `tests/**`, `dist/**`

This kit is designed exclusively for Cursor and does not require or support Open Code CLI.

### Apply this kit to another project (Cursor)

#### Method 1: Using Cursorhelp CLI (Recommended)

```bash
npm install -g cursorhelp-cli

cd /path/to/your-project
cursorhelp update --kit default
```

This command will pull the kit from GitHub and sync:

- `.claude/**`
- `CLAUDE.md`

into your project so Cursor can use it immediately.

#### Method 2: Using npm install

You can also install the kit directly via npm:

```bash
cd /path/to/your-project
npm install cursorhelp
```

**Automatic Setup**: The package includes a `postinstall` script that automatically:
- Copies `.claude/**` from `node_modules/cursorhelp/` to your project root
- Copies `CLAUDE.md` to your project root
- Preserves existing files (won't overwrite your custom configurations)
- Merges new files into existing `.claude/` if it already exists

After installation, restart Cursor IDE to detect the commands.

**Note**: If the automatic copy doesn't work, you can manually copy:
- `CLAUDE.md` from `node_modules/cursorhelp/`
- `.claude/**` from `node_modules/cursorhelp/.claude/`

#### Method 3: Manual Copy

If you prefer a manual approach, you can copy:

- `CLAUDE.md`
- `.claude/**`
- (optional) selected files from `docs/` such as `code-standards.md`, `system-architecture.md`

## Quick Start

### Prerequisites
- **Cursor IDE** installed (Claude AI is integrated - no API keys needed for core functionality)
- Git for version control
- Node.js 18+ (or your preferred runtime)
- Operating Systems: macOS 10.15+, Ubuntu 20.04+/Debian 10+, or Windows 10+ (with WSL 1, WSL 2, or Git for Windows)
- Hardware: 4GB+ RAM

**Note:** Cursor includes Claude AI built-in, so you don't need to install or configure any API keys to get started. API keys are only required for optional features like Gemini skills (see below).

### Setup your new project with Cursorhelp

#### Option A: Using Cursorhelp CLI (Recommended)

1. **Install Cursorhelp CLI**:
   ```bash
   npm install -g cursorhelp-cli
   ```

2. **Create your new project with Cursorhelp framework**:
   ```bash
   cursorhelp new --dir my-project --kit default
   ```
   
   **Note:** If you want to use the kit with your existing project:
   ```bash
   cd /path/to/project
   cursorhelp update --kit default
   ```

#### Option B: Using npm install

1. **Navigate to your project**:
   ```bash
   cd /path/to/your-project
   ```

2. **Install cursorhelp package**:
   ```bash
   npm install cursorhelp
   ```
   
   The `postinstall` script will automatically copy `.claude/` and `CLAUDE.md` to your project root.

3. **Restart Cursor IDE** to detect the commands.

#### Start development

```bash
# Open your project in Cursor IDE
# Claude AI is already integrated - no setup needed!

# Now you can use these commands directly in Cursor:
/plan "implement user authentication"
/cook "add database integration"
```

**Troubleshooting**: If commands don't appear in Cursor:
1. Verify `.claude/commands/` exists in your project root
2. Restart Cursor IDE completely
3. Check that `CLAUDE.md` exists in project root
4. If using npm install, check `node_modules/cursorhelp/` exists and run `npm run postinstall` manually

📖 **Learn more:** Visit the [Cursorhelp repository](https://github.com/juzt-dev/cursorhelp) for documentation and examples.

## Project Structure

```
├── .claude/                 # Claude Code / Cursor configuration
│   ├── agents/             # Claude agents
│   ├── commands/           # Slash commands
│   ├── hooks/              # Hooks & helper scripts
│   ├── skills/             # Skills library
│   ├── CLAUDE.md           # Global development instructions
│   └── send-discord.sh     # Notification script
├── docs/                   # Project documentation
│   ├── codebase-summary.md # Auto-generated codebase overview
│   ├── code-standards.md   # Development standards
│   ├── project-overview-pdr.md # Product requirements
│   └── project-roadmap.md  # Project roadmap
├── .github/                # CI/CD workflows (GitHub Actions)
├── scripts/                # Release/build helper scripts
├── tests/                  # Internal tests for hooks/tools
├── CLAUDE.md               # Project-specific Claude instructions
└── README.md               # This file
```

## The AI Agent Team

This boilerplate includes specialized AI agents that work together to deliver high-quality software:

### 🎯 Core Development Agents

#### **Planner Agent**
- Researches technical approaches and best practices
- Creates comprehensive implementation plans
- Analyzes architectural trade-offs
- Spawns multiple researcher agents for parallel investigation

#### **Researcher Agent**
- Investigates specific technologies and frameworks
- Analyzes existing solutions and patterns
- Provides technical recommendations
- Supports the planner with detailed findings

#### **Tester Agent**
- Generates comprehensive test suites
- Validates functionality and performance
- Ensures cross-platform compatibility
- Reports on test coverage and quality metrics

### 🔍 Quality Assurance Agents

#### **Code Reviewer Agent**
- Performs automated code quality analysis
- Enforces coding standards and conventions
- Identifies security vulnerabilities
- Provides improvement recommendations

#### **Debugger Agent**
- Analyzes application logs and error reports
- Diagnoses performance bottlenecks
- Investigates CI/CD pipeline issues
- Provides root cause analysis

### 📚 Documentation & Management Agents

#### **Docs Manager Agent**
- Maintains synchronized technical documentation
- Updates API documentation automatically
- Ensures documentation accuracy
- Manages codebase summaries

#### **Git Manager Agent**
- Creates clean, conventional commit messages
- Manages branching and merge strategies
- Handles version control workflows
- Ensures professional git history

#### **Project Manager Agent**
- Tracks development progress and milestones
- Updates project roadmaps and timelines
- Manages task completion verification
- Maintains project health metrics

## Agent Orchestration Patterns

### Sequential Chaining
Use when tasks have dependencies:
```bash
# Planning → Implementation → Testing → Review
/plan "implement user dashboard"
# Wait for plan completion, then:
/cook "follow the implementation plan"
# After implementation:
/test "validate dashboard functionality"
# Finally:
/review "ensure code quality standards"
```

### Parallel Execution
Use for independent tasks:
```bash
# Multiple researchers exploring different approaches
planner agent spawns:
- researcher (database options)
- researcher (authentication methods)
- researcher (UI frameworks)
# All report back to planner simultaneously
```

### Context Management
- Agents communicate through file system reports
- Context is preserved between agent handoffs
- Fresh context prevents conversation degradation
- Essential information is documented in markdown

## Development Workflow

### 1. Feature Development
```bash
# Start with planning
/plan "add real-time notifications"

# Research phase (automatic)
# Multiple researcher agents investigate approaches

# Implementation
/cook "implement notification system"

# Quality assurance
/test
/review

# Documentation update
/docs

# Project tracking
/watzup  # Check project status
```

### 2. Bug Fixing
```bash
# Analyze the issue
/debug "investigate login failures"

# Create fix plan
/plan "resolve authentication bug"

# Implement solution
/fix "authentication issue"

# Validate fix
/test
```

### 3. Documentation Management
```bash
# Update documentation
/docs

# Generate codebase summary
repomix  # Creates ./docs/codebase-summary.md

# Review project status
/watzup
```

## Configuration Files

### CLAUDE.md
Project-specific instructions for Claude Code. Customize this file to define:
- Project architecture guidelines
- Development standards and conventions
- Agent coordination protocols
- Specific workflows for your project

### .claude/agents/*.md
Individual agent configurations defining:
- Agent expertise and responsibilities
- Interaction patterns
- Output formats
- Quality standards

### plans/templates/*.md
Reusable templates for:
- Feature implementation plans
- Bug fix procedures
- Refactoring strategies
- Architecture decisions

## Gemini Skills Configuration (Optional)

**Important:** These Gemini skills are **optional** and only needed if you want to use Gemini-powered features. Cursor works perfectly without them using the built-in Claude AI.

This project includes several optional Gemini-powered skills that require a Google Gemini API key (only if you want to use them):

- **gemini-audio** - Audio analysis and speech generation
- **gemini-video-understanding** - Video analysis and understanding
- **gemini-document-processing** - PDF document processing
- **gemini-image-gen** - AI image generation
- **gemini-vision** - Image analysis and vision capabilities

### API Key Setup

The Gemini skills check for `GEMINI_API_KEY` in the following order (priority from highest to lowest):

1. **Environment Variable** (Recommended for development)
   ```bash
   export GEMINI_API_KEY='your-api-key-here'
   ```

2. **Project Root `.env`** (Recommended for project-specific keys)
   ```bash
   # Create .env in project root
   echo 'GEMINI_API_KEY=your-api-key-here' > .env
   ```

3. **`.claude/.env`** (For Claude-specific configuration)
   ```bash
   # Copy example and edit
   cp .claude/.env.example .claude/.env
   # Then edit .claude/.env and set your API key
   ```

4. **`.claude/skills/.env`** (For shared skills configuration)
   ```bash
   # Copy example and edit
   cp .claude/skills/.env.example .claude/skills/.env
   # Then edit .claude/skills/.env and set your API key
   ```

5. **Individual Skill Directory `.env`** (For skill-specific keys)
   ```bash
   # Example for gemini-audio skill
   cp .claude/skills/gemini-audio/.env.example .claude/skills/gemini-audio/.env
   # Then edit and set your API key
   ```

### Getting Your API Key

Get your free Gemini API key at: https://aistudio.google.com/apikey

### Vertex AI Support

To use Vertex AI instead of Google AI Studio:

```bash
# Enable Vertex AI
export GEMINI_USE_VERTEX=true
export VERTEX_PROJECT_ID=your-gcp-project-id
export VERTEX_LOCATION=us-central1  # Optional, defaults to us-central1
```

Or in `.env` file:
```
GEMINI_USE_VERTEX=true
VERTEX_PROJECT_ID=your-gcp-project-id
VERTEX_LOCATION=us-central1
```

### Usage Examples

```bash
# Audio analysis
claude "Analyze this audio file and summarize the key points: audio.mp3"

# Video understanding
claude "Describe what happens in this video: video.mp4"

# Document processing
claude "Extract all tables from this PDF: document.pdf"

# Image generation
claude "Generate an image of a serene mountain landscape"

# Image analysis
claude "What objects are in this image: photo.jpg"
```

## Model Context Protocol (MCP)

✍️ Please read [my technical blog article about MCP here](https://faafospecialist.substack.com/p/claude-code-solution-to-use-mcp-servers).

### Configuration in Cursor

**Important**: With Cursor IDE, MCP servers are configured **manually in Cursor settings**, not in project files.

1. **Open Cursor Settings**:
   - Go to `Settings` → `Features` → `Model Context Protocol`
   - Or use `Cmd/Ctrl + ,` and search for "MCP"

2. **Add MCP Servers**:
   - Click "Add Server" or edit the MCP configuration
   - Use the format shown in `.claude/.mcp.json.example` as a reference
   - Copy the server configuration JSON into Cursor's MCP settings

3. **Reference File**:
   - `.claude/.mcp.json.example` is provided as a **reference only**
   - It shows the format and examples of common MCP servers
   - **Do not** copy this file to `.claude/.mcp.json` - Cursor uses its own settings

### Example MCP Server Configurations

Below are example configurations you can copy into Cursor's MCP settings:

### [Context7](https://github.com/upstash/context7)
```json
{
   "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
   }
}
```

### [Human MCP](https://github.com/mrgoonie/human-mcp/)

```json
{
   "human": {
      "command": "npx",
      "args": ["@goonnguyen/human-mcp@latest"],
      "env": { "GOOGLE_GEMINI_API_KEY": "YOUR_API_KEY" }
   }
}
```

### [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp)
```json
{
   "chrome-devtools": {
      "command": "npx",
      "args": ["-y", "chrome-devtools-mcp@latest"]
   }
}
```

**Note**: These are individual server configurations. In Cursor settings, you'll add them under the `mcpServers` object. See `.claude/.mcp.json.example` for the complete format.

## Best Practices

### Development Principles
- **YANGI**: You Aren't Gonna Need It - avoid over-engineering
- **KISS**: Keep It Simple, Stupid - prefer simple solutions
- **DRY**: Don't Repeat Yourself - eliminate code duplication

### Code Quality
- All code changes go through automated review
- Comprehensive testing is mandatory
- Security considerations are built-in
- Performance optimization is continuous

### Documentation
- Documentation evolves with code changes
- API docs are automatically updated
- Architecture decisions are recorded
- Codebase summaries are regularly refreshed

### Git Workflow
- Clean, conventional commit messages
- Professional git history
- No AI attribution in commits
- Focused, atomic commits

## Usage Examples

### Starting a New Feature
```bash
# Research and plan
claude "I need to implement user authentication with OAuth2"
# Planner agent creates comprehensive plan

# Follow the plan
claude "Implement the authentication plan"
# Implementation follows the detailed plan

# Ensure quality
claude "Review and test the authentication system"
# Testing and code review agents validate the implementation
```

### Debugging Issues
```bash
# Investigate problem
claude "Debug the slow database queries"
# Debugger agent analyzes logs and performance

# Create solution
claude "Optimize the identified query performance issues"
# Implementation follows debugging recommendations

# Validate fix
claude "Test query performance improvements"
# Tester agent validates the optimization
```

### Project Maintenance
```bash
# Check project health
claude "What's the current project status?"
# Project manager provides comprehensive status

# Update documentation
claude "Sync documentation with recent changes"
# Docs manager updates all relevant documentation

# Plan next sprint
claude "Plan the next development phase"
# Planner creates detailed roadmap for upcoming work
```

## Advanced Features

### Multi-Project Support
- Manage multiple repositories simultaneously
- Shared agent configurations across projects
- Consistent development patterns

### Custom Agent Creation
- Define project-specific agents
- Extend existing agent capabilities
- Create domain-specific expertise

### Integration Capabilities
- Discord notifications for project updates
- GitHub Actions integration
- CI/CD pipeline enhancement

## Customization Guide

### 1. Project Setup
- Update `CLAUDE.md` with your project specifics
- Modify agent configurations in `.claude/agents/`
- Customize plan templates in `plans/templates/`

### 2. Agent Specialization
- Add domain-specific knowledge to agents
- Create custom agents for unique requirements
- Configure agent interaction patterns

### 3. Workflow Optimization
- Define project-specific commands
- Create shortcuts for common tasks
- Establish team coding standards

## Contributing

This is an internal project. For contributions, please contact the maintainer.

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Follow the agent orchestration workflow
3. Ensure all tests pass and documentation is updated
4. Create a Pull Request

## License

This project is licensed under a Proprietary License - see the [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Peter Ho (juzt-dev). All rights reserved.

## Learn More

### Claude Code Resources
- [Claude Code Documentation](https://claude.ai/code)
- [Cursor Documentation](https://cursor.sh/docs)

### Community
- [Claude Code Community](https://discord.gg/claude-code)
- [Discussion Forum](https://github.com/anthropic/claude-code/discussions)
- [Example Projects](https://github.com/topics/claude-code)

### Support
- [Issue Tracker](https://github.com/anthropic/claude-code/issues)
- [Feature Requests](https://github.com/anthropic/claude-code/discussions/categories/ideas)
- [Documentation](https://docs.claude.ai/code)

---

**Start building with AI-powered development today!** This boilerplate provides everything you need to create professional software with intelligent agent assistance.