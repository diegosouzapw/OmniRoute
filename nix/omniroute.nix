# OmniRoute has a workspace-based package-lock.json that references local
# workspace packages (@omniroute/browser-pool, open-sse, packages/browser-pool).
# `buildNpmPackage` uses `npm ci --offline` inside the Nix sandbox, which
# cannot resolve those workspace links. This fixed-output derivation instead
# runs `npm install -g omniroute@<version>` with network access, and pins
# reproducibility via `outputHash`. Bumping the version requires updating
# the hash below (run `nix build` once, copy the "got:" value from the
# hash-mismatch error).
{
  lib,
  stdenv,
  nodejs,
  cacert,
  makeWrapper,
}:
stdenv.mkDerivation (finalAttrs: {
  pname = "omniroute";
  version = "3.8.50";

  dontUnpack = true;
  dontConfigure = true;

  nativeBuildInputs = [nodejs cacert makeWrapper];

  buildPhase = ''
    runHook preBuild
    export HOME="$NIX_BUILD_TOP/home"
    mkdir -p "$HOME"
    export npm_config_cache="$NIX_BUILD_TOP/.npm-cache"
    export npm_config_prefix="$out"
    export npm_config_userconfig="$HOME/.npmrc"
    export npm_config_globalconfig="$HOME/.npmrc-global"
    export SSL_CERT_FILE="${cacert}/etc/ssl/certs/ca-bundle.crt"
    mkdir -p $out
    ${nodejs}/bin/npm install -g \
      --no-audit --no-fund --no-update-notifier \
      --ignore-scripts \
      omniroute@${finalAttrs.version}
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    for bin in omniroute omniroute-reset-password; do
      if [ -e $out/bin/$bin ]; then
        wrapProgram $out/bin/$bin --prefix PATH : ${nodejs}/bin
      fi
    done
    runHook postInstall
  '';

  outputHashMode = "recursive";
  outputHashAlgo = "sha256";
  outputHash = "sha256-lWXH7/aiIQiUvC6TVjnnNS1nkYE5QDwbSbJ1QNlpp9Q=";

  meta = with lib; {
    description = "Free MIT AI gateway: one endpoint, 350+ providers, 1200+ models with auto-fallback";
    homepage = "https://github.com/diegosouzapw/OmniRoute";
    license = licenses.mit;
    platforms = platforms.linux ++ platforms.darwin;
    mainProgram = "omniroute";
  };
})
