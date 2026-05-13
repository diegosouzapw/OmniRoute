import readline from "node:readline";

export function createPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function ask(question, defaultValue = "") {
    const suffix = defaultValue ? ` (${defaultValue})` : "";
    return new Promise((resolve) => {
      rl.question(`${question}${suffix}: `, (answer) => {
        const trimmed = answer.trim();
        resolve(trimmed || defaultValue);
      });
    });
  }

  function askSecret(question) {
    return new Promise((resolve) => {
      let prompted = false;
      const saved = rl._writeToOutput.bind(rl);
      rl._writeToOutput = function (str) {
        if (!prompted) {
          rl.output.write(str);
          if (str.endsWith(": ")) prompted = true;
          return;
        }
        // Suppress character echo; allow only newlines through
        if (str === "\r\n" || str === "\n" || str === "\r") rl.output.write("\n");
      };
      rl.question(`${question}: `, (answer) => {
        rl._writeToOutput = saved;
        resolve(answer.trim());
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
