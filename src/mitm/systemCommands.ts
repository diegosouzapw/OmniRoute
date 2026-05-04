import { execFile, spawn } from "child_process";

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

export function isRoot(): boolean {
  try {
    return !!(process.getuid && process.getuid() === 0);
  } catch {
    return false;
  }
}

export function execFileText(command: string, args: string[]): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(command, args, { encoding: "utf8" }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(`Command failed: ${getErrorMessage(error)}\n${stderr}`));
        return;
      }
      resolve(stdout);
    });
  });
}

export function execFileWithPassword(
  command: string,
  args: string[],
  password: string,
  stdinAfterPassword = ""
): Promise<string> {
  // When running as root, skip sudo -S and run the target command directly
  const root = isRoot();
  const needsPassword = !root || command !== "sudo";
  let finalCommand = command;
  let finalArgs = args;

  if (root && command === "sudo") {
    const realCmdIndex = args.findIndex((arg) => !arg.startsWith("-"));
    if (realCmdIndex !== -1) {
      finalCommand = args[realCmdIndex];
      finalArgs = args.slice(realCmdIndex + 1);
    }
  }

  return new Promise((resolve, reject) => {
    const child = spawn(finalCommand, finalArgs, {
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    let settled = false;

    const settle = (error: Error | null) => {
      if (settled) return;
      settled = true;
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    };

    child.stdout?.on("data", (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr?.on("data", (chunk) => {
      stderr += chunk.toString();
    });
    child.on("error", (error) => {
      settle(new Error(`Command failed: ${getErrorMessage(error)}\n${stderr}`));
    });
    child.on("close", (code) => {
      if (code === 0) {
        settle(null);
        return;
      }
      settle(new Error(`Command failed with code ${code}\n${stderr}`));
    });

    const stdinInput = needsPassword
      ? `${password}\n${stdinAfterPassword}`
      : stdinAfterPassword || "";
    if (stdinInput) {
      child.stdin?.write(stdinInput);
    }
    child.stdin?.end();
  });
}

export function quotePowerShell(value: string): string {
  return `'${value.replace(/'/g, "''")}'`;
}

export function runPowerShell(script: string): Promise<string> {
  return execFileText("powershell", [
    "-NoProfile",
    "-NonInteractive",
    "-ExecutionPolicy",
    "Bypass",
    "-Command",
    script,
  ]);
}

export function runElevatedPowerShell(script: string): Promise<string> {
  const encoded = Buffer.from(script, "utf16le").toString("base64");
  const wrapper = `
    $proc = Start-Process powershell -ArgumentList @(
      '-NoProfile',
      '-NonInteractive',
      '-ExecutionPolicy',
      'Bypass',
      '-EncodedCommand',
      '${encoded}'
    ) -Verb RunAs -Wait -PassThru;
    if ($proc.ExitCode -ne 0) {
      throw "Elevated command exited with code $($proc.ExitCode)"
    }
  `;
  return runPowerShell(wrapper);
}
