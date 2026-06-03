export interface DeduplicateOptions {
  threshold?: number;
}

export function deduplicateRepeatedLines(
  text: string,
  options: DeduplicateOptions = {}
): {
  text: string;
  collapsed: number;
} {
  const threshold = Math.max(2, Math.floor(options.threshold ?? 3));
  const lines = text.split(/\r?\n/);
  const output: string[] = [];
  let collapsed = 0;

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    let runLength = 1;
    while (index + runLength < lines.length && lines[index + runLength] === line) {
      runLength++;
    }

    if (line.trim() && runLength >= threshold) {
      output.push(line);
      output.push(`[line repeated ${runLength - 1}x]`);
      output.push(`[rtk:dropped ${runLength - 1} repeated lines]`);
      collapsed += runLength - 1;
      index += runLength - 1;
      continue;
    }

    output.push(line);
  }

  return { text: output.join("\n"), collapsed };
}
