import fs from "fs";

async function testAllModels() {
  const modelsText = fs.readFileSync("/tmp/omniroute_models.txt", "utf8");
  const models = modelsText.split("\n").filter((m) => m.trim().length > 0);

  console.log(`Starting test for ${models.length} models...`);

  const results = { success: [], failed: [] };
  const BATCH_SIZE = 10;

  for (let i = 0; i < models.length; i += BATCH_SIZE) {
    const batch = models.slice(i, i + BATCH_SIZE);

    const promises = batch.map(async (model) => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);

        const res = await fetch("http://localhost:20128/v1/chat/completions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: "OK" }],
            max_tokens: 5,
            stream: false,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (res.ok) {
          return { model, status: "success" };
        } else {
          const err = await res.text().catch(() => "");
          return { model, status: "failed", reason: `HTTP ${res.status}: ${err.slice(0, 50)}` };
        }
      } catch (e) {
        return { model, status: "failed", reason: e.message };
      }
    });

    const batchResults = await Promise.all(promises);
    batchResults.forEach((r) => {
      if (r.status === "success") results.success.push(r.model);
      else results.failed.push({ model: r.model, reason: r.reason });
    });

    process.stdout.write(`.`);
  }

  console.log(`\n\nTest completed.`);
  console.log(`✅ Success: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);

  fs.writeFileSync("/tmp/model_test_results.json", JSON.stringify(results, null, 2));
}

testAllModels().catch(console.error);
