import { parentPort, workerData } from "node:worker_threads";

import { findDeepSeekPowNonce, MAX_DEEPSEEK_POW_DIFFICULTY } from "./deepseek-pow-hash.js";

if (!parentPort) {
  throw new Error("DeepSeek PoW worker requires a parent port");
}

const { challenge, prefix, difficulty } = workerData;
if (
  typeof challenge !== "string" ||
  typeof prefix !== "string" ||
  !Number.isSafeInteger(difficulty) ||
  difficulty < 1 ||
  difficulty > MAX_DEEPSEEK_POW_DIFFICULTY
) {
  throw new Error("DeepSeek PoW worker received invalid input");
}

parentPort.postMessage(findDeepSeekPowNonce(prefix, challenge, difficulty));
