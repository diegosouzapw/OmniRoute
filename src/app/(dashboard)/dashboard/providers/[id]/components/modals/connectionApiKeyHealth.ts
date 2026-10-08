export type ApiKeyHealthEntry = {
  status: "active" | "warning" | "invalid";
  failures: number;
  lastFailure: string | null;
  totalRequests?: number;
  totalFailures?: number;
};

export type ApiKeyHealthMap = Record<string, ApiKeyHealthEntry>;
