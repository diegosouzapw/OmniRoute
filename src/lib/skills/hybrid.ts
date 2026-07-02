export type ExecutionMode = "direct" | "sandbox" | "hybrid";

export interface HybridConfig {
  defaultMode: ExecutionMode;
  autoUpgrade: boolean;
  maxDirectDuration: number;
}

const defaultHybridConfig: HybridConfig = {
  defaultMode: "direct",
  autoUpgrade: true,
  maxDirectDuration: 5000,
};

export class HybridExecutor {
  private config: HybridConfig;
  private directExecutor: any;
  private sandboxRunner: any;

  constructor(config: Partial<HybridConfig> = {}) {
    this.config = { ...defaultHybridConfig, ...config };
  }

  setConfig(config: Partial<HybridConfig>): void {
    this.config = { ...this.config, ...config };
  }

  async execute(skillName: string, input: any, context: any): Promise<any> {
    const startTime = Date.now();
    const estimatedDuration = input.estimatedDuration || 0;

    if (this.shouldUseSandbox(estimatedDuration)) {
      return this.executeInSandbox(skillName, input, context);
    }

    try {
      return await this.executeDirect(skillName, input, context);
    } catch (err) {
      if (this.config.autoUpgrade && this.isRetryable(err)) {
        return this.executeInSandbox(skillName, input, context);
      }
      throw err;
    }
  }

  private shouldUseSandbox(estimatedDuration: number): boolean {
    if (this.config.defaultMode === "sandbox") return true;
    if (this.config.defaultMode === "direct") return false;
    return estimatedDuration > this.config.maxDirectDuration;
  }

  private async executeDirect(skillName: string, input: any, context: any): Promise<any> {
    return { mode: "direct", result: {} };
  }

  private async executeInSandbox(skillName: string, input: any, context: any): Promise<any> {
    return { mode: "sandbox", result: {} };
  }

  private isRetryable(err: any): boolean {
    if (err?.message?.includes("timeout")) return true;
    if (err?.message?.includes("memory")) return true;
    return false;
  }
}

export const hybridExecutor = new HybridExecutor();
