import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { DeepSeekWebExecutor } from "../../open-sse/executors/deepseek-web.ts";

const enabled = process.env.RUN_DEEPSEEK_WEB_VISION_LIVE === "1";

for (const stream of [false, true]) {
  test(
    `DeepSeek Web recognizes a text-free image (stream=${stream})`,
    { skip: !enabled },
    async () => {
      assert.ok(
        process.env.DEEPSEEK_WEB_LIVE_TOKEN,
        "Set DEEPSEEK_WEB_LIVE_TOKEN to run the opt-in live test"
      );
      const image = readFileSync(
        new URL("../fixtures/deepseek-web/vision-shapes.png", import.meta.url)
      );
      const result = await new DeepSeekWebExecutor().execute({
        model: "deepseek-v4-flash",
        stream,
        credentials: { apiKey: process.env.DEEPSEEK_WEB_LIVE_TOKEN },
        signal: AbortSignal.timeout(180_000),
        body: {
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "In English, describe the colors and shapes in the attached image. Do not guess from filenames.",
                },
                {
                  type: "image_url",
                  image_url: { url: `data:image/png;base64,${image.toString("base64")}` },
                },
              ],
            },
          ],
        },
      });
      assert.equal(result.response.status, 200, "Expected a successful vision completion");
      const text = await result.response.text();
      let content: string;
      if (stream) {
        assert.match(text, /data: \[DONE\]/);
        content = text
          .split("\n")
          .filter((line) => line.startsWith("data: {"))
          .map((line) => JSON.parse(line.slice(6)).choices?.[0]?.delta?.content ?? "")
          .join("");
      } else {
        content = JSON.parse(text).choices[0].message.content;
      }
      assert.match(content, /red.{0,30}circle/i);
      assert.match(content, /blue.{0,30}square/i);
    }
  );
}
