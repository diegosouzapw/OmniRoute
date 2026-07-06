//! omniroute-rs: the binary. Wires the registry, observability, transport.
//!
//! Default port: 20129 (the TS reference listens on 20128).
//! Override with OMNIROUTE_PORT.

use std::sync::Arc;

use omniroute_transport::{router, AppState};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    omniroute_observability::init();
    let registry = Arc::new(omniroute_providers::default_registry());
    let http = reqwest::Client::builder().build()?;
    let state = AppState { registry, http };
    let app = router(state);
    let port: u16 = std::env::var("OMNIROUTE_PORT")
        .ok().and_then(|s| s.parse().ok()).unwrap_or(20129);
    let listener = tokio::net::TcpListener::bind(("0.0.0.0", port)).await?;
    tracing::info!(%port, "omniroute-rs listening");
    axum::serve(listener, app).await?;
    Ok(())
}
