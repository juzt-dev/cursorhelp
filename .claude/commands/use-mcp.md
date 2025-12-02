---
description: Utilize tools of Model Context Protocol (MCP) servers
argument-hint: [task]
---
Execute MCP operations using MCP tools configured in Cursor settings.

## MCP Configuration

**Important**: MCP servers are configured in Cursor settings, not in project files.
- Go to `Settings` → `Features` → `Model Context Protocol` in Cursor
- MCP tools configured there are automatically available to agents
- No project file configuration needed

## Execution Steps

1. **Use MCP tools directly** (primary method in Cursor):
   - MCP tools are available directly from Cursor's MCP integration
   - Use MCP tools as needed to complete the task
   - Tools are automatically discovered from Cursor's MCP configuration

2. **Fallback to Gemini CLI** (optional, if installed):
   ```bash
   # IMPORTANT: Use stdin piping, NOT -p flag (deprecated, skips MCP init)
   echo "$ARGUMENTS. Return JSON only per GEMINI.md instructions." | gemini -y
   ```

3. **Fallback to mcp-manager agent** (if needed):
   - Use `mcp-manager` agent to discover and execute tools
   - If the agent got issues with the scripts of `mcp-management` skill, use `mcp-builder` skill to fix them
   - **DO NOT** create ANY new scripts
   - The agent can only use MCP tools if any to achieve this task
   - If the agent can't find any suitable tools, just report it back to the main agent to move on to the next step

## Important Notes

- **Cursor Integration**: MCP tools are accessed directly from Cursor's MCP integration (configured in Cursor settings)
- **No project config needed**: Do not create `.claude/.mcp.json` in the project
- **Gemini CLI** (optional): If using Gemini CLI, MUST use stdin piping - the deprecated `-p` flag skips MCP initialization
- **GEMINI.md auto-loaded**: Gemini CLI automatically loads `GEMINI.md` from project root, enforcing JSON-only response format
- **Parseable output**: Responses are structured JSON: `{"server":"name","tool":"name","success":true,"result":<data>,"error":null}`

## Anti-Pattern (DO NOT USE)

```bash
# BROKEN - deprecated -p flag skips MCP server connections!
gemini -y -p "..."
```