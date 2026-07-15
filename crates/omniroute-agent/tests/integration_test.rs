//! Integration tests for omniroute-agent.
//!
//! Tests HTTP endpoints, composite health score computation with known
//! inputs, and edge cases (missing data, zero metrics, max pressure).

use std::net::TcpListener;
use std::sync::Arc;
use std::time::Duration;

// ---------------------------------------------------------------------------
// HTTP endpoint integration tests (against a real running server)
// ---------------------------------------------------------------------------

/// Find a random available port by binding to port 0.
fn find_available_port() -> u16 {
    let listener = TcpListener::bind("127.0.0.1:0").expect("failed to bind for port discovery");
    listener.local_addr().unwrap().port()
}

/// Spawn the agent server on a random port and return the base URL.
async fn spawn_server() -> String {
    let port = find_available_port();
    let host = "127.0.0.1".to_string();
    let addr = format!("{host}:{port}");

    let interval = Duration::from_millis(100);
    let process_enabled = true;
    let collector = Arc::new(tokio::sync::Mutex::new(
        omniroute_agent::metrics::MetricsCollector::new(interval, process_enabled)
            .expect("failed to create collector"),
    ));

    // Spawn the server in a background task.
    let app = omniroute_agent::build_router(Arc::clone(&collector));

    tokio::spawn(async move {
        let listener = tokio::net::TcpListener::bind(&addr)
            .await
            .expect("failed to bind");
        axum::serve(listener, app)
            .await
            .expect("server error");
    });

    // Give the server a moment to start.
    tokio::time::sleep(Duration::from_millis(200)).await;

    format!("http://{addr}")
}

#[tokio::test]
async fn test_healthz_endpoint() {
    let base_url = spawn_server().await;
    let client = reqwest::Client::new();

    let resp = client
        .get(format!("{base_url}/healthz"))
        .send()
        .await
        .expect("GET /healthz failed");

    assert_eq!(resp.status(), 200, "healthz should return 200");
    let body: serde_json::Value = resp.json().await.expect("invalid JSON");
    assert_eq!(body["status"], "ok");
}

#[tokio::test]
async fn test_readyz_endpoint_eventually_ready() {
    let base_url = spawn_server().await;
    let client = reqwest::Client::new();

    // Retry a few times since the collector needs a tick to become initialized.
    let mut ready = false;
    for _ in 0..10 {
        let resp = client
            .get(format!("{base_url}/readyz"))
            .send()
            .await
            .expect("GET /readyz failed");

        if resp.status() == 200 {
            ready = true;
            let body: serde_json::Value = resp.json().await.expect("invalid JSON");
            assert_eq!(body["status"], "ok");
            break;
        }
        tokio::time::sleep(Duration::from_millis(100)).await;
    }

    assert!(ready, "/readyz never returned 200");
}

#[tokio::test]
async fn test_system_load_endpoint() {
    let base_url = spawn_server().await;
    let client = reqwest::Client::new();

    // Wait for collector to be initialized.
    tokio::time::sleep(Duration::from_millis(500)).await;

    let resp = client
        .get(format!("{base_url}/system-load"))
        .send()
        .await
        .expect("GET /system-load failed");

    assert_eq!(resp.status(), 200, "system-load should return 200");
    let body: serde_json::Value = resp.json().await.expect("invalid JSON");

    assert!(body["timestamp"].as_i64().is_some(), "timestamp should be present");
    assert!(body["hostname"].as_str().is_some(), "hostname should be present");
    assert!(body["cpu"].is_object(), "cpu should be present");
    assert!(body["memory"].is_object(), "memory should be present");
    assert!(body["load"].is_object(), "load should be present");
    assert!(body["composite_score"].as_f64().is_some(), "composite_score should be present");
}

#[tokio::test]
async fn test_health_score_endpoint() {
    let base_url = spawn_server().await;
    let client = reqwest::Client::new();

    // Wait for collector to be initialized.
    tokio::time::sleep(Duration::from_millis(500)).await;

    let resp = client
        .get(format!("{base_url}/health-score"))
        .send()
        .await
        .expect("GET /health-score failed");

    assert_eq!(resp.status(), 200, "health-score should return 200");
    let body: serde_json::Value = resp.json().await.expect("invalid JSON");

    assert!(body["timestamp"].as_i64().is_some());
    assert!(body["hostname"].as_str().is_some());
    let score = body["score"].as_f64().expect("score should be a float");
    assert!(
        (0.0..=1.0).contains(&score),
        "score {score} should be in [0, 1]"
    );
    assert!(body["components"].is_object(), "components should be present");
    assert!(
        body["components"]["cpu"].as_f64().is_some(),
        "cpu component should be present"
    );
}

#[tokio::test]
async fn test_metrics_endpoint() {
    let base_url = spawn_server().await;
    let client = reqwest::Client::new();

    // Give the collector time to run a few cycles.
    tokio::time::sleep(Duration::from_millis(500)).await;

    let resp = client
        .get(format!("{base_url}/metrics"))
        .send()
        .await
        .expect("GET /metrics failed");

    assert_eq!(resp.status(), 200, "metrics should return 200");
    let text = resp.text().await.expect("should be text");

    // Should contain at least some of our metric names.
    assert!(
        text.contains("omniroute_health_score"),
        "metrics should contain omniroute_health_score: ...{text}..."
    );
    assert!(
        text.contains("omniroute_cpu_percent"),
        "metrics should contain omniroute_cpu_percent"
    );
    assert!(
        text.contains("omniroute_memory_bytes"),
        "metrics should contain omniroute_memory_bytes"
    );
}

// ---------------------------------------------------------------------------
// Composite health score unit tests (computation correctness)
// ---------------------------------------------------------------------------

use omniroute_agent::health::types::*;
use omniroute_agent::metrics::composite;

fn zero_snapshot() -> SystemLoadMetrics {
    SystemLoadMetrics {
        timestamp: 0,
        hostname: "test".to_string(),
        agent_version: "0.1.0".to_string(),
        cpu: CpuMetrics { percent: 0.0, per_core: vec![0.0], count: 4 },
        memory: MemoryMetrics {
            total_bytes: 16_000_000_000,
            used_bytes: 0,
            percent: 0.0,
            swap_total: 0,
            swap_used: 0,
        },
        load: LoadMetrics { one_min: 0.0, five_min: 0.0, fifteen_min: 0.0 },
        disk: Some(DiskMetrics {
            read_bytes_per_sec: 0, write_bytes_per_sec: 0,
            io_util_percent: 0.0, queue_depth: 0,
        }),
        network: Some(NetworkMetrics {
            bytes_in_per_sec: 0, bytes_out_per_sec: 0,
            packets_in_per_sec: 0, packets_out_per_sec: 0,
            errors_per_sec: 0,
        }),
        process: Some(ProcessMetrics {
            pid: 1, cpu_percent: 0.0, memory_rss_bytes: 0,
            open_fds: 0, thread_count: 0,
        }),
        gpu: None,
        composite_score: 0.0,
    }
}

#[test]
fn test_score_zero_pressure() {
    let components = composite::compute_components(&zero_snapshot());
    let score = composite::compute_score(&components);
    assert!(
        (score - 1.0).abs() < 1e-10,
        "zero pressure should give score = 1.0, got {score}"
    );
}

#[test]
fn test_score_all_max_pressure() {
    let mut s = zero_snapshot();
    s.cpu.percent = 100.0;
    s.memory.percent = 100.0;
    s.memory.used_bytes = s.memory.total_bytes;
    s.load.one_min = 8.0; // > 4 CPUs
    s.disk = Some(DiskMetrics {
        read_bytes_per_sec: 1_000_000, write_bytes_per_sec: 500_000,
        io_util_percent: 100.0, queue_depth: 64,
    });
    s.network = Some(NetworkMetrics {
        bytes_in_per_sec: 100_000_000, bytes_out_per_sec: 100_000_000,
        packets_in_per_sec: 1000, packets_out_per_sec: 500,
        errors_per_sec: 10,
    });
    s.process = Some(ProcessMetrics {
        pid: 1, cpu_percent: 50.0, memory_rss_bytes: 1_000_000_000,
        open_fds: 65536, thread_count: 32768,
    });

    let components = composite::compute_components(&s);
    let score = composite::compute_score(&components);
    assert!(
        (score - 0.0).abs() < 1e-10,
        "max pressure should give score ≈ 0.0, got {score}"
    );
}

#[test]
fn test_score_missing_gpu_disk_network_process() {
    let mut s = zero_snapshot();
    s.disk = None;
    s.network = None;
    s.process = None;
    s.cpu.percent = 50.0;
    s.memory.percent = 50.0;
    s.load.one_min = 2.0;

    let components = composite::compute_components(&s);
    let score = composite::compute_score(&components);

    // Missing fields default to 0 pressure.
    // cpu=0.5, mem=0.5, load=0.5 (2.0/4=0.5)
    // Redistributed weights: cpu_w=0.28333, mem_w=0.23333, load_w=0.18333
    // Score = 1.0 - 0.5*(0.28333+0.23333+0.18333) = 1.0 - 0.5*0.7 = 0.65
    assert!(
        (score - 0.65).abs() < 1e-6,
        "expected ~0.65, got {score}"
    );
}

#[test]
fn test_score_gpu_present() {
    let mut s = zero_snapshot();
    s.gpu = Some(GpuMetrics {
        util_percent: 100.0,
        memory_used_bytes: 8_000_000_000,
        memory_total_bytes: 16_000_000_000,
        temperature_celsius: 85.0,
    });

    let components = composite::compute_components(&s);
    let score = composite::compute_score(&components);

    // GPU pressure = 1.0*0.6 + 0.5*0.2 = 0.6 + 0.1 = 0.7
    // All other pressures 0 → score = 1.0 - 0.10 * 0.7 = 0.93
    assert!(
        (score - 0.93).abs() < 1e-10,
        "expected ~0.93, got {score}"
    );
}

#[test]
fn test_score_network_pressure_calculation() {
    let mut s = zero_snapshot();
    // 5% of 1 Gbps = 6,250,000 bytes/sec
    s.network = Some(NetworkMetrics {
        bytes_in_per_sec: 3_125_000,
        bytes_out_per_sec: 3_125_000,
        packets_in_per_sec: 0,
        packets_out_per_sec: 0,
        errors_per_sec: 0,
    });

    let components = composite::compute_components(&s);
    assert!(
        (components.network - 1.0).abs() < 1e-10,
        "6.25MB/s on 1Gbps @ 5% should give 1.0 pressure, got {}",
        components.network
    );
}

#[test]
fn test_score_process_pressure_weighted() {
    let mut s = zero_snapshot();
    s.process = Some(ProcessMetrics {
        pid: 1, cpu_percent: 0.0, memory_rss_bytes: 0,
        open_fds: 32768,   // 50% of 65536
        thread_count: 16384, // 50% of 32768
    });

    let components = composite::compute_components(&s);
    // fd_pressure=0.5*0.8 + thread_pressure=0.5*0.2 = 0.4 + 0.1 = 0.5
    assert!(
        (components.process - 0.5).abs() < 1e-10,
        "expected process pressure 0.5, got {}",
        components.process
    );
}

#[test]
fn test_disk_io_pressure_uses_util_when_higher() {
    let mut s = zero_snapshot();
    s.disk = Some(DiskMetrics {
        read_bytes_per_sec: 0,
        write_bytes_per_sec: 0,
        io_util_percent: 80.0,
        queue_depth: 2, // 2/16 = 0.125
    });

    let components = composite::compute_components(&s);
    // io = max(0.125, 0.80) = 0.80
    assert!(
        (components.io - 0.80).abs() < 1e-10,
        "expected io pressure 0.80, got {}",
        components.io
    );
}

#[test]
fn test_disk_io_pressure_uses_queue_when_higher() {
    let mut s = zero_snapshot();
    s.disk = Some(DiskMetrics {
        read_bytes_per_sec: 0,
        write_bytes_per_sec: 0,
        io_util_percent: 10.0,
        queue_depth: 16, // 16/16 = 1.0
    });

    let components = composite::compute_components(&s);
    // io = max(1.0, 0.10) = 1.0
    assert!(
        (components.io - 1.0).abs() < 1e-10,
        "expected io pressure 1.0, got {}",
        components.io
    );
}
