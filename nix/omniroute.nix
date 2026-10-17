# Builds the published npm tarball with `buildNpmPackage`.
#
# The tarball ships no lockfile, so `package-lock.json` here is generated from
# `package.json`, which is the published manifest minus `workspaces` and
# `devDependencies`. The app in the tarball is prebuilt, so dev tools are not
# needed. Their nested `overrides` also pin conflicting versions (undici,
# js-yaml), which makes npm ask the registry for metadata and fails offline.
# All `overrides` are kept, so the pinned versions still apply.
#
# `importNpmLock` fetches each dependency by the `integrity` in the lockfile,
# so there is no dependency hash to maintain. To update after an npm release,
# run `node scripts/release/update-nix-package.mjs [version]`. It rewrites
# `package.json`, `package-lock.json` and the source hash below, and needs npm
# but not Nix.
#
# Bin layout: `buildNpmPackage` links `$out/bin/omniroute` (and
# `omniroute-reset-password`) to the files under `lib/node_modules/omniroute`, and its
# shebang patching points them at the pinned `nodejs`. The CLI's own `serve` paths
# (bin/cli/commands/serve.mjs, `runDaemon` and `runWithoutRecovery`) and its runtime
# native-dependency installer (`npm`) still resolve `node`/`npm` through PATH, which a
# NixOS user does not have by default. So every installed bin is wrapped with
# `wrapProgram … --prefix PATH`, putting the same pinned `nodejs` (node + npm) first. The
# wrapper only prefixes PATH; the `lib/node_modules` layout is left untouched.
{
  lib,
  buildNpmPackage,
  fetchurl,
  importNpmLock,
  makeWrapper,
  nodejs,
}: let
  package = lib.importJSON ./package.json;

  # `importNpmLock` rewrites `dependencies` to store paths, and npm rejects an
  # override that differs from its direct dependency (EOVERRIDE). Such overrides
  # must already equal the dependency's range, so `$name` (npm's reference to
  # the direct dependency) keeps the same meaning.
  npmDepsPackage =
    package
    // {
      overrides =
        lib.mapAttrs (
          name: value:
            if builtins.isString value && package.dependencies ? ${name}
            then "\$${name}"
            else value
        )
        package.overrides;
    };
in
  buildNpmPackage {
    pname = "omniroute";
    inherit (package) version;
    inherit nodejs;

    src = fetchurl {
      url = "https://registry.npmjs.org/omniroute/-/omniroute-${package.version}.tgz";
      hash = "sha512-VwwSt+bP9lJiPJXFJMz0nNGGuoewPZU3nFe1SLuO11ADgdSwTegGCxhg8Ov75+31m/cocPxHiO63zygn1XQ0MQ==";
    };
    sourceRoot = "package";

    postPatch = ''
      cp ${./package.json} package.json
      cp ${./package-lock.json} package-lock.json
    '';

    npmDeps = importNpmLock {
      package = npmDepsPackage;
      packageLock = lib.importJSON ./package-lock.json;
    };
    npmConfigHook = importNpmLock.npmConfigHook;

    # The published tarball omits .npmrc, which sets this upstream.
    npmFlags = ["--legacy-peer-deps"];
    # Several install scripts download binaries, which the sandbox forbids.
    npmRebuildFlags = ["--ignore-scripts"];
    # `npm pack` would otherwise run the dev-only `prepare` script.
    npmPackFlags = ["--ignore-scripts"];
    dontNpmBuild = true;

    nativeBuildInputs = [makeWrapper];
    postInstall = ''
      for bin in $out/bin/*; do
        wrapProgram "$bin" --prefix PATH : ${lib.makeBinPath [nodejs]}
      done
    '';

    meta = with lib; {
      description = "Unified AI router with automatic provider fallback";
      homepage = "https://github.com/diegosouzapw/OmniRoute";
      license = licenses.mit;
      mainProgram = "omniroute";
    };
  }
