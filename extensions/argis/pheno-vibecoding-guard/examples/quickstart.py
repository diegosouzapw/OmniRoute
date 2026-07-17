"""5-line quickstart for pheno-vibecoding-guard (per ADR-023 quickstart rule)."""

from pheno_vibecoding_guard import scan_text

for f in scan_text("import os\nx = os.path.join('a', 'b')\n",
                   rules=["no-hallucinated-imports"]):
    print(f.rule, f.line, f.message)
