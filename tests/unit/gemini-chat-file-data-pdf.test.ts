import test from "node:test";
import assert from "node:assert/strict";

const { convertOpenAIContentToParts } =
  await import("../../open-sse/translator/helpers/geminiHelper.ts");

type InlineDataPart = {
  inlineData?: {
    mimeType?: string;
    data?: string;
  };
};

test("convertOpenAIContentToParts handles OpenAI chat file.file_data PDFs", () => {
  const parts = convertOpenAIContentToParts([
    { type: "text", text: "Return OCR" },
    {
      type: "file",
      file: {
        filename: "invoice.pdf",
        file_data: "data:application/pdf;base64,JVBERi0xLjcKJ",
      },
    },
  ]) as InlineDataPart[];

  const inlineData = parts.find((part) => part.inlineData)?.inlineData;
  assert.ok(inlineData, "file.file_data must produce an inlineData part");
  assert.equal(inlineData.data, "JVBERi0xLjcKJ");
  assert.equal(inlineData.mimeType, "application/pdf");
});
