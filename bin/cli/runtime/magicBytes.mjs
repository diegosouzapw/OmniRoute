import { readFileSync, existsSync } from "node:fs";

/**
 * Validates that a file starts with a known native-binary magic number.
 * Returns the platform label ("elf" | "macho" | "macho-le" | "macho-fat" | "pe")
 * or null if unrecognized / missing / unreadable.
 *
 */
export function validateBinaryMagic(path) {
  if (!existsSync(path)) return null;
  let buf;
  try {
    buf = readFileSync(path, { encoding: null }).subarray(0, 16);
  } catch {
    return null;
  }
  if (buf.length < 4) return null;

  // ELF: 7F 45 4C 46
  if (buf[0] === 0x7f && buf[1] === 0x45 && buf[2] === 0x4c && buf[3] === 0x46) return "elf";

  // Mach-O big-endian: FE ED FA CF (64-bit) / FE ED FA CE (32-bit)
  if (buf[0] === 0xfe && buf[1] === 0xed && buf[2] === 0xfa && buf[3] === 0xcf) return "macho";
  if (buf[0] === 0xfe && buf[1] === 0xed && buf[2] === 0xfa && buf[3] === 0xce) return "macho";

  // Mach-O little-endian: CF FA ED FE (64-bit) / CE FA ED FE (32-bit)
  if (buf[0] === 0xcf && buf[1] === 0xfa && buf[2] === 0xed && buf[3] === 0xfe) return "macho-le";
  if (buf[0] === 0xce && buf[1] === 0xfa && buf[2] === 0xed && buf[3] === 0xfe) return "macho-le";

  // Mach-O fat (universal binary): CA FE BA BE
  if (buf[0] === 0xca && buf[1] === 0xfe && buf[2] === 0xba && buf[3] === 0xbe) return "macho-fat";

  // PE (Windows .node — DLL): MZ at offset 0
  if (buf[0] === 0x4d && buf[1] === 0x5a) return "pe";

  return null;
}

/**
 * Returns the expected magic label for the current platform.
 * Used to validate that a runtime-installed binary matches this OS.
 */
export function platformBinaryLabel() {
  if (process.platform === "win32") return "pe";
  if (process.platform === "darwin") return "macho";
  return "elf";
}
