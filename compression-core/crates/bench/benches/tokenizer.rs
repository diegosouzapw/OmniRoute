//! Criterion bench for the tokenizer. Baseline target: < 5 ms per 57K tokens
//! (JS js-tiktoken measures ~38 ms on the same input).

use core_api::TokenCounter;
use criterion::{criterion_group, criterion_main, Criterion};
use tokenizer::TiktokenCounter;

fn bench_tokenizer(c: &mut Criterion) {
    let counter = TiktokenCounter::default();
    // ~230K chars ≈ 57K cl100k tokens (mirrors the measured JS baseline).
    let text = "Hello world! This is a test of tokenization performance. \
                The quick brown fox jumps over the lazy dog. "
        .repeat(4000);

    c.bench_function("cl100k_57k_tokens", |b| b.iter(|| counter.count(&text)));
}

criterion_group!(benches, bench_tokenizer);
criterion_main!(benches);
