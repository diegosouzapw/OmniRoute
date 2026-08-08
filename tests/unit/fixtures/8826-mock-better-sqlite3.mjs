export async function resolve(specifier, context, nextResolve) {
  if (specifier === "better-sqlite3") {
    const moduleSource = [
      "class Database {",
      "  constructor(dbPath, options) {",
      '    throw new Error("Could not locate the bindings file. Tried: /fake/path/better_sqlite3.node");',
      "  }",
      "}",
      "export default Database;",
    ].join("\n");

    return {
      url:
        "data:text/javascript," +
        encodeURIComponent(moduleSource) +
        "#mock-better-sqlite3-8826",
      shortCircuit: true,
    };
  }
  return nextResolve(specifier, context);
}