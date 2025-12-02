#!/usr/bin/env node

/**
 * Postinstall script for cursorhelp package
 * 
 * This script automatically copies .claude/ and CLAUDE.md from node_modules/cursorhelp/
 * to the project root so Cursor IDE can detect commands.
 * 
 * It only runs when installed as a dependency, not when the package itself is installed.
 */

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  
  if (stat.isDirectory()) {
    // Create directory if it doesn't exist
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    
    // Copy all files and subdirectories
    const entries = fs.readdirSync(src);
    for (const entry of entries) {
      const srcPath = path.join(src, entry);
      const destPath = path.join(dest, entry);
      
      // Skip if destination exists (preserve user's custom files)
      if (fs.existsSync(destPath)) {
        continue;
      }
      
      copyRecursive(srcPath, destPath);
    }
  } else {
    // Copy file
    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
  }
}

function main() {
  try {
    // Find the package location
    // When installed as dependency, __dirname will be in node_modules/cursorhelp/scripts
    const packageDir = path.resolve(__dirname, '..');
    const packageJsonPath = path.join(packageDir, 'package.json');
    
    // Check if we're in the actual package (not installed as dependency)
    // If package.json name is 'cursorhelp' and we're not in node_modules, skip
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      if (packageJson.name === 'cursorhelp') {
        // Check if we're in node_modules
        const isInNodeModules = packageDir.includes('node_modules');
        if (!isInNodeModules) {
          // This is the source package, not an installed dependency
          log('Skipping postinstall: Running in source package, not as dependency', 'yellow');
          return;
        }
      }
    }
    
    // Find project root
    // Strategy: Go up from node_modules/cursorhelp until we find a package.json
    // that is NOT cursorhelp (the consuming project's package.json)
    let projectRoot = packageDir;
    let found = false;
    
    // First, try to find node_modules and go up one level
    while (projectRoot !== path.dirname(projectRoot)) {
      if (path.basename(projectRoot) === 'node_modules') {
        projectRoot = path.dirname(projectRoot);
        found = true;
        break;
      }
      projectRoot = path.dirname(projectRoot);
    }
    
    // If we didn't find node_modules, search for a package.json that's not cursorhelp
    if (!found) {
      projectRoot = packageDir;
      while (projectRoot !== path.dirname(projectRoot)) {
        const packageJsonPath = path.join(projectRoot, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
          try {
            const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            if (pkg.name !== 'cursorhelp') {
              found = true;
              break;
            }
          } catch (e) {
            // Invalid JSON, continue searching
          }
        }
        projectRoot = path.dirname(projectRoot);
      }
    }
    
    // Verify project root exists
    if (!fs.existsSync(projectRoot)) {
      log('Error: Could not determine project root', 'red');
      process.exit(1);
    }
    
    log('\n📦 cursorhelp: Setting up Cursor configuration...', 'blue');
    
    // Paths
    const claudeSource = path.join(packageDir, '.claude');
    const claudeDest = path.join(projectRoot, '.claude');
    const claudeMdSource = path.join(packageDir, 'CLAUDE.md');
    const claudeMdDest = path.join(projectRoot, 'CLAUDE.md');
    
    // Check if source exists
    if (!fs.existsSync(claudeSource)) {
      log('Warning: .claude/ not found in package', 'yellow');
      return;
    }
    
    // Copy .claude/ directory (only if it doesn't exist or is empty)
    if (!fs.existsSync(claudeDest)) {
      log('  ✓ Copying .claude/ to project root...', 'green');
      copyRecursive(claudeSource, claudeDest);
      log('  ✓ .claude/ copied successfully', 'green');
    } else {
      // Check if it's empty or just has a few files
      const existingFiles = fs.readdirSync(claudeDest);
      if (existingFiles.length === 0) {
        log('  ✓ Copying .claude/ to project root (directory was empty)...', 'green');
        copyRecursive(claudeSource, claudeDest);
        log('  ✓ .claude/ copied successfully', 'green');
      } else {
        log('  ⚠ .claude/ already exists, preserving existing files', 'yellow');
        log('  ℹ Merging new files from cursorhelp package...', 'blue');
        // Merge: copy only files that don't exist
        copyRecursive(claudeSource, claudeDest);
        log('  ✓ Merged new files into existing .claude/', 'green');
      }
    }
    
    // Copy CLAUDE.md (only if it doesn't exist)
    if (!fs.existsSync(claudeMdDest)) {
      if (fs.existsSync(claudeMdSource)) {
        log('  ✓ Copying CLAUDE.md to project root...', 'green');
        fs.copyFileSync(claudeMdSource, claudeMdDest);
        log('  ✓ CLAUDE.md copied successfully', 'green');
      }
    } else {
      log('  ⚠ CLAUDE.md already exists, skipping', 'yellow');
    }
    
    log('\n✅ cursorhelp setup complete!', 'green');
    log('   Cursor IDE should now detect commands from .claude/commands/', 'blue');
    log('   Restart Cursor IDE if commands are not visible.\n', 'blue');
    
  } catch (error) {
    log(`\n❌ Error during postinstall: ${error.message}`, 'red');
    log(`   Stack: ${error.stack}`, 'red');
    // Don't exit with error code to avoid breaking npm install
    process.exit(0);
  }
}

// Run the script
main();

