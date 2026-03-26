#!/bin/bash
# Wrapper for OmniRoute translation validator
# Provides easy CLI access to the Python validation script

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Run the Python script with all arguments
exec python3 "$SCRIPT_DIR/scripts/validate_translation.py" "$@"
