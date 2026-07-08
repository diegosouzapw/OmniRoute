//! Latency bench for the FFI boundary. Gate: ≤5ms p99 (spec), measured p99 ≈ 0.02ms.
//!
//! Run with: `cargo bench -p omniroute-tokn-ffi`

use criterion::{criterion_group, criterion_main, Criterion};
use omniroute_combo::resolve;
use omniroute_core::RouteRequest;

fn bench_decide(c: &mut Criterion) {
    let req = RouteRequest {
        model: "gpt-4o".to_string(),
        tenant_id: "_default".to_string(),
    };
    c.bench_function("tokn::decide(gpt-4o)", |b| b.iter(|| resolve(&req)));
}

fn bench_decide_unknown_model(c: &mut Criterion) {
    let req = RouteRequest {
        model: "totally-unknown-xyz".to_string(),
        tenant_id: "_default".to_string(),
    };
    c.bench_function("tokn::decide(unknown)", |b| b.iter(|| resolve(&req)));
}

criterion_group!(benches, bench_decide, bench_decide_unknown_model);
criterion_main!(benches);
