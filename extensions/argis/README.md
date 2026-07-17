<!-- AI-DD-META:START -->
<!-- This repository is planned, maintained, and managed by AI Agents only. -->
<!-- Slop issues are expected and intentionally present as part of an HITL-less -->
<!-- /minimized AI-DD metaproject of learning, refining, and building brute-force -->
<!-- training for both agents and the human operator. -->
![Downloads](https://img.shields.io/github/downloads/KooshaPari/argis-extensions/total?style=flat-square&label=downloads&color=blue)
![GitHub release](https://img.shields.io/github/v/release/KooshaPari/argis-extensions?style=flat-square&label=release)
![License](https://img.shields.io/github/license/KooshaPari/argis-extensions?style=flat-square)
![AI-Slop](https://img.shields.io/badge/AI--DD-Slop%20Expected-orange?style=flat-square)
![AI-Only-Maintained](https://img.shields.io/badge/Planned%20%26%20Maintained%20by-AI%20Agents%20Only-red?style=flat-square)
![HITL-less](https://img.shields.io/badge/HITL--less%20AI--DD-metaproject-yellow?style=flat-square)

> ⚠️ **AI-Agent-Only Repository**
>
> This repo is **planned, maintained, and managed exclusively by AI Agents**.
> Slop issues, rough edges, and AI artifacts are **expected and intentionally
> present** as part of an **HITL-less / minimized AI-DD** metaproject focused
> on learning, refining, and brute-force training both the agents and the
> human operator. Bug reports and contributions are still welcome, but please
> expect AI-generated code, comments, and documentation throughout.
<!-- AI-DD-META:END -->
## Work State

| Field | Value |
|---|---|
| Last commit | 2026-05-04 |
| Open issues | 0 |
| Open PRs | 7 |
| Focus | Bifrost LLM gateway extension layer (Go modules) |

Progress: ██████░░░░ 60%

# Bifrost Extensions

Bifrost Extensions is a clean extension layer for the Bifrost LLM gateway, consuming upstream repositories as Go modules without modifications.

## Quick Start

```bash
# Build CLI
make cli-build

# Install CLI
make cli-install

# Initialize project
bifrost init

# Start server
bifrost server

# Deploy to Fly.io
bifrost deploy fly
```

## Documentation

- **[docs/README.md](docs/README.md)** - Main documentation index
- **[docs/INDEX.md](docs/INDEX.md)** - Complete file navigation
- **[docs/architecture/](docs/architecture/)** - Architecture & design principles
- **[docs/cli/](docs/cli/)** - CLI usage and integration
- **[docs/deployment/](docs/deployment/)** - Deployment guides
- **[docs/evaluation/](docs/evaluation/)** - Gap analysis and roadmap
- **[docs/guides/](docs/guides/)** - How-to guides and examples
- [`AGENTS.md`](AGENTS.md) — operating instructions for AI agents and human contributors
- [`SPEC.md`](SPEC.md) — formal specification of behavior and contracts

## Architecture

This project follows a **clean extension layer pattern**:

- ✅ Consumes `bifrost` and `cliproxy` as Go modules
- ✅ Zero modifications to upstream repositories
- ✅ Easy to stay in sync with main developers
- ✅ Plugin-based extensibility

See [docs/architecture/PRINCIPLES.md](docs/architecture/PRINCIPLES.md) for details.

## Key Features

- **CLI Framework**: Cobra-based command-line interface
- **Serverless Deployment**: Fly.io, Vercel, Railway, Render, Homebox
- **Plugin System**: Extensible plugin architecture
- **Configuration**: Viper-based YAML + environment variables
- **Database**: PostgreSQL with migrations
- **Caching**: Redis support
- **Observability**: Structured logging and metrics

## Project Structure

```
bifrost-extensions/
├── README.md                 # This file
├── docs/                     # Documentation tree
│   ├── README.md            # Main docs index
│   ├── INDEX.md             # File navigation
│   ├── architecture/        # Design & principles
│   ├── cli/                 # CLI documentation
│   ├── deployment/          # Deployment guides
│   ├── evaluation/          # Gap analysis
│   ├── guides/              # How-to guides
│   └── reference/           # Reference materials
├── cmd/                     # CLI commands
├── api/                     # API routes
├── services/                # Business logic
├── config/                  # Configuration
├── db/                      # Database
└── plugins/                 # Plugin implementations
```

## Development

See [docs/guides/TESTING.md](docs/guides/TESTING.md) for testing procedures.

## License

See LICENSE file for details.

