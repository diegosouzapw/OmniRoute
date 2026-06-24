export async function withPrepareFailure(db, match, message, fn) {
  return withPrepareOverride(
    db,
    match,
    () => {
      throw new Error(message);
    },
    fn
  );
}

export async function withPrepareOverride(db, match, override, fn) {
  const originalPrepare = db.prepare.bind(db);
  db.prepare = (sql, ...args) => {
    const sqlText = String(sql);
    const matched = typeof match === "function" ? match(sqlText) : sqlText.includes(match);
    const statement = originalPrepare(sql, ...args);
    return matched ? override({ sqlText, statement, args }) : statement;
  };

  try {
    return await fn();
  } finally {
    db.prepare = originalPrepare;
  }
}
