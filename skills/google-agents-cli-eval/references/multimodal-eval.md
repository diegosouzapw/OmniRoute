# Multimodal Evaluation

Two distinct cases are covered here:

1. **Evaluate generated image / video quality** against a text prompt.
2. **Evaluate an agent that consumes multimodal input and produces text** (e.g., the agent describes an image and we want to verify the description).

Both cases use a custom `LLMMetric` with a vision-capable judge model. The built-in adaptive metrics only inspect `text` parts, so they can't reason about media content directly — a custom metric is required for true multimodal grading.

> **Multimodal field-model note.** `agents-cli eval generate` populates `{response}` by extracting the **text** parts of the agent's final event. If your agent returns non-text parts (e.g., `inline_data` images, `file_data` URIs), those parts are not copied into `{response}` automatically. To grade with the full multimodal Content, either hand-author the eval case with a `responses[0].response` Content containing the media parts, or post-process the generated trace file to copy the media parts into `responses`.

> File paths below reference the scaffolded layout (`tests/eval/`). Adjust for your project structure if not using `google-agents-cli-scaffold`.

---

## Dataset shape for multimodal parts

Multimodal content lives inside `parts` as either `inline_data` (base64-encoded bytes with a mime type) or `file_data` (GCS URI reference). Use whichever fits — `file_data` is preferred for anything larger than a few KB.

```json
{ "inline_data": { "mime_type": "image/png", "data": "<base64>" } }
```

```json
{ "file_data": { "mime_type": "image/jpeg", "file_uri": "gs://my-bucket/photos/test.jpg" } }
```

---

## Case 1: Evaluate generated image / video against a text prompt

The eval case has the user prompt as text and the model response as a Content with a media `file_data` (or `inline_data`) part.

```json
{
  "eval_cases": [
    {
      "eval_case_id": "coffee_image",
      "prompt": {
        "role": "user",
        "parts": [{ "text": "steaming cup of coffee and a croissant on a table" }]
      },
      "responses": [
        {
          "response": {
            "role": "model",
            "parts": [
              {
                "file_data": {
                  "mime_type": "image/png",
                  "file_uri": "gs://cloud-samples-data/generative-ai/evaluation/images/coffee.png"
                }
              }
            ]
          }
        }
      ]
    }
  ]
}
```

For video, swap `mime_type` to `video/mp4` (or appropriate) and point at a video URI.

### Custom metric (`eval_config.yaml`)

```yaml
custom_metrics:
  - name: image_prompt_alignment
    prompt_template: |
      You are evaluating whether the generated image (in {response}) matches
      the user's text prompt. Consider object presence, attributes, actions,
      composition, and style.

      Prompt: {prompt}
      Image: {response}

      Return JSON: {"score": <0.0-1.0>, "explanation": "<reason>"}
    judge_model: gemini-flash-latest
    judge_model_sampling_count: 3
```

Run with `agents-cli eval grade --config tests/eval/eval_config.yaml`. For video evaluation, use the same pattern with a video-capable judge model and rubric criteria (motion consistency, temporal coherence, scene transitions).

---

## Case 2: Agent consumes multimodal input, produces text

The user input contains an image / audio / file; the agent produces a text response. To verify the text against the original media (e.g., "did the agent correctly describe this image?"), use a custom `LLMMetric` with a vision-capable judge.

### Dataset shape

The multimodal input lives in the `prompt` field for single-turn, or inside the user-authored event in `agent_data` for multi-turn:

```json
{
  "eval_cases": [
    {
      "eval_case_id": "describe_chart",
      "prompt": {
        "role": "user",
        "parts": [
          { "text": "Describe this image" },
          { "inline_data": { "mime_type": "image/png", "data": "<base64>" } }
        ]
      },
      "responses": [
        {
          "response": {
            "role": "model",
            "parts": [{ "text": "The image shows a bar chart..." }]
          }
        }
      ]
    }
  ]
}
```

### Custom metric (`eval_config.yaml`)

```yaml
custom_metrics:
  - name: multimodal_response_quality
    prompt_template: |
      You are evaluating whether the agent's text response accurately reflects
      the user's multimodal input. Inspect the user input parts (which may
      include images, audio, or files) and the agent response, then return JSON:
      {"score": <0.0-1.0>, "explanation": "<reason>"}.

      User input: {prompt}
      Agent response: {response}
    judge_model: gemini-flash-latest
    judge_model_sampling_count: 3
```

Run with `agents-cli eval grade --config tests/eval/eval_config.yaml`.

---

## Notes

- **Built-in adaptive metrics (`final_response_quality`, etc.) skip media parts.** They extract only `.text` parts when constructing the judge prompt. Use a custom `LLMMetric` for true multimodal grading.
- **Choose a vision-capable `judge_model`.** `gemini-flash-latest` and `gemini-pro-latest` both handle images and video; verify capability before relying on it.
- **Sampling count** (`judge_model_sampling_count`) of 3–5 reduces variance for multimodal judges, which can be noisier than text-only.

For the full custom-metric field reference, see `references/metrics-guide.md`. For dataset schema and the `inline_data` / `file_data` part types, see `references/dataset_schema.md`.
