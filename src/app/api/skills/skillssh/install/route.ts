import { NextResponse } from "next/server";
import { z } from "zod";
import { validateBody, isValidationFailure } from "@/shared/validation/helpers";
import { skillRegistry } from "@/lib/skills/registry";
import { isAuthenticated } from "@/shared/utils/apiAuth";
import { fetchSkillMd } from "@/lib/skills/skillssh";
import { getSkillsProviderSetting } from "@/lib/skills/providerSettings";

const skillsshInstallSchema = z.object({
  name: z.string().min(1).max(64),
  description: z.string().min(1).max(1024),
  source: z.string().min(1),
  skillId: z.string().min(1),
  version: z.string().default("1.0.0"),
});

export async function POST(request: Request) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const provider = await getSkillsProviderSetting();
    if (provider !== "skillssh") {
      return NextResponse.json(
        {
          error:
            "Active skills provider is not skills.sh. Switch provider in Settings → Memory & Skills.",
        },
        { status: 409 }
      );
    }

    const rawBody = await request.json();
    const validation = validateBody(skillsshInstallSchema, rawBody);
    if (isValidationFailure(validation)) {
      return NextResponse.json(validation.error, { status: 400 });
    }
    const { name, description, source, skillId, version } = validation.data;

    const skillMdContent = await fetchSkillMd(source, skillId);

    const skill = await skillRegistry.register({
      name,
      version,
      description,
      schema: { input: { content: "string" }, output: { result: "string" } },
      handler: `// Installed from skills.sh\n// Source: ${source}/${skillId}\n// SKILL.md content:\n${skillMdContent}`,
      apiKeyId: provider,
      enabled: true,
      mode: "auto",
      sourceProvider: "skillssh",
      tags: ["popular", "community"],
      installCount: 1,
    });

    return NextResponse.json({ success: true, id: skill.id });
  } catch (err: unknown) {
    const error = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error }, { status: 500 });
  }
}
