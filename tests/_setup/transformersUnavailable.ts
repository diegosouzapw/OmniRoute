// UI unit tests must not download models or initialize the native ONNX runtime.
export async function pipeline(): Promise<never> {
  throw new Error("Optional Transformers runtime is unavailable in UI unit tests");
}
