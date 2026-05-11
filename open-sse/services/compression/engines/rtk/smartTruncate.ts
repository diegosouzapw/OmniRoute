export interface SmartTruncateOptions {
  maxLines?: number;
  maxChars?: number;
  preserveHead?: number;
  preserveTail?: number;
  priorityPatterns?: RegExp[];
}

export function smartTruncate(
  text: string,
  options: SmartTruncateOptions = {}
): {
  text: string;
  truncated: boolean;
  droppedLines: number;
} {
  const maxChars = Math.max(0, Math.floor(options.maxChars ?? 0));
  const maxLines = Math.max(0, Math.floor(options.maxLines ?? 0));
  const lines = text.split(/\r?\n/);
  const overLineLimit = maxLines > 0 && lines.length > maxLines;
  const overCharLimit = maxChars > 0 && text.length > maxChars;
  if (!overLineLimit && !overCharLimit) {
    return { text, truncated: false, droppedLines: 0 };
  }

  const preserveHead = Math.max(0, Math.floor(options.preserveHead ?? 20));
  const preserveTail = Math.max(0, Math.floor(options.preserveTail ?? 20));
  const priorityPatterns = options.priorityPatterns ?? [];
  const priorityLines = priorityPatterns.length
    ? lines.filter((line) => priorityPatterns.some((pattern) => pattern.test(line)))
    : [];

  const head = lines.slice(0, preserveHead);
  const tail = preserveTail > 0 ? lines.slice(-preserveTail) : [];
  const selected = [...head];
  for (const line of priorityLines) {
    if (!selected.includes(line)) selected.push(line);
  }
  const tailStart = lines.length - tail.length;
  tail.forEach((line, offset) => {
    const originalIndex = tailStart + offset;
    if (originalIndex >= preserveHead && !selected.includes(line)) selected.push(line);
  });

  const droppedLines = Math.max(0, lines.length - selected.length);
  let result = [
    ...selected.slice(0, head.length),
    `[rtk:truncated ${droppedLines} lines]`,
    ...selected.slice(head.length),
  ].join("\n");

  if (maxChars > 0 && result.length > maxChars) {
    const marker = "\n[rtk:truncated by chars]\n";
    const budget = Math.max(0, maxChars - marker.length);
    if (budget === 0) {
      result = marker.slice(0, maxChars);
      return { text: result, truncated: true, droppedLines };
    }
    const headChars = Math.ceil(budget * 0.55);
    const tailChars = Math.max(0, budget - headChars);
    const tailText = tailChars > 0 ? result.slice(-tailChars) : "";
    result = `${result.slice(0, headChars)}${marker}${tailText}`;
    if (result.length > maxChars) result = result.slice(0, maxChars);
  }

  return { text: result, truncated: true, droppedLines };
}
