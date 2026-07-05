//! Quota, rate limit, and quota tracker types.

use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use std::sync::atomic::{AtomicU64, Ordering};

/// A quota bucket (per-key, per-account, per-team).
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct QuotaBucket {
    pub id: String,
    /// Per-minute request limit. 0 = unlimited.
    pub rpm_limit: u32,
    /// Per-minute token limit. 0 = unlimited.
    pub tpm_limit: u32,
    /// Daily request limit. 0 = unlimited.
    pub rpd_limit: u32,
    /// Daily token limit. 0 = unlimited.
    pub tpd_limit: u32,
    /// Monthly USD spend cap (in micro-cents). 0 = unlimited.
    pub monthly_spend_limit_micro_cents: u64,
}

impl QuotaBucket {
    pub fn unlimited() -> Self {
        Self {
            id: "unlimited".to_owned(),
            rpm_limit: 0,
            tpm_limit: 0,
            rpd_limit: 0,
            tpd_limit: 0,
            monthly_spend_limit_micro_cents: 0,
        }
    }
}

/// Quota status.
#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Quota {
    pub bucket: QuotaBucket,
    pub rpm_used: u32,
    pub tpm_used: u32,
    pub rpd_used: u32,
    pub tpd_used: u32,
    pub monthly_spend_micro_cents: u64,
    pub resets_at: DateTime<Utc>,
}

impl Quota {
    pub fn exceeded(&self) -> bool {
        let b = &self.bucket;
        (b.rpm_limit > 0 && self.rpm_used >= b.rpm_limit)
            || (b.tpm_limit > 0 && self.tpm_used >= b.tpm_limit)
            || (b.rpd_limit > 0 && self.rpd_used >= b.rpd_limit)
            || (b.tpd_limit > 0 && self.tpd_used >= b.tpd_limit)
            || (b.monthly_spend_limit_micro_cents > 0
                && self.monthly_spend_micro_cents >= b.monthly_spend_limit_micro_cents)
    }
}

/// Rate limit result.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum RateLimit {
    /// Allowed; remaining tokens/reqs available.
    Allow,
    /// Blocked; retry after this many milliseconds.
    Block { retry_after_ms: u64 },
}

/// A simple in-memory quota tracker. Used as the preflight check inside the
/// hot path; the durable counter lives in `omniroute-storage` and is flushed
/// to SQLite.
#[derive(Debug)]
pub struct QuotaTracker {
    rpm_limit: u32,
    tpm_limit: u32,
    window_start: AtomicU64,
    rpm_used: AtomicU64,
    tpm_used: AtomicU64,
}

impl QuotaTracker {
    pub fn new(rpm_limit: u32, tpm_limit: u32) -> Self {
        Self {
            rpm_limit,
            tpm_limit,
            window_start: AtomicU64::new(now_unix()),
            rpm_used: AtomicU64::new(0),
            tpm_used: AtomicU64::new(0),
        }
    }

    pub fn check(&self, est_tokens: u32) -> RateLimit {
        self.maybe_rotate();
        if self.rpm_limit > 0 && self.rpm_used.load(Ordering::Relaxed) >= self.rpm_limit as u64 {
            return RateLimit::Block { retry_after_ms: 1_000 };
        }
        if self.tpm_limit > 0
            && self.tpm_used.load(Ordering::Relaxed) + est_tokens as u64
                > self.tpm_limit as u64
        {
            return RateLimit::Block { retry_after_ms: 1_000 };
        }
        RateLimit::Allow
    }

    pub fn consume(&self, tokens: u32) {
        self.maybe_rotate();
        self.rpm_used.fetch_add(1, Ordering::Relaxed);
        self.tpm_used.fetch_add(tokens as u64, Ordering::Relaxed);
    }

    fn maybe_rotate(&self) {
        let now = now_unix();
        let start = self.window_start.load(Ordering::Relaxed);
        if now - start >= 60 {
            if self
                .window_start
                .compare_exchange(start, now, Ordering::Relaxed, Ordering::Relaxed)
                .is_ok()
            {
                self.rpm_used.store(0, Ordering::Relaxed);
                self.tpm_used.store(0, Ordering::Relaxed);
            }
        }
    }
}

fn now_unix() -> u64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map(|d| d.as_secs())
        .unwrap_or(0)
}
