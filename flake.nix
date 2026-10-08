{
  description = "OmniRoute - Unified AI router with 160+ providers";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        # nodejs_22 ships npm 10, which (a) rewrites package-lock.json on every
        # install (drops the npm 11 `libc` fields, downgrades undici 7 -> 6) and
        # (b) runs node-gyp for better-sqlite3 -> fails without Python -> npm
        # silently prunes it, since it is an optionalDependency.
        # node 24 ships npm 11: lockfile stays byte-identical and the bundled
        # better-sqlite3 prebuild is used instead of a source build.
        nodejs = pkgs.nodejs_24;
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            nodejs
            # Real Python for node-gyp: macOS /usr/bin/python3 is an Xcode CLT
            # stub that cannot exec, so any from-source native build fails.
            pkgs.python3
          ];

          shellHook = ''
            echo "Welcome to OmniRoute dev environment"
            export PATH="$PWD/node_modules/.bin:$PATH"
            
            # Install dependencies if node_modules doesn't exist
            if [ ! -d "node_modules" ]; then
              echo "Installing dependencies..."
              npm install
            fi
          '';
        };
      }
    );
}
