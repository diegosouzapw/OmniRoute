import { createSseTextTransform } from "./src/lib/sseTextTransform";
import { FEATURE_FLAG_DEFINITIONS } from "./src/shared/constants/featureFlagDefinitions";

async function runTests() {
  console.log("=== Testing THEORY-001 ===");
  const originalError = console.error;
  let loggedContext = "";
  console.error = (...args: any[]) => {
    if (args[0] === "[SSE-TRANSFORM] Error in transform:") {
      loggedContext = args[3];
    }
  };

  const stream = createSseTextTransform((text) => {
    throw new Error("[PII] Blocked response due to PII detection: ssn");
  });
  
  const writer = stream.writable.getWriter();
  const reader = stream.readable.getReader();
  const readPromise = reader.read().catch(() => {});
  try {
    await writer.write(new TextEncoder().encode("data: {\"choices\": [{\"delta\": {\"content\": \"My SSN is 123-45-6789\"}}]}\n"));
    await writer.close();
  } catch (e) {
    // ignore
  }
  await readPromise;

  
  if (loggedContext.includes("123-45-6789")) {
    console.log("THEORY-001 VULNERABLE: PII leaked in logs");
  } else {
    console.log("THEORY-001 FIXED");
  }
  console.error = originalError;

  console.log("=== Testing THEORY-002 ===");
  const originalWarn = console.warn;
  let warnedDrop2 = false;
  console.warn = (...args: any[]) => {
    if (args[0] === "[SSE-TRANSFORM] Dropping malformed JSON chunk to prevent syntax injection:") {
      warnedDrop2 = true;
    }
  };
  
  let threwException2 = false;
  const stream2 = createSseTextTransform((t) => t);
  const writer2 = stream2.writable.getWriter();
  const reader2 = stream2.readable.getReader();
  const readPromise2 = reader2.read().catch(() => {});
  try {
    await writer2.write(new TextEncoder().encode("data: {\"candidates\": {\"not_an_array\": true}}\n"));
    await writer2.close();
  } catch (e) {
    threwException2 = true;
  }
  await readPromise2;
  
  if (warnedDrop2) {
    console.log("THEORY-002 VULNERABLE: exception in array check led to drop");
  } else {
    console.log("THEORY-002 FIXED");
  }

  console.log("=== Testing THEORY-003 ===");
  let warnedDrop3 = false;
  console.warn = (...args: any[]) => {
    if (args[0] === "[SSE-TRANSFORM] Dropping malformed JSON chunk to prevent syntax injection:") {
      warnedDrop3 = true;
    }
  };
  const stream3 = createSseTextTransform((text) => {
    throw new Error("Some unexpected processor error");
  });
  const writer3 = stream3.writable.getWriter();
  const reader3 = stream3.readable.getReader();
  const readPromise3 = reader3.read().catch(() => {});
  let threwException3 = false;
  try {
    await writer3.write(new TextEncoder().encode("data: {\"choices\": [{\"delta\": {\"content\": \"hello\"}}]}\n"));
    await writer3.close();
  } catch (e) {
    threwException3 = true;
  }
  await readPromise3;
  
  if (warnedDrop3 && !threwException3) {
    console.log("THEORY-003 VULNERABLE: valid payload dropped due to non-syntax error");
  } else {
    console.log("THEORY-003 FIXED");
  }
  console.warn = originalWarn;

  console.log("=== Testing THEORY-004 ===");
  const piiDef = FEATURE_FLAG_DEFINITIONS.find(f => f.key === "PII_RESPONSE_SANITIZATION_MODE");
  if (piiDef?.enumValues && piiDef.enumValues.includes("off")) {
    console.log("THEORY-004 FIXED");
  } else {
    console.log("THEORY-004 VULNERABLE: 'off' not in enumValues");
  }
}

runTests().catch(console.error);
