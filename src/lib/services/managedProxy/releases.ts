import os from "node:os";
import type { ManagedCore } from "./config";

// Official GitHub release asset SHA-256 manifests, verified 2026-10-13.
// Update version, asset names and digests together, never accept an unverified version.
const HASHES = {
  singbox: {
    "linux-x64": "e2bdf179c15a3652955dc44867e33ca0965c9c9b91b34267dcc5a5d639a5feee",
    "linux-arm64": "29dae24d76bea3bc62d07dd3e60cfc12003de7debbd6b768df9be9c68360174e",
    "darwin-x64": "6d002b74d03b478547349cc10af89e007868596e5aa931816d45da9f544715a9",
    "darwin-arm64": "0360ce634a04c26a6b4fd957517987bb4f6c8950f63435ce3c5af2fcae5860c5",
    "win32-x64": "d8b86ef58936dba9230ec6a57ffa4243933f3c14ef4809828b6c553440ed1518",
    "win32-arm64": "195b35424c6e3f5913954c7f08c5d8ba2d2199f6d18eb27a3972a5a29cdaa78c",
  },
  xray: {
    "linux-x64": "23cd9af937744d97776ee35ecad4972cf4b2109d1e0fe6be9930467608f7c8ae",
    "linux-arm64": "4d30283ae614e3057f730f67cd088a42be6fdf91f8639d82cb69e48cde80413c",
    "darwin-x64": "f5b0471d3459eff1b82e48af0aeac186abcc3298210070afbbbd8437a4e8b203",
    "darwin-arm64": "2e93a67e8aa1936ecefb307e120830fcbd4c643ab9b1c46a2d0838d5f8409eaf",
    "win32-x64": "d004c39288ce9ada487c6f398c7c545f7d749e44bdfdd59dbc9f865afba4e1ad",
    "win32-arm64": "35d4ed6ec21224fb22b07c2c3f672e2350cd536f2c74d309150175a76365ea88",
  },
};

export function officialRelease(core: ManagedCore, platform = os.platform(), arch = os.arch()) {
  const key = `${platform}-${arch}`;
  const sha256 = (HASHES[core] as Record<string, string>)[key];
  if (!sha256) throw new Error(`No verified ${core} release for ${key}`);
  const version = core === "singbox" ? "1.14.3" : "26.3.27";
  const targets: Record<string, Record<string, string>> = {
    singbox: { win32: "windows", darwin: "darwin", linux: "linux" },
    xray: { win32: "windows", darwin: "macos", linux: "linux" },
  };
  const cpus: Record<string, Record<string, string>> = {
    singbox: { x64: "amd64", arm64: "arm64" },
    xray: { x64: "64", arm64: "arm64-v8a" },
  };
  const target = targets[core][platform];
  const cpu = cpus[core][arch];
  const asset =
    core === "singbox"
      ? `sing-box-${version}-${target}-${cpu}.${platform === "win32" ? "zip" : "tar.gz"}`
      : `Xray-${target}-${cpu}.zip`;
  const repo = core === "singbox" ? "SagerNet/sing-box" : "XTLS/Xray-core";
  return {
    version,
    sha256,
    asset,
    url: `https://github.com/${repo}/releases/download/v${version}/${asset}`,
    executable: `${core === "singbox" ? "sing-box" : "xray"}${platform === "win32" ? ".exe" : ""}`,
  };
}
