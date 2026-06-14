/**
 * Plugin sandbox — configurable isolation levels.
 *
 * @module plugins/sandbox
 */

export enum SandboxLevel {
  /** Run in-process (no isolation, fastest) */
  IN_PROCESS = 0,
  /** Run in child process with full environment */
  CHILD_FULL_ENV = 1,
  /** Run in child process with filtered environment */
  CHILD_FILTERED_ENV = 2,
  /** Run in child process with isolated environment (no env vars) */
  CHILD_ISOLATED = 3,
}

export function getSandboxLabel(level: SandboxLevel): string {
  switch (level) {
    case SandboxLevel.IN_PROCESS:
      return "In-Process";
    case SandboxLevel.CHILD_FULL_ENV:
      return "Child (Full Env)";
    case SandboxLevel.CHILD_FILTERED_ENV:
      return "Child (Filtered Env)";
    case SandboxLevel.CHILD_ISOLATED:
      return "Child (Isolated)";
  }
}
