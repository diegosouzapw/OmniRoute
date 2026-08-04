// Modal (modal.com) is bring-your-own-deploy, so there is no catalog to probe —
// the server-side validator uses this known public model id as its default probe
// target (src/lib/providers/validation.ts) and the add-connection modal pre-fills
// the Validation Model Id field with the same value (#5446 checklist item 4).
export const MODAL_DEFAULT_VALIDATION_MODEL_ID = "Qwen/Qwen3-4B-Thinking-2507-FP8";
