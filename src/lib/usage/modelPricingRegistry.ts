export interface ModelPricing {
  providerId: string;
  modelId: string;
  inputPricePerMillionTokens?: number;
  outputPricePerMillionTokens?: number;
  source?: string;
  effectiveAt?: string;
}

export class ModelPricingRegistry {
  private readonly entries = new Map<string, ModelPricing>();

  private key(providerId: string, modelId: string): string {
    return `${providerId.trim().toLowerCase()}\0${modelId.trim().toLowerCase()}`;
  }

  set(pricing: ModelPricing): void {
    this.entries.set(this.key(pricing.providerId, pricing.modelId), { ...pricing });
  }

  get(providerId: string, modelId: string): ModelPricing | undefined {
    return this.entries.get(this.key(providerId, modelId));
  }

  estimate(
    providerId: string,
    modelId: string,
    inputTokens = 0,
    outputTokens = 0
  ): number | undefined {
    const pricing = this.get(providerId, modelId);
    if (!pricing) return undefined;
    const input =
      pricing.inputPricePerMillionTokens === undefined
        ? 0
        : (inputTokens * pricing.inputPricePerMillionTokens) / 1_000_000;
    const output =
      pricing.outputPricePerMillionTokens === undefined
        ? 0
        : (outputTokens * pricing.outputPricePerMillionTokens) / 1_000_000;
    if (
      pricing.inputPricePerMillionTokens === undefined &&
      pricing.outputPricePerMillionTokens === undefined
    )
      return undefined;
    return Number((input + output).toFixed(12));
  }

  list(): ModelPricing[] {
    return [...this.entries.values()].map((entry) => ({ ...entry }));
  }
}
