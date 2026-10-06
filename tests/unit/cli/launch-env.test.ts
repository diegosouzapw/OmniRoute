import test from "node:test";
import assert from "node:assert/strict";

import { buildSafeCliLaunchEnv } from "../../../bin/cli/launch-env.mjs";

test("CLI launch environment keeps runtime essentials and drops ambient credentials", () => {
  const result = buildSafeCliLaunchEnv({
    PATH: "/bin",
    HOME: "/home/example",
    LANG: "en_US.UTF-8",
    LC_ALL: "C",
    XDG_CONFIG_HOME: "/tmp/config",
    SSL_CERT_FILE: "/etc/ssl/certs/ca-certificates.crt",
    AWS_SECRET_ACCESS_KEY: "must-not-leak",
    GITHUB_TOKEN: "must-not-leak",
    STORAGE_ENCRYPTION_KEY: "must-not-leak",
    DATABASE_URL: "must-not-leak",
    SSH_AUTH_SOCK: "/tmp/agent-capability",
    NODE_OPTIONS: "--require=/tmp/inject.js",
  });

  assert.deepEqual(result, {
    PATH: "/bin",
    HOME: "/home/example",
    LANG: "en_US.UTF-8",
    LC_ALL: "C",
    XDG_CONFIG_HOME: "/tmp/config",
    SSL_CERT_FILE: "/etc/ssl/certs/ca-certificates.crt",
  });
});

test("CLI launch environment inheritance is an explicit opt-in", () => {
  const source = { PATH: "/bin", GITHUB_TOKEN: "explicitly-inherited" };
  assert.deepEqual(buildSafeCliLaunchEnv(source, { inheritEnv: true }), source);
  assert.notEqual(buildSafeCliLaunchEnv(source, { inheritEnv: true }), source);
});
