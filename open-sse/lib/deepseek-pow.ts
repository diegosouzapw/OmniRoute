// DeepSeek PoW Solver - loads exact implementation from extracted worker module
// The Keccak sponge has non-standard byte packing that's difficult to replicate exactly,
// so we use the verified extracted module.

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load the exact solver extracted from DeepSeek's worker chunk
const require = createRequire(import.meta.url);
const { U } = require(join(__dirname, "deepseek-pow-solver.cjs"));

export function solveDeepSeekPow(
  algorithm: string,
  challenge: string,
  salt: string,
  difficulty: number,
  expireAt: number
): number {
  if (algorithm !== "DeepSeekHashV1") throw new Error(`Unsupported: ${algorithm}`);
  const prefix = `${salt}_${expireAt}_`;

  const createHash = () => {
    const self: any = {};
    self._sponge = new U({ capacity: 256, padding: 6 });
    self.update = (s: string) => {
      self._sponge.absorb(Buffer.from(s, "utf8"));
      return self;
    };
    self.digest = (fmt?: string) => {
      return self._sponge.squeeze(6).toString(fmt || "hex");
    };
    self.copy = () => {
      const c: any = {};
      c._sponge = self._sponge.copy();
      c.update = (s: string) => {
        c._sponge.absorb(Buffer.from(s, "utf8"));
        return c;
      };
      c.digest = (fmt?: string) => {
        return c._sponge.squeeze(6).toString(fmt || "hex");
      };
      return c;
    };
    return self;
  };

  const h = createHash();
  h.update(prefix);

  for (let nonce = 0; nonce < difficulty; nonce++) {
    if (h.copy().update(String(nonce)).digest("hex") === challenge) {
      return nonce;
    }
  }
  return -1;
}
