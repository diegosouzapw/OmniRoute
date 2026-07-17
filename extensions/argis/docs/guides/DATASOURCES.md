# Enhanced Data Sources for Bifrost

## Overview

Bifrost now includes comprehensive technical/SWE-focused data sources alongside public datasets, enabling better prompt adaptation for software engineering tasks.

## New Data Sources Added

### 1. Cursor IDE Chat Logs
**Location**: `~/.cursor/chats` (auto-detected)
**Quality**: HIGH (3x weight)
**Type**: Real developer interactions with AI

Features:
- Automatic platform detection (macOS, Linux, Windows)
- Extracts code context and programming language
- Preserves task type (code, debug, refactor, explain)
- Real-world developer patterns

### 2. Terminal Bench
**Location**: Terminal Bench database (auto-detected)
**Quality**: MEDIUM (2x weight)
**Type**: Command execution traces

Features:
- Command-output pairs from terminal interactions
- Exit codes and context preservation
- Structured command-line patterns
- System interaction examples

### 3. Magpie Synthetic Data
**Source**: HuggingFace (allenai/Magpie-Qwen2-Pro-200K)
**Quality**: MEDIUM (2x weight)
**Type**: High-quality synthetic instruction-following

Features:
- 200K+ synthetic instruction-response pairs
- Diverse task categories
- Instruction-following patterns
- Curated quality

### 4. GitHub Issues (Stub)
**Requires**: GitHub API token
**Quality**: MEDIUM (2x weight)
**Type**: Code review discussions

Features:
- Issue discussions as Q&A pairs
- Code review comments
- Technical problem-solving patterns

### 5. Stack Overflow (Stub)
**Requires**: Stack Exchange API
**Quality**: MEDIUM (2x weight)
**Type**: Technical Q&A

Features:
- Question-answer pairs
- Accepted solutions
- Technical expertise patterns

### 6. ArXiv Papers (Stub)
**Requires**: arxiv Python library
**Quality**: MEDIUM (2x weight)
**Type**: Research paper abstracts

Features:
- Abstract-summary pairs
- CS categories (SE, AI, LG, PL)
- Research methodology patterns

## Data Weighting Strategy

```
Your Historical Data (HIGHEST)
├─ ccusage logs: 3x weight
├─ trace analytics: 3x weight
└─ crun analytics: 3x weight

Technical/SWE (HIGH)
├─ Cursor IDE: 3x weight
├─ Terminal Bench: 2x weight
├─ GitHub Issues: 2x weight
├─ Stack Overflow: 2x weight
└─ ArXiv: 2x weight

Public Datasets (MEDIUM)
├─ WildChat: 2x weight
├─ LMSYS-Chat-1M: 2x weight
├─ Magpie: 2x weight
└─ ShareGPT: 1x weight (disabled by default)
```

## Configuration Example

```python
from datasets.manager import DatasetManager, DatasetConfig

config = DatasetConfig(
    # Your data (always enabled)
    use_ccusage=True,
    use_trace=True,
    
    # Technical/SWE (enabled by default)
    use_cursor=True,
    use_terminal_bench=True,
    use_github=False,  # Requires token
    use_stackoverflow=False,  # Requires API
    use_arxiv=False,  # Requires library
    
    # Public (enabled by default)
    use_wildchat=True,
    use_lmsys=True,
    use_magpie=True,
    use_sharegpt=False,
    
    # Limits
    max_cursor=5000,
    max_terminal_bench=10000,
    max_magpie=50000,
)

manager = DatasetManager(config)
dataset = manager.load_all()
```

## Implementation Files

- `datasets/types.py`: DataSource enum with new sources
- `datasets/technical_loaders.py`: Cursor, Terminal Bench loaders
- `datasets/web_loaders.py`: GitHub, StackOverflow, ArXiv, Magpie loaders
- `datasets/manager.py`: Updated DatasetManager with new loaders
- `DATASETS.md`: Detailed dataset documentation

## Next Steps

1. **Implement GitHub Loader**: Add PyGithub integration
2. **Implement Stack Overflow Loader**: Add Stack Exchange API integration
3. **Implement ArXiv Loader**: Add arxiv library integration
4. **Add Domain-Specific Weighting**: Higher weights for SWE-specific data
5. **Create Pre-folded References**: Code snippets with embeddings

