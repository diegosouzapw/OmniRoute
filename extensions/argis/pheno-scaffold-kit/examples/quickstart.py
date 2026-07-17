"""5-line quickstart for pheno-scaffold-kit (per ADR-023 quickstart rule)."""

from pheno_scaffold_kit import ScaffoldVars, render

render(
    ScaffoldVars(
        repo_name="pheno-my-svc",
        description="A scaffolded service.",
        author="Me",
        author_email="me@example.com",
        license="MIT",
        python_version="3.10",
    ),
    out_dir=".",
)
