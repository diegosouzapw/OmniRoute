import fs from "node:fs";
import path from "node:path";

// Synthetic supervised child: no socket, proxy, config, or upstream access.
const root = process.env.MANAGED_PROXY_FIXTURE_ROOT;
if (!root) throw new Error("Owned fixture root required");
fs.writeFileSync(
  path.join(root, `child-${process.pid}.json`),
  JSON.stringify({ pid: process.pid, startedAt: new Date().toISOString() }),
  "utf8"
);
const timer = setInterval(() => {}, 1000);
process.stdout.write("synthetic-ready\n");
process.once("SIGTERM", () => {
  clearInterval(timer);
  process.exit(0);
});
