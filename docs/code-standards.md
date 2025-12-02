# Code Standards & Codebase Structure

**Last Updated**: 2025-12-02
**Version**: 1.0.2
**Applies To**: All code within Cursorhelp project
**IDE**: Optimized for Cursor IDE with Claude AI integration

## Overview

This document defines coding standards, file organization patterns, naming conventions, and best practices for Cursorhelp. All code must adhere to these standards to ensure consistency, maintainability, and quality. This document is specifically optimized for development with **Cursor IDE** and its built-in Claude AI capabilities.

## Core Development Principles

### YANGI (You Aren't Gonna Need It)

- Avoid over-engineering and premature optimization
- Implement features only when needed
- Don't build infrastructure for hypothetical future requirements
- Start simple, refactor when necessary

### KISS (Keep It Simple, Stupid)

- Prefer simple, straightforward solutions
- Avoid unnecessary complexity
- Write code that's easy to understand and modify
- Choose clarity over cleverness

### DRY (Don't Repeat Yourself)

- Eliminate code duplication
- Extract common logic into reusable functions/modules
- Use composition and abstraction appropriately
- Maintain single source of truth

## File Organization Standards

### Directory Structure

```
project-root/
├── .claude/                    # Claude Code configuration
│   ├── agents/                # Agent definitions (*.md)
│   ├── commands/              # Slash commands (*.md)
│   │   ├── [category]/       # Nested command categories
│   │   └── [command].md      # Individual commands
│   ├── hooks/                # Git hooks and scripts
│   ├── skills/               # Reusable knowledge modules
│   │   └── [skill-name]/     # Individual skill directories
│   │       ├── SKILL.md      # Skill definition
│   │       └── references/   # Supporting materials
│   └── workflows/            # Workflow definitions
├── .github/                   # GitHub-specific files
│   └── workflows/            # CI/CD workflows
├── docs/                      # Project documentation
│   ├── research/             # Research reports
│   └── *.md                  # Core documentation files
├── guide/                     # User guides
├── plans/                     # Implementation plans
│   ├── reports/              # Agent communication reports
│   └── templates/            # Plan templates
├── src/                       # Source code (if applicable)
├── tests/                     # Test suites (if applicable)
├── .gitignore                # Git ignore patterns
├── CLAUDE.md                 # Claude-specific instructions
├── README.md                 # Project overview
├── package.json              # Node.js dependencies
└── LICENSE                   # License file
```

### File Naming Conventions

**Agent Definitions** (`.claude/agents/`):

- Format: `[agent-name].md`
- Use kebab-case: `code-reviewer.md`, `docs-manager.md`
- Descriptive, role-based names
- Examples: `planner.md`, `tester.md`, `git-manager.md`

**Commands** (`.claude/commands/`):

- Format: `[command-name].md` or `[category]/[command-name].md`
- Use kebab-case for names
- Group related commands in subdirectories
- Examples:
  - `plan.md`
  - `fix/ci.md`
  - `design/screenshot.md`
  - `git/cm.md`

**Skills** (`.claude/skills/`):

- Format: `[skill-name]/SKILL.md`
- Use kebab-case for directory names
- Main file always named `SKILL.md`
- Supporting files in `references/` or `scripts/`
- Examples:
  - `better-auth/SKILL.md`
  - `cloudflare-workers/SKILL.md`
  - `mongodb/SKILL.md`

**Documentation** (`docs/`):

- Format: `[document-purpose].md`
- Use kebab-case with descriptive names
- Examples:
  - `project-overview-pdr.md`
  - `codebase-summary.md`
  - `code-standards.md`
  - `system-architecture.md`

**Reports** (`plans/<plan-name>/reports/`):

- Format: `YYMMDD-from-[agent]-to-[agent]-[task]-report.md`
- Use date prefix for chronological sorting
- Clear source and destination agents
- Examples:
  - `251026-from-planner-to-main-auth-implementation-report.md`
  - `251026-from-tester-to-debugger-test-failures-report.md`

**Plans** (`plans/`):

- Format: `YYMMDD-[feature-name]-plan.md`
- Use date prefix for version tracking
- Descriptive feature names in kebab-case
- Examples:
  - `251026-user-authentication-plan.md`
  - `251026-database-migration-plan.md`

**Research Reports** (`plans/<plan-name>/research/`):

- Format: `YYMMDD-[research-topic].md`
- Date prefix for tracking
- Clear topic description
- Examples:
  - `251026-oauth2-implementation-strategies.md`
  - `251026-performance-optimization-techniques.md`

## File Size Management

### Hard Limits (Cursor-Optimized)

- **Maximum file size**: 200 lines of code (optimal for Cursor's context management)
- Files exceeding 200 lines MUST be refactored
- Exception: Auto-generated files (with clear marking)
- **Rationale**: Smaller files improve Cursor's AI understanding, code completion accuracy, and context window efficiency

### Refactoring Strategies

**When file exceeds 500 lines**:

1. **Extract Utility Functions**: Move to separate `utils/` directory
2. **Component Splitting**: Break into smaller, focused components
3. **Service Classes**: Extract business logic to dedicated services
4. **Module Organization**: Group related functionality into modules

**Example Refactoring**:

```
Before:
user-service.js (750 lines)

After:
services/
├── user-service.js (150 lines)      # Core service
├── user-validation.js (120 lines)   # Validation logic
└── user-repository.js (130 lines)   # Database operations
utils/
└── password-hasher.js (80 lines)    # Utility functions
```

**Cursor-Specific Benefits**:

- Better AI code completion accuracy
- Faster context loading in chat
- More precise code references
- Improved multi-file editing experience

## Naming Conventions

### Variables & Functions

**JavaScript/TypeScript**:

- **Variables**: camelCase

  ```javascript
  const userName = "John Doe";
  const isAuthenticated = true;
  ```

- **Functions**: camelCase

  ```javascript
  function calculateTotal(items) {}
  const getUserById = (id) => {};
  ```

- **Classes**: PascalCase

  ```javascript
  class UserService {}
  class AuthenticationManager {}
  ```

- **Constants**: UPPER_SNAKE_CASE

  ```javascript
  const MAX_RETRY_COUNT = 3;
  const API_BASE_URL = "https://api.example.com";
  ```

- **Private Members**: Prefix with underscore
  ```javascript
  class Database {
    _connectionPool = null;
    _connect() {}
  }
  ```

### Files & Directories

**Source Files**:

- **JavaScript/TypeScript**: kebab-case

  ```
  user-service.js
  authentication-manager.ts
  api-client.js
  ```

- **React Components**: PascalCase

  ```
  UserProfile.jsx
  AuthenticationForm.tsx
  NavigationBar.jsx
  ```

- **Test Files**: Match source file name + `.test` or `.spec`
  ```
  user-service.test.js
  authentication-manager.spec.ts
  ```

**Directories**: kebab-case

```
src/
├── components/
├── services/
├── utils/
├── api-clients/
└── test-helpers/
```

### API Design

**REST Endpoints**:

- Use kebab-case for URLs
- Plural nouns for collections
- Resource IDs in path parameters

```
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
GET    /api/users/:userId/posts
```

**Request/Response Fields**:

- Use camelCase for JSON properties

```json
{
  "userId": 123,
  "userName": "john_doe",
  "emailAddress": "john@example.com",
  "isVerified": true,
  "createdAt": "2025-10-26T00:00:00Z"
}
```

## Code Style Guidelines

### General Formatting

**Indentation**:

- Use 2 spaces (not tabs)
- Consistent indentation throughout file
- No trailing whitespace

**Line Length**:

- Preferred: 80-100 characters
- Hard limit: 120 characters
- Break long lines logically

**Whitespace**:

- One blank line between functions/methods
- Two blank lines between classes
- Space after keywords: `if (`, `for (`, `while (`
- No space before function parentheses: `function name(`

### Comments & Documentation

**File Headers** (Optional but recommended):

```javascript
/**
 * User Service
 *
 * Handles user authentication, registration, and profile management.
 *
 * @module services/user-service
 * @author Cursorhelp
 * @version 1.0.0
 */
```

**Function Documentation**:

```javascript
/**
 * Authenticates a user with email and password
 *
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<User>} Authenticated user object
 * @throws {AuthenticationError} If credentials are invalid
 */
async function authenticateUser(email, password) {
  // Implementation
}
```

**Inline Comments**:

- Explain WHY, not WHAT
- Complex logic requires explanation
- TODO comments include assignee and date

```javascript
// TODO(john, 2025-10-26): Optimize this query for large datasets
const users = await db.query("SELECT * FROM users");

// Cache miss - fetch from database
const user = await fetchUserFromDB(userId);
```

### Error Handling

**Always Use Try-Catch**:

```javascript
async function processPayment(orderId) {
  try {
    const order = await getOrder(orderId);
    const payment = await chargeCard(order.total);
    await updateOrderStatus(orderId, "paid");
    return payment;
  } catch (error) {
    logger.error("Payment processing failed", { orderId, error });
    throw new PaymentError("Failed to process payment", { cause: error });
  }
}
```

**Error Types**:

- Create custom error classes for domain errors
- Include context and cause
- Provide actionable error messages

```javascript
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}
```

**Error Logging**:

- Log errors with context
- Use appropriate log levels
- Never expose sensitive data in logs

```javascript
logger.error("Database query failed", {
  query: sanitizeQuery(query),
  params: sanitizeParams(params),
  error: error.message,
});
```

## Security Standards

### Input Validation

**Validate All Inputs**:

```javascript
function createUser(userData) {
  // Validate required fields
  if (!userData.email || !userData.password) {
    throw new ValidationError("Email and password required");
  }

  // Sanitize inputs
  const email = sanitizeEmail(userData.email);
  const password = userData.password; // Never log passwords

  // Validate formats
  if (!isValidEmail(email)) {
    throw new ValidationError("Invalid email format");
  }

  if (password.length < 8) {
    throw new ValidationError("Password must be at least 8 characters");
  }
}
```

### Sensitive Data Handling

**Never Commit Secrets**:

- Use environment variables for API keys, credentials
- Add `.env*` to `.gitignore`
- Use secret management systems in production

**Never Log Sensitive Data**:

```javascript
// BAD
logger.info("User login", { email, password }); // Never log passwords

// GOOD
logger.info("User login", { email }); // OK to log email
```

**Sanitize Database Queries**:

```javascript
// Use parameterized queries
const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);

// Never concatenate user input
// BAD: const user = await db.query(`SELECT * FROM users WHERE email = '${email}'`);
```

## Testing Standards

### Test File Organization

```
tests/
├── unit/              # Unit tests
│   ├── services/
│   └── utils/
├── integration/       # Integration tests
│   └── api/
├── e2e/              # End-to-end tests
└── fixtures/         # Test data
```

### Test Naming

```javascript
describe("UserService", () => {
  describe("authenticateUser", () => {
    it("should return user when credentials are valid", async () => {
      // Test implementation
    });

    it("should throw AuthenticationError when password is incorrect", async () => {
      // Test implementation
    });

    it("should throw ValidationError when email is missing", async () => {
      // Test implementation
    });
  });
});
```

### Test Coverage Requirements

- **Unit tests**: > 80% code coverage
- **Integration tests**: Critical user flows
- **E2E tests**: Happy paths and edge cases
- **Error scenarios**: All error paths tested

### Test Best Practices

- **Arrange-Act-Assert** pattern
- **Independent tests** (no test dependencies)
- **Descriptive test names** (behavior, not implementation)
- **Test one thing** per test
- **Use fixtures** for complex test data
- **Mock external dependencies**

## Git Standards

### Commit Messages

**Format**: Conventional Commits

```
type(scope): description

[optional body]

[optional footer]
```

**Types**:

- `feat`: New feature (minor version bump)
- `fix`: Bug fix (patch version bump)
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Test additions/changes
- `ci`: CI/CD changes
- `chore`: Maintenance tasks
- `perf`: Performance improvements
- `style`: Code style changes

**Examples**:

```
feat(auth): add OAuth2 authentication support

Implements OAuth2 flow with Google and GitHub providers.
Includes token refresh and revocation.

Closes #123

---

fix(api): resolve timeout in database queries

Optimized slow queries and added connection pooling.

---

docs: update installation guide with Docker setup
```

**Rules**:

- Subject line: imperative mood, lowercase, no period
- Max 72 characters for subject
- Blank line between subject and body
- Body: explain WHY, not WHAT
- Footer: reference issues, breaking changes
- No AI attribution or signatures

### Branch Naming

**Format**: `type/description`

**Types**:

- `feature/` - New features
- `fix/` - Bug fixes
- `refactor/` - Code refactoring
- `docs/` - Documentation updates
- `test/` - Test improvements

**Examples**:

```
feature/oauth-authentication
fix/database-connection-timeout
refactor/user-service-cleanup
docs/api-reference-update
test/integration-test-suite
```

### Pre-Commit Checklist

- ✅ No secrets or credentials
- ✅ No debug code or console.logs
- ✅ All tests pass locally
- ✅ Code follows style guidelines
- ✅ No linting errors
- ✅ Files under 200 lines (Cursor-optimized)
- ✅ Conventional commit message

## Cursor IDE Best Practices

### File Context Management

**Optimize for Cursor's AI Understanding**:

- **Descriptive File Names**: Use kebab-case with clear purpose
  ```
  ✅ user-authentication-service.js
  ❌ user.js
  ❌ auth.js
  ```
- **File Size**: Keep files under 200 lines for optimal context
- **Single Responsibility**: One clear purpose per file
- **Explicit Exports**: Use named exports for better AI understanding

  ```javascript
  // GOOD - Clear exports
  export function authenticateUser(email, password) {}
  export function validateToken(token) {}

  // AVOID - Default exports can be ambiguous
  export default { authenticateUser, validateToken };
  ```

### Code Structure for AI Understanding

**Function Organization**:

- Place related functions close together
- Use clear, descriptive function names
- Group exports at the top or bottom of file
- Add JSDoc comments for complex functions

```javascript
/**
 * Authenticates user and returns session token
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<{token: string, user: User}>}
 */
export async function authenticateUser(email, password) {
  // Implementation
}
```

**Import Organization**:

- Group imports logically (external, internal, relative)
- Use absolute imports when possible for clarity
- Avoid circular dependencies

```javascript
// External dependencies
import { useState, useEffect } from "react";
import { z } from "zod";

// Internal modules
import { UserService } from "@/services/user-service";
import { validateEmail } from "@/utils/validation";

// Relative imports
import { Button } from "./Button";
```

### Using Cursor's AI Chat Effectively

**Best Practices**:

- **@mention files**: Reference specific files in chat for context
  ```
  @user-service.js How does authentication work here?
  ```
- **@mention folders**: Get context about entire directories
  ```
  @src/services Review all services for consistency
  ```
- **Code References**: Use line numbers when discussing specific code
  ```
  Look at lines 45-60 in auth-service.js
  ```
- **Multi-file Edits**: Request changes across related files
  ```
  Update user-service.js and user-repository.js to add email validation
  ```

**Context Window Optimization**:

- Open only relevant files when using chat
- Close unnecessary tabs to reduce context noise
- Use file references instead of pasting large code blocks
- Break complex requests into smaller, focused tasks

### Code Completion Best Practices

**Improve Autocomplete Accuracy**:

- Use TypeScript for better type inference
- Add JSDoc type annotations in JavaScript
- Use consistent naming patterns
- Keep functions focused and single-purpose

```typescript
// GOOD - TypeScript with clear types
interface User {
  id: string;
  email: string;
  name: string;
}

async function getUserById(id: string): Promise<User | null> {
  // Implementation
}
```

```javascript
// GOOD - JSDoc types in JavaScript
/**
 * @param {string} id - User ID
 * @returns {Promise<User|null>} User object or null
 */
async function getUserById(id) {
  // Implementation
}
```

### Cursor's Codebase Indexing

**Optimize for Indexing**:

- Use consistent naming conventions across codebase
- Create clear module boundaries
- Document public APIs with JSDoc
- Use meaningful variable and function names

**File Organization for Indexing**:

- Group related files in same directory
- Use index files for clean exports
- Maintain consistent directory structure
- Avoid deeply nested folder structures (>3 levels)

```
✅ src/
   ├── services/
   │   ├── user-service.js
   │   └── auth-service.js
   └── utils/
       └── validation.js

❌ src/
   ├── a/
   │   ├── b/
   │   │   └── c/
   │   │       └── user-service.js
```

### Multi-File Editing Workflows

**When Making Cross-File Changes**:

1. Open all related files in Cursor
2. Use chat to explain the full scope of changes
3. Request edits to all files in one conversation
4. Review changes together before committing

**Example Workflow**:

```
User: "Add email validation to user registration flow"

Cursor will:
1. Identify all files involved (service, validation, tests)
2. Make coordinated changes across files
3. Maintain consistency across the codebase
```

### Cursor-Specific File Patterns

**Configuration Files**:

- Keep `.cursor/` directory for Cursor-specific settings
- Use `.cursorrules` for project-specific AI instructions
- Store Cursor workspace settings in `.vscode/settings.json`

**Agent Files** (`.claude/agents/`):

- Use descriptive agent names
- Include clear frontmatter with agent capabilities
- Document when to use each agent

**Command Files** (`.claude/commands/`):

- Group related commands in subdirectories
- Use clear command names matching functionality
- Document command arguments and usage

### Performance Tips for Cursor

**Large Codebases**:

- Use `.cursorignore` to exclude heavy directories
- Configure scout-block hook to skip `node_modules`, `.git`, `dist`
- Keep build artifacts out of source directories
- Use workspace folders for monorepos

**Context Efficiency**:

- Split large components into smaller ones
- Extract utility functions to separate files
- Use composition over large monolithic files
- Keep test files close to source files

## Documentation Standards

### Code Documentation

**Self-Documenting Code**:

- Clear variable and function names
- Logical code organization
- Minimal comments needed

**When to Comment**:

- Complex algorithms or business logic
- Non-obvious optimizations
- Workarounds for bugs/limitations
- Public API functions
- Configuration options

### Markdown Documentation

**Structure**:

```markdown
# Document Title

Brief overview paragraph

## Section 1

Content with examples

## Section 2

More content

## See Also

- [Related Doc](./related.md)
```

**Formatting**:

- Use ATX-style headers (`#`, `##`, `###`)
- Code blocks with language specification
- Tables for structured data
- Lists for sequential items
- Links for cross-references

**Code Blocks**:

````markdown
```javascript
function example() {
  return "example";
}
```
````

## Agent-Specific Standards

### Agent Definition Files

**Frontmatter**:

```yaml
---
name: agent-name
description: Brief description of agent purpose and when to use it
mode: subagent | all
model: anthropic/claude-sonnet-4.5
temperature: 0.1
---
```

**Required Sections**:

1. Agent role and responsibilities
2. Core capabilities
3. Workflow process
4. Output requirements
5. Quality standards
6. Communication protocols

### Command Definition Files

**Frontmatter**:

```yaml
---
name: command-name
description: What this command does
---
```

**Argument Handling**:

- `$ARGUMENTS` - All arguments as single string
- `$1`, `$2`, `$3` - Individual positional arguments

**Example**:

```markdown
---
name: plan
description: Create implementation plan for given task
---

Planning task: $ARGUMENTS

Using planner agent to research and create comprehensive plan for: $1
```

### Skill Definition Files

**Structure**:

```markdown
# Skill Name

Guide for using [Technology] - brief description

## When to Use

- List of use cases
- Scenarios where skill applies

## Core Concepts

Key concepts and terminology

## Implementation Guide

Step-by-step instructions

## Examples

Practical examples

## Best Practices

Recommendations and tips

## Common Pitfalls

Mistakes to avoid

## Resources

- Official docs
- Tutorials
- References
```

## Hook Implementation Standards

### Scout Block Hook Architecture

**Cross-Platform Design Pattern**:

- **Dispatcher Pattern**: Single Node.js entry point delegates to platform-specific implementations
- **Platform Detection**: Use `process.platform` for automatic selection
- **Security-First**: Input validation, sanitized errors, safe execution

**File Organization**:

```
.claude/hooks/
├── scout-block.js        # Node.js dispatcher (cross-platform entry)
├── scout-block.sh        # Bash implementation (Unix)
├── scout-block.ps1       # PowerShell implementation (Windows)
├── test-scout-block.sh   # Unix test suite
└── test-scout-block.ps1  # Windows test suite
```

**Implementation Requirements**:

- **Node.js Dispatcher**:

  - Read stdin synchronously
  - Validate JSON structure before parsing
  - Check platform via `process.platform`
  - Execute platform-specific script with piped input
  - Handle errors with exit codes (0 = success, 2 = error)

- **Platform-Specific Scripts**:
  - Parse JSON input (use Node.js for consistency, avoid jq dependency)
  - Validate command structure and content
  - Apply pattern matching for blocked paths
  - Return appropriate exit codes
  - Provide clear error messages

**Security Standards**:

```javascript
// Input validation
if (!hookInput || hookInput.trim().length === 0) {
  console.error("ERROR: Empty input");
  process.exit(2);
}

// JSON structure validation
const data = JSON.parse(hookInput);
if (!data.tool_input || typeof data.tool_input.command !== "string") {
  console.error("ERROR: Invalid JSON structure");
  process.exit(2);
}
```

**Testing Standards**:

- Test both allowed and blocked patterns
- Validate error handling (invalid JSON, empty input, missing fields)
- Cross-platform test coverage
- Clear pass/fail indicators

## Configuration File Standards

### package.json

**Required Fields**:

- name, version, description
- repository (with URL)
- author, license
- engines (Node version >= 18.0.0)
- scripts (test, lint, etc.)

**Best Practices**:

- Use semantic versioning
- Specify exact dependency versions for stability
- Include keywords for discoverability
- Use `files` field to control published content
- Specify minimum Node.js version (18.0.0+)

### .gitignore

**Standard Exclusions**:

```
# Dependencies
node_modules/
package-lock.json (for libraries)

# Environment
.env
.env.*
!.env.example

# Build outputs
dist/
build/
*.log

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db

# Testing
coverage/
*.test.js.snap

# Temporary
tmp/
temp/
*.tmp
```

## Performance Standards

### Code Performance

**Optimization Priorities**:

1. Correctness first
2. Readability second
3. Performance third (when needed)

**Common Optimizations**:

- Use appropriate data structures
- Avoid unnecessary loops
- Cache expensive computations
- Lazy load when possible
- Debounce/throttle frequent operations

**Example**:

```javascript
// Cache expensive operations
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const expensiveCalculation = memoize((n) => {
  // Complex calculation
  return result;
});
```

### File I/O

- Use async operations
- Stream large files
- Batch writes when possible
- Clean up file handles

## Quality Assurance

### Code Review Checklist

**Functionality**:

- ✅ Implements required features
- ✅ Handles edge cases
- ✅ Error handling complete
- ✅ Input validation present

**Code Quality**:

- ✅ Follows naming conventions
- ✅ Adheres to file size limits
- ✅ DRY principle applied
- ✅ KISS principle followed
- ✅ Well-structured and organized

**Security**:

- ✅ No hardcoded secrets
- ✅ Input sanitization
- ✅ Proper authentication/authorization
- ✅ Secure dependencies

**Testing**:

- ✅ Unit tests included
- ✅ Integration tests for flows
- ✅ Edge cases tested
- ✅ Error paths covered

**Documentation**:

- ✅ Code comments where needed
- ✅ API documentation updated
- ✅ README updated if needed
- ✅ Changelog entry added

## Enforcement

### Automated Checks

**Pre-Commit**:

- Commitlint (conventional commits)
- Secret scanning
- File size validation

**Pre-Push**:

- Linting (ESLint, Prettier)
- Unit tests
- Type checking

**CI/CD**:

- All tests
- Build verification
- Coverage reports
- Security scans

### Manual Review

**Code Review Focus**:

- Architecture and design decisions
- Complex logic correctness
- Security implications
- Performance considerations
- Maintainability and readability

## Exceptions

**When to Deviate**:

- Performance-critical code (document reasons)
- External library constraints
- Generated code (mark clearly)
- Legacy code (plan refactoring)

**Documentation Required**:

```javascript
/**
 * EXCEPTION: File exceeds 200 lines
 * REASON: Critical performance optimization requires monolithic structure
 * TODO: Refactor when performance is no longer critical
 * DATE: 2025-10-26
 */
```

## References

### Internal Documentation

- [Project Overview PDR](./project-overview-pdr.md)
- [Codebase Summary](./codebase-summary.md)
- [System Architecture](./system-architecture.md)

### External Standards

- [Conventional Commits](https://conventionalcommits.org/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

### Cursor IDE Resources

- [Cursor Documentation](https://cursor.sh/docs)
- [Cursor AI Features](https://cursor.sh/features)
- [Cursor Best Practices](https://cursor.sh/docs/ai-features)
- [Claude Code Documentation](https://docs.claude.com/)

## Cursor IDE Integration Checklist

When working with Cursor IDE, ensure:

- ✅ Files are under 200 lines for optimal AI context
- ✅ File names are descriptive and use kebab-case
- ✅ Functions have clear, single responsibilities
- ✅ TypeScript or JSDoc types are used for better autocomplete
- ✅ Related files are organized in logical directories
- ✅ Exports are explicit and well-documented
- ✅ `.cursorignore` is configured for large directories
- ✅ Scout-block hook is active to optimize context
- ✅ Agent definitions in `.claude/agents/` are clear and focused
- ✅ Commands in `.claude/commands/` follow naming conventions

## Unresolved Questions

None. All code standards are well-defined and documented.
