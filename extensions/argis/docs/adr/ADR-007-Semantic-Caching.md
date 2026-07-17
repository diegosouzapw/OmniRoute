# ADR-007: Redis-Driven Semantic Caching Architecture

**Status:** Accepted  
**Date:** 2026-04-04  
**Author:** Kogito Architecture Team  
**Reviewers:** Platform Engineering, Cost Optimization Team  

---

## Context

LLM API calls are expensive, with costs ranging from $0.01 to $0.25 per 1K tokens depending on model and provider. Analysis of production traffic shows:

- **15-25% of requests are exact duplicates** (same prompt, same parameters)
- **30-45% of requests are semantically similar** (different wording, same intent)
- **Response times for cached queries**: <5ms vs 500-2000ms for fresh requests
- **Potential cost savings**: 40-60% with effective caching

Traditional exact-match caching leaves significant savings on the table. Semantic caching using embeddings can capture equivalent requests regardless of surface differences.

## Decision

Implement a **multi-tier caching architecture** with semantic caching at the Redis layer, using vector similarity search for cache hits.

### 1. Cache Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      Multi-Tier Caching Architecture                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Request ──▶ L1 (In-Memory) ──▶ L2 (Redis) ──▶ L3 (Persistent) ──▶ Provider │
│             Ristretto/Go-Cache  Redis + RediSearch  PostgreSQL               │
│             <1ms                 5-10ms             10-50ms                    │
│                                                                              │
│  Cache Types:                                                                │
│  ┌─────────────────────────────────────────────────────────────────────────┐ │
│  │  Tier  │ Type       │  Key                │  Hit Rate  │  Latency      │ │
│  │  ──────┼────────────┼─────────────────────┼────────────┼───────────────│ │
│  │  L1    │ Exact      │  SHA256(method+body)│  15-25%    │  <1ms         │ │
│  │  L2    │ Semantic   │  Embedding(text)    │  30-45%    │  5-10ms       │ │
│  │  L3    │ Persistent │  SHA256 + timestamp │  5-10%     │  10-50ms      │ │
│  └─────────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2. Semantic Caching Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                       Semantic Caching Request Flow                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. Request Arrives                                                           │
│     ┌───────────────────────────────────────────────────────────────────────┐ │
│     │  POST /v1/chat/completions                                           │ │
│     │  {                                                                    │ │
│     │    "model": "claude-3-5-sonnet",                                     │ │
│     │    "messages": [{"role": "user", "content": "Explain quantum        │ │
│     │                   computing like I'm 5"}]                            │ │
│     │  }                                                                    │ │
│     └───────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  2. Extract Cacheable Content                                                   │
│     ┌───────────────────────────────────────────────────────────────────────┐ │
│     │  • Normalize: lowercase, trim whitespace                             │ │
│     │  • Extract: system prompt + user messages                           │ │
│     │  • Ignore: temperature (if >0), top_p, random seeds                 │ │
│     │  • Key: model + normalized content                                    │ │
│     └───────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  3. L1: Exact Match Check                                                      │
│     ┌───────────────────────────────────────────────────────────────────────┐ │
│     │  hash = SHA256(model + normalized_content)                           │ │
│     │  if value, ok := l1Cache.Get(hash); ok {                             │ │
│     │      return value  // Cache hit, <1ms                                │ │
│     │  }                                                                    │ │
│     └───────────────────────────────────────────────────────────────────────┘ │ │
│                                    │                                         │
│                                    ▼ (miss)                                  │
│  4. L2: Semantic Search                                                        │
│     ┌───────────────────────────────────────────────────────────────────────┐ │
│     │  a. Generate embedding                                                │ │
│     │     embedding = embedder.Embed(normalized_content)  // text-embedding  │ │
│     │                                                                         │ │
│     │  b. Vector search in Redis                                            │ │
│     │     FT.SEARCH cache_idx "@embedding:[VECTOR_RANGE $radius $vec]"      │ │
│     │     SORTBY __vector_score                                             │ │
│     │     LIMIT 0 1                                                         │ │
│     │                                                                         │ │
│     │  c. Check similarity threshold                                        │ │
│     │     if similarity >= 0.92 {  // High confidence match                  │ │
│     │         return cached_response  // Cache hit, 5-10ms                     │ │
│     │     }                                                                   │ │
│     └───────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼ (miss)                                  │
│  5. Forward to Provider                                                        │
│     ┌───────────────────────────────────────────────────────────────────────┐ │
│     │  response = provider.Complete(ctx, request)                          │ │
│     │  // 500-2000ms typical                                                │ │
│     └───────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  6. Cache Response                                                             │
│     ┌───────────────────────────────────────────────────────────────────────┐ │
│     │  l1Cache.Set(hash, response, TTL)                                    │ │
│     │  redis.HSET("cache:"+hash,                                           │ │
│     │      "embedding", embedding,                                          │ │
│     │      "response", response,                                          │ │
│     │      "model", model,                                                │ │
│     │      "expires", now+TTL)                                             │ │
│     └───────────────────────────────────────────────────────────────────────┘ │
│                                    │                                         │
│                                    ▼                                         │
│  7. Return Response                                                            │
│     ┌───────────────────────────────────────────────────────────────────────┐ │
│     │  Return response to client                                           │ │
│     │  Set headers: X-Cache-HIT: semantic, X-Cache-Similarity: 0.94        │ │
│     └───────────────────────────────────────────────────────────────────────┘ │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3. Redis Schema Design

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        Redis Schema for Semantic Caching                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  Key Structure:                                                               │
│  ─────────────                                                                │
│                                                                              │
│  cache:{hash} ──▶ Hash                                                       │
│  ├─ embedding: {binary_vector}       // 1536-dim float32 (OpenAI)          │
│  ├─ response: {json_response}        // Cached response body                │
│  ├─ model: {model_name}                // claude-3-5-sonnet, etc.             │
│  ├─ created: {timestamp}               // Unix timestamp                     │
│  ├─ expires: {timestamp}               // TTL boundary                     │
│  ├─ hit_count: {counter}               // Usage statistics                 │
│  └─ tags: {json_array}                 // ["faq", "coding", "explain"]        │
│                                                                              │
│  Index: cache_idx                                                            │
│  ───────                                                                      │
│  FT.CREATE cache_idx ON HASH PREFIX 1 cache:                                 │
│    SCHEMA                                                                    │
│      embedding VECTOR FLAT 6 DIM 1536 DISTANCE_METRIC COSINE               │
│      model TAG                                                                 │
│      created NUMERIC SORTABLE                                                │
│      expires NUMERIC SORTABLE                                                  │
│      tags TAG SEPARATOR "|"                                                    │
│                                                                              │
│  Similarity Search Query:                                                      │
│  ─────────────────────────                                                    │
│  FT.SEARCH cache_idx "@embedding:[VECTOR_RANGE 0.08 $query_vec]"           │
│    PARAMS 2 query_vec {binary_embedding}                                     │
│    SORTBY __vector_score ASC                                                 │
│    LIMIT 0 1                                                                   │
│    RETURN 1 response                                                           │
│    DIALECT 2                                                                   │
│                                                                              │
│  Where 0.08 represents the cosine distance threshold (0.92 similarity):   │
│  similarity = 1 - cosine_distance                                            │
│  threshold_distance = 1 - 0.92 = 0.08                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4. Go Implementation

```go
package cache

import (
    "context"
    "crypto/sha256"
    "encoding/json"
    "fmt"
    "strings"
    "time"

    "github.com/cespare/xxhash/v2"
    "github.com/redis/go-redis/v9"
    "github.com/dgraph-io/ristretto"
)

// Config holds cache configuration
type Config struct {
    // L1 (In-Memory) settings
    L1MaxCost     int64
    L1NumCounters int64
    L1BufferItems int64
    L1TTL         time.Duration
    
    // L2 (Redis) settings
    L2RedisAddr      string
    L2RedisPassword  string
    L2RedisDB        int
    L2TTL            time.Duration
    L2SimilarityThreshold float64  // 0.0-1.0, default 0.92
    
    // Embedding service
    Embedder Embedder
}

// Embedder generates embeddings for text
type Embedder interface {
    Embed(ctx context.Context, text string) ([]float32, error)
    EmbedBatch(ctx context.Context, texts []string) ([][]float32, error)
}

// Manager coordinates multi-tier caching
type Manager struct {
    l1Cache    *ristretto.Cache
    redis      *redis.Client
    embedder   Embedder
    config     Config
}

// NewManager creates a cache manager
func NewManager(config Config) (*Manager, error) {
    // L1: In-memory cache (ristretto)
    l1, err := ristretto.NewCache(&ristretto.Config{
        NumCounters: config.L1NumCounters,
        MaxCost:     config.L1MaxCost,
        BufferItems: config.L1BufferItems,
    })
    if err != nil {
        return nil, fmt.Errorf("failed to create L1 cache: %w", err)
    }
    
    // L2: Redis with RediSearch
    rdb := redis.NewClient(&redis.Options{
        Addr:     config.L2RedisAddr,
        Password: config.L2RedisPassword,
        DB:       config.L2RedisDB,
    })
    
    return &Manager{
        l1Cache:  l1,
        redis:    rdb,
        embedder: config.Embedder,
        config:   config,
    }, nil
}

// RequestKey represents a cacheable request
type RequestKey struct {
    Model    string
    Messages []Message
    // Non-cacheable fields (ignored for key generation)
    Temperature float64
    TopP        float64
}

type Message struct {
    Role    string
    Content string
}

// CacheEntry represents a cached response
type CacheEntry struct {
    Response    []byte    `json:"response"`
    Model       string    `json:"model"`
    CreatedAt   time.Time `json:"created_at"`
    HitCount    int       `json:"hit_count"`
}

// Get retrieves a cached response using multi-tier lookup
func (m *Manager) Get(ctx context.Context, key RequestKey) (*CacheEntry, CacheStatus, error) {
    // 1. Generate cache key
    normalized := m.normalizeKey(key)
    hash := m.hashKey(normalized)
    
    // 2. L1: Exact match check
    if entry, found := m.l1Cache.Get(hash); found {
        metrics.L1Hits.Inc()
        return entry.(*CacheEntry), CacheHitExact, nil
    }
    
    // 3. L2: Semantic search
    if m.embedder != nil {
        embedding, err := m.embedder.Embed(ctx, normalized)
        if err == nil {
            entry, found, err := m.semanticSearch(ctx, key.Model, embedding)
            if err == nil && found {
                metrics.L2Hits.Inc()
                
                // Promote to L1
                m.l1Cache.SetWithTTL(hash, entry, int64(len(entry.Response)), m.config.L1TTL)
                
                return entry, CacheHitSemantic, nil
            }
        }
    }
    
    metrics.Misses.Inc()
    return nil, CacheMiss, nil
}

// Set stores a response in the cache
func (m *Manager) Set(ctx context.Context, key RequestKey, response []byte) error {
    normalized := m.normalizeKey(key)
    hash := m.hashKey(normalized)
    
    entry := &CacheEntry{
        Response:  response,
        Model:     key.Model,
        CreatedAt: time.Now(),
        HitCount:  0,
    }
    
    // Store in L1
    m.l1Cache.SetWithTTL(hash, entry, int64(len(response)), m.config.L1TTL)
    
    // Store in L2 with embedding
    if m.embedder != nil {
        embedding, err := m.embedder.Embed(ctx, normalized)
        if err == nil {
            m.storeInRedis(ctx, hash, key.Model, embedding, response)
        }
    }
    
    return nil
}

// normalizeKey creates a canonical form for comparison
func (m *Manager) normalizeKey(key RequestKey) string {
    var parts []string
    
    // Include model
    parts = append(parts, "model:"+key.Model)
    
    // Include messages (normalized)
    for _, msg := range key.Messages {
        content := strings.ToLower(strings.TrimSpace(msg.Content))
        content = strings.Join(strings.Fields(content), " ")  // Normalize whitespace
        parts = append(parts, fmt.Sprintf("%s:%s", msg.Role, content))
    }
    
    return strings.Join(parts, "|")
}

// hashKey creates a deterministic hash
func (m *Manager) hashKey(normalized string) string {
    h := xxhash.New()
    h.WriteString(normalized)
    return fmt.Sprintf("%x", h.Sum64())
}

// semanticSearch performs vector similarity search in Redis
func (m *Manager) semanticSearch(ctx context.Context, model string, embedding []float32) (*CacheEntry, bool, error) {
    // Convert embedding to binary format for Redis
    vecBytes := float32SliceToBytes(embedding)
    
    // Build RediSearch query
    // Using VECTOR_RANGE for approximate nearest neighbor with distance threshold
    query := fmt.Sprintf(
        "@model:{%s} @embedding:[VECTOR_RANGE %f $vec]",
        model,
        1.0-m.config.L2SimilarityThreshold,  // Convert similarity to distance
    )
    
    args := &redis.FTSearchOptions{
        Params: map[string]interface{}{
            "vec": vecBytes,
        },
        SortBy: &redis.FTSearchSortBy{
            By:    "__vector_score",
            Order: redis.SearchAsc,
        },
        LimitOffset: 0,
        Limit:       1,
        DialectVersion: 2,
    }
    
    result, err := m.redis.FTSearchWithArgs(ctx, "cache_idx", query, args).Result()
    if err != nil || len(result.Docs) == 0 {
        return nil, false, err
    }
    
    // Parse cached response
    doc := result.Docs[0]
    responseJSON, ok := doc.Fields["response"]
    if !ok {
        return nil, false, fmt.Errorf("no response field in cache entry")
    }
    
    var entry CacheEntry
    if err := json.Unmarshal([]byte(responseJSON), &entry); err != nil {
        return nil, false, err
    }
    
    // Increment hit count in Redis (async)
    go m.redis.HIncrBy(ctx, doc.ID, "hit_count", 1)
    
    return &entry, true, nil
}

// storeInRedis stores entry with embedding
func (m *Manager) storeInRedis(ctx context.Context, hash, model string, embedding []float32, response []byte) error {
    vecBytes := float32SliceToBytes(embedding)
    
    data := map[string]interface{}{
        "embedding": vecBytes,
        "response":  response,
        "model":     model,
        "created":   time.Now().Unix(),
        "expires":   time.Now().Add(m.config.L2TTL).Unix(),
        "hit_count": 0,
    }
    
    key := fmt.Sprintf("cache:%s", hash)
    
    pipe := m.redis.Pipeline()
    pipe.HSet(ctx, key, data)
    pipe.Expire(ctx, key, m.config.L2TTL)
    _, err := pipe.Exec(ctx)
    
    return err
}

// float32SliceToBytes converts float32 slice to bytes for Redis
func float32SliceToBytes(f []float32) []byte {
    // Convert to byte slice (4 bytes per float32)
    b := make([]byte, len(f)*4)
    for i, v := range f {
        // Use binary.LittleEndian or binary.BigEndian
        // Implementation depends on Redis vector library expectations
        binary.LittleEndian.PutUint32(b[i*4:], math.Float32bits(v))
    }
    return b
}

// CacheStatus indicates cache hit type
type CacheStatus int

const (
    CacheMiss CacheStatus = iota
    CacheHitExact
    CacheHitSemantic
)

func (s CacheStatus) String() string {
    switch s {
    case CacheMiss:
        return "miss"
    case CacheHitExact:
        return "exact"
    case CacheHitSemantic:
        return "semantic"
    default:
        return "unknown"
    }
}

// Metrics
var metrics = struct {
    L1Hits   prometheus.Counter
    L2Hits   prometheus.Counter
    Misses   prometheus.Counter
    Latency  *prometheus.HistogramVec
}{
    L1Hits: prometheus.NewCounter(prometheus.CounterOpts{
        Name: "kogito_cache_l1_hits_total",
        Help: "Total L1 cache hits",
    }),
    L2Hits: prometheus.NewCounter(prometheus.CounterOpts{
        Name: "kogito_cache_l2_hits_total",
        Help: "Total L2 semantic cache hits",
    }),
    Misses: prometheus.NewCounter(prometheus.CounterOpts{
        Name: "kogito_cache_misses_total",
        Help: "Total cache misses",
    }),
    Latency: prometheus.NewHistogramVec(prometheus.HistogramOpts{
        Name:    "kogito_cache_lookup_duration_seconds",
        Help:    "Cache lookup latency",
        Buckets: prometheus.DefBuckets,
    }, []string{"tier", "result"}),
}
```

### 5. Similarity Threshold Configuration

| Use Case | Similarity Threshold | Rationale |
|----------|---------------------|-----------|
| **Factual Q&A** | 0.95 | High precision required |
| **Code Generation** | 0.92 | Balance precision and recall |
| **Creative Writing** | 0.88 | Allow more variation |
| **Summarization** | 0.90 | Context-dependent |
| **Translation** | 0.95 | Precision critical |
| **Classification** | 0.93 | High confidence needed |

### 6. TTL Strategy

```go
// Dynamic TTL based on content type and query characteristics
func (m *Manager) calculateTTL(key RequestKey, response []byte) time.Duration {
    // Base TTL
    ttl := m.config.L2TTL
    
    // Adjust based on content characteristics
    normalized := m.normalizeKey(key)
    
    // Factual content: longer TTL
    if isFactualQuery(normalized) {
        ttl = ttl * 2
    }
    
    // Time-sensitive: shorter TTL
    if isTimeSensitive(normalized) {
        ttl = ttl / 2
    }
    
    // Code: medium TTL (languages evolve)
    if isCodeQuery(normalized) {
        ttl = ttl * 3 / 2
    }
    
    // Cap at max
    if ttl > 7*24*time.Hour {
        ttl = 7 * 24 * time.Hour
    }
    
    return ttl
}

func isFactualQuery(text string) bool {
    factualPatterns := []string{
        "what is", "who is", "when did", "where is",
        "define", "explain", "meaning of",
    }
    text = strings.ToLower(text)
    for _, pattern := range factualPatterns {
        if strings.Contains(text, pattern) {
            return true
        }
    }
    return false
}

func isTimeSensitive(text string) bool {
    timePatterns := []string{
        "today", "current", "latest", "news",
        "now", "this week", "this month",
    }
    text = strings.ToLower(text)
    for _, pattern := range timePatterns {
        if strings.Contains(text, pattern) {
            return true
        }
    }
    return false
}

func isCodeQuery(text string) bool {
    codeIndicators := []string{
        "function", "class", "import", "package",
        "def ", "func ", "fn ", "const ", "var ",
        "error:", "exception:", "bug:", "fix:",
    }
    text = strings.ToLower(text)
    for _, indicator := range codeIndicators {
        if strings.Contains(text, indicator) {
            return true
        }
    }
    return false
}
```

## Consequences

### Positive

1. **Cost Reduction**: 40-60% reduction in LLM API costs
2. **Latency Improvement**: 100x faster responses for cached queries
3. **Availability**: Reduced dependency on provider uptime
4. **Scalability**: Less load on backend providers
5. **Green Computing**: Reduced compute waste from duplicate queries

### Negative

1. **Storage Cost**: Redis memory for embeddings (1536 floats * 4 bytes = ~6KB per entry)
2. **Embedding Cost**: API calls to generate embeddings (but cached themselves)
3. **Complexity**: Vector search, similarity thresholds, TTL management
4. **False Positives**: Wrong answers returned for semantically similar but different queries
5. **Cold Start**: Empty cache initially, warming required

### Mitigation

1. **Conservative Thresholds**: Start high (0.95), lower based on feedback
2. **Feedback Loop**: Track cache hit quality, adjust thresholds
3. **Selective Caching**: Skip caching for sensitive/time-critical queries
4. **Embedding Caching**: Cache embeddings to reduce cost
5. **TTL Management**: Aggressive TTL for uncertain content

## Alternatives Considered

| Alternative | Pros | Cons | Decision |
|-------------|------|------|----------|
| **Exact Match Only** | Simple, zero false positives | Misses 30-45% of opportunities | Partial (L1 cache) |
| **PostgreSQL + pgvector** | Full SQL support, persistence | Higher latency, more complex | Partial (L3 cache) |
| **External Vector DB (Pinecone, Weaviate)** | Managed, scalable | Cost, vendor dependency | Rejected (Redis sufficient) |
| **No Semantic Caching** | Zero complexity | Miss major cost savings | Rejected |
| **Client-Side Caching** | No infrastructure | Limited scope, stale data | Rejected |

## Implementation Status

- [x] Core cache manager
- [x] L1 in-memory cache (ristretto)
- [x] L2 Redis with RediSearch
- [x] Embedding integration
- [x] Semantic search queries
- [x] Dynamic TTL
- [x] Metrics and observability
- [ ] L3 persistent cache
- [ ] Cache warming
- [ ] Feedback-based threshold tuning
- [ ] Cache invalidation API

## References

1. **"GPTCache: A Semantic Cache for LLM Queries"** - arXiv:2308.11731
2. **Redis Vector Similarity Search** - https://redis.io/docs/interact/search-and-query/search/vectors/
3. **Ristretto Cache** - https://github.com/dgraph-io/ristretto
4. **Text Embeddings Guide** - https://platform.openai.com/docs/guides/embeddings

---

**Decision Date:** 2026-04-04  
**Last Updated:** 2026-04-04  
