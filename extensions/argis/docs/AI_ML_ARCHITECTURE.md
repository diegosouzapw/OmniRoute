# AI/ML Layer Architecture

## Overview

The Bifrost AI/ML layer provides intelligent routing, traffic analysis, behavior learning, and policy management through a multi-tier architecture combining local SLMs, cloud models, and ensemble routing.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT REQUEST                                      │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         FAST PATH: SEMANTIC ROUTER                               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ ModernBERT      │  │ Embedding Cache │  │ Model Clusters  │                  │
│  │ Embeddings <3ms │  │ LRU <0.1ms      │  │ Capability Map  │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
│                              │                                                   │
│                    confidence > 0.85 ──────────────────────────► DIRECT ROUTE   │
│                              │                                                   │
│                    confidence < 0.85                                             │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    BYZANTINE ENSEMBLE ROUTER (6 Voters)                          │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                         ROUTER ENSEMBLE                                  │    │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │    │
│  │  │ Arch-Router  │ │ RouteLLM     │ │ MIRT-BERT    │ │ DeBERTa      │    │    │
│  │  │ 1.5B Qwen    │ │ MF Router    │ │ 25-dim IRT   │ │ Classifier   │    │    │
│  │  │ 93.17% acc   │ │ APGR 0.802   │ │ 77% OOD acc  │ │ 98.1% acc    │    │    │
│  │  │ 51ms latency │ │ 2x cost ↓    │ │ 5x cost ↓    │ │ 6-dim        │    │    │
│  │  └──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘    │    │
│  │  ┌──────────────┐ ┌──────────────┐                                       │    │
│  │  │ Cost-Opt     │ │ MIRT         │                                       │    │
│  │  │ Free-First   │ │ Psychometric │                                       │    │
│  │  │ Strategy     │ │ 25-latent    │                                       │    │
│  │  └──────────────┘ └──────────────┘                                       │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                              │                                                   │
│                    Weighted Voting (min 4/6 consensus)                           │
│                    Tolerates 2 faulty/malicious voters                           │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           COST ENGINE                                            │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ Quota Manager   │  │ Usage Tracker   │  │ Go/No-Go        │                  │
│  │ Per-account     │  │ Real-time       │  │ Decision        │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         MODEL ENDPOINT SELECTION                                 │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ Provider        │  │ Fallback        │  │ Health          │                  │
│  │ Accounts        │  │ Chain           │  │ Checker         │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────────────────────────┘
                                      │
                                      ▼
                              PROVIDER API CALL
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         LEARNING SYSTEM                                          │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ Performance     │  │ Pattern         │  │ Rule            │                  │
│  │ Tracker         │  │ Detector        │  │ Generator       │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
│                              │                                                   │
│                              ▼                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                      KNOWLEDGE GRAPH (Neo4j)                             │    │
│  │  Nodes: Models, Tasks, Patterns, Rules, Behaviors                        │    │
│  │  Edges: PERFORMS_WELL_ON, SIMILAR_TO, DERIVED_FROM, VALIDATES            │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

## Component Details

### 1. Local Model Roles (vibeproxy/LocalModelManager)

Each local model serves a specific role in the pipeline:

| Role | Purpose | Recommended Models | Default Port |
|------|---------|-------------------|--------------|
| **Model Router** | Routes requests to optimal cloud/local models | `katanemo/Arch-Router-1.5B`, `routellm/mf-router` | 8008 |
| **Tool Router** | Classifies and routes tool/function calls | `katanemo/Arch-Router-1.5B` | 8009 |
| **Task Classifier** | Analyzes task type and complexity | `microsoft/deberta-v3-base` | 8010 |
| **Summarizer** | Compresses context for long conversations | `mlx-community/Qwen2.5-7B-Instruct-4bit` | 8011 |
| **Code Assistant** | Primary model for code generation | `mlx-community/Qwen2.5-Coder-32B-Instruct-4bit` | 8000 |
| **Reasoner** | Complex multi-step reasoning | `mlx-community/DeepSeek-R1-Distill-Qwen-32B-4bit` | 8001 |
| **Embedder** | Generates embeddings for semantic ops | `nomic-ai/nomic-embed-text-v1.5` | 8012 |
| **Sentiment Analyzer** | Emotional context detection (GoEmotions) | `SamLowe/roberta-base-go_emotions` | 8013 |
| **Content Moderator** | Toxicity detection (Detoxify) | `unitary/unbiased-toxic-roberta` | 8014 |

### 2. Router Ensemble Components

#### 2.1 Arch-Router (Primary)
- **Model**: `katanemo/Arch-Router-1.5B` (Qwen 2.5-based)
- **Accuracy**: 93.17% on routing benchmarks
- **Latency**: 51ms average
- **Paper**: arXiv:2501.02141

#### 2.2 RouteLLM (Matrix Factorization)
- **Type**: Bilinear scoring with learned embeddings
- **APGR**: 0.802 (Area under Performance-Gain-Ratio curve)
- **Cost Reduction**: 2x+ while maintaining quality
- **Paper**: ICLR 2025, arXiv:2406.18665

#### 2.3 MIRT-BERT Router
- **Type**: Multidimensional Item Response Theory
- **Dimensions**: 25 latent ability dimensions
- **OOD Accuracy**: 77% (vs 70% for RouteLLM BERT)
- **Parameters**: 58K trainable (vs 110M for BERT)
- **Paper**: ACL 2025, arXiv:2506.01048

#### 2.4 NVIDIA DeBERTa Classifier
- **Accuracy**: 98.1% on complexity classification
- **Dimensions**: 6-dimensional complexity analysis
- **Task Types**: 11 categories
- **Source**: Microsoft Research

### 3. Traffic Analysis → Behavior Learning Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         TRAFFIC ANALYSIS LAYER                                   │
│                                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ Request         │  │ Response        │  │ Latency         │                  │
│  │ Fingerprinting  │  │ Quality Scoring │  │ Profiling       │                  │
│  │ - Token patterns│  │ - Coherence     │  │ - P50/P95/P99   │                  │
│  │ - Task type     │  │ - Completeness  │  │ - Provider      │                  │
│  │ - Complexity    │  │ - Accuracy      │  │ - Model         │                  │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘                  │
│                              │                                                   │
└──────────────────────────────┼───────────────────────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         PATTERN DETECTION                                        │
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │ Detected Patterns:                                                       │    │
│  │ - Model X performs 40% better on code tasks                              │    │
│  │ - Provider Y has 2x latency after 5PM                                    │    │
│  │ - Task type Z always fails with model W                                  │    │
│  │ - User cluster A prefers reasoning models                                │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                              │                                                   │
└──────────────────────────────┼───────────────────────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    RESEARCH VALIDATION PIPELINE                                  │
│                                                                                  │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                    MULTI-AGENT ITERATIVE DEBATE                          │    │
│  │                                                                          │    │
│  │  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐           │    │
│  │  │ Agent 1  │◄──►│ Agent 2  │◄──►│ Agent 3  │◄──►│ Agent N  │           │    │
│  │  │ Advocate │    │ Critic   │    │ Analyst  │    │ Arbiter  │           │    │
│  │  └──────────┘    └──────────┘    └──────────┘    └──────────┘           │    │
│  │                                                                          │    │
│  │  Process:                                                                │    │
│  │  1. Pattern → Semantic description (tuned to observed behavior)          │    │
│  │  2. Query external research (arXiv, benchmarks, papers)                  │    │
│  │  3. Agents debate validity with evidence                                 │    │
│  │  4. Iterate until consensus or max rounds                                │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                              │                                                   │
│                              ▼                                                   │
│  ┌─────────────────────────────────────────────────────────────────────────┐    │
│  │                    BYZANTINE ENSEMBLE SCORING                            │    │
│  │                                                                          │    │
│  │  Validators: [Research, Benchmark, Historical, Statistical, Expert]      │    │
│  │  Consensus: min 3/5 agreement required                                   │    │
│  │  Fault Tolerance: 1 malicious/faulty validator                           │    │
│  │                                                                          │    │
│  │  Scoring Dimensions:                                                     │    │
│  │  - Statistical significance (p < 0.05)                                   │    │
│  │  - Sample size adequacy (n > 100)                                        │    │
│  │  - External validation match                                             │    │
│  │  - Temporal stability (consistent over time)                             │    │
│  │  - Cross-provider consistency                                            │    │
│  └─────────────────────────────────────────────────────────────────────────┘    │
│                              │                                                   │
└──────────────────────────────┼───────────────────────────────────────────────────┘
                               ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    KNOWLEDGE GRAPH POLICIES (Neo4j)                              │
│                                                                                  │
│  Node Types:                                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│  │ Model    │ │ Task     │ │ Pattern  │ │ Rule     │ │ Behavior │               │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘               │
│                                                                                  │
│  Edge Types:                                                                     │
│  - PERFORMS_WELL_ON (Model → Task, weight: accuracy)                            │
│  - SIMILAR_TO (Task → Task, weight: embedding similarity)                       │
│  - DERIVED_FROM (Rule → Pattern, confidence score)                              │
│  - VALIDATES (Research → Pattern, citation count)                               │
│  - SUPERSEDES (Rule → Rule, timestamp)                                          │
│                                                                                  │
│  Example Policies:                                                               │
│  - "Route code_generation to Qwen-Coder when complexity > 0.7"                  │
│  - "Fallback to Claude when GPT-4 latency > 5s"                                 │
│  - "Prefer local models for summarization tasks"                                │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 4. Data Layer Components

#### 4.1 PostgreSQL (Primary Storage)
- **Tables**: models, model_metrics, model_abilities, tools, bandit_state
- **pgvector**: Embedding storage for semantic search
- **sqlc**: Type-safe Go code generation

#### 4.2 Redis (Hot State - Upstash)
- Rate limits per account/model
- Session windows for context
- Real-time usage counters
- TTL-based cache invalidation

#### 4.3 Neo4j (Knowledge Graph - AuraDB Free)
- Policy storage and traversal
- Pattern relationships
- Model capability mapping
- Rule derivation chains

#### 4.4 NATS (Async Jobs)
- Evaluation pipelines
- Profiling tasks
- Bandit updates
- Benchmark collection

### 5. Integration Points

#### 5.1 vibeproxy (macOS Swift Frontend)
```swift
// LocalModelManager manages role-based model instances
let modelManager = LocalModelManager.shared

// Start model router
if let routerConfig = modelManager.getInstance(for: .modelRouter) {
    modelManager.start(routerConfig.id) { success in
        // Router ready for requests
    }
}

// Discover installed models (including arch-router)
modelManager.discoverInstalledModels()
```

#### 5.2 bifrost-extensions (Go Backend)
```go
// IntelligentRouter with all components
router := intelligentrouter.New(config).
    WithCostEngine(costEngine).
    WithQueries(queries).
    WithSLMClients(slmClients)

// Learning plugin for behavior tracking
learning := learning.New(learningConfig)
learning.Start(ctx)
```

### 6. Performance Targets

| Component | Latency Target | Accuracy Target |
|-----------|---------------|-----------------|
| Semantic Router (fast path) | <5ms | >85% confidence |
| Byzantine Ensemble | <100ms | >93% accuracy |
| Cost Engine | <1ms | N/A |
| Pattern Detection | <1s (async) | >80% precision |
| Knowledge Graph Query | <10ms | N/A |

### 7. Content Safety & Sentiment Analysis

#### 7.1 Detoxify (Toxicity Detection)
- **Model**: `unitary/toxic-bert` or `unitary/unbiased-toxic-roberta`
- **Scores**: toxicity, severe_toxicity, obscene, threat, insult, identity_attack
- **Use Cases**:
  - Pre-hook: Block requests with toxicity > 0.85
  - Post-hook: Flag responses for review
  - Learning: Train on flagged content patterns

#### 7.2 GoEmotions (Emotion Detection)
- **Model**: `SamLowe/roberta-base-go_emotions`
- **Emotions**: 28 categories (13 positive, 11 negative, 4 neutral)
- **Use Cases**:
  - Emotion-based routing (frustrated → patient model)
  - Conversation state tracking across turns
  - User satisfaction prediction

#### 7.3 Content Safety Plugin Flow
```
Request → [Detoxify] → Block (>0.85) / Flag (>0.5) / Pass (<0.5)
              ↓
         [GoEmotions] → Emotional Context → Routing Hint
              ↓
         Store in Context → Available to IntelligentRouter
```

### 8. 3-Pillar Optimization System

The core optimization engine maximizes **Speed** and **Quality** while minimizing **Cost**.

#### 8.1 Dense Model Profiles

Each model maintains a comprehensive profile:

```go
type ModelProfile struct {
    Speed       SpeedProfile    // TTFT, latency percentiles, tokens/sec
    Quality     QualityProfile  // Task-specific scores, benchmarks, feedback
    Cost        CostProfile     // Pricing, effective costs, quality-per-dollar
    TaskProfiles map[string]*TaskProfile  // Per-task 3-pillar scores
    Reliability  ReliabilityProfile       // Success rate, uptime, MTBF
    Capacity     CapacityProfile          // RPM/TPM limits, context window
}
```

#### 8.2 Optimization Modes

| Mode | Speed | Quality | Cost | Use Case |
|------|-------|---------|------|----------|
| **Balanced** | 0.33 | 0.34 | 0.33 | Default, general purpose |
| **Speed First** | 0.60 | 0.25 | 0.15 | Real-time applications |
| **Quality First** | 0.15 | 0.60 | 0.25 | Critical tasks, code review |
| **Cost First** | 0.20 | 0.20 | 0.60 | Batch processing, high volume |

#### 8.3 Tiered Learning Scopes

Learning aggregates across hierarchical scopes:

```
Request → PromptChain → Session → Project → User → Global
   ↓           ↓            ↓         ↓        ↓       ↓
 5min TTL   30min TTL   24hr TTL  Persistent  Persistent  Persistent
```

Each scope tracks:
- Model preferences (EMA-updated scores)
- Task-type mappings (best model per task)
- Success rates, latency, cost
- Models to avoid (consistent failures)

#### 8.4 Pareto Frontier Selection

For multi-objective optimization, the system computes the Pareto frontier:
- Models where no other model dominates on all 3 pillars
- Alternatives presented from Pareto-optimal set
- Confidence-weighted scoring (penalizes low-sample models)

#### 8.5 Feedback Loop

```
Request → Routing Decision → Provider Call → Response
                                    ↓
                            Observation Recorded
                                    ↓
                    ┌───────────────┴───────────────┐
                    ↓                               ↓
            ProfileStore.RecordObservation   TieredLearning.RecordEvent
                    ↓                               ↓
            EMA Update (α=0.1)              Scope Propagation
                    ↓                               ↓
            Derived Metrics                 Preference Updates
            (QualityPerDollar,              (ModelPrefs, TaskTypePrefs,
             SpeedPerDollar)                 AvoidModels)
```

### 9. Research References

1. **IRT-Router** (ACL 2025): arXiv:2506.01048
2. **RouteLLM** (ICLR 2025): arXiv:2406.18665
3. **Arch-Router**: arXiv:2501.02141
4. **FrugalGPT**: arXiv:2305.05176
5. **AutoMix**: arXiv:2310.12218
6. **Detoxify**: github.com/unitaryai/detoxify
7. **GoEmotions**: aclanthology.org/2020.acl-main.372

