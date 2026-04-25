#!/usr/bin/env node

import { spawn } from "node:child_process";

const env = { ...process.env };

await exec("npx", ["next", "build", "--experimental-build-mode", "generate"]);

// launch application
const [command, ...args] = process.argv.slice(2);
if (!command) {
  throw new Error("Missing command to launch after database setup");
}
await exec(command, args);

function exec(command, args = []) {
  const child = spawn(command, args, { stdio: "inherit", env });
  return new Promise((resolve, reject) => {
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${[command, ...args].join(" ")} failed rc=${code}`));
      }
    });
  });
}
