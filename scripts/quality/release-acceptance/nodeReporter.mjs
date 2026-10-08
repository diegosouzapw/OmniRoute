const SUBTEST = /^# Subtest:\s+(\S+)/;
const RESULT = /^(ok|not ok)\s+\d+\s+-\s+(\S+)/;

export function fromNodeTestTap(tapText, argvFiles) {
  const completed = [];
  const failed = [];
  const seen = new Set();
  const lines = String(tapText ?? "").split(/\r?\n/);
  let pending = null;
  for (const line of lines) {
    const sub = line.match(SUBTEST);
    if (sub) {
      pending = sub[1];
      continue;
    }
    const res = line.match(RESULT);
    if (res) {
      const file = pending;
      const ok = res[1] === "ok";
      if (file) {
        seen.add(file);
        if (!ok) {
          if (!failed.includes(file)) failed.push(file);
          const i = completed.indexOf(file);
          if (i >= 0) completed.splice(i, 1);
        } else if (!failed.includes(file) && !completed.includes(file)) {
          completed.push(file);
        }
      }
    }
  }
  const attempted = [...argvFiles];
  const missing = attempted.filter((f) => !seen.has(f));
  return {
    completed,
    attempted,
    missing,
    failed,
    pass: completed.length > 0 && missing.length === 0 && failed.length === 0,
  };
}
