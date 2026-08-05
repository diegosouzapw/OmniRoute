import { ChatGptBrowserWorker } from "../../vendor/codex-chatgpt-web/adapters/chatgpt-web/browser-worker.ts";
import { TurnBroker } from "../../vendor/codex-chatgpt-web/adapters/chatgpt-web/turn-broker.ts";
import { chatGptTurnSessions } from "../../vendor/codex-chatgpt-web/adapters/chatgpt-web/turn-execution.ts";
import { connectionRuntimePaths } from "./storageState.ts";
import { stopChatGptWebCodexTunnelRuntime } from "./tunnelClient.ts";

const activeWorkers = new Set<ChatGptBrowserWorker>();
const activeBrokers = new Set<TurnBroker>();

export function trackChatGptWebCodexRuntime(
  worker: ChatGptBrowserWorker,
  brokerSocketPath: string
): void {
  activeWorkers.add(worker);
  activeBrokers.add(TurnBroker.forSocket(brokerSocketPath));
}

export function getChatGptWebCodexRuntimeCounts(): {
  activeTurns: number;
  waitingTurns: number;
  browserWorkers: number;
  brokers: number;
} {
  return {
    activeTurns: chatGptTurnSessions.activeCount(),
    waitingTurns: chatGptTurnSessions.waitingCount(),
    browserWorkers: activeWorkers.size,
    brokers: activeBrokers.size,
  };
}

export async function stopChatGptWebCodexRuntime(): Promise<void> {
  chatGptTurnSessions.clear();
  const workers = [...activeWorkers];
  const brokers = [...activeBrokers];
  activeWorkers.clear();
  activeBrokers.clear();
  await Promise.allSettled(workers.map((worker) => worker.close()));
  await Promise.allSettled(brokers.map((broker) => broker.close()));
  await stopChatGptWebCodexTunnelRuntime();
}

export function brokerSocketPathForConnection(connectionId: string): string {
  return connectionRuntimePaths(connectionId).brokerSocketPath;
}
