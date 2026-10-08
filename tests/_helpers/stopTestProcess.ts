import type { ChildProcess } from "node:child_process";

export async function stopTestProcess(child: ChildProcess, graceMs = 5_000) {
  if (child.exitCode !== null || child.signalCode !== null || !child.pid) return;
  // `killed` only records successful signal delivery, not process termination.
  let onExit: () => void;
  const exited = new Promise<boolean>((resolve) => {
    onExit = () => resolve(true);
    child.once("exit", onExit);
  });
  async function waitForExit(ms: number) {
    let timer: NodeJS.Timeout;
    try {
      return await Promise.race([
        exited,
        new Promise<boolean>((resolve) => {
          timer = setTimeout(() => resolve(false), ms);
        }),
      ]);
    } finally {
      clearTimeout(timer!);
    }
  }
  try {
    child.kill("SIGTERM");
    if (await waitForExit(graceMs)) return;
    child.kill("SIGKILL");
    if (!(await waitForExit(5_000))) throw new Error(`Test process ${child.pid} did not exit`);
  } finally {
    child.off("exit", onExit!);
  }
}
