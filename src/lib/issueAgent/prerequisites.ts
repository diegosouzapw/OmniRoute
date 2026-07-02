export type CommandRunner = (
  command: string,
  args: string[]
) => Promise<{ exitCode: number; stdout?: string; stderr?: string }>;

export type PrerequisiteCheck = {
  ok: boolean;
  missing: string[];
};

const REQUIRED_TOOLS = ["git", "gh"] as const;

export async function checkIssueAgentPrerequisites(
  runner: CommandRunner
): Promise<PrerequisiteCheck> {
  const missing: string[] = [];

  for (const tool of REQUIRED_TOOLS) {
    const result = await runner(tool, ["--version"]);
    if (result.exitCode !== 0) {
      missing.push(tool);
    }
  }

  return {
    ok: missing.length === 0,
    missing,
  };
}
