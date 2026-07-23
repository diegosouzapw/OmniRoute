// src/app/(dashboard)/dashboard/playground/hooks/useStructuredOutput.ts
"use client";

import { useState, useCallback } from "react";
import { StructuredOutputSchema } from "@/shared/schemas/playground";

export interface StructuredOutputSchemaInput {
  name: string;
  schema: Record<string, unknown>;
  strict?: boolean;
}

export interface UseStructuredOutputState {
  enabled: boolean;
  schema: StructuredOutputSchemaInput | null;
  error: string | null;
}

export interface ValidateResponseResult {
  valid: boolean;
  error?: string;
}

export interface UseStructuredOutput extends UseStructuredOutputState {
  setEnabled: (enabled: boolean) => void;
  /**
   * Set and validate the JSON schema via Zod StructuredOutputSchema.
   * Clears error on success; sets error on validation failure.
   */
  setSchema: (s: StructuredOutputSchemaInput) => void;
  /**
   * Validate a response body against the current schema.
   * - First tries JSON.parse if content is a string.
   * - Then checks that the parsed value is a non-null object (basic shape validation).
   * Returns { valid: true } on success; { valid: false, error } on failure.
   */
  validateResponse: (content: unknown) => ValidateResponseResult;
}

/**
 * Hook for the Structured Output (JSON mode) toggle in the Build tab.
 * Manages toggle state + JSON schema + client-side response validation.
 */
export function useStructuredOutput(): UseStructuredOutput {
  const [enabled, setEnabledState] = useState(false);
  const [schema, setSchemaState] = useState<StructuredOutputSchemaInput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const setEnabled = useCallback((value: boolean): void => {
    setEnabledState(value);
  }, []);

  const setSchema = useCallback((s: StructuredOutputSchemaInput): void => {
    // Validate via StructuredOutputSchema (wraps the input as if it were a full response_format object).
    const parsed = StructuredOutputSchema.safeParse({
      type: "json_schema",
      json_schema: s,
    });
    if (!parsed.success) {
      const message = parsed.error.issues.map((i) => i.message).join("; ");
      setError(message);
      return;
    }
    setSchemaState(s);
    setError(null);
  }, []);

  const validateResponse = useCallback(
    (content: unknown): ValidateResponseResult => {
      if (schema == null) {
        return { valid: false, error: "No schema set" };
      }

      // Step 1: parse JSON if the content is a string.
      let parsed: unknown = content;
      if (typeof content === "string") {
        try {
          parsed = JSON.parse(content);
        } catch {
          return { valid: false, error: "Response is not valid JSON" };
        }
      }

      // Step 2: basic shape validation — must be a non-null object.
      // Full JSON Schema validation would require ajv (not present in this project).
      // We do a structural check: verify it's an object, and for each key in the
      // schema's `properties` (if present), check that the key exists in the response.
      if (parsed == null || typeof parsed !== "object" || Array.isArray(parsed)) {
        return { valid: false, error: "Response is not a JSON object" };
      }

      const responseObj = parsed as Record<string, unknown>;
      const schemaObj = schema.schema;

      // If the schema has a "properties" field, validate that required keys are present.
      const properties = schemaObj["properties"];
      if (properties != null && typeof properties === "object" && !Array.isArray(properties)) {
        const required = schemaObj["required"];
        if (Array.isArray(required)) {
          for (const key of required) {
            if (typeof key === "string" && !(key in responseObj)) {
              return {
                valid: false,
                error: `Response is missing required field: "${key}"`,
              };
            }
          }
        }
      }

      return { valid: true };
    },
    [schema],
  );

  return {
    enabled,
    schema,
    error,
    setEnabled,
    setSchema,
    validateResponse,
  };
}
