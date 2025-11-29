const fs = require('fs');
const path = require('path');

/**
 * Print the welcome banner
 */
function printBanner() {
    console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║           🚀  PALASIO MONOREPO SETUP  🚀                  ║
║                                                           ║
║   Create a modern Bun-based monorepo with TypeScript     ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  `);
}

/**
 * Print help message
 */
function printHelp() {
    console.log(`
Usage: npx palasio-setup@latest <project-name>

Arguments:
  <project-name>    Name of your project directory

Options:
  -h, --help       Show this help message
  -v, --version    Show version number

Example:
  npx palasio-setup@latest my-awesome-app
  `);
}

/**
 * Create a directory
 */
function createDir(targetDir, dirPath) {
    const fullPath = path.join(targetDir, dirPath);
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
    }
}

/**
 * Write a file with automatic parent directory creation
 */
function writeFile(targetDir, filePath, content) {
    const fullPath = path.join(targetDir, filePath);
    const dir = path.dirname(fullPath);

    // Create parent directory if it doesn't exist
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, content.trim() + '\n');
}

/**
 * Validate project name
 */
function validateProjectName(projectName) {
    if (!projectName) {
        return { valid: false, error: 'Project name is required!' };
    }

    if (!/^[a-z0-9-_]+$/i.test(projectName)) {
        return {
            valid: false,
            error: 'Project name can only contain letters, numbers, hyphens, and underscores'
        };
    }

    return { valid: true };
}

module.exports = {
    printBanner,
    printHelp,
    createDir,
    writeFile,
    validateProjectName,
};
