import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Страж соответствия реестра и диспетчера видео.
 *
 * `GET /v1/videos/generations` рекламирует всё, что лежит в VIDEO_PROVIDERS без
 * пометки `unsupported`. Диспетчер `handleVideoGeneration` умеет меньше: он
 * разбирает `providerConfig.format` цепочкой ветвлений плюс job-пресетами, а на
 * незнакомом формате отвечает `Unsupported video format`. Пока списки
 * расходятся, каталог обещает модели, которые исполнитель гарантированно
 * отвергает с 400 — независимо от ключей и баланса. Живая проверка 2026-08-30:
 * `minimax/MiniMax-Hailuo-02`, `pollinations/default` и `nanogpt/default`
 * отдавали ровно этот 400, будучи в выдаче каталога.
 *
 * Разбор идёт по тексту диспетчера, а не вызовом: неизвестный формат виден до
 * первого сетевого запроса, а живой вызов каждого провайдера в юнит-тесте либо
 * уходит в сеть, либо виснет на ретраях. Цена — тест надо поправить, если
 * цепочку `format === "..."` заменят на другую конструкцию; тогда счётчик
 * распознанных форматов упадёт до нуля и страж ниже скажет об этом прямо.
 */

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "../..");

const { VIDEO_PROVIDERS } = await import("../../open-sse/config/videoRegistry.ts");

function readSource(relativePath: string) {
  return fs.readFileSync(path.join(REPO_ROOT, relativePath), "utf8");
}

/** Форматы, для которых у диспетчера есть собственная ветка. */
function branchFormats() {
  const source = readSource("open-sse/handlers/videoGeneration.ts");
  return new Set(
    [...source.matchAll(/providerConfig\.format === "([a-z0-9-]+)"/g)].map((match) => match[1])
  );
}

/** Форматы, которые обслуживает общий submit → poll конвейер job-пресетов. */
function jobPresetFormats() {
  const source = readSource("open-sse/handlers/videoGeneration/job.ts");
  const block = source.slice(source.indexOf("VIDEO_JOB_PRESETS"));
  return new Set([...block.matchAll(/^\s{2}"([a-z0-9-]+)":\s*\{/gm)].map((match) => match[1]));
}

test("dispatcher formats are still discoverable in the source", () => {
  assert.ok(
    branchFormats().size >= 10,
    "в videoGeneration.ts не нашлось ветвлений по providerConfig.format — " +
      "диспетчер переписан, и разбор в этом тесте пора обновить"
  );
  assert.ok(
    jobPresetFormats().size >= 1,
    "в videoGeneration/job.ts не нашлось job-пресетов — разбор пора обновить"
  );
});

test("every advertised video provider declares a format the dispatcher handles", () => {
  const dispatchable = new Set([...branchFormats(), ...jobPresetFormats()]);

  const broken = Object.entries(VIDEO_PROVIDERS)
    .filter(([, config]) => !config.unsupported)
    .filter(([, config]) => !dispatchable.has(config.format))
    .map(([providerId, config]) => `${providerId} (format: ${config.format})`);

  assert.deepEqual(
    broken,
    [],
    "каталог рекламирует провайдеров, чей формат диспетчер не разбирает — " +
      "либо добавьте ветку, либо пометьте провайдера unsupported:\n  " +
      broken.join("\n  ")
  );
});

test("unsupported providers state a reason", () => {
  const silent = Object.entries(VIDEO_PROVIDERS)
    .filter(([, config]) => config.unsupported)
    .filter(([, config]) => !config.unsupportedReason?.trim())
    .map(([providerId]) => providerId);

  assert.deepEqual(silent, [], "провайдер снят с витрины без причины: " + silent.join(", "));
});
