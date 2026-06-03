import { existsSync, openSync, readSync, closeSync } from "node:fs";

export const PUBLISHED_BUILD_PLATFORM = "linux";
export const PUBLISHED_BUILD_ARCH = "x64";

const HEADER_SIZE = 4096;
const MAX_FAT_ARCH_COUNT = 30;

function mapElfMachine(machine) {
  switch (machine) {
    case 62:
      return "x64";
    case 183:
      return "arm64";
    default:
      return null;
  }
}

function mapMachCpuType(cpuType) {
  switch (cpuType) {
    case 0x01000007:
      return "x64";
    case 0x0100000c:
      return "arm64";
    default:
      return null;
  }
}

function mapPeMachine(machine) {
  switch (machine) {
    case 0x8664:
      return "x64";
    case 0xaa64:
      return "arm64";
    default:
      return null;
  }
}

function readUInt16(buffer, offset, littleEndian) {
  return littleEndian ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset);
}

function readUInt32(buffer, offset, littleEndian) {
  return littleEndian ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset);
}

const ELF_MAGIC = 0x7f454c46;

function detectElfTarget(buffer) {
  if (buffer.length < 20) return null;
  if (buffer.readUInt32BE(0) !== ELF_MAGIC) return null;

  const littleEndian = buffer[5] !== 2;
  const arch = mapElfMachine(readUInt16(buffer, 18, littleEndian));
  if (!arch) return null;

  return { platform: "linux", architectures: [arch] };
}

const THIN_MACH_MAGIC = new Map([
  [0xfeedface, false],
  [0xfeedfacf, false],
  [0xcefaedfe, true],
  [0xcffaedfe, true],
]);
const FAT_MACH_MAGIC = new Map([
  [0xcafebabe, false],
  [0xcafebabf, false],
  [0xbebafeca, true],
  [0xbfbafeca, true],
]);

function detectMachTarget(buffer) {
  if (buffer.length < 8) return null;

  const magic = buffer.readUInt32BE(0);

  if (THIN_MACH_MAGIC.has(magic)) {
    const littleEndian = THIN_MACH_MAGIC.get(magic);
    const arch = mapMachCpuType(readUInt32(buffer, 4, littleEndian));
    if (!arch) return null;
    return { platform: "darwin", architectures: [arch] };
  }

  if (!FAT_MACH_MAGIC.has(magic)) return null;

  const littleEndian = FAT_MACH_MAGIC.get(magic);
  const isFat64 = magic === 0xcafebabf || magic === 0xbfbafeca;
  const archCount = readUInt32(buffer, 4, littleEndian);
  if (archCount > MAX_FAT_ARCH_COUNT) return null;
  const entrySize = isFat64 ? 32 : 20;
  const architectures = new Set();

  for (let index = 0; index < archCount; index += 1) {
    const offset = 8 + index * entrySize;
    if (offset + 4 > buffer.length) break;
    const arch = mapMachCpuType(readUInt32(buffer, offset, littleEndian));
    if (arch) architectures.add(arch);
  }

  if (architectures.size === 0) return null;
  return { platform: "darwin", architectures: [...architectures] };
}

function detectPeTarget(buffer) {
  if (buffer.length < 0x40) return null;
  if (buffer.readUInt16LE(0) !== 0x5a4d) return null;

  const peHeaderOffset = buffer.readUInt32LE(0x3c);
  if (peHeaderOffset + 6 > buffer.length) return null;
  if (buffer.readUInt32LE(peHeaderOffset) !== 0x00004550) return null;

  const arch = mapPeMachine(buffer.readUInt16LE(peHeaderOffset + 4));
  if (!arch) return null;
  return { platform: "win32", architectures: [arch] };
}

export function detectNativeBinaryTarget(buffer) {
  return detectElfTarget(buffer) ?? detectMachTarget(buffer) ?? detectPeTarget(buffer);
}

export function readNativeBinaryTarget(binaryPath) {
  if (!existsSync(binaryPath)) return null;

  let fd;
  try {
    fd = openSync(binaryPath, "r");
    const buffer = Buffer.alloc(HEADER_SIZE);
    const bytesRead = readSync(fd, buffer, 0, HEADER_SIZE, 0);
    return detectNativeBinaryTarget(buffer.subarray(0, bytesRead));
  } catch (err) {
    console.warn(`  ⚠️  Could not read native binary at ${binaryPath}: ${err.message}`);
    return null;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
}

export function isNativeBinaryCompatible(
  binaryPath,
  { runtimePlatform = process.platform, runtimeArch = process.arch, dlopen = process.dlopen } = {}
) {
  const target = readNativeBinaryTarget(binaryPath);

  if (target) {
    if (
      (target.platform !== runtimePlatform &&
        !(target.platform === "linux" && runtimePlatform === "android")) ||
      !target.architectures.includes(runtimeArch)
    ) {
      return false;
    }
  } else if (runtimePlatform !== PUBLISHED_BUILD_PLATFORM || runtimeArch !== PUBLISHED_BUILD_ARCH) {
    return false;
  }

  try {
    dlopen({ exports: {} }, binaryPath);
    return true;
  } catch (err) {
    console.warn(`  ⚠️  Native binary dlopen failed: ${err.message}`);
    return false;
  }
}
