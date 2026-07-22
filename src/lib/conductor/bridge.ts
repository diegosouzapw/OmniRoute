/**
 * Conductor Bridge — mirrors OmniConductor hub tasks into the local A2A TaskManager.
 *
 * The hub's SSE feed is the source of truth; this mirror is disposable and fully
 * rebuildable by replay (`last_event_id`). State spelling differs on purpose:
 * the Conductor follows A2A upstream with `canceled` (1 L) while OmniRoute's
 * TaskManager uses `cancelled` (2 L) — the mapping here is explicit and tested.
 */

import { z } from "zod";

import type { A2ATaskManager, TaskState } from "@/lib/a2a/taskManager";

export interface ConductorEvent {
  id: string;
  type: string;
  payload: Record<string, unknown>;
}

/** Target A2A state for a Conductor event type; null = not a task-state event (tolerated). */
export function conductorStateFor(type: string): TaskState | null {
  switch (type) {
    case "task.created":
      return "submitted";
    case "task.scheduled":
    case "task.input_required":
      return "working";
    case "task.completed":
      return "completed";
    case "task.failed":
      return "failed";
    case "task.canceled": // Conductor/A2A upstream spelling (1 L)
      return "cancelled"; // local TaskManager spelling (2 L)
    default:
      return null; // runner.*, council.*, terminal.*, future types — forward-compat
  }
}

/** Minimal legal path from a task's current state up to the target state. */
const LADDER: TaskState[] = ["submitted", "working", "completed"];

function climb(tm: A2ATaskManager, a2aId: string, target: TaskState): void {
  const task = tm.getTask(a2aId);
  if (!task) return;
  if (task.state === target) return;
  if (task.state === "completed" || task.state === "failed" || task.state === "cancelled") return; // terminal: late events ignored
  try {
    if (target === "completed") {
      // submitted → working → completed (the manager rejects skips)
      let idx = LADDER.indexOf(task.state);
      for (idx = idx + 1; idx < LADDER.length; idx++) tm.updateTask(a2aId, LADDER[idx]);
      return;
    }
    tm.updateTask(a2aId, target); // working/failed/cancelled are reachable from any non-terminal state
  } catch {
    // A transition rejected by the manager must never take the bridge down; the
    // hub replay will converge the mirror on the next connection.
  }
}

function ensureMirrored(tm: A2ATaskManager, index: Map<string, string>, conductorId: string, payload: Record<string, unknown>): string {
  const known = index.get(conductorId);
  if (known && tm.getTask(known)) return known;
  const mode = typeof payload.mode === "string" ? payload.mode : "?";
  const task = tm.createTask({
    skill: "conductor",
    messages: [{ role: "user", content: `Conductor task ${conductorId} (${mode})` }],
    metadata: {
      conductor: {
        task_id: conductorId,
        mode,
        from: typeof payload.from === "string" ? payload.from : undefined,
      },
    },
  });
  index.set(conductorId, task.id);
  return task.id;
}

function conductorMeta(tm: A2ATaskManager, a2aId: string): Record<string, unknown> | null {
  const task = tm.getTask(a2aId);
  if (!task) return null;
  // The manager has no public metadata mutator; direct mutation is the repo precedent
  // (tests mutate task fields) and the object lives in the same process.
  const meta = (task.metadata.conductor ??= {}) as Record<string, unknown>;
  return meta;
}

/** Applies one hub event to the mirror. Never throws for event-shaped input. */
export function applyConductorEvent(tm: A2ATaskManager, index: Map<string, string>, ev: ConductorEvent): void {
  const target = conductorStateFor(ev.type);
  if (!target) return;
  const conductorId = typeof ev.payload.task_id === "string" ? ev.payload.task_id : null;
  if (!conductorId) return;

  const a2aId = ensureMirrored(tm, index, conductorId, ev.payload);
  const meta = conductorMeta(tm, a2aId);
  if (meta) {
    if (ev.type === "task.scheduled" && typeof ev.payload.runner_id === "string") meta.runner = ev.payload.runner_id;
    if (ev.type === "task.input_required") meta.input_required = true;
    if (ev.type === "task.completed" || ev.type === "task.failed") {
      const manifest = (ev.payload.manifest ?? {}) as Record<string, unknown>;
      if (typeof manifest.summary === "string") meta.summary = manifest.summary;
      if (typeof manifest.branch === "string") meta.branch = manifest.branch;
      if (typeof manifest.error === "string") meta.error = manifest.error;
    }
  }
  if (target !== "submitted") climb(tm, a2aId, target);
}

// ============ Incremental SSE parser ============

export interface SseFrame {
  id?: string;
  event?: string;
  data: string;
}

/** Incremental `text/event-stream` parser: feed chunks, get complete frames. Comments (`: ping`) are dropped. */
export class SseParser {
  private buffer = "";

  push(chunk: string): SseFrame[] {
    this.buffer += chunk;
    const frames: SseFrame[] = [];
    let cut: number;
    while ((cut = this.buffer.indexOf("\n\n")) !== -1) {
      const block = this.buffer.slice(0, cut);
      this.buffer = this.buffer.slice(cut + 2);
      const frame: SseFrame = { data: "" };
      const dataLines: string[] = [];
      for (const line of block.split("\n")) {
        if (line.startsWith(":")) continue; // comment/keepalive
        if (line.startsWith("id:")) frame.id = line.slice(3).trim();
        else if (line.startsWith("event:")) frame.event = line.slice(6).trim();
        else if (line.startsWith("data:")) dataLines.push(line.slice(5).trimStart());
      }
      if (frame.id === undefined && frame.event === undefined && dataLines.length === 0) continue; // pure comment block
      frame.data = dataLines.join("\n");
      frames.push(frame);
    }
    return frames;
  }
}

// ============ Connection loop ============

/** Wire shape of one hub event (the SSE `data:` payload) — untrusted input, Zod-validated. */
const hubEventSchema = z.object({
  id: z.string(),
  type: z.string(),
  payload: z.record(z.string(), z.unknown()),
});

export interface ConductorBridgeOptions {
  hubUrl: string;
  token: string;
  tm: A2ATaskManager;
  cursor: { get(): string | null; set(v: string): void };
  fetchImpl?: typeof fetch;
  log?: (msg: string) => void;
  backoffBaseMs?: number;
}

export interface ConductorBridge {
  start(): void;
  stop(): void;
  state(): "connected" | "reconnecting" | "stopped";
}

const BACKOFF_CAP_MS = 30_000;

/**
 * Long-lived consumer: connects to the hub SSE with the persisted cursor, mirrors
 * events, reconnects with exponential backoff. A hub outage never propagates —
 * errors are logged and retried; `stop()` aborts for good.
 */
export function createConductorBridge(opts: ConductorBridgeOptions): ConductorBridge {
  const log = opts.log ?? ((msg: string) => console.log(`[conductor-bridge] ${msg}`));
  const doFetch = opts.fetchImpl ?? fetch;
  const backoffBase = opts.backoffBaseMs ?? 1_000;
  const index = new Map<string, string>();
  let state: "connected" | "reconnecting" | "stopped" = "stopped";
  let abort: AbortController | null = null;
  let attempt = 0;
  let running = false;

  async function readStream(res: Response): Promise<void> {
    const reader = res.body?.getReader();
    if (!reader) throw new Error("SSE response without body");
    const parser = new SseParser();
    const decoder = new TextDecoder();
    for (;;) {
      const { value, done } = await reader.read();
      if (done) return;
      for (const frame of parser.push(decoder.decode(value, { stream: true }))) {
        let parsed: z.infer<typeof hubEventSchema>;
        try {
          parsed = hubEventSchema.parse(JSON.parse(frame.data));
        } catch {
          log(`evento SSE malformado ignorado (id=${frame.id ?? "?"})`);
          continue;
        }
        applyConductorEvent(opts.tm, index, parsed);
        opts.cursor.set(parsed.id); // persisted per event — replay covers any gap on reconnect
      }
    }
  }

  async function loop(): Promise<void> {
    while (running) {
      abort = new AbortController();
      try {
        const since = opts.cursor.get() ?? "0";
        const res = await doFetch(`${opts.hubUrl}/v1/events?last_event_id=${encodeURIComponent(since)}`, {
          headers: { authorization: `Bearer ${opts.token}`, accept: "text/event-stream" },
          signal: abort.signal,
        });
        if (!res.ok) throw new Error(`hub respondeu HTTP ${res.status}`);
        state = "connected";
        attempt = 0;
        log(`conectado ao hub (last_event_id=${since})`);
        await readStream(res); // resolves when the hub closes the stream
        throw new Error("stream encerrado pelo hub");
      } catch (err) {
        if (!running) break;
        state = "reconnecting";
        const wait = Math.min(backoffBase * 2 ** attempt, BACKOFF_CAP_MS);
        attempt++;
        log(`conexão caiu (${err instanceof Error ? err.message : String(err)}) — reconectando em ${wait}ms`);
        await new Promise((resolve) => setTimeout(resolve, wait));
      }
    }
    state = "stopped";
  }

  return {
    start() {
      if (running) return;
      running = true;
      void loop();
    },
    stop() {
      running = false;
      state = "stopped";
      abort?.abort();
    },
    state: () => state,
  };
}
