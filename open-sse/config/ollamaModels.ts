export const ollamaModels = {
  models: [
    {
      name: "llama3.2",
      modified_at: "2025-12-26T00:00:00Z",
      size: 2000000000,
      digest: "abc123def456",
      details: {
        format: "gguf",
        family: "llama",
        parameter_size: "3B",
        quantization_level: "Q4_K_M",
      },
    },
    {
      name: "qwen2.5",
      modified_at: "2025-12-26T00:00:00Z",
      size: 4000000000,
      digest: "def456abc123",
      details: {
        format: "gguf",
        family: "qwen",
        parameter_size: "7B",
        quantization_level: "Q4_K_M",
      },
    },
  ],
};
