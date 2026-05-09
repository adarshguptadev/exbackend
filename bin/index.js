#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ---------------- Templates ----------------
const appTemplate = require("../templates/app");
const serverTemplate = require("../templates/server");
const envTemplate = require("../templates/env");
const gitignoreTemplate = require("../templates/gitignore");
const readmeTemplate = require("../templates/readme");
const dbTemplate = require("../templates/config/DBconnect");
const globalErrorTemplate = require("../templates/middlewares/globalError");
const homeRouterTemplate = require("../templates/routes/home.route");

// ---------------- Error Handling ----------------
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err);
  process.exit(1);
});

// ---------------- Input ----------------
const projectName = process.argv[2];

if (!projectName) {
  console.log("❌ Please provide project name");
  process.exit(1);
}

if (!/^[a-zA-Z0-9-_]+$/.test(projectName)) {
  console.log("❌ Invalid project name");
  process.exit(1);
}

const projectPath = path.join(process.cwd(), projectName);

if (fs.existsSync(projectPath)) {
  console.log("❌ Folder already exists");
  process.exit(1);
}

// ---------------- Safe Write ----------------
const safeWrite = (filePath, content) => {
  try {
    fs.writeFileSync(filePath, content);
  } catch (err) {
    console.error("❌ File write failed:", filePath);
    console.error(err.message);
    process.exit(1);
  }
};

// ---------------- MAIN ----------------
console.log("🚀 Creating Express backend...");

try {
  // create folders
  fs.mkdirSync(projectPath, { recursive: true });

  const folders = [
    "src",
    "src/config",
    "src/controllers",
    "src/middlewares",
    "src/models",
    "src/routes",
    "src/services",
    "src/utils"
  ];

  folders.forEach((folder) => {
    fs.mkdirSync(path.join(projectPath, folder), { recursive: true });
  });

  // files
  safeWrite(path.join(projectPath, "src/app.js"), appTemplate);
  safeWrite(path.join(projectPath, "src/server.js"), serverTemplate);
  safeWrite(path.join(projectPath, ".env"), envTemplate(projectName));
  safeWrite(path.join(projectPath, ".gitignore"), gitignoreTemplate);
  safeWrite(path.join(projectPath, "README.md"), readmeTemplate(projectName));
  safeWrite(path.join(projectPath, "src/config/DBconnect.js"), dbTemplate);
  safeWrite(path.join(projectPath, "src/middlewares/globalError.js"), globalErrorTemplate);
  safeWrite(path.join(projectPath, "src/routes/home.router.js"), homeRouterTemplate);

  // npm init
  execSync("npm init -y", {
    cwd: projectPath,
    stdio: "inherit"
  });

  execSync("npm pkg set main=src/server.js", {
    cwd: projectPath,
    stdio: "inherit"
  });

  execSync('npm pkg set scripts.start="node src/server.js"', {
    cwd: projectPath,
    stdio: "inherit"
  });

  execSync('npm pkg set scripts.dev="nodemon src/server.js"', {
    cwd: projectPath,
    stdio: "inherit"
  });

  // install dependencies
  execSync("npm install express mongoose dotenv cors", {
    cwd: projectPath,
    stdio: "inherit"
  });

  execSync("npm install -D nodemon", {
    cwd: projectPath,
    stdio: "inherit"
  });

  console.log("🎉 Project Created Successfully!");
  console.log(`👉 cd ${projectName}`);
  console.log("👉 npm run dev");

} catch (err) {
  console.error("❌ Failed to create project:", err.message);
  process.exit(1);
}