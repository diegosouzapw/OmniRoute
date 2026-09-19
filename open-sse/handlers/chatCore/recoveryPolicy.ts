/**
 * Recovery decision table for one failed provider attempt.
 *
 * Side effects stay off the dispatch tag so a terminal 404 can lock
 * later (in chatCore providerFailure) without skipping siblings.
 * This module does not send, rotate, or lock; it only decides.
 */

import { COOLDOWN_MS } from "../../config/errorConfig.ts";
import { isModelUnavailableError } from "../../services/modelFamilyFallback.ts";

export type RecoveryView = { kind: "pipeline" };

export type RecoveryEffects = {
  lockPreviousModel?: {
    provider: string;
    connectionId: string;
    model: string;
    reason: "model_not_found";
    cooldownMs: number;
  };
  rateLimitUntil?: { connectionId: string; untilMs: number };
};

export type RecoveryDispatch =
  | { action: "retry-same"; nextBody?: unknown }
  | { action: "rotate-account"; excludeConnectionId: string }
  | { action: "fallback-model"; nextModel: string }
  | { action: "refresh-credentials" }
  | { action: "terminal" };

export type RecoveryDecision = {
  effects: RecoveryEffects;
  dispatch: RecoveryDispatch;
};

export type StreamThrowDecision = { action: "terminal" };

export type OnFailureInput = {
  // view and model are unused in onFailure today. They stay on the
  // input so a later lock fill in chatCore providerFailure can pass
  // them through without widening this type.
  view: RecoveryView;
  status: number;
  message: string;
  provider: string;
  model: string;
  connectionId: string;
  allowAccountRotation: boolean;
  allowModelFallback: boolean;
  isolateProbe: boolean;
  nextModel: string | null;
  canRefresh: boolean;
  signatureNextBody?: unknown;
};

function canRotateAccount(input: OnFailureInput): boolean {
  return input.allowAccountRotation && !input.isolateProbe;
}

export function onFailure(input: OnFailureInput): RecoveryDecision {
  if (canRotateAccount(input) && input.provider === "codex" && input.status === 429) {
    return {
      effects: {},
      dispatch: { action: "rotate-account", excludeConnectionId: input.connectionId },
    };
  }

  if (
    canRotateAccount(input) &&
    input.provider === "antigravity" &&
    input.status === 422 &&
    input.message.includes("gcp_project_required")
  ) {
    return {
      effects: {
        rateLimitUntil: {
          connectionId: input.connectionId,
          untilMs: Date.now() + (COOLDOWN_MS.gcpProjectRequired ?? 24 * 60 * 60 * 1000),
        },
      },
      dispatch: { action: "rotate-account", excludeConnectionId: input.connectionId },
    };
  }

  if ((input.status === 401 || input.status === 403) && input.canRefresh) {
    return { effects: {}, dispatch: { action: "refresh-credentials" } };
  }

  const not2xx = input.status < 200 || input.status >= 300;
  if (input.signatureNextBody !== undefined && not2xx) {
    return {
      effects: {},
      dispatch: { action: "retry-same", nextBody: input.signatureNextBody },
    };
  }

  if (
    input.allowModelFallback &&
    isModelUnavailableError(input.status, input.message, input.provider)
  ) {
    if (input.nextModel) {
      return {
        effects: {},
        dispatch: { action: "fallback-model", nextModel: input.nextModel },
      };
    }
    return { effects: {}, dispatch: { action: "terminal" } };
  }

  return { effects: {}, dispatch: { action: "terminal" } };
}

export function onStreamThrow(): StreamThrowDecision {
  return { action: "terminal" };
}
