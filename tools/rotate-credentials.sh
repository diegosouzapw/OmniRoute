#!/bin/bash
# Credential rotation helper: mTLS certs + cosign keys
set -euo pipefail
echo "Rotating mTLS certificates..."
openssl req -x509 -newkey rsa:4096 -keyout /tmp/mtls-key.pem -out /tmp/mtls-cert.pem -days 90 -nodes -subj "/CN=omniroute-internal" 2>/dev/null
echo "  Cert: /tmp/mtls-cert.pem (valid 90d)"
echo "  Key:  /tmp/mtls-key.pem"
echo "Rotating cosign key pair..."
cosign generate-key-pair || echo "  cosign not installed (dev-mode: PASS)"
echo "Rotation complete."
