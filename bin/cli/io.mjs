import readline from "node:readline";

export function createPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Non-interactive stdin (pipe, CI, EOF via `< /dev/null`) cannot answer an
  // interactive prompt. Without a guard, `rl.question` never fires its callback —
  // the await stays pending and Node warns about an "unsettled top-level await" at
  // exit. Resolving on the readline `close` event (which fires on stdin EOF)
  // returns the default/empty instead of hanging. A genuinely piped line still
  // arrives via the question callback first, so `echo value | omniroute …` keeps
  // working — only the no-input EOF case falls back.
  function ask(question, defaultValue = "") {
    const suffix = defaultValue ? ` (${defaultValue})` : "";
    return new Promise((resolve) => {
      let settled = false;
      const done = (v) => {
        if (!settled) {
          settled = true;
          resolve(v);
        }
      };
      rl.once("close", () => done(defaultValue));
      rl.question(`${question}${suffix}: `, (answer) => {
        const trimmed = answer.trim();
        done(trimmed || defaultValue);
      });
    });
  }

  function askSecret(question) {
    return new Promise((resolve) => {
      let settled = false;
      const saved = rl._writeToOutput.bind(rl);
      const done = (v) => {
        if (!settled) {
          settled = true;
          rl._writeToOutput = saved;
          resolve(v);
        }
      };
      let prompted = false;
      rl._writeToOutput = function (str) {
        if (!prompted) {
          rl.output.write(str);
          if (str.endsWith(": ")) prompted = true;
          return;
        }
        // Suppress character echo; allow only newlines through
        if (str === "\r\n" || str === "\n" || str === "\r") rl.output.write("\n");
      };
      rl.once("close", () => done("")); // non-interactive EOF → empty secret, no hang
      rl.question(`${question}: `, (answer) => {
        done(answer.trim());
      });
    });
  }

  function close() {
    rl.close();
  }

  return { ask, askSecret, close };
}

export function printHeading(title) {
  console.log(`\n\x1b[1m\x1b[36m${title}\x1b[0m\n`);
}

export function printSuccess(message) {
  console.log(`\x1b[32m✔ ${message}\x1b[0m`);
}

export function printInfo(message) {
  console.log(`\x1b[2m${message}\x1b[0m`);
}

export function printError(message) {
  console.log(`\x1b[31m✖ ${message}\x1b[0m`);
}
