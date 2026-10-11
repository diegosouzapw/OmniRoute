import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { randomUUID } from "node:crypto";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "video-reject-12150-"));
Object.assign(process.env, {
  DATA_DIR: dataDir,
  OMNIROUTE_PLUGINS_DIR: path.join(dataDir, "plugins"),
  APP_LOG_TO_FILE: "false",
  DISABLE_SQLITE_AUTO_BACKUP: "true",
});

test("pre-dispatch rejection logs redact video cues without mutating live input", async (t) => {
  const core = await import("../../src/lib/db/core.ts");
  const logs = await import("../../src/lib/usage/callLogs.ts");
  const { logAdmissionRejection, logHandlerRejection } =
    await import("../../src/sse/handlers/admissionRejectionLog.ts");
  t.after(async () => {
    await logs.closeCallLogSaves(30_000);
    core.closeDbInstance({ checkpointMode: null });
    fs.rmSync(dataDir, { recursive: true, force: true });
  });
  for (const container of ["messages", "input"]) {
    await t.test(
      `${container}: persisted video transcript is absent; ordinary transcript field survives`,
      async () => {
        const privateText = "PRIVATE_REJECTED_VIDEO_12150";
        const body = {
          [container]: [
            {
              role: "user",
              content: [
                {
                  type: "input_video",
                  video_url: "data:video/mp4;base64,QUJD",
                  transcript: { cues: [{ text: privateText }] },
                },
                { type: "text", text: "ordinary", transcript: "ordinary metadata" },
              ],
            },
          ],
        };
        const original = structuredClone(body);
        const correlationId = randomUUID();
        const response = Response.json(
          { error: { code: "model_not_allowed", message: "Not allowed" } },
          { status: 403 }
        );
        await logAdmissionRejection(response, {
          path: "/v1/chat/completions",
          model: "openai/gpt-4.1-mini",
          requestBody: body,
          apiKeyId: null,
          apiKeyName: null,
          correlationId,
        });
        await logs.waitForCallLogSaves(30_000);
        const rows = await logs.getCallLogs({ correlationId, limit: 1 });
        assert.equal(rows.length, 1);
        const detail = await logs.getCallLogById(rows[0].id);
        assert(
          !JSON.stringify(detail).includes(privateText),
          "rejected call log retained video cues"
        );
        assert(JSON.stringify(detail).includes("ordinary metadata"));
        assert.deepEqual(body, original);
        assert.deepEqual(await response.json(), {
          error: { code: "model_not_allowed", message: "Not allowed" },
        });
      }
    );
  }
  await t.test("handler wrapper returns the original rejection object", () => {
    const response = Response.json({ error: { message: "no" } }, { status: 400 });
    assert.equal(
      logHandlerRejection(response, {
        path: "/v1/chat/completions",
        model: "none",
        requestBody: null,
        apiKeyId: null,
        apiKeyName: null,
        correlationId: randomUUID(),
      }),
      response
    );
  });
});
