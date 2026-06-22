// Auto-extracted from open-sse/handlers/imageGeneration.ts in PR-#4582-batch
// Family: haiper | Module: haiper | Lines: 3315-3426 (112 LOC)
// Ref: see open-sse/handlers/imageGeneration.ts top-of-file comment for split rationale

async function handleHaiperImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials?.apiKey || "";
  const prompt = typeof body.prompt === "string" ? body.prompt : String(body.prompt ?? "");
  if (log) {
    log.info("IMAGE", `${provider}/${model} (haiper) | prompt: "${prompt.slice(0, 60)}..."`);
  }
  try {
    const res = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", HAIPER_KEY: token },
      body: JSON.stringify({ prompt, aspect_ratio: body.aspect_ratio || "16:9" }),
    });
    if (!res.ok) {
      const errorText = await res.text();
      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: res.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});
      return { success: false, status: res.status, error: errorText };
    }
    const { job_id } = await res.json();
    const deadline = Date.now() + 300000;
    while (Date.now() < deadline) {
      await sleep(5000);
      const statusRes = await fetch(`${providerConfig.statusUrl}/${job_id}`, {
        headers: { HAIPER_KEY: token },
      });
      const status = await statusRes.json();
      if (status.status === "completed" || status.status === "succeeded") {
        const imgUrl = status.creation_url || status.output?.image_url;
        if (imgUrl) {
          const imgRes = await fetch(imgUrl);
          if (!imgRes.ok) {
            return {
              success: false,
              status: imgRes.status,
              error: `Failed to download image: ${imgRes.status}`,
            };
          }
          const buf = await imgRes.arrayBuffer();
          saveCallLog({
            method: "POST",
            path: "/v1/images/generations",
            status: 200,
            model: `${provider}/${model}`,
            provider,
            duration: Date.now() - startTime,
          }).catch(() => {});
          return {
            success: true,
            data: {
              created: Math.floor(Date.now() / 1000),
              data: [{ b64_json: Buffer.from(buf).toString("base64") }],
            },
          };
        }
      }
      if (status.status === "failed") {
        saveCallLog({
          method: "POST",
          path: "/v1/images/generations",
          status: 502,
          model: `${provider}/${model}`,
          provider,
          duration: Date.now() - startTime,
          error: "Haiper image generation failed",
        }).catch(() => {});
        return { success: false, status: 502, error: "Haiper image generation failed" };
      }
    }
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 504,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: "Haiper image generation timed out",
    }).catch(() => {});
    return { success: false, status: 504, error: "Haiper image generation timed out" };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} haiper error: ${err.message}`);
    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 502,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      error: err.message,
    }).catch(() => {});
    return {
      success: false,
      status: 502,
      error: `Image provider error: ${sanitizeErrorMessage((err as Error).message || err)}`,
    };
  }
}

