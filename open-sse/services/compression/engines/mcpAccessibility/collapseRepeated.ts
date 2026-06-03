const SIBLING_PATTERN = /^(\s*)-\s*([a-zA-Z]+)\b/;

export function findNthSiblingEnd(
  lines: string[],
  start: number,
  indent: string,
  role: string,
  n: number
): number {
  let count = 0;
  for (let k = start; k < lines.length; k++) {
    const mm = lines[k].match(SIBLING_PATTERN);
    if (mm && mm[1] === indent && mm[2] === role) {
      count++;
      if (count > n) return k;
    }
  }
  return lines.length;
}

export function findLastNSiblingStart(
  lines: string[],
  end: number,
  indent: string,
  role: string,
  n: number
): number {
  const positions: number[] = [];
  for (let k = 0; k < end; k++) {
    const mm = lines[k].match(SIBLING_PATTERN);
    if (mm && mm[1] === indent && mm[2] === role) positions.push(k);
  }
  return positions.length >= n ? positions[positions.length - n] : end;
}

export function collapseRepeated(
  text: string,
  threshold: number,
  keepHead: number,
  keepTail: number
): string {
  const lines = text.split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const m = line.match(SIBLING_PATTERN);
    if (!m) {
      out.push(line);
      i++;
      continue;
    }
    const indent = m[1];
    const role = m[2];
    let j = i;
    while (j < lines.length) {
      const ln = lines[j];
      const mm = ln.match(SIBLING_PATTERN);
      if (mm && mm[1] === indent && mm[2] === role) {
        j++;
        continue;
      }
      if (ln.startsWith(`${indent} `) || ln.startsWith(`${indent}\t`)) {
        j++;
        continue;
      }
      break;
    }
    const groupLen = j - i;
    if (groupLen >= threshold) {
      const headEnd = findNthSiblingEnd(lines, i, indent, role, keepHead);
      const tailStart = findLastNSiblingStart(lines.slice(0, j), j, indent, role, keepTail);
      for (let k = i; k < headEnd; k++) out.push(lines[k]);
      out.push(
        `${indent}... [${groupLen - keepHead - keepTail} similar "${role}" items omitted by OmniRoute MCP filter]`
      );
      for (let k = tailStart; k < j; k++) out.push(lines[k]);
    } else {
      for (let k = i; k < j; k++) out.push(lines[k]);
    }
    i = j;
  }
  return out.join("\n");
}
