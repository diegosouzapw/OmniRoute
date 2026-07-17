//! L57 Performance benchmark — `pheno-flags` lookup throughput.
//!
//! Run with: `cargo bench --bench flags_lookup`
//! CI gate: `cargo bench -- --test` (validates benches compile, not perf regression)

use criterion::{criterion_group, criterion_main, Criterion, Throughput};
use pheno_flags::Flags;
use std::collections::HashMap;

fn make_flags(n: usize) -> Flags {
    let mut pairs = HashMap::with_capacity(n);
    for i in 0..n {
        pairs.insert(format!("FLAG_{i:06}"), format!("value_{i}"));
    }
    Flags::from_env_pairs(pairs.into_iter())
}

fn bench_sequential_lookup(c: &mut Criterion) {
    let flags = make_flags(1000);
    let mut group = c.benchmark_group("lookup_sequential");
    group.throughput(Throughput::Elements(1));
    group.bench_function("flags1000_single", |b| {
        b.iter(|| flags.get("FLAG_000500"))
    });
    group.finish();
}

fn bench_bulk_lookup(c: &mut Criterion) {
    let flags = make_flags(10_000);
    let mut group = c.benchmark_group("lookup_bulk");
    group.throughput(Throughput::Elements(1000));
    let keys: Vec<String> = (0..1000).map(|i| format!("FLAG_{i:06}")).collect();
    group.bench_function("flags10000_x1000", |b| {
        b.iter(|| {
            for k in &keys {
                std::hint::black_box(flags.get(k));
            }
        })
    });
    group.finish();
}

fn bench_miss_path(c: &mut Criterion) {
    let flags = make_flags(1000);
    let mut group = c.benchmark_group("lookup_miss");
    group.bench_function("flags1000_unknown", |b| {
        b.iter(|| flags.get("DOES_NOT_EXIST"))
    });
    group.finish();
}

criterion_group!(benches, bench_sequential_lookup, bench_bulk_lookup, bench_miss_path);
criterion_main!(benches);
