/**
 * Shared ComfyUI API Client
 *
 * Used by image, video, and music handlers to submit workflows,
 * poll for completion, and fetch output files from a ComfyUI server.
 */

type JsonRecord = Record<string, unknown>;

type ComfyOutputFile = {
  filename: string;
  subfolder?: string;
  type?: string;
};

type ComfyNodeOutput = {
  images?: ComfyOutputFile[];
  gifs?: ComfyOutputFile[];
  audio?: ComfyOutputFile[];
};

type ComfyHistoryEntry = {
  outputs?: Record<string, ComfyNodeOutput>;
};

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

/**
 * Submit a workflow to ComfyUI for execution.
 * @returns The prompt_id for polling
 */
export async function submitComfyWorkflow(baseUrl: string, workflow: object): Promise<string> {
  const res = await fetch(`${baseUrl}/prompt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: workflow }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`ComfyUI submit failed (${res.status}): ${errText}`);
  }

  const data = toRecord(await res.json());
  const promptId = data.prompt_id;
  if (typeof promptId !== "string" || !promptId) {
    throw new Error("ComfyUI submit failed: missing prompt_id");
  }
  return promptId;
}

/**
 * Poll ComfyUI history endpoint until the prompt completes or times out.
 * @returns The history entry for the completed prompt
 */
export async function pollComfyResult(
  baseUrl: string,
  promptId: string,
  timeoutMs: number = 120_000
): Promise<ComfyHistoryEntry> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    await new Promise((r) => setTimeout(r, 2000));

    const res = await fetch(`${baseUrl}/history/${promptId}`);
    if (!res.ok) continue;

    const data = toRecord(await res.json());
    const entry = toRecord(data[promptId]) as ComfyHistoryEntry;

    if (entry && entry.outputs && Object.keys(entry.outputs).length > 0) {
      return entry;
    }
  }

  throw new Error(`ComfyUI prompt ${promptId} timed out after ${timeoutMs}ms`);
}

/**
 * Fetch an output file from ComfyUI.
 * @returns The file contents as ArrayBuffer
 */
export async function fetchComfyOutput(
  baseUrl: string,
  filename: string,
  subfolder: string,
  type: string
): Promise<ArrayBuffer> {
  const url = new URL(`${baseUrl}/view`);
  url.searchParams.set("filename", filename);
  url.searchParams.set("subfolder", subfolder);
  url.searchParams.set("type", type);

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`ComfyUI fetch output failed (${res.status})`);
  }

  return res.arrayBuffer();
}

/**
 * Extract output files from a ComfyUI history entry.
 * Returns an array of { filename, subfolder, type } for each output.
 */
export function extractComfyOutputFiles(
  historyEntry: ComfyHistoryEntry
): Array<{ filename: string; subfolder: string; type: string }> {
  const files: Array<{ filename: string; subfolder: string; type: string }> = [];

  for (const nodeOutput of Object.values(historyEntry.outputs || {})) {
    const outputs = nodeOutput.images || nodeOutput.gifs || nodeOutput.audio || [];
    for (const file of outputs) {
      files.push({
        filename: file.filename,
        subfolder: file.subfolder || "",
        type: file.type || "output",
      });
    }
  }

  return files;
}
