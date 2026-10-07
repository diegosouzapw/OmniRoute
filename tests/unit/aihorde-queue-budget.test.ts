import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

process.env.DATA_DIR = mkdtempSync(join(tmpdir(), "omniroute-aihorde-queue-"));

import { handleAiHordeImageGeneration } from "../../open-sse/handlers/imageGeneration/providers/aihorde.ts";
import { aiHordeImageCatalog } from "../../open-sse/services/aihordeImageCatalog.ts";

/**
 * Очередь Horde известна с первого ответа — отказывать надо там же.
 *
 * `/v2/generate/check` возвращает `wait_time` и `queue_position` сразу. Пока
 * они не читались, запрос на модель с длинной очередью опрашивал Horde раз в
 * секунду весь бюджет и падал по таймауту, ничего не объяснив. Живая проверка
 * 2026-08-30: модель `Deliberate` (3 воркера) ответила `wait_time: 1478,
 * queue_position: 321` — 25 минут при бюджете в 10. Ждать было бессмысленно
 * ещё до первого опроса, а пользователь узнавал об этом через десять минут.
 *
 * Для сравнения `stable_diffusion` (10 воркеров) в тот же момент отдал картинку
 * за 10.4 секунды — то есть отказ должен быть про эту модель и эту очередь, а
 * не про Horde вообще, и должен подсказывать, что делать.
 */

const HORDE_JOB_ID = "queue-budget-job";

function stubHordeQueue({ waitTimeSeconds }: { waitTimeSeconds: number }) {
  const calls: string[] = [];
  globalThis.fetch = (async (input: string | URL, init?: RequestInit) => {
    const url = String(input);
    const method = (init?.method || "GET").toUpperCase();
    calls.push(`${method} ${url}`);

    if (url.endsWith("/v2/generate/async")) {
      return new Response(JSON.stringify({ id: HORDE_JOB_ID, kudos: 6 }), { status: 202 });
    }
    if (url.includes("/v2/generate/check/")) {
      return new Response(
        JSON.stringify({
          done: false,
          faulted: false,
          is_possible: true,
          waiting: 1,
          wait_time: waitTimeSeconds,
          queue_position: 321,
          eligible_workers: 3,
        }),
        { status: 200 }
      );
    }
    return new Response("{}", { status: 200 });
  }) as typeof fetch;
  return calls;
}

const originalFetch = globalThis.fetch;

test.beforeEach(() => {
  aiHordeImageCatalog.replace([
    { name: "Deliberate", count: 3, queued: 0, eta: 1478, performance: 1, jobs: 0 },
  ]);
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test("refuses immediately when the queue cannot fit the remaining budget", async () => {
  const calls = stubHordeQueue({ waitTimeSeconds: 1478 });

  const started = Date.now();
  const result = await handleAiHordeImageGeneration({
    model: "Deliberate",
    provider: "aihorde",
    body: { model: "aihorde/Deliberate", prompt: "hello world" },
    credentials: { apiKey: "horde-key" },
    timeoutMs: 600_000,
  });

  assert.equal(result.success, false);
  assert.equal(result.status, 504);
  assert.match(String(result.error), /queue/i);
  assert.match(String(result.error), /1478|25/, "в отказе должно быть названо ожидание");

  assert.ok(
    Date.now() - started < 30_000,
    "отказ обязан прийти сразу, а не после выработки бюджета"
  );
  const checks = calls.filter((c) => c.includes("/v2/generate/check/"));
  assert.equal(checks.length, 1, "хватает одного опроса, чтобы узнать очередь");
});

test("keeps waiting when the queue fits the budget", async () => {
  // Ожидание заведомо помещается в бюджет: 2 секунды очереди против 6.
  const calls = stubHordeQueue({ waitTimeSeconds: 2 });

  const result = await handleAiHordeImageGeneration({
    model: "Deliberate",
    provider: "aihorde",
    body: { model: "aihorde/Deliberate", prompt: "hello world" },
    credentials: { apiKey: "horde-key" },
    timeoutMs: 6_000,
  });

  // Заглушка никогда не отвечает done, поэтому запрос доходит до собственного
  // таймаута — важно, что он до него дошёл, а не был отбит по очереди.
  assert.equal(result.success, false);
  assert.ok(
    calls.filter((c) => c.includes("/v2/generate/check/")).length > 1,
    "короткая очередь не должна приводить к раннему отказу"
  );
});
