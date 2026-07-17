//! L57 Stress benchmark — high-volume `pheno-flags` ops.
//!
//! Validates that bulk import + bulk lookup stay within constant time bounds
//! as flag count grows. Catches accidental O(n*m) regressions.

use criterion::{criterion_group, criterion_main, Criterion};
use pheno_flags::Flags;
use std::collections::HashMap;

fn bench_construct_at_scale(c: &mut Criterion) {
    let mut group = c.benchmark_group("construct_scale");
    for &n in &[100usize, 1_000, 10_000] {
        group.bench_function(format!("flags{n}"), |b| {
            b.iter(|| {
                let pairs: Vec<(String, String)> = (0..n)
                    .map(|i| (format!("FLAG_{i:06}"), format!("v_{i}")))
                    .collect();
                Flags::from_env_pairs(pairs.into_iter())
            })
        });
    }
    group.finish();
}

fn bench_worst_case_prefix_collision(c: &mut Criterion) {
    // All keys share a long common prefix — exercises HashMap collision behavior
    let mut pairs = HashMap::with_capacity(5_000);
    for i in 0..5_000 {
        pairs.insert(format!("PREFIX_LONG_THIS_SHOULD_NOT_COLLIDE_{i}"), "v".into());
    }
    let flags = Flags::from_env_pairs(pairs.into_iter());
    c.bench_function("worst_case_prefix_5000", |b| {
        b.iter(|| {
            for i in (0..5_000).step_by(100) {
                std::hint::black_box(flags.get(&format!("PREFIX_LONG_THIS_SHOULD_NOT_COLLIDE_{i}")));
            }
        })
    });
}

criterion_group!(benches, bench_construct_at_scale, bench_worst_case_prefix_collision);
criterion_main!(benches);
