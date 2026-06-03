import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ── WASM solver (fast — ~50-100ms at difficulty 144000) ──────────────────

class DeepSeekHashWasm {
  private wasmInstance: any;
  private offset = 0;
  private cachedUint8Memory: Uint8Array | null = null;
  private cachedTextEncoder = new TextEncoder();

  private getCachedUint8Memory(): Uint8Array {
    if (!this.cachedUint8Memory?.byteLength) {
      this.cachedUint8Memory = new Uint8Array(this.wasmInstance.memory.buffer);
    }
    return this.cachedUint8Memory;
  }

  private encodeString(
    text: string,
    allocate: (size: number, align: number) => number,
    reallocate: (ptr: number, oldSize: number, newSize: number, align: number) => number
  ): number {
    const strLength = text.length;
    let ptr = allocate(strLength, 1) >>> 0;
    const memory = this.getCachedUint8Memory();
    let asciiLength = 0;

    for (; asciiLength < strLength; asciiLength++) {
      if (text.charCodeAt(asciiLength) > 127) break;
      memory[ptr + asciiLength] = text.charCodeAt(asciiLength);
    }

    if (asciiLength !== strLength) {
      if (asciiLength > 0) text = text.slice(asciiLength);
      ptr = reallocate(ptr, strLength, asciiLength + text.length * 3, 1) >>> 0;
      const result = this.cachedTextEncoder.encodeInto(
        text,
        this.getCachedUint8Memory().subarray(ptr + asciiLength, ptr + asciiLength + text.length * 3)
      );
      asciiLength += result.written!;
      ptr = reallocate(ptr, asciiLength + text.length * 3, asciiLength, 1) >>> 0;
    }

    this.offset = asciiLength;
    return ptr;
  }

  calculateHash(challenge: string, prefix: string, difficulty: number): number | undefined {
    try {
      const retptr = this.wasmInstance.__wbindgen_add_to_stack_pointer(-16);

      const ptr0 = this.encodeString(
        challenge,
        this.wasmInstance.__wbindgen_export_0,
        this.wasmInstance.__wbindgen_export_1
      );
      const len0 = this.offset;

      const ptr1 = this.encodeString(
        prefix,
        this.wasmInstance.__wbindgen_export_0,
        this.wasmInstance.__wbindgen_export_1
      );
      const len1 = this.offset;

      this.wasmInstance.wasm_solve(retptr, ptr0, len0, ptr1, len1, difficulty);

      const dv = new DataView(this.wasmInstance.memory.buffer);
      const status = dv.getInt32(retptr + 0, true);
      const value = dv.getFloat64(retptr + 8, true);

      return status === 0 ? undefined : value;
    } finally {
      this.wasmInstance.__wbindgen_add_to_stack_pointer(16);
    }
  }

  async init(wasmPath: string): Promise<void> {
    const wasmBuffer = await fs.promises.readFile(wasmPath);
    const { instance } = await WebAssembly.instantiate(wasmBuffer, { wbg: {} });
    this.wasmInstance = instance.exports;
  }
}

let _wasmSolver: DeepSeekHashWasm | null = null;
let _wasmInitFailed = false;

async function getWasmSolver(): Promise<DeepSeekHashWasm | null> {
  if (_wasmInitFailed) return null;
  if (_wasmSolver) return _wasmSolver;

  try {
    const solver = new DeepSeekHashWasm();
    const wasmPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "sha3_wasm_bg.wasm");
    await solver.init(wasmPath);
    _wasmSolver = solver;
    return solver;
  } catch {
    _wasmInitFailed = true;
    return null;
  }
}

// ── JS fallback solver (slow — ~5-6s at difficulty 144000) ───────────────

const require = createRequire(import.meta.url);
let _U: any | undefined;
function loadU(): any {
  if (_U === undefined) {
    _U = require("./deepseek-pow-solver.cjs").U;
  }
  return _U;
}

function solveWithJS(challenge: string, prefix: string, difficulty: number): number {
  const U = loadU();
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

// ── Public API ───────────────────────────────────────────────────────────

export async function solveDeepSeekPowAsync(
  algorithm: string,
  challenge: string,
  salt: string,
  difficulty: number,
  expireAt: number
): Promise<number> {
  if (algorithm !== "DeepSeekHashV1") throw new Error(`Unsupported: ${algorithm}`);
  const prefix = `${salt}_${expireAt}_`;

  const wasm = await getWasmSolver();
  if (wasm) {
    const answer = wasm.calculateHash(challenge, prefix, difficulty);
    if (answer === undefined) return -1;
    return answer;
  }

  return solveWithJS(challenge, prefix, difficulty);
}

// Sync wrapper kept for backward compat (uses JS fallback only)
export function solveDeepSeekPow(
  algorithm: string,
  challenge: string,
  salt: string,
  difficulty: number,
  expireAt: number
): number {
  if (algorithm !== "DeepSeekHashV1") throw new Error(`Unsupported: ${algorithm}`);
  const prefix = `${salt}_${expireAt}_`;
  return solveWithJS(challenge, prefix, difficulty);
}
