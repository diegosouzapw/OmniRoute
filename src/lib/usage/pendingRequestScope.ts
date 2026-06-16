import {
  finalizePendingRequest,
  finalizePendingRequestById,
  updatePendingRequest,
  updatePendingRequestById,
  type PendingRequestMetadata,
} from "./usageHistory";

export type PendingRequestScope = {
  id: string | null | undefined;
  model: string;
  provider: string;
  connectionId: string | null;
};

export function updatePendingScope(scope: PendingRequestScope, metadata: PendingRequestMetadata) {
  if (!updatePendingRequestById(scope.id || null, metadata)) {
    updatePendingRequest(scope.model, scope.provider, scope.connectionId, metadata);
  }
}

export function finalizePendingScope(scope: PendingRequestScope, metadata: PendingRequestMetadata) {
  if (!finalizePendingRequestById(scope.id, metadata)) {
    finalizePendingRequest(scope.model, scope.provider, scope.connectionId, metadata);
  }
}
