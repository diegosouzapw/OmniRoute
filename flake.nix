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
        nodejs = pkgs.nodejs_22;
        pnpm = pkgs.pnpm;
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = [
            nodejs
            pnpm
            pkgs.typescript
            pkgs.eslint
          ];

          shellHook = ''
            echo "Welcome to OmniRoute dev environment"
            export PATH="$PWD/node_modules/.bin:$PATH"
            
            # Install dependencies if node_modules doesn't exist
            if [ ! -d "node_modules" ]; then
              echo "Installing dependencies..."
              pnpm install
            fi
          '';
        };
      }
    );
}
