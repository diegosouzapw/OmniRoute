#!/usr/bin/env python3
"""Deterministic Cargo.lock SHA-256 hash for L30 drift detection."""
import hashlib, json, sys
from pathlib import Path

def lock_hash(lock_path: str) -> str:
    lock = Path(lock_path).read_text().strip()
    return hashlib.sha256(lock.encode()).hexdigest()

if __name__ == "__main__":
    path = sys.argv[1] if len(sys.argv) > 1 else "Cargo.lock"
    digest = lock_hash(path)
    print(digest)
    Path(".cargo-lock-hash").write_text(digest + "\n")
