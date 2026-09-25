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
{
  lib,
  buildNpmPackage,
  fetchurl,
  importNpmLock,
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
      hash = "sha512-qK6REDWQYGh8lwGwDgFMsBqAMXnxIePudr8cSuSYeB9iIlywNhDJxHKt6Cwa31lPci8jXE5bbvl+az0lvyt0Mg==";
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

    meta = with lib; {
      description = "Unified AI router with automatic provider fallback";
      homepage = "https://github.com/diegosouzapw/OmniRoute";
      license = licenses.mit;
      mainProgram = "omniroute";
    };
  }
