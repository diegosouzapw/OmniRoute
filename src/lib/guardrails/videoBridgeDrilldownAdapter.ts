/** Publish already-derived frames only after successful, explicitly consented analysis. */
import { createHash } from "node:crypto";

import {
  extractVideoFramesViaBroker,
  type BrokerExtractionResult,
} from "./videoBridgeBrokerClient";
import {
  getSharedVideoDrilldownLifecycle,
  isVideoDrilldownRequestEnabled,
} from "./videoBridgeDrilldownStore";
import { describeVideoPart, type DescribeVideoDependencies } from "./videoBridgeHelpers";

export function createVideoDrilldownAdapter(
  input: {
    principalId: unknown;
    settings: Record<string, unknown>;
  },
  describe: typeof describeVideoPart
): typeof describeVideoPart {
  return async (part, options, caption, dependencies = {}, preloadedBytes) => {
    if (!isVideoDrilldownRequestEnabled(part, input.settings, input.principalId)) {
      return describe(part, options, caption, dependencies, preloadedBytes);
    }
    const principalId = input.principalId;
    let extracted: BrokerExtractionResult | undefined;
    let parentContentHash = "";
    const adapted: DescribeVideoDependencies = {
      ...dependencies,
      extractFrames: async (bytes, extraction) => {
        const result = await (dependencies.extractFrames ?? extractVideoFramesViaBroker)(
          bytes,
          extraction
        );
        extracted = result;
        parentContentHash = `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
        return result;
      },
    };
    const described = await describe(part, options, caption, adapted, preloadedBytes);
    if (!extracted || options.signal?.aborted) return described;
    try {
      const lifecycle = getSharedVideoDrilldownLifecycle();
      const drilldown = await lifecycle.produce(
        principalId,
        {
          durationSeconds: extracted.durationSeconds,
          frames: extracted.frames,
          derivation: {
            parentContentHash,
            policy: extracted.sampling?.policyEffective ?? "uniform",
            version: "video-drilldown/v1",
          },
        },
        { signal: options.signal }
      );
      if (options.signal?.aborted) {
        lifecycle.deleteHandle(principalId, drilldown.handle);
        return described;
      }
      return { ...described, drilldown };
    } catch {
      // Optional frame retention must never discard a usable visual response or leak errors.
      return described;
    }
  };
}
