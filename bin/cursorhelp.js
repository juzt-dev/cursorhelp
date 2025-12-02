#!/usr/bin/env node

/**
 * Cursorhelp CLI Tool
 * 
 * Supports both global and local installation:
 * - When installed globally: Use `cursorhelp update` or `cursorhelp new` commands
 * - When installed locally: postinstall script handles setup automatically
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
  cyan: '\x1b[36m',
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
    log(`   ⚠️  Warning: Failed to copy ${src}: ${error.message}`, 'yellow');
    throw error;
  }
}

function findPackageDir() {
  // Try to find the package directory
  // When installed globally, it's in global node_modules
  // When installed locally, it's in local node_modules
  
  // First, try to find it relative to this script
  const scriptDir = __dirname;
  const possiblePaths = [
    path.resolve(scriptDir, '..'), // bin/.. = package root
    path.resolve(scriptDir, '../../cursorhelp'), // global: node_modules/cursorhelp
    path.resolve(scriptDir, '../../../cursorhelp'), // alternative global path
  ];
  
  for (const pkgPath of possiblePaths) {
    const packageJsonPath = path.join(pkgPath, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        if (pkg.name === 'cursorhelp') {
          return pkgPath;
        }
      } catch (e) {
        // Invalid JSON, continue
      }
    }
  }
  
  // Last resort: try to find in require.resolve
  try {
    const packagePath = require.resolve('cursorhelp/package.json');
    return path.dirname(packagePath);
  } catch (e) {
    // Package not found
    return null;
  }
}

function updateCommand(projectRoot) {
  log('\n📦 cursorhelp: Updating Cursor configuration...', 'blue');
  
  const packageDir = findPackageDir();
  if (!packageDir) {
    log('❌ Error: Could not find cursorhelp package', 'red');
    log('   Please ensure cursorhelp is installed:', 'yellow');
    log('   npm install -g cursorhelp', 'yellow');
    process.exit(1);
  }
  
  const claudeSource = path.join(packageDir, '.claude');
  const claudeDest = path.join(projectRoot, '.claude');
  const claudeMdSource = path.join(packageDir, 'CLAUDE.md');
  const claudeMdDest = path.join(projectRoot, 'CLAUDE.md');
  
  // Check if source exists
  if (!fs.existsSync(claudeSource)) {
    log('❌ Error: .claude/ not found in package', 'red');
    log(`   Expected at: ${claudeSource}`, 'red');
    process.exit(1);
  }
  
  // Copy .claude/ directory
  if (!fs.existsSync(claudeDest)) {
    log('  ✓ Copying .claude/ to project root...', 'green');
    copyRecursive(claudeSource, claudeDest);
    log('  ✓ .claude/ copied successfully', 'green');
  } else {
    log('  ⚠ .claude/ already exists, preserving existing files', 'yellow');
    log('  ℹ Merging new files from cursorhelp package...', 'blue');
    copyRecursive(claudeSource, claudeDest);
    log('  ✓ Merged new files into existing .claude/', 'green');
  }
  
  // Copy CLAUDE.md
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
  
  log('\n✅ cursorhelp setup complete!', 'green');
  log(`   ✓ .claude/ directory: ${claudeDest}`, 'green');
  log(`   ✓ Commands available: ${commandsCount > 0 ? commandsCount + ' files' : 'check manually'}`, 'green');
  log('   Cursor IDE should now detect commands from .claude/commands/', 'blue');
  log('   Restart Cursor IDE if commands are not visible.\n', 'blue');
}

function newCommand(dir, kit = 'default') {
  log(`\n📦 cursorhelp: Creating new project with kit "${kit}"...`, 'blue');
  
  if (!dir) {
    log('❌ Error: Directory name is required', 'red');
    log('   Usage: cursorhelp new --dir <directory> [--kit <kit-name>]', 'yellow');
    process.exit(1);
  }
  
  const projectRoot = path.resolve(process.cwd(), dir);
  
  // Check if directory already exists
  if (fs.existsSync(projectRoot)) {
    log(`❌ Error: Directory already exists: ${projectRoot}`, 'red');
    process.exit(1);
  }
  
  // Create directory
  log(`  ✓ Creating directory: ${projectRoot}`, 'green');
  fs.mkdirSync(projectRoot, { recursive: true });
  
  // Initialize as npm project
  log('  ✓ Initializing npm project...', 'green');
  const packageJson = {
    name: path.basename(projectRoot),
    version: '1.0.0',
    description: '',
    main: 'index.js',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1'
    },
    keywords: [],
    author: '',
    license: 'ISC'
  };
  fs.writeFileSync(
    path.join(projectRoot, 'package.json'),
    JSON.stringify(packageJson, null, 2) + '\n'
  );
  
  // Update with cursorhelp files
  updateCommand(projectRoot);
  
  log(`\n✅ Project created successfully at: ${projectRoot}`, 'green');
  log(`   Next steps:`, 'cyan');
  log(`   cd ${dir}`, 'cyan');
  log(`   # Restart Cursor IDE to detect commands\n`, 'cyan');
}

function showHelp() {
  log('\n📖 Cursorhelp CLI', 'cyan');
  log('\nUsage:', 'blue');
  log('  cursorhelp <command> [options]', '');
  log('\nCommands:', 'blue');
  log('  update [--kit <kit-name>]  Update Cursor configuration in current project', '');
  log('  new --dir <directory>      Create new project with Cursor configuration', '');
  log('  help                       Show this help message', '');
  log('\nExamples:', 'blue');
  log('  cursorhelp update', '');
  log('  cursorhelp update --kit default', '');
  log('  cursorhelp new --dir my-project', '');
  log('  cursorhelp new --dir my-project --kit default', '');
  log('\nNote: The --kit option is currently not implemented, only "default" kit is available.\n', 'yellow');
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args[0] === 'help' || args[0] === '--help' || args[0] === '-h') {
    showHelp();
    return;
  }
  
  const command = args[0];
  const projectRoot = process.cwd();
  
  if (command === 'update') {
    // Parse options (simple parser for --kit)
    let kit = 'default';
    for (let i = 1; i < args.length; i++) {
      if (args[i] === '--kit' && i + 1 < args.length) {
        kit = args[i + 1];
        i++;
      }
    }
    
    if (kit !== 'default') {
      log(`⚠️  Warning: Kit "${kit}" is not yet implemented, using "default"`, 'yellow');
    }
    
    updateCommand(projectRoot);
  } else if (command === 'new') {
    // Parse options
    let dir = null;
    let kit = 'default';
    
    for (let i = 1; i < args.length; i++) {
      if (args[i] === '--dir' && i + 1 < args.length) {
        dir = args[i + 1];
        i++;
      } else if (args[i] === '--kit' && i + 1 < args.length) {
        kit = args[i + 1];
        i++;
      }
    }
    
    if (kit !== 'default') {
      log(`⚠️  Warning: Kit "${kit}" is not yet implemented, using "default"`, 'yellow');
    }
    
    newCommand(dir, kit);
  } else {
    log(`❌ Error: Unknown command "${command}"`, 'red');
    showHelp();
    process.exit(1);
  }
}

// Run the CLI
main();

