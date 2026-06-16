# Python-Go Plugin Performance Optimization: Implementation Summary

## Quick Reference

### Performance Targets
- **Fast path latency**: <1ms (keyword classification in Go)
- **Plugin overhead**: 2-5ms (unavoidable network cost)
- **Cache hit latency**: <5ms (in-memory)
- **Batch throughput**: 10-100x improvement for small requests
- **Overall throughput**: 5K-50K RPS (vs 100-1000 direct)

### Key Optimization Techniques (Priority Order)

| Priority | Technique | Impact | Effort | Notes |
|----------|-----------|--------|--------|-------|
| 1 | Connection pooling + HTTP/2 multiplexing | 60-70% latency reduction | Low | Essential, use gRPC defaults |
| 2 | Protocol buffer optimization | 20-30% size reduction | Low | Use binary fields, avoid strings |
| 3 | Request batching | 10-100x throughput improvement | Medium | Buffer 10-100 small requests |
| 4 | Multi-level caching (L1/L2/L3) | 10-100x for cache hits | Medium | L1 in Go, L2 FeatureExtractor, L3 Redis |
| 5 | Async/concurrent execution | 10x throughput scaling | Medium | Use asyncio in Python, goroutines in Go |
| 6 | Process management & health checks | Production stability | Low | Critical for reliability |
| 7 | Resource limits & monitoring | Prevent runaway processes | Low | ulimit, health checks every 5s |

---

## Architecture Decision: Two-Path Router

### Path Selection Logic

```
Incoming Request
    │
    ├─ Check Cache
    │   ├─ HIT → Return (99% of requests) [<1ms]
    │   └─ MISS → Continue
    │
    ├─ Try Fast Path (Go keyword classifier)
    │   ├─ Confidence > 95% → Return [<0.5ms]
    │   │
    │   └─ Low confidence → Slow path
    │
    └─ Slow Path (Python ML classifier via gRPC)
        ├─ Batch collection (10-100 items)
        ├─ Single RPC call with batch
        ├─ Distribute responses to callers
        └─ Cache results [50-200ms + 2-5ms overhead]
```

### Expected Distribution
- **Cache hits**: 70-80% of requests (<1ms)
- **Fast path**: 15-20% of requests (<0.5ms)
- **Slow path**: 5-10% of requests (50-200ms)

---

## Implementation Roadmap

### Phase 1: Foundation (1-2 weeks)
**Goal: Establish baseline communication with <8ms latency**

#### Go Side (gRPC Client)
```go
// Key components
- grpc.Dial with keepalive parameters
- Connection reuse (single persistent connection)
- Concurrent request multiplexing via HTTP/2
- Basic error handling and timeouts
```

#### Python Side (gRPC Server)
```python
# Key components
- grpc.aio.server with async handlers
- ThreadPoolExecutor for blocking classifier
- Proper gRPC options for flow control
- Health check endpoint
```

#### Testing
- Measure latency: Single request latency (target: 5-8ms)
- Measure throughput: Concurrent requests (target: 100+ RPS)
- Connection pooling test: Verify HTTP/2 multiplexing

### Phase 2: Optimization (2-3 weeks)
**Goal: Reduce latency and increase throughput 10x**

#### Batching Implementation
```python
# Go side
- Collect requests in time window (10ms max)
- Send batch to plugin
- Distribute responses

# Python side
- Handle BatchRequest RPCs
- Process all items in single batch
- Return BatchResponse
```

#### Caching Layer
```go
// L1: In-memory Go cache
- Key: hash of request
- TTL: 5 minutes
- Size limit: 1000 items

// L2: FeatureExtractor cache
- Integrated with existing system
- Request-scoped caching
- Automatic eviction
```

#### Testing
- Batch latency: 10 requests in 10-20ms (vs 80ms sequential)
- Cache hit rate: 70-80% with real workload
- Throughput: 1000+ RPS with batching

### Phase 3: Production Readiness (2-3 weeks)
**Goal: Stable, reliable system with monitoring**

#### Process Management
- Graceful startup/shutdown
- Automatic restart on crash
- Signal handling (SIGTERM, SIGINT)

#### Health Monitoring
- Periodic health checks (every 5 seconds)
- Detect unhealthy plugin
- Trigger automatic restart

#### Error Recovery
- Exponential backoff on failures
- Fallback to fast path on plugin errors
- Circuit breaker pattern

#### Metrics & Observability
- Latency percentiles (p50, p95, p99)
- Cache hit rates
- Error rates
- Plugin uptime
- Throughput monitoring

#### Testing
- Load testing: 5K-10K concurrent requests
- Chaos testing: Kill plugin, verify recovery
- Long-running tests: 24+ hours stability
- Memory leak detection

### Phase 4: Advanced Scaling (3-4 weeks)
**Goal: Support 50K+ RPS with multiple plugin instances**

#### Multi-Instance Support
- Multiple plugin processes
- Load balancing across instances
- Connection distribution

#### Distributed Caching
- Redis integration (optional)
- Shared cache across instances
- Cache invalidation strategy

#### Advanced Monitoring
- Prometheus metrics export
- Grafana dashboards
- Alerting rules

---

## Code Organization

### Go Structure
```
internal/routing/
├── plugin_router.go         # Main router orchestration
├── fast_path.go            # Keyword classifier
├── connection_pool.go      # gRPC connection management
├── request_batcher.go      # Request batching logic
├── cache.go                # Multi-level caching
└── metrics.go              # Performance tracking

internal/plugin/
├── manager.go              # Process lifecycle
├── health_checker.go       # Health monitoring
└── resilient_client.go     # Error recovery & retries
```

### Python Structure
```
python_plugin/
├── router.py               # gRPC service
├── classifier.py           # ML classification engine
├── cache.py                # Result caching
├── health.py               # Health checks
└── proto/
    ├── router.proto        # Protocol definitions
    ├── router_pb2.py       # Generated code
    └── router_pb2_grpc.py  # Generated code
```

---

## Critical Implementation Details

### 1. Protocol Buffer Design

```protobuf
syntax = "proto3";

// Minimal, efficient messages
message RouterRequest {
  string request_id = 1;
  bytes payload = 2;           // Binary, not string!
  int32 priority = 3;          // Enum, not string!
  int64 timeout_ms = 4;        // Number, not string!
}

message RouterResponse {
  string request_id = 1;
  bytes result = 2;            // Binary encoding
  int32 status_code = 3;
  string error = 4;            // Only when error
}

// Batch messages for efficiency
message BatchRequest {
  repeated RouterRequest requests = 1;
}

message BatchResponse {
  repeated RouterResponse responses = 1;
}

// Health check
message HealthRequest {}
message HealthResponse {
  string status = 1;  // "healthy" or "degraded"
}
```

### 2. Connection Pooling (Go)

```go
// MUST use connection reuse for <8ms latency
conn, err := grpc.Dial(
    addr,
    grpc.WithInsecure(),
    
    // HTTP/2 multiplexing (automatic)
    // Enable keep-alive
    grpc.WithKeepaliveParams(keepalive.ClientParameters{
        Time:                10 * time.Second,
        Timeout:             1 * time.Second,
        PermitWithoutStream: true,
    }),
    
    // Message size limits
    grpc.WithDefaultCallOptions(
        grpc.MaxCallRecvMsgSize(100 * 1024 * 1024),
        grpc.MaxCallSendMsgSize(100 * 1024 * 1024),
    ),
)
```

### 3. Async Server (Python)

```python
# MUST use async for concurrent request handling
async def serve():
    server = grpc.aio.server(
        futures.ThreadPoolExecutor(max_workers=10),
        options=[
            ('grpc.max_receive_message_length', 100 * 1024 * 1024),
            ('grpc.max_send_message_length', 100 * 1024 * 1024),
            ('grpc.http2.min_time_between_pings_ms', 0),
            ('grpc.http2.max_pings_without_data', 0),
        ]
    )
    
    proto.add_RouterServicer_to_server(RouterServicer(), server)
    await server.start()
```

### 4. Request Batching

```go
// Collect requests in time window
type RequestBatcher struct {
    pending      []*PendingRequest
    maxBatchSize int          // 100
    maxWaitTime  time.Duration // 10ms
}

// When batch ready:
// 1. Collect up to maxBatchSize requests
// 2. Send single BatchRequest RPC
// 3. Receive single BatchResponse
// 4. Distribute responses to callers
```

### 5. Multi-Level Caching

```go
// L1: In-memory Go cache (fast path)
cache := &RouterCache{
    store:    make(map[string]interface{}),
    ttl:      5 * time.Minute,
    maxSize:  1000,
}

// Check before sending to plugin
if cached := cache.Get(request.ID); cached != nil {
    return cached  // <1ms
}

// L2: FeatureExtractor (request-scoped, already integrated)
// L3: Redis (optional, for distributed systems)
```

---

## Performance Validation Checklist

### Latency Tests
- [ ] Single request: 5-8ms (plugin overhead only)
- [ ] Cached request: <1ms
- [ ] 10-item batch: 10-20ms total (1-2ms per item)
- [ ] 100-item batch: 20-50ms total (0.2-0.5ms per item)

### Throughput Tests
- [ ] Sequential requests: 100-200 RPS (8ms latency)
- [ ] Pipelined (10 concurrent): 1000+ RPS
- [ ] Pipelined (100 concurrent): 10K+ RPS
- [ ] Batch mode: 10K+ RPS for small requests

### Reliability Tests
- [ ] Plugin crash recovery: <5 seconds
- [ ] Health check: <2 seconds to detect failure
- [ ] Memory leak: <50MB growth over 24 hours
- [ ] Concurrent requests: 10K+ without errors

### Load Tests
- [ ] Ramp up to 1K RPS over 5 minutes
- [ ] Maintain 5K RPS for 1 hour
- [ ] Ramp up to 10K RPS, verify scalability
- [ ] Measure resource usage (CPU, memory, connections)

---

## Common Pitfalls to Avoid

### 1. Creating New Connection Per Request
❌ **WRONG:**
```go
for each request {
    conn, _ := grpc.Dial(addr)  // Creates new connection!
    conn.Close()
}
```

✅ **RIGHT:**
```go
conn, _ := grpc.Dial(addr)  // Once, reuse forever
defer conn.Close()

// All requests use same connection
for each request {
    client.Route(ctx, req)  // Multiplexed over HTTP/2
}
```

### 2. Blocking Python Service
❌ **WRONG:**
```python
def Route(self, request, context):
    # Synchronous, blocks other requests
    result = run_ml_inference(request.query)
    return result
```

✅ **RIGHT:**
```python
async def Route(self, request, context):
    # Async, handles concurrent requests
    result = await asyncio.to_thread(
        run_ml_inference,
        request.query
    )
    return result
```

### 3. Ignoring Message Size Limits
❌ **WRONG:**
```python
# Large message fails silently
response = RouterResponse(
    result=large_binary_data  # >4MB default limit!
)
```

✅ **RIGHT:**
```go
// Set message limits
grpc.WithDefaultCallOptions(
    grpc.MaxCallRecvMsgSize(100 * 1024 * 1024),
)
```

### 4. Naive Caching Without TTL
❌ **WRONG:**
```go
cache[request.ID] = result  // Cached forever!
```

✅ **RIGHT:**
```go
cache.Set(request.ID, result, 5*time.Minute)  // TTL
```

### 5. Not Handling Plugin Crashes
❌ **WRONG:**
```go
// Request fails if plugin crashes
result, err := client.Route(ctx, req)
```

✅ **RIGHT:**
```go
// Auto-restart on fatal errors
if isFatalError(err) {
    pm.Shutdown()
    pm.Start()
}
```

---

## Success Metrics

After implementation, you should achieve:

| Metric | Target | Current | Achieved |
|--------|--------|---------|----------|
| Plugin latency | 5-8ms | TBD | ☐ |
| Cache hit latency | <1ms | TBD | ☐ |
| Batch throughput | 1K-10K RPS | TBD | ☐ |
| Cache hit rate | 70-80% | TBD | ☐ |
| Plugin uptime | 99.9%+ | TBD | ☐ |
| Memory growth | <50MB/24h | TBD | ☐ |
| Recovery time | <5s on crash | TBD | ☐ |

---

## Next Steps

1. **Create Protocol Buffer definitions** (router.proto)
2. **Implement Go gRPC client** with connection pooling
3. **Implement Python gRPC server** with async handling
4. **Measure baseline latency** (target: 5-8ms)
5. **Add request batching** (measure 10x throughput improvement)
6. **Implement caching** (measure 70-80% hit rate)
7. **Add health checks & monitoring**
8. **Load testing & validation**
9. **Deploy to production**

---

## References

- HashiCorp go-plugin: https://github.com/hashicorp/go-plugin
- gRPC Best Practices: https://grpc.io/docs/guides/performance-best-practices/
- Go gRPC Connection Management: https://dev.to/aaravjoshi/mastering-grpc-connection-management-in-go-best-practices-and-implementation-guide-3h5a
- Python gRPC: https://grpc.io/docs/languages/python/quickstart/

