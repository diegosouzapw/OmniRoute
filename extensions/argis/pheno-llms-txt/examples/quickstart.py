"""5-line quickstart for pheno-llms-txt (per ADR-023 quickstart rule)."""

from pheno_llms_txt import Section, generate

generate(
    project_name="pheno-foo",
    summary="One-line description of the project.",
    sections=[Section("Docs", [("README", "https://example.com/README.md")])],
    out_path="llms.txt",
)
