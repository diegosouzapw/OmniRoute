import { spawn, type ChildProcess } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PS1_PATH = join(__dirname, "tray.ps1");

export interface WinTrayEvent {
  type: "click" | "ready" | "error";
  index?: number;
  error?: string;
}

export interface WinTrayOptions {
  iconPath: string;
  tooltip: string;
  onEvent: (evt: WinTrayEvent) => void;
}

export interface WinTrayHandle {
  update(items: Array<{ title: string; enabled: boolean }>): void;
  setTooltip(text: string): void;
  destroy(): void;
}

export function initWindowsTray(opts: WinTrayOptions): WinTrayHandle | null {
  let child: ChildProcess;
  try {
    child = spawn(
      "powershell.exe",
      [
        "-NoLogo",
        "-NoProfile",
        "-ExecutionPolicy",
        "Bypass",
        "-File",
        PS1_PATH,
        "-IconPath",
        opts.iconPath,
        "-Tooltip",
        opts.tooltip,
      ],
      { stdio: ["pipe", "pipe", "pipe"], windowsHide: true }
    );
  } catch (err) {
    opts.onEvent({ type: "error", error: String(err) });
    return null;
  }

  child.stdout?.setEncoding("utf-8");
  let buffer = "";
  child.stdout?.on("data", (chunk: string) => {
    buffer += chunk;
    let nl: number;
    while ((nl = buffer.indexOf("\n")) >= 0) {
      const line = buffer.slice(0, nl).trim();
      buffer = buffer.slice(nl + 1);
      if (!line) continue;
      try {
        const evt = JSON.parse(line) as WinTrayEvent;
        opts.onEvent(evt);
      } catch {
        // ignore malformed JSON lines
      }
    }
  });

  child.on("error", (err) => opts.onEvent({ type: "error", error: err.message }));

  function send(cmd: object): void {
    if (!child.stdin?.writable) return;
    child.stdin.write(JSON.stringify(cmd) + "\n");
  }

  return {
    update(items) {
      send({ type: "setMenu", items });
    },
    setTooltip(text) {
      send({ type: "setTooltip", text });
    },
    destroy() {
      try {
        send({ type: "quit" });
      } catch {
        // already dead
      }
      setTimeout(() => child.kill(), 500);
    },
  };
}
