{
  description = "OmniRoute — free MIT AI gateway: one endpoint, 350+ providers, 1200+ models with auto-fallback";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-25.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        nodejs = pkgs.nodejs_22;
      in
      {
        packages.default = pkgs.callPackage ./nix/omniroute.nix { inherit nodejs; };
        packages.omniroute = self.packages.${system}.default;

        devShells.default = pkgs.mkShell {
          buildInputs = [
            nodejs
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
