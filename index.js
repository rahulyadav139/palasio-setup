#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const minimist = require('minimist');
const { printBanner, printHelp, validateProjectName } = require('./lib/utils');
const { generateMonorepo, installDependencies, printSuccess } = require('./lib/generator');

// Parse CLI arguments
const argv = minimist(process.argv.slice(2), {
    string: ['_'],
    alias: { h: 'help', v: 'version' }
});

// Handle help flag
if (argv.help) {
    printHelp();
    process.exit(0);
}

// Handle version flag
if (argv.version) {
    const pkg = require('./package.json');
    console.log(pkg.version);
    process.exit(0);
}

// Get project name from arguments
const projectName = argv._[0];

// Validate project name
const validation = validateProjectName(projectName);
if (!validation.valid) {
    console.error(`❌ Error: ${validation.error}`);
    printHelp();
    process.exit(1);
}

// Check if directory already exists
const targetDir = path.resolve(process.cwd(), projectName);
if (fs.existsSync(targetDir)) {
    console.error(`❌ Error: Directory "${projectName}" already exists!`);
    process.exit(1);
}

// Start scaffolding
printBanner();
console.log(`📁 Creating project: ${projectName}\n`);

// Generate the monorepo structure
generateMonorepo(targetDir, projectName);

// Install dependencies
installDependencies(targetDir);

// Print success message
printSuccess(projectName, targetDir);
