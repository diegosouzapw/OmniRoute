import type { CommandDetectionResult } from "../commandDetector.ts";
import type { RtkConfig } from "../../../types.ts";

export interface RenderResult {
  text: string;
  changed: boolean;
  renderer: string; // nome do renderer aplicado (ou "" se nenhum)
}

export type Renderer = (text: string, detection: CommandDetectionResult) => RenderResult;

export const NO_RENDER = (text: string): RenderResult => ({ text, changed: false, renderer: "" });
export type { RtkConfig, CommandDetectionResult };
