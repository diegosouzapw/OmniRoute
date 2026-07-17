#!/usr/bin/env bash
# scripts/render.sh — dry-instantiation of pheno-ssot-template
#
# Usage:
#   ./scripts/render.sh <target-name> <dest-dir>
#
# Example:
#   ./scripts/render.sh my-new-service /tmp/my-new-service
#
# What it does:
#   1. Copies the template directory tree (minus .git, target/, scripts/)
#      to <dest-dir>.
#   2. Substitutes {{project_name}}, {{project_slug}}, {{rust_msrv}},
#      {{primary_language}} in every .template file and in README.md.
#   3. Renames `src/lib.rs.template` to `src/lib.rs`.
#   4. Runs `cargo check` in <dest-dir> to verify the placeholder
#      resolves the 5 SSOT path-deps and compiles cleanly.
#
# Exit codes:
#   0   render + cargo check succeeded
#   1   bad CLI args
#   2   template files missing
#   3   render (cp + sed) failed
#   4   cargo check failed (placeholder does not resolve SSOT deps)
#
# Reference: V3 L3 #55 (pheno-ssot-template). See
# pheno-ssot-template/README.md and template.yaml for the full spec.

set -euo pipefail

# ---------------------------------------------------------------------------
# Args
# ---------------------------------------------------------------------------

if [[ $# -lt 2 ]]; then
    echo "usage: $0 <project-slug> <dest-dir>" >&2
    echo "example: $0 my-new-service /tmp/my-new-service" >&2
    exit 1
fi

PROJECT_SLUG="$1"
DEST_DIR="$2"

# Defaults for variables that aren't passed on the command line.
PROJECT_NAME="${PROJECT_NAME:-$(echo "$PROJECT_SLUG" | sed -E 's/-/ /g; s/\b(.)/\U\1/g')}"
RUST_MSRV="${RUST_MSRV:-1.75}"
PRIMARY_LANGUAGE="${PRIMARY_LANGUAGE:-rust}"

# Validate project_slug against the template.yaml regex.
if ! [[ "$PROJECT_SLUG" =~ ^[a-z][a-z0-9-]+$ ]]; then
    echo "error: project_slug must match ^[a-z][a-z0-9-]+\$, got: $PROJECT_SLUG" >&2
    exit 1
fi

# ---------------------------------------------------------------------------
# Resolve template root
# ---------------------------------------------------------------------------

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

if [[ ! -f "$TEMPLATE_DIR/template.yaml" ]]; then
    echo "error: template.yaml not found at $TEMPLATE_DIR" >&2
    exit 2
fi

echo "==> rendering pheno-ssot-template"
echo "    project_name       = $PROJECT_NAME"
echo "    project_slug       = $PROJECT_SLUG"
echo "    rust_msrv          = $RUST_MSRV"
echo "    primary_language   = $PRIMARY_LANGUAGE"
echo "    template_dir       = $TEMPLATE_DIR"
echo "    dest_dir           = $DEST_DIR"

# ---------------------------------------------------------------------------
# Copy tree
# ---------------------------------------------------------------------------

mkdir -p "$DEST_DIR"

# Use tar to preserve permissions and exclude noise. We copy the whole
# template (including scripts/, .github/, etc.) but skip the template.yaml
# itself (it's the manifest, not part of the rendered output).
tar -C "$TEMPLATE_DIR" \
    --exclude='./.git' \
    --exclude='./target' \
    --exclude='./template.yaml' \
    --exclude='./scripts/render.sh' \
    -cf - . | tar -C "$DEST_DIR" -xf -

# ---------------------------------------------------------------------------
# Substitute placeholders
# ---------------------------------------------------------------------------

# Substitute in every .template file and every Markdown / TOML / YAML
# file. The list is intentionally small; we don't want to munge binary
# blobs or large generated files.
find "$DEST_DIR" -type f \
    \( -name '*.template' -o -name '*.md' -o -name '*.toml' -o -name '*.yml' -o -name '*.yaml' -o -name '*.rs' \) \
    -print0 | while IFS= read -r -d '' f; do
    sed -i.bak \
        -e "s|{{project_slug}}|$PROJECT_SLUG|g" \
        -e "s|{{project_name}}|$PROJECT_NAME|g" \
        -e "s|{{rust_msrv}}|$RUST_MSRV|g" \
        -e "s|{{primary_language}}|$PRIMARY_LANGUAGE|g" \
        "$f"
    rm -f "$f.bak"
done

# Rename lib.rs.template -> lib.rs and Cargo.toml.template -> Cargo.toml.
# (Both end in .template so they survive the placeholder-substitution
# pass without their content being touched; we explicitly rename here.)
if [[ -f "$DEST_DIR/src/lib.rs.template" ]]; then
    mv "$DEST_DIR/src/lib.rs.template" "$DEST_DIR/src/lib.rs"
fi
if [[ -f "$DEST_DIR/Cargo.toml.template" ]]; then
    mv "$DEST_DIR/Cargo.toml.template" "$DEST_DIR/Cargo.toml"
fi

echo "==> render complete: $DEST_DIR"
echo

# ---------------------------------------------------------------------------
# cargo check (only for rust projects)
# ---------------------------------------------------------------------------

if [[ "$PRIMARY_LANGUAGE" == "rust" ]]; then
    echo "==> running cargo check in $DEST_DIR"
    if ! (cd "$DEST_DIR" && cargo check --all-targets 2>&1 | tail -40); then
        echo
        echo "error: cargo check failed — the placeholder skeleton does not" >&2
        echo "       resolve the 5 SSOT path-deps. Make sure the destination" >&2
        echo "       has the same ../../../pheno-errors, ../../../pheno-tracing," >&2
        echo "       ../../../pheno-config, ../../../pheno-tokio-base layout" >&2
        echo "       as the monorepo, or swap the path-deps to git / crates.io refs." >&2
        exit 4
    fi
    echo "==> cargo check OK"
else
    echo "(skipping cargo check: primary_language=$PRIMARY_LANGUAGE)"
fi

echo
echo "==> done. next steps:"
echo "    cd $DEST_DIR"
echo "    # edit src/lib.rs to replace the placeholder run() body"
echo "    # add real CLI / HTTP handlers / domain logic"
echo "    # open a PR against the Phenotype monorepo"
