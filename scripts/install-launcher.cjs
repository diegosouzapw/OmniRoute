const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

function main() {
  const projectRoot = path.resolve(__dirname, "..");
  // Prefer `app/server.js` but fall back to Next standalone output created by `npm run build`.
  const candidates = [
    path.join(projectRoot, "app", "server.js"),
    path.join(projectRoot, ".next", "standalone", "server.js"),
    path.join(projectRoot, ".next", "standalone", "server.mjs"),
  ];
  const serverPath = candidates.find((p) => fs.existsSync(p));
  if (!serverPath) {
    console.error("Error: built server not found. Checked paths:\n", candidates.join("\n"));
    console.error("Run `npm run build` first.");
    process.exit(1);
  }

  let npmBin;
  try {
    const prefix = execSync("npm config get prefix", { encoding: "utf8" }).trim();
    npmBin = process.platform === "win32" ? prefix : path.join(prefix, "bin");
  } catch (err) {
    console.error("Error: failed to determine global npm prefix:", err.message || err);
    process.exit(1);
  }

  // Do not overwrite the original `omniroute` command. Install alternate launchers only.
  const names = ["myomniroute", "omniroute-launch"];
  names.forEach((name) => {
    try {
      installLauncher({ name, npmBin, serverPath });
      console.log("Installed launcher:", name, "->", npmBin);
    } catch (err) {
      console.error("Failed to install launcher", name, err && err.message ? err.message : err);
    }
  });
}

function installLauncher({ name, npmBin, serverPath }) {
  // Unix / POSIX launcher
  const unixPath = path.join(npmBin, name);
  const unixContent = `#!/usr/bin/env node
const { spawn, exec } = require('child_process');
const server = ${JSON.stringify(serverPath)};
const env = Object.assign({}, process.env, { PORT: '20128' });
const proc = spawn(process.execPath, [server], { stdio: 'inherit', env });
const url = 'http://localhost:20128';
setTimeout(() => {
  try {
    if (process.platform === 'win32') exec('start "" ' + JSON.stringify(url));
    else if (process.platform === 'darwin') exec('open ' + JSON.stringify(url));
    else exec('xdg-open ' + JSON.stringify(url));
  } catch (e) {}
}, 1000);
proc.on('exit', (code) => process.exit(code));
`;

  // overwrite launcher so updated port is applied
  fs.writeFileSync(unixPath, unixContent, { mode: 0o755 });

  // Windows .cmd shim
  const cmdPath = path.join(npmBin, `${name}.cmd`);
  const cmdContent = `@echo off
set PORT=20128
node "${serverPath.replace(/"/g, '\\"')}" %*
start "" "http://localhost:20128"
`;
  fs.writeFileSync(cmdPath, cmdContent, { encoding: "utf8" });

  // PowerShell shim
  const psPath = path.join(npmBin, `${name}.ps1`);
  const psContent = `$env:PORT='20128'; Start-Process -FilePath node -ArgumentList ${JSON.stringify(serverPath)} -NoNewWindow; Start-Sleep -Seconds 1; Start-Process 'http://localhost:20128'`;
  fs.writeFileSync(psPath, psContent, { encoding: "utf8" });
}

main();
