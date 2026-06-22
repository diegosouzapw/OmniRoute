---
title: "Batches & Files API"
version: 3.8.16
lastUpdated: 2026-06-08
---

# Batches & Files API

> **TL;DR**: The Batches API lets you process up to 50,000 requests asynchronously at 50% the cost. The Files API stores reusable files (training data, JSONL prompts, model outputs) for use across requests.

**Source:** `src/lib/db/batches.ts`, `src/lib/db/files.ts`, `src/lib/batches/`

**Related:**

- [API_REFERENCE.md](./API_REFERENCE.md) — request/response format
- [USAGE_QUOTA_GUIDE.md](../features/USAGE_QUOTA_GUIDE.md) — cost tracking

---

## Batches API

### Overview

The Batches API enables **asynchronous bulk processing** of chat completion requests:

- Up to **50,000 requests** per batch
- **50% cost reduction** vs sync requests (most providers)
- **24-hour completion window** (some providers offer shorter)
- **JSONL file upload** for request data
- **Output JSONL file** for results

### When to Use Batches

| Use case                           | Batches?                   |
| ---------------------------------- | -------------------------- |
| Bulk evaluation of prompts         | ✅ Yes                     |
| Generating embeddings for a corpus | ✅ Yes                     |
| Overnight data labeling            | ✅ Yes                     |
| Real-time chat                     | ❌ No (use sync)           |
| Low-latency responses              | ❌ No (use streaming sync) |

### Endpoints

| Method | Path                | Description      |
| ------ | ------------------- | ---------------- |
| POST   | `/api/batches`      | Create batch     |
| GET    | `/api/batches`      | List batches     |
| GET    | `/api/batches/[id]` | Get batch detail |

### Create a Batch

**Step 1: Upload a JSONL file with your requests**

```bash
# requests.jsonl
{"custom_id":"req-1","method":"POST","url":"/v1/chat/completions","body":{"model":"gpt-5","messages":[{"role":"user","content":"Hello"}]}}
{"custom_id":"req-2","method":"POST","url":"/v1/chat/completions","body":{"model":"gpt-5","messages":[{"role":"user","content":"World"}]}}
```

Each line is a complete request. Up to 50,000 lines per file.

**Step 2: Upload the file**

```bash
curl -X POST http://localhost:20128/api/files \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -F "purpose=batch" \
  -F "file=@requests.jsonl"
```

Response:

```json
{
  "id": "<file-id>",
  "purpose": "batch",
  "bytes": 4096,
  "filename": "requests.jsonl",
  "createdAt": "2026-06-08T12:00:00Z"
}
```

**Step 3: Create the batch**

```bash
curl -X POST http://localhost:20128/api/batches \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "inputFileId": "<file-id>",
    "endpoint": "/v1/chat/completions",
    "completionWindow": "24h",
    "metadata": {
      "project": "my-eval",
      "priority": "normal"
    }
  }'
```

Response:

```json
{
  "id": "<batch-id>",
  "object": "batch",
  "endpoint": "/v1/chat/completions",
  "inputFileId": "<file-id>",
  "completionWindow": "24h",
  "status": "validating",
  "outputFileId": null,
  "errorFileId": null,
  "createdAt": "2026-06-08T12:00:00Z",
  "inProgressAt": null,
  "expiresAt": "2026-06-09T12:00:00Z",
  "requestCounts": { "total": 0, "completed": 0, "failed": 0 }
}
```

### Batch Statuses

| Status       | Meaning                              |
| ------------ | ------------------------------------ |
| `validating` | Checking input file format           |
| `failed`     | Validation failed (check `errors`)   |
| `inProgress` | Processing requests                  |
| `finalizing` | Generating output files              |
| `completed`  | All requests done (or failed)        |
| `expired`    | Took >24h, partial results available |
| `cancelling` | Cancel requested                     |
| `cancelled`  | Cancelled, partial results available |

### Poll for Completion

```bash
curl http://localhost:20128/api/batches/<batch-id> \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

When `status` is `completed`, the response includes `outputFileId` and `errorFileId`.

### Download Results

```bash
# Successful results
curl -X GET "http://localhost:20128/api/files/<output-file-id>/content" \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  --output results.jsonl

# Failed requests
curl -X GET "http://localhost:20128/api/files/<error-file-id>/content" \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  --output errors.jsonl
```

**results.jsonl format:**
{"id":"<batch-id>-req-1","custom_id":"req-1","response":{"status_code":200,"body":{"id":"chatcmpl-...","choices":[...]}},"error":null}
{"id":"<batch-id>-req-2","custom_id":"req-2","response":{"status_code":429,"body":{"error":"rate_limit"}},"error":{...}}

````

### Cost Estimation

```python
# Estimate cost for a batch
requests = [{"model": "gpt-5", "messages": [{"role": "user", "content": "Hello"}]} for _ in range(1000)]
tokens_per_request = 100  # average

# Standard rate
standard_cost = 1000 * tokens_per_request * 0.0000025  # $0.0025/1K input

# Batch rate (50% off)
batch_cost = standard_cost * 0.5

print(f"Standard: ${standard_cost:.2f}, Batch: ${batch_cost:.2f}, Savings: ${standard_cost - batch_cost:.2f}")
````

### Cost Tracking

Batches are tracked in usage:

```bash
GET /api/usage?batchId=<batch-id>
```

The `batchId` field in usage records links the request to the originating batch.

### Error Handling

| Error            | Cause                       | Action                                |
| ---------------- | --------------------------- | ------------------------------------- |
| `invalid_file`   | JSONL malformed             | Fix file format, retry                |
| `quota_exceeded` | API key over quota          | Wait for reset or use a different key |
| `rate_limit`     | Too many concurrent batches | Wait for current batches to finish    |
| `expired`        | Batch took >24h             | Partial results in output file        |

### Webhook Integration

Get notified when batch completes:

```bash
POST /api/webhooks
{
  "url": "https://your-server.com/batch-complete",
  "events": ["batch.completed", "batch.failed"]
}
```

Webhook payload:

```json
{
  "type": "batch.completed",
  "batchId": "<batch-id>",
  "status": "completed",
  "requestCounts": { "total": 1000, "completed": 998, "failed": 2 },
  "outputFileId": "<output-file-id>",
  "errorFileId": "<error-file-id>",
  "timestamp": "2026-06-08T13:00:00Z"
}
```

### Best Practices

1. **Validate JSONL locally** before uploading (use the OmniRoute CLI)
2. **Split large batches** — process in chunks of 1,000-10,000 for faster feedback
3. **Set metadata** — helps with tracking and cost analysis
4. **Monitor via webhooks** — don't poll repeatedly
5. **Handle partial failures** — some requests may fail, retry them separately

---

## Files API

### Overview

The Files API manages **reusable files** for various purposes:

- **batch**: JSONL input for batches
- **batch_output**: JSONL output from completed batches
- **fine-tune**: Training data (future)
- **assistants**: Files for assistant threads (future)

### Endpoints

| Method | Path                      | Description      |
| ------ | ------------------------- | ---------------- |
| POST   | `/api/files`              | Upload file      |
| GET    | `/api/files`              | List files       |
| GET    | `/api/files/[id]`         | Get metadata     |
| GET    | `/api/files/[id]/content` | Download content |
| DELETE | `/api/files/[id]`         | Delete file      |

### Upload a File

```bash
curl -X POST http://localhost:20128/api/files \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -F "purpose=batch" \
  -F "file=@requests.jsonl"
```

Response:

```json
{
  "id": "<file-id>",
  "object": "file",
  "bytes": 4096,
  "createdAt": "2026-06-08T12:00:00Z",
  "filename": "requests.jsonl",
  "purpose": "batch",
  "status": "processed"
}
```

### File Limits

| Limit                 | Value                   |
| --------------------- | ----------------------- |
| Max file size         | 100 MB                  |
| Max files per API key | 1,000                   |
| Total storage per key | 10 GB                   |
| Allowed purposes      | `batch`, `batch_output` |

### File Statuses

| Status       | Meaning                                   |
| ------------ | ----------------------------------------- |
| `uploaded`   | Just received, not validated              |
| `processing` | Validation in progress                    |
| `processed`  | Ready to use                              |
| `error`      | Validation failed (check `statusDetails`) |

### List Files

```bash
GET /api/files?purpose=batch&limit=50
```

Response:

```json
{
  "data": [
    {
      "id": "<file-id>",
      "bytes": 4096,
      "filename": "requests.jsonl",
      "purpose": "batch",
      "createdAt": "2026-06-08T12:00:00Z"
    }
  ],
  "hasMore": false
}
```

### Download File Content

```bash
curl http://localhost:20128/api/files/<file-id>/content \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  --output downloaded.jsonl
```

### Delete File

```bash
curl -X DELETE http://localhost:20128/api/files/<file-id> \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

> **Note**: Files are hard-deleted immediately. Make sure to download first if needed.

### Storage & Retention

- Files persist **indefinitely** until deleted
- No automatic cleanup (unlike call log artifacts)
- Total storage per key is limited to 10 GB (configurable)
- Files are **not replicated** — they're tied to the OmniRoute instance

### Multi-Instance Deployments

In a multi-instance setup, files are stored on **whichever instance received the upload**. To share across instances:

1. Use a shared filesystem mount (`NFS`, `EFS`, etc.) at `${DATA_DIR}/files/`
2. Or upload to each instance separately (rejected by some providers)

### File Schema

Files are stored in the `files` table:

```sql
CREATE TABLE files (
  id TEXT PRIMARY KEY,             -- e.g. "file-abc123"
  api_key_id TEXT NOT NULL,         -- owning key
  purpose TEXT NOT NULL,            -- "batch" | "batch_output"
  filename TEXT NOT NULL,           -- original filename
  bytes INTEGER NOT NULL,           -- size in bytes
  mime_type TEXT,
  status TEXT NOT NULL,             -- "uploaded" | "processing" | "processed" | "error"
  storage_path TEXT NOT NULL,       -- path on disk
  metadata TEXT,                    -- JSON metadata
  created_at TEXT NOT NULL,
  expires_at TEXT
);
```

---

## Example: End-to-End Batch Workflow

```python
import requests
import json
import time

OMNIROUTE = "http://localhost:20128"
KEY = "sk-..."

headers = {"Authorization": f"Bearer {KEY}"}

# 1. Create JSONL file
requests_data = []
for i in range(100):
    requests_data.append({
        "custom_id": f"req-{i}",
        "method": "POST",
        "url": "/v1/chat/completions",
        "body": {
            "model": "gpt-5",
            "messages": [{"role": "user", "content": f"Question {i}"}]
        }
    })

with open("/tmp/requests.jsonl", "w") as f:
    for req in requests_data:
        f.write(json.dumps(req) + "\n")

# 2. Upload file
with open("/tmp/requests.jsonl", "rb") as f:
    file_resp = requests.post(
        f"{OMNIROUTE}/api/files",
        headers=headers,
        files={"file": f},
        data={"purpose": "batch"}
    ).json()

file_id = file_resp["id"]
print(f"Uploaded file: {file_id}")

# 3. Create batch
batch_resp = requests.post(
    f"{OMNIROUTE}/api/batches",
    headers=headers,
    json={
        "inputFileId": file_id,
        "endpoint": "/v1/chat/completions",
        "completionWindow": "24h"
    }
).json()

batch_id = batch_resp["id"]
print(f"Created batch: {batch_id}")

# 4. Poll for completion
while True:
    status = requests.get(
        f"{OMNIROUTE}/api/batches/{batch_id}",
        headers=headers
    ).json()

    print(f"Status: {status['status']}, completed: {status['requestCounts']['completed']}")

    if status["status"] in ("completed", "failed", "expired", "cancelled"):
        break

    time.sleep(30)

# 5. Download results
if status["outputFileId"]:
    results = requests.get(
        f"{OMNIROUTE}/api/files/{status['outputFileId']}/content",
        headers=headers
    ).text

    # Process results
    for line in results.split("\n"):
        if not line: continue
        result = json.loads(line)
        print(f"{result['custom_id']}: {result['response']['status_code']}")
```

---

## Cost Optimization Tips

### Use Batches for Non-Urgent Work

| Priority       | Use case                            | Method                |
| -------------- | ----------------------------------- | --------------------- |
| **Real-time**  | Chat, agent loops                   | Sync or streaming     |
| **Background** | Evaluation, batch processing        | **Batches** (50% off) |
| **Overnight**  | Data labeling, embedding generation | **Batches** (50% off) |

### Combine with Compression

Batches benefit from RTK compression (if using tools):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

### Use Smaller Models

For bulk work, smaller models can be 10-100x cheaper:

| Model            | Input $/1M | Output $/1M | Batch (50% off) |
| ---------------- | ---------- | ----------- | --------------- |
| gpt-5            | $2.50      | $10.00      | $1.25 / $5.00   |
| gpt-5-mini       | $0.15      | $0.60       | $0.075 / $0.30  |
| claude-opus-4-6  | $15.00     | $75.00      | $7.50 / $37.50  |
| claude-haiku-4-5 | $0.80      | $4.00       | $0.40 / $2.00   |

---

## Troubleshooting

### "Batch stuck in validating"

Check the file format:

```bash
# Each line must be valid JSON
head -1 /path/to/requests.jsonl | jq .

# Common issues:
# - Trailing commas
# - Unicode escape errors
# - Missing required fields
```

### "Output file is empty"

If the batch has all failures, `errorFileId` is set but `outputFileId` may be null. Check the error file for details.

### "File not found"

Files are per-instance. If you uploaded to instance A and the batch runs on instance B (in a multi-instance setup), the file isn't found. Use shared storage or upload to the right instance.

### "Rate limit on batches"

Most providers limit to **2-5 concurrent batches** per organization. Wait for existing batches to complete before creating new ones.

---

## See Also

- [API_REFERENCE.md](./API_REFERENCE.md) — chat completions format
- [USAGE_QUOTA_GUIDE.md](../features/USAGE_QUOTA_GUIDE.md) — cost tracking
- [INTERNAL_API_ROUTES.md](./INTERNAL_API_ROUTES.md) — full API reference
- [WEBHOOKS.md](../frameworks/WEBHOOKS.md) — webhook event setup
- Source: `src/lib/db/{batches,files}.ts`, `src/lib/batches/`
