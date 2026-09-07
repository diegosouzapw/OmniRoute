import {
  sanitizeErrorMessage,
  sanitizeUpstreamDetails,
} from "@omniroute/open-sse/utils/errorSanitization.ts";

import { skillRegistry } from "./registry";
import { SkillExecution, SkillStatus, SkillHandler } from "./types";
import { builtinSkills } from "./builtins";
import { getDbInstance } from "../db/core";
import { getSettings } from "../db/settings";
import { randomUUID } from "crypto";
import { logger } from "../../../open-sse/utils/logger.ts";

const log = logger("SKILLS_EXECUTOR");

function toSafeSkillErrorMessage(value: unknown): string {
  try {
    const raw = value instanceof Error ? value.message : value;
    return sanitizeErrorMessage(raw) || "Skill execution failed";
  } catch {
    return "Skill execution failed";
  }
}

const SKILL_FAILURE_DISCRIMINATORS = new Set(["error", "failed", "failure"]);

function isSkillErrorKey(key: string): boolean {
  const normalizedKey = key.replace(/[-_]/g, "").toLowerCase();
  return (
    normalizedKey === "error" ||
    normalizedKey === "errors" ||
    normalizedKey === "warning" ||
    normalizedKey === "warnings"
  );
}

function isFailureDiscriminator(value: unknown): boolean {
  return typeof value === "string" && SKILL_FAILURE_DISCRIMINATORS.has(value.trim().toLowerCase());
}

function isSkillFailureOutput(output: Record<string, unknown>): boolean {
  try {
    const status = output.status;
    return (
      output.success === false ||
      (typeof status === "number" && Number.isFinite(status) && status >= 400) ||
      isFailureDiscriminator(status) ||
      isFailureDiscriminator(output.type) ||
      isFailureDiscriminator(output.event) ||
      isFailureDiscriminator(output.kind)
    );
  } catch {
    return true;
  }
}

type SensitiveSkillReferences = {
  objects: WeakSet<object>;
  strings: Set<string>;
};

function markSensitiveSkillReference(value: unknown, sensitive: SensitiveSkillReferences): void {
  if (typeof value === "string") {
    sensitive.strings.add(value);
    return;
  }
  if (!value || typeof value !== "object" || sensitive.objects.has(value)) return;

  sensitive.objects.add(value);
  try {
    for (const entry of Object.values(value as Record<string, unknown>)) {
      markSensitiveSkillReference(entry, sensitive);
    }
  } catch {
    // A revoked proxy or throwing getter is unsafe to expose at the boundary.
  }
}

function collectSensitiveSkillReferences(
  value: unknown,
  sensitive: SensitiveSkillReferences,
  visited: WeakSet<object>
): void {
  if (!value || typeof value !== "object" || visited.has(value)) return;
  visited.add(value);

  try {
    for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
      if (isSkillErrorKey(key)) {
        markSensitiveSkillReference(entry, sensitive);
      } else {
        collectSensitiveSkillReferences(entry, sensitive, visited);
      }
    }
  } catch {
    markSensitiveSkillReference(value, sensitive);
  }
}

type SkillProjectionContext = {
  active: WeakSet<object>;
  projected: WeakMap<object, unknown>;
  sensitive: SensitiveSkillReferences;
};

function projectNestedSkillErrorSubtrees(value: unknown, context: SkillProjectionContext): unknown {
  if (typeof value === "string") {
    return context.sensitive.strings.has(value) ? sanitizeErrorMessage(value) : value;
  }
  if (!value || typeof value !== "object") return value;
  if (context.active.has(value)) return "[circular]";
  if (context.projected.has(value)) return context.projected.get(value);

  if (context.sensitive.objects.has(value)) {
    const safeValue = sanitizeUpstreamDetails(value);
    context.projected.set(value, safeValue);
    return safeValue;
  }

  context.active.add(value);
  if (Array.isArray(value)) {
    const projected: unknown[] = [];
    context.projected.set(value, projected);
    for (const entry of value) projected.push(projectNestedSkillErrorSubtrees(entry, context));
    context.active.delete(value);
    return projected;
  }

  const projected: Record<string, unknown> = {};
  context.projected.set(value, projected);
  for (const [key, entry] of Object.entries(value as Record<string, unknown>)) {
    projected[key] = isSkillErrorKey(key)
      ? sanitizeUpstreamDetails(entry)
      : projectNestedSkillErrorSubtrees(entry, context);
  }
  context.active.delete(value);
  return projected;
}

function skillFailureMessage(output: Record<string, unknown>): string {
  try {
    for (const candidate of [output.message, output.reason, output.statusText, output.error]) {
      if (typeof candidate === "string" || candidate instanceof Error) {
        return toSafeSkillErrorMessage(candidate);
      }
    }
  } catch {
    // Fall through to the stable public message.
  }
  return "Skill execution failed";
}

export function projectSkillOutputForBoundary(
  output: Record<string, unknown>
): Record<string, unknown> {
  try {
    if (isSkillFailureOutput(output)) {
      const projected = sanitizeUpstreamDetails(output);
      return projected && typeof projected === "object" && !Array.isArray(projected)
        ? (projected as Record<string, unknown>)
        : { success: false, error: "Skill execution failed" };
    }

    const sensitive: SensitiveSkillReferences = {
      objects: new WeakSet<object>(),
      strings: new Set<string>(),
    };
    collectSensitiveSkillReferences(output, sensitive, new WeakSet<object>());
    return projectNestedSkillErrorSubtrees(output, {
      active: new WeakSet<object>(),
      projected: new WeakMap<object, unknown>(),
      sensitive,
    }) as Record<string, unknown>;
  } catch {
    return { success: false, error: "Skill execution failed" };
  }
}

class SkillExecutor {
  private static instance: SkillExecutor;
  private handlers: Map<string, SkillHandler> = new Map();
  private timeout: number = 30000;
  private maxRetries: number = 3;

  private constructor() {}

  static getInstance(): SkillExecutor {
    if (!SkillExecutor.instance) {
      SkillExecutor.instance = new SkillExecutor();
    }
    return SkillExecutor.instance;
  }

  registerHandler(name: string, handler: SkillHandler): void {
    this.handlers.set(name, handler);
  }

  setTimeout(ms: number): void {
    this.timeout = ms;
  }

  setMaxRetries(count: number): void {
    this.maxRetries = count;
  }

  async execute(
    skillName: string,
    input: Record<string, unknown>,
    context: { apiKeyId: string; sessionId?: string }
  ): Promise<SkillExecution> {
    const settings = await getSettings();
    if (settings.skillsEnabled === false) {
      throw new Error("Skills execution is disabled. Enable Skills in Settings > AI.");
    }

    const skill = skillRegistry.getSkill(skillName, context.apiKeyId);
    if (!skill) {
      throw new Error(`Skill not found: ${skillName}`);
    }

    if (!skill.enabled) {
      throw new Error(`Skill is disabled: ${skillName}`);
    }

    const db = getDbInstance();
    const executionId = randomUUID();
    const startTime = Date.now();

    log.info("skills.executor.start", { skillId: skill.id, skillName, apiKeyId: context.apiKeyId });

    try {
      db.prepare(
        `INSERT INTO skill_executions (id, skill_id, api_key_id, session_id, input, status, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      ).run(
        executionId,
        skill.id,
        context.apiKeyId,
        context.sessionId || null,
        JSON.stringify(input),
        SkillStatus.RUNNING,
        new Date().toISOString()
      );

      let handler = this.handlers.get(skill.handler);
      if (!handler) {
        // Builtin handlers are registered by instrumentation-node at startup,
        // but Next.js may compile this module into multiple chunks (each with
        // its own SkillExecutor singleton). Fall back to the builtin registry
        // so `POST /api/skills/executions` works regardless of which chunk the
        // route is served from.
        const builtin = builtinSkills[skill.handler];
        if (builtin) {
          this.handlers.set(skill.handler, builtin);
          handler = builtin;
        }
      }
      if (!handler) {
        throw new Error(`Handler not found: ${skill.handler}`);
      }

      let output: Record<string, unknown> | null = null;
      let errorMessage: string | null = null;
      let status = SkillStatus.SUCCESS;

      try {
        const result = await this.executeWithTimeout(
          handler(input, { apiKeyId: context.apiKeyId, sessionId: context.sessionId || "" })
        );
        const resultIsFailure = isSkillFailureOutput(result);
        output = projectSkillOutputForBoundary(result);
        if (resultIsFailure) {
          errorMessage = skillFailureMessage(result);
          status = SkillStatus.ERROR;
        }
      } catch (err) {
        errorMessage = toSafeSkillErrorMessage(err);
        status = SkillStatus.ERROR;
      }

      const durationMs = Date.now() - startTime;

      db.prepare(
        `UPDATE skill_executions SET output = ?, status = ?, error_message = ?, duration_ms = ? WHERE id = ?`
      ).run(output ? JSON.stringify(output) : null, status, errorMessage, durationMs, executionId);

      log.info("skills.executor.complete", {
        skillId: skill.id,
        success: status === SkillStatus.SUCCESS,
        durationMs,
      });

      return {
        id: executionId,
        skillId: skill.id,
        apiKeyId: context.apiKeyId,
        sessionId: context.sessionId || "",
        input,
        output,
        status,
        errorMessage,
        durationMs,
        createdAt: new Date(),
      };
    } catch (err) {
      const durationMs = Date.now() - startTime;
      const errorMessage = toSafeSkillErrorMessage(err);

      db.prepare(
        `UPDATE skill_executions SET status = ?, error_message = ?, duration_ms = ? WHERE id = ?`
      ).run(SkillStatus.ERROR, errorMessage, durationMs, executionId);

      throw err;
    }
  }

  private async executeWithTimeout<T>(promise: Promise<T>): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error("Skill execution timed out")), this.timeout)
      ),
    ]);
  }

  getExecution(executionId: string): SkillExecution | undefined {
    const db = getDbInstance();
    const row = db.prepare("SELECT * FROM skill_executions WHERE id = ?").get(executionId) as any;
    if (!row) return undefined;

    return {
      id: row.id,
      skillId: row.skill_id,
      apiKeyId: row.api_key_id,
      sessionId: row.session_id || "",
      input: JSON.parse(row.input),
      output: row.output ? JSON.parse(row.output) : null,
      status: row.status as SkillStatus,
      errorMessage: row.error_message,
      durationMs: row.duration_ms,
      createdAt: new Date(row.created_at),
    };
  }

  listExecutions(apiKeyId?: string, limit: number = 50, offset: number = 0): SkillExecution[] {
    const db = getDbInstance();
    const rows = apiKeyId
      ? db
          .prepare(
            "SELECT * FROM skill_executions WHERE api_key_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?"
          )
          .all(apiKeyId, limit, offset)
      : db
          .prepare("SELECT * FROM skill_executions ORDER BY created_at DESC LIMIT ? OFFSET ?")
          .all(limit, offset);

    return (rows as any[]).map((row) => ({
      id: row.id,
      skillId: row.skill_id,
      apiKeyId: row.api_key_id,
      sessionId: row.session_id || "",
      input: JSON.parse(row.input),
      output: row.output ? JSON.parse(row.output) : null,
      status: row.status as SkillStatus,
      errorMessage: row.error_message,
      durationMs: row.duration_ms,
      createdAt: new Date(row.created_at),
    }));
  }

  countExecutions(apiKeyId?: string): number {
    const db = getDbInstance();
    const row = apiKeyId
      ? (db
          .prepare("SELECT COUNT(*) as count FROM skill_executions WHERE api_key_id = ?")
          .get(apiKeyId) as any)
      : (db.prepare("SELECT COUNT(*) as count FROM skill_executions").get() as any);
    return row?.count ?? 0;
  }
}

export const skillExecutor = SkillExecutor.getInstance();
