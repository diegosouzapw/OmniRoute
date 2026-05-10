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

  function close() {
    rl.close();
  }

  return { ask, close };
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
