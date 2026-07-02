#!/usr/bin/env bash
# terraform-fmt.sh — L65 pillar: check Terraform formatting across the monorepo
# Returns non-zero if any .tf file is not canonical-formatted.
set -euo pipefail

dirs=$(find "$(git rev-parse --show-toplevel)" -name "*.tf" -not -path "*/.terraform/*" -exec dirname {} \; | sort -u)

if [ -z "$dirs" ]; then
  echo "✓ No Terraform directories found."
  exit 0
fi

failed=0
for d in $dirs; do
  echo "→ terraform fmt -check -diff -recursive $d"
  if ! terraform fmt -check -diff -recursive "$d"; then
    echo "  ✗ $d contains unformatted files (run 'terraform fmt -recursive $d')"
    failed=$((failed + 1))
  else
    echo "  ✓ $d is formatted"
  fi
done

if [ "$failed" -gt 0 ]; then
  echo "✗ $failed Terraform director(ies) need formatting fixes."
  exit 1
fi

echo "✓ All Terraform files are canonical-formatted."
