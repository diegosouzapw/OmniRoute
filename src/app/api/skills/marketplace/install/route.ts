import { NextResponse } from "next/server";
import { z } from "zod";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { skillRegistry } from "@/lib/skills/registry";
import { getSkillsProviderSetting } from "@/lib/skills/providerSettings";

import { isAuthenticated } from "@/shared/utils/apiAuth";

const marketplaceInstallSchema = z.object({
  name: z.string().min(1).max(64),
  description: z.string().min(1).max(1024),
  skillMdContent: z.string().min(1),
  version: z.string().default("1.0.0"),
  sourceUrl: z.string().optional(),
});

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const provider = await getSkillsProviderSetting();
    if (provider !== "skillsmp") {
      return NextResponse.json(
        {
          error:
            "Active skills provider is not SkillsMP. Switch provider in Settings → Memory & Skills.",
        },
        { status: 409 }
      );
    }

    const rawBody = await request.json();
    const validation = validateBody(marketplaceInstallSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(validation.error, { status: 400 });
    }
    const { name, description, skillMdContent, version } = validation.data;

    const skill = await skillRegistry.register({
      name,
      version,
      description,
      schema: { input: { content: "string" }, output: { result: "string" } },
      handler: `// Installed from SkillsMP\n// SKILL.md content:\n${skillMdContent}`,
      apiKeyId: provider,
      enabled: true,
      mode: "auto",
      sourceProvider: "skillsmp",
      tags: ["popular", "marketplace"],
      installCount: 1,
    });

    return NextResponse.json({ success: true, id: skill.id });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
