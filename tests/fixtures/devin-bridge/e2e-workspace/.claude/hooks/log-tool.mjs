import fs from "node:fs";

let input = "";
for await (const chunk of process.stdin) input += chunk;
const event = JSON.parse(input || "{}");
fs.appendFileSync("/workspace/.e2e-hook.log", `${String(event.tool_name || "unknown")}\n`);
