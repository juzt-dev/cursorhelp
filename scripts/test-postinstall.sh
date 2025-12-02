#!/bin/bash

# Test script to verify postinstall works correctly
# This simulates what happens when package is installed via npm

set -e

echo "🧪 Testing cursorhelp postinstall script..."
echo ""

# Create a temporary test project
TEST_DIR=$(mktemp -d)
echo "📁 Test directory: $TEST_DIR"

cd "$TEST_DIR"

# Create a test project structure
mkdir -p test-project
cd test-project

# Initialize npm project
npm init -y > /dev/null 2>&1

# Create node_modules structure
mkdir -p node_modules/cursorhelp

# Copy package files (simulating npm install)
PACKAGE_ROOT="/Users/Chuo/Downloads/cursorhelp-cli"
cp -r "$PACKAGE_ROOT/.claude" node_modules/cursorhelp/
cp "$PACKAGE_ROOT/CLAUDE.md" node_modules/cursorhelp/ 2>/dev/null || true
cp -r "$PACKAGE_ROOT/scripts" node_modules/cursorhelp/

# Run postinstall script
echo "🚀 Running postinstall script..."
CURSORHELP_DEBUG=1 node node_modules/cursorhelp/scripts/postinstall.js

# Verify results
echo ""
echo "✅ Verification:"
if [ -d ".claude" ]; then
    echo "  ✓ .claude/ directory exists"
    COMMAND_COUNT=$(find .claude/commands -name "*.md" 2>/dev/null | wc -l | tr -d ' ')
    echo "  ✓ Commands found: $COMMAND_COUNT"
    if [ "$COMMAND_COUNT" -gt 0 ]; then
        echo "  ✓ Commands directory populated correctly"
    else
        echo "  ❌ Commands directory is empty!"
        exit 1
    fi
else
    echo "  ❌ .claude/ directory not found!"
    exit 1
fi

if [ -f "CLAUDE.md" ]; then
    echo "  ✓ CLAUDE.md exists"
else
    echo "  ⚠️  CLAUDE.md not found (may be optional)"
fi

echo ""
echo "✅ All tests passed!"
echo "📁 Test project location: $TEST_DIR/test-project"
echo "   You can inspect it manually or run: rm -rf $TEST_DIR"

