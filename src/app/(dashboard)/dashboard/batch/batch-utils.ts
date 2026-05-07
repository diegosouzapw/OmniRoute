import { BatchRecord, FileRecord } from "@/lib/db/batches";

export function mapBatchApiToRecord(b: any): BatchRecord {
  return {
    id: b.id,
    endpoint: b.endpoint,
    completionWindow: b.completion_window,
    status: b.status,
    inputFileId: b.input_file_id,
    outputFileId: b.output_file_id,
    errorFileId: b.error_file_id,
    createdAt: b.created_at,
    inProgressAt: b.in_progress_at,
    expiresAt: b.expires_at,
    finalizingAt: b.finalizing_at,
    completedAt: b.completed_at,
    failedAt: b.failed_at,
    expiredAt: b.expired_at,
    cancellingAt: b.cancelling_at,
    cancelledAt: b.cancelled_at,
    requestCountsTotal: b.request_counts?.total ?? 0,
    requestCountsCompleted: b.request_counts?.completed ?? 0,
    requestCountsFailed: b.request_counts?.failed ?? 0,
    metadata: b.metadata,
    errors: b.errors,
    model: b.model,
    usage: b.usage,
  };
}

export function mapFileApiToRecord(f: any): FileRecord {
  return {
    id: f.id,
    filename: f.filename,
    bytes: f.bytes,
    purpose: f.purpose,
    createdAt: f.created_at,
    expiresAt: f.expires_at,
  };
}
