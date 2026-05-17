import { existsSync, mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { resolveDataDir } from "../data-dir.mjs";

function sessionsDir() {
  const dir = join(resolveDataDir(), "repl-sessions");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return dir;
}

export function saveSession(name, session) {
  const path = join(sessionsDir(), `${name}.json`);
  writeFileSync(
    path,
    JSON.stringify({ ...session, name, updatedAt: new Date().toISOString() }, null, 2)
  );
}

export function loadSession(name) {
  const path = join(sessionsDir(), `${name}.json`);
  if (!existsSync(path)) throw new Error(`session '${name}' not found`);
  return JSON.parse(readFileSync(path, "utf8"));
}

export function listSessions() {
  const dir = sessionsDir();
  return readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        const data = JSON.parse(readFileSync(join(dir, f), "utf8"));
        return {
          name: data.name || f.replace(".json", ""),
          updatedAt: data.updatedAt,
          model: data.model,
        };
      } catch {
        return { name: f.replace(".json", ""), updatedAt: null, model: null };
      }
    });
}

export function autosave(session) {
  try {
    saveSession("autosave", session);
  } catch {
    // autosave failure is not fatal
  }
}

export function deleteSession(name) {
  const path = join(sessionsDir(), `${name}.json`);
  if (existsSync(path)) rmSync(path);
}
