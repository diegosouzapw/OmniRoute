# Bifrost Usage Examples

## 1. Load All Datasets with Enhanced Sources

```python
from services.promptadapter.datasets.manager import DatasetManager, DatasetConfig

# Create config with all sources enabled
config = DatasetConfig(
    # Your data
    use_ccusage=True,
    use_trace=True,
    # Technical/SWE (new!)
    use_cursor=True,
    use_terminal_bench=True,
    # Public
    use_wildchat=True,
    use_lmsys=True,
    use_magpie=True,
)

# Load all datasets
manager = DatasetManager(config)
dataset = manager.load_all()

# Get summary
print(manager.summary())
```

## 2. Get Weighted Sample Favoring Your Data

```python
# Get 1000 samples weighted by quality
samples = manager.get_weighted_sample(n=1000)

# Samples will be weighted:
# - Your data: 3x weight
# - Technical/SWE: 3x weight
# - Public curated: 2x weight
# - Public raw: 1x weight
```

## 3. Filter by Source

```python
# Get only Cursor IDE data
cursor_pairs = manager.filter_by_source(DataSource.CURSOR_LOGS)
print(f"Found {len(cursor_pairs)} Cursor interactions")

# Get only Terminal Bench data
terminal_pairs = manager.filter_by_source(DataSource.TERMINAL_BENCH)
print(f"Found {len(terminal_pairs)} terminal commands")

# Get only Magpie synthetic data
magpie_pairs = manager.filter_by_source(DataSource.MAGPIE)
print(f"Found {len(magpie_pairs)} synthetic examples")
```

## 4. Filter by Model

```python
# Get data for specific models
gpt4_pairs = manager.filter_by_model("gpt-4")
claude_pairs = manager.filter_by_model("claude")
cursor_pairs = manager.filter_by_model("cursor")
```

## 5. Train Prompt Adapter with Enhanced Data

```python
from services.promptadapter.adapter import PromptAdapterPipeline

# Load datasets
manager = DatasetManager(config)
dataset = manager.load_all()

# Create adapter pipeline
adapter = PromptAdapterPipeline()

# Train with weighted samples
training_data = manager.get_weighted_sample(n=5000)
adapter.train_from_datasets(training_data)
```

## 6. Adapt Prompts for Different Models

```python
# Adapt a prompt for GPT-4
adapted_gpt4 = adapter.adapt(
    prompt="Write a Python function to sort a list",
    source_model="cursor",
    target_model="gpt-4"
)

# Adapt for Claude
adapted_claude = adapter.adapt(
    prompt="Write a Python function to sort a list",
    source_model="cursor",
    target_model="claude-3"
)

# Adapt for Llama
adapted_llama = adapter.adapt(
    prompt="Write a Python function to sort a list",
    source_model="cursor",
    target_model="llama-2"
)
```

## 7. Optimize Prompts with DSPy

```python
# Optimize a prompt using DSPy MIPROv2
optimized = adapter.optimize(
    prompt="Write a Python function to sort a list",
    target_model="gpt-4",
    num_trials=10
)

print(f"Original: {optimized['original']}")
print(f"Optimized: {optimized['optimized']}")
print(f"Improvement: {optimized['improvement']:.2%}")
```

## 8. Run Research Intelligence Pipeline

```python
from services.researchintel.pipeline import ResearchIntelPipeline, PipelineConfig

config = PipelineConfig(
    research_depth="deep",
    include_sentiment_analysis=True,
    generate_proposals=True,
)

pipeline = ResearchIntelPipeline(config)

# Run full research
results = pipeline.run_research(
    query="Best practices for Python async programming",
    max_sources=50
)

# Get proposals
proposals = results.proposals
for proposal in proposals:
    print(f"- {proposal.name}: {proposal.description}")
```

## 9. Analyze Chat Logs for Insights

```python
# Analyze your chat logs
insights = pipeline.analyze_chatlogs(
    log_dir="~/.claude/chats",
    include_models=["gpt-4", "claude-3"],
)

# Get model preferences
print(f"Preferred models: {insights.preferred_models}")
print(f"Common tasks: {insights.common_tasks}")
print(f"Sentiment: {insights.sentiment_distribution}")
```

## 10. Deploy with Docker Compose

```bash
# Start all services
docker-compose up -d

# Check service health
curl http://localhost:8090/health  # Prompt Adapter
curl http://localhost:8091/health  # Research Intel

# View logs
docker-compose logs -f promptadapter
docker-compose logs -f researchintel

# Stop services
docker-compose down
```

## Configuration Options

```python
DatasetConfig(
    # Your data
    use_ccusage=True,
    use_trace=True,
    use_crun_analytics=True,
    
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
    
    # Filters
    min_prompt_length=10,
    max_prompt_length=10000,
    filter_toxic=True,
    languages=["en"],
)
```

