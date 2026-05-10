/**
 * Combo — a routing group that distributes requests across provider nodes.
 */
export interface Combo {
  id: string;
  name: string;
  model: string;
  strategy: ComboStrategy;
  isActive: boolean;
  nodes: ComboNode[];
  maxRetries: number;
  retryDelayMs: number;
  fallbackDelayMs?: number;
  timeoutMs: number;
  healthCheckEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ComboStrategy = "priority" | "weighted" | "round-robin" | "context-relay";

export interface ComboNode {
  connectionId: string;
  provider: string;
  weight: number;
  priority: number;
}
