import { z } from "zod";

export const CliCatalogEntrySchema = z.object({
  category: z.enum(["code", "agent"]),
  vendor: z.string().min(1),
  acpSpawnable: z.boolean(),
  baseUrlSupport: z.enum(["full", "partial", "none"]),

  id: z.string().min(1),
  name: z.string().min(1),
  icon: z.string().optional(),
  image: z.string().optional(),
  imageLight: z.string().optional(),
  imageDark: z.string().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  description: z.string().min(1),
  docsUrl: z.string().min(1),
  configType: z.enum(["env", "custom", "guide", "custom-builder", "mitm"]),
  envVars: z.record(z.string()).optional(),
  modelAliases: z.array(z.string()).optional(),
  settingsFile: z.string().optional(),
  defaultCommand: z.string().optional(),
  defaultCommands: z.array(z.string()).optional(),
  defaultModels: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        alias: z.string(),
        envKey: z.string().optional(),
        defaultValue: z.string().optional(),
        isTopLevel: z.boolean().optional(),
      })
    )
    .optional(),
  guideSteps: z
    .array(
      z.object({
        step: z.number().int().positive(),
        title: z.string(),
        desc: z.string().optional(),
        value: z.string().optional(),
        copyable: z.boolean().optional(),
        type: z.enum(["apiKeySelector", "modelSelector"]).optional(),
      })
    )
    .optional(),
  codeBlock: z.object({ language: z.string(), code: z.string() }).optional(),
  notes: z
    .array(z.object({ type: z.enum(["info", "warning", "error", "cloudCheck"]), text: z.string() }))
    .optional(),
  requiresCloud: z.boolean().optional(),
  modelSelectionMode: z.enum(["single", "multiple"]).optional(),
  hideComboModels: z.boolean().optional(),
  previewConfigMode: z.string().optional(),
});

export type CliCatalogEntry = z.infer<typeof CliCatalogEntrySchema>;

export const CliCatalogSchema = z.record(CliCatalogEntrySchema);

/** Cardinalidade obrigatória (Plano §3.1/§3.2 + D15). +1 (crush, decolua/9router#1233). */
// +1 (2026-07-02): "codewhale" added as a dual entry alongside "deepseek-tui"
// (CodeWhale is the actively-maintained successor to DeepSeek TUI).
// +1 (grok-build, decolua/9router#2571): xAI Grok Build TUI coding agent.
export const EXPECTED_CODE_COUNT = 21;
// +2 (#6318): "omp" (Oh My Pi) and "letta" (Letta CLI) added as agent entries.
// Note: #6318 originally also shipped duplicate "pi"/"jcode"/"codewhale" entries —
// those tools were already delivered by a separate PR, so only omp+letta landed here.
export const EXPECTED_AGENT_COUNT = 8;
