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
  timeoutMs: number;
  healthCheckEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ComboStrategy = "priority" | "weighted" | "round-robin";

export interface ComboNode {
  connectionId: string;
  provider: string;
  weight: number;
  priority: number;
}
