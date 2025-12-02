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
  try {
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
  } catch (error) {
    // Log error but continue - don't fail entire install for one file
    if (process.env.CURSORHELP_DEBUG) {
      log(`   ⚠️  Warning: Failed to copy ${src}: ${error.message}`, 'yellow');
    }
    throw error; // Re-throw to be caught by main error handler
  }
}

function main() {
  // Always log that script is running (helps debug if script doesn't run at all)
  if (process.env.CURSORHELP_DEBUG || process.env.npm_config_loglevel === 'verbose') {
    log('🔍 cursorhelp postinstall script starting...', 'blue');
    log(`   __dirname: ${__dirname}`, 'blue');
    log(`   cwd: ${process.cwd()}`, 'blue');
  }
  
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
          log('⚠️  Skipping postinstall: Running in source package, not as dependency', 'yellow');
          log('   This is normal when developing the package itself.', 'yellow');
          return;
        }
      }
    } else {
      log('⚠️  Warning: package.json not found at expected location', 'yellow');
      log(`   Expected: ${packageJsonPath}`, 'yellow');
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
    if (!found || !fs.existsSync(projectRoot)) {
      log('❌ Error: Could not determine project root', 'red');
      log(`   Package dir: ${packageDir}`, 'red');
      log(`   Project root: ${projectRoot}`, 'red');
      log('   Please ensure you are installing in a valid Node.js project.', 'yellow');
      process.exit(1);
    }
    
    // Debug info (only show if CURSORHELP_DEBUG env var is set)
    if (process.env.CURSORHELP_DEBUG) {
      log('\n🔍 Debug Info:', 'blue');
      log(`   Package dir: ${packageDir}`, 'blue');
      log(`   Project root: ${projectRoot}`, 'blue');
      log(`   .claude source: ${claudeSource}`, 'blue');
      log(`   .claude dest: ${claudeDest}`, 'blue');
    }
    
    log('\n📦 cursorhelp: Setting up Cursor configuration...', 'blue');
    
    // Paths
    const claudeSource = path.join(packageDir, '.claude');
    const claudeDest = path.join(projectRoot, '.claude');
    const claudeMdSource = path.join(packageDir, 'CLAUDE.md');
    const claudeMdDest = path.join(projectRoot, 'CLAUDE.md');
    
    // Check if source exists
    if (!fs.existsSync(claudeSource)) {
      log('❌ Error: .claude/ not found in package', 'red');
      log(`   Expected at: ${claudeSource}`, 'red');
      log(`   Package dir: ${packageDir}`, 'red');
      log('   This may indicate the package was not installed correctly.', 'yellow');
      process.exit(1);
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
    
    // Verify files were copied
    const commandsDir = path.join(claudeDest, 'commands');
    const commandsExist = fs.existsSync(commandsDir);
    const commandsCount = commandsExist ? fs.readdirSync(commandsDir).length : 0;
    
    if (!commandsExist || commandsCount === 0) {
      log('\n⚠️  Warning: Commands directory may be empty', 'yellow');
      log(`   Commands dir: ${commandsDir}`, 'yellow');
      log(`   Files found: ${commandsCount}`, 'yellow');
      log('   This may indicate a problem with the installation.', 'yellow');
    }
    
    log('\n✅ cursorhelp setup complete!', 'green');
    log(`   ✓ .claude/ directory: ${claudeDest}`, 'green');
    log(`   ✓ Commands available: ${commandsCount > 0 ? commandsCount + ' files' : 'check manually'}`, 'green');
    log('   Cursor IDE should now detect commands from .claude/commands/', 'blue');
    log('   Restart Cursor IDE if commands are not visible.\n', 'blue');
    
  } catch (error) {
    log(`\n❌ Error during postinstall: ${error.message}`, 'red');
    if (process.env.CURSORHELP_DEBUG) {
      log(`   Stack: ${error.stack}`, 'red');
    }
    log('\n   To debug:', 'yellow');
    log('   1. Check that node_modules/cursorhelp/.claude/ exists', 'yellow');
    log('   2. Verify you have write permissions in project root', 'yellow');
    log('   3. Try running manually with debug:', 'yellow');
    log('      CURSORHELP_DEBUG=1 node node_modules/cursorhelp/scripts/postinstall.js', 'yellow');
    log('   4. Check npm install didn\'t use --ignore-scripts flag', 'yellow');
    // Use exit(0) to not break npm install, but log error clearly
    // User can run manually if needed
    process.exit(0);
  }
}

// Run the script
main();

