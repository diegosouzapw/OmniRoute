// Preloaded (via `node --import`) before open-sse/mcp-server/server.ts and its entire
// import graph evaluate. The stdio MCP transport uses stdout exclusively for JSON-RPC
// messages, but DB init (getDbInstance(), triggered as a side effect of evaluating the
// server's module graph — e.g. tool registration reading compression settings) logs via
// plain console.log. A redirect placed *inside* server.ts (even at the top of its first
// executed function) is too late: static imports are hoisted and fully evaluated before
// any of that function's own code runs, so earlier console.log calls during import-time
// side effects already escaped to the real stdout by then. Redirecting here, in a module
// that loads before server.ts is even requested, is the only point early enough to
// guarantee no startup output leaks into the JSON-RPC stream and corrupts it client-side
// (e.g. Claude Desktop: "Unexpected token 'D', \"[DB] Changi\"... is not valid JSON").
import { Console } from "node:console";

const stderrConsole = new Console({ stdout: process.stderr, stderr: process.stderr });
console.log = stderrConsole.log.bind(stderrConsole);
console.warn = stderrConsole.warn.bind(stderrConsole);
