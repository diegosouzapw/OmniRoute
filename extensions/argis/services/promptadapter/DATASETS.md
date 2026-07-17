# Prompt Adapter Datasets

Comprehensive dataset loading system for training prompt adaptation models with multi-source data.

## Data Sources

### Your Historical Data (HIGHEST Priority - 3x weight)
- **ccusage**: Claude usage logs from `~/.claude/usage`
- **trace**: Trace project analytics database
- **crun**: crun analytics database

### Technical/SWE Datasets (HIGH Priority - 3x weight)
- **Cursor IDE Logs**: Chat logs from Cursor IDE (`~/.cursor/chats`)
  - Auto-detects platform-specific paths (macOS, Linux, Windows)
  - Extracts code context and language information
  - Quality: HIGH (real developer interactions)

- **Terminal Bench**: Command execution traces
  - Loads from Terminal Bench database
  - Extracts command-output pairs
  - Quality: MEDIUM (structured but synthetic)

- **GitHub Issues** (requires API token)
  - Issue discussions as Q&A pairs
  - Code review comments
  - Quality: MEDIUM

- **Stack Overflow** (requires API)
  - Technical Q&A pairs
  - Accepted answers as responses
  - Quality: MEDIUM

- **ArXiv** (requires arxiv library)
  - Research papers: abstract → summary
  - CS categories: SE, AI, LG, PL
  - Quality: MEDIUM

### Public Datasets (MEDIUM Priority - 2x weight)
- **WildChat**: 1M real user-chatbot interactions
- **LMSYS-Chat-1M**: Chatbot Arena conversations
- **Magpie**: Synthetic instruction-following data (allenai/Magpie-Qwen2-Pro-200K)
- **ShareGPT**: ShareGPT conversations (lower quality, disabled by default)

## Configuration

```python
from datasets.manager import DatasetManager, DatasetConfig

config = DatasetConfig(
    # Your data
    use_ccusage=True,
    use_trace=True,
    # Technical/SWE
    use_cursor=True,
    use_terminal_bench=True,
    use_github=False,  # Requires token
    use_stackoverflow=False,  # Requires API
    use_arxiv=False,  # Requires library
    # Public
    use_wildchat=True,
    use_lmsys=True,
    use_magpie=True,
    use_sharegpt=False,
    # Limits
    max_cursor=5000,
    max_terminal_bench=10000,
    max_wildchat=10000,
    max_magpie=50000,
)

manager = DatasetManager(config)
dataset = manager.load_all()
```

## Weighting Strategy

Data is weighted by quality tier:
- **Your data**: 3x weight (highest quality)
- **Technical/SWE**: 3x weight (high quality, domain-specific)
- **Curated public**: 2x weight (medium quality)
- **Raw public**: 1x weight (lower quality)

## Usage

```python
# Get weighted sample
sample = manager.get_weighted_sample(n=1000)

# Filter by model
gpt4_pairs = manager.filter_by_model("gpt-4")

# Filter by source
cursor_pairs = manager.filter_by_source(DataSource.CURSOR_LOGS)

# Get summary
print(manager.summary())
```

## Adding New Sources

1. Create loader in `technical_loaders.py` or `web_loaders.py`
2. Implement `iter_pairs()` method returning `PromptResponsePair`
3. Add `DataSource` enum value in `types.py`
4. Add config option in `DatasetConfig`
5. Add load method in `DatasetManager`
6. Update `load_all()` to call new loader

