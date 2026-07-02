#!/usr/bin/env bash
# terraform-validate.sh — L65 pillar: validate Terraform configurations in-tree
# Runs `terraform init -backend=false` + `terraform validate` in each directory
# that contains *.tf files.
set -euo pipefail

dirs=$(find "$(git rev-parse --show-toplevel)" -name "*.tf" -not -path "*/.terraform/*" -exec dirname {} \; | sort -u)

if [ -z "$dirs" ]; then
  echo "✓ No Terraform directories found."
  exit 0
fi

failed=0
for d in $dirs; do
  echo "→ terraform init -backend=false && terraform validate $d"
  pushd "$d" >/dev/null
  if ! terraform init -backend=false 2>/dev/null; then
    echo "  ✗ terraform init failed in $d"
    popd >/dev/null
    failed=$((failed + 1))
    continue
  fi
  if ! terraform validate; then
    echo "  ✗ terraform validate failed in $d"
    failed=$((failed + 1))
  else
    echo "  ✓ $d is valid"
  fi
  popd >/dev/null
done

if [ "$failed" -gt 0 ]; then
  echo "✗ $failed Terraform director(ies) have validation errors."
  exit 1
fi

echo "✓ All Terraform configurations are valid."
