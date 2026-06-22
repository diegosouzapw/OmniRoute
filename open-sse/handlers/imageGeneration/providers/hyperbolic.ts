// Auto-extracted from open-sse/handlers/imageGeneration.ts in PR-#4582-batch
// Family: hyperbolic | Module: hyperbolic | Lines: 2661-2758 (98 LOC)
// Ref: see open-sse/handlers/imageGeneration.ts top-of-file comment for split rationale

async function handleHyperbolicImageGeneration({
  model,
  provider,
  providerConfig,
  body,
  credentials,
  log,
}) {
  const startTime = Date.now();
  const token = credentials.apiKey || credentials.accessToken;

  const [width, height] = (body.size || "1024x1024").split("x").map(Number);

  const upstreamBody = {
    model_name: model,
    prompt: body.prompt,
    height: height || 1024,
    width: width || 1024,
    backend: "auto",
  };

  if (log) {
    const promptPreview = String(body.prompt ?? "").slice(0, 60);
    log.info("IMAGE", `${provider}/${model} (hyperbolic) | prompt: "${promptPreview}..."`);
  }

  try {
    const response = await fetch(providerConfig.baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(upstreamBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      if (log)
        log.error("IMAGE", `${provider} error ${response.status}: ${errorText.slice(0, 200)}`);

      saveCallLog({
        method: "POST",
        path: "/v1/images/generations",
        status: response.status,
        model: `${provider}/${model}`,
        provider,
        duration: Date.now() - startTime,
        error: errorText.slice(0, 500),
      }).catch(() => {});

      return { success: false, status: response.status, error: errorText };
    }

    const data = await response.json();
    // Transform { images: [{ image: base64 }] } → OpenAI format
    const images = (data.images || []).map((img) => ({
      b64_json: img.image,
      revised_prompt: body.prompt,
    }));

    saveCallLog({
      method: "POST",
      path: "/v1/images/generations",
      status: 200,
      model: `${provider}/${model}`,
      provider,
      duration: Date.now() - startTime,
      responseBody: { images_count: images.length },
    }).catch(() => {});

    return {
      success: true,
      data: { created: Math.floor(Date.now() / 1000), data: images },
    };
  } catch (err) {
    if (log) log.error("IMAGE", `${provider} fetch error: ${err.message}`);
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

/**
 * Handle NanoBanana image generation
 * NanoBanana is async (submit task -> poll status -> return final image URL/base64)
 */
