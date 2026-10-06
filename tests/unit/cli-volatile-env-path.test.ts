/**
 * The CLI announces every .env it loads. One of those locations is the
 * installed package directory, which `npm i -g` replaces wholesale — so the
 * file an operator edits there is gone at the next update, without a word.
 *
 * describeVolatileEnvWarning() decides when to say so. It must stay silent for
 * a development checkout, where that same path is stable and documented, and
 * for a file whose keys were all shadowed by a durable one — it supplied
 * nothing, so losing it costs nothing.
 */

import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { describeVolatileEnvWarning } from "../../bin/cli/utils/volatileEnvPath.mjs";

const INSTALLED_ROOT = path.join("/usr", "lib", "node_modules", "omniroute");
const CHECKOUT_ROOT = path.join("/home", "dev", "OmniRoute");
const DURABLE = path.join("/home", "dev", ".omniroute", ".env");

test("an installed package .env that supplied keys is reported as volatile", () => {
  const message = describeVolatileEnvWarning({
    envPath: path.join(INSTALLED_ROOT, ".env"),
    packageRoot: INSTALLED_ROOT,
    durableEnvPath: DURABLE,
    suppliedKeys: true,
  });

  assert.ok(message, "an installed package .env must be reported");
  assert.match(message, /update/i, "the message must say what destroys the file");
  assert.ok(message.includes(DURABLE), "the message must name the durable path to move to");
});

test("a development checkout says nothing", () => {
  // Same file name, stable location: `npm install` in a checkout preserves it,
  // and SETUP_GUIDE.md documents it. Warning here would fire on every start.
  assert.equal(
    describeVolatileEnvWarning({
      envPath: path.join(CHECKOUT_ROOT, ".env"),
      packageRoot: CHECKOUT_ROOT,
      durableEnvPath: DURABLE,
      suppliedKeys: true,
    }),
    null
  );
});

test("a file that supplied no key says nothing", () => {
  assert.equal(
    describeVolatileEnvWarning({
      envPath: path.join(INSTALLED_ROOT, ".env"),
      packageRoot: INSTALLED_ROOT,
      durableEnvPath: DURABLE,
      suppliedKeys: false,
    }),
    null
  );
});

test("the durable file itself says nothing, wherever it sits", () => {
  assert.equal(
    describeVolatileEnvWarning({
      envPath: DURABLE,
      packageRoot: INSTALLED_ROOT,
      durableEnvPath: DURABLE,
      suppliedKeys: true,
    }),
    null
  );
});

test("a path outside the package root says nothing", () => {
  assert.equal(
    describeVolatileEnvWarning({
      envPath: path.join("/srv", "app", ".env"),
      packageRoot: INSTALLED_ROOT,
      durableEnvPath: DURABLE,
      suppliedKeys: true,
    }),
    null
  );
});
