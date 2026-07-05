use clap::Parser;

#[derive(Parser, Debug)]
#[command(name = "omniroute-server", version, about = "OmniRoute HTTP server (Rust)")]
struct Server {
    #[arg(short, long, env = "OMNIROUTE_PORT", default_value_t = 20128)]
    port: u16,
    #[arg(long, env = "OMNIROUTE_DATA_DIR", default_value = "~/.omniroute")]
    data_dir: String,
    #[arg(long, default_value_t = false)]
    mitm: bool,
}

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
        )
        .init();
    let s = Server::parse();
    tracing::info!(port = s.port, data_dir = %s.data_dir, mitm = s.mitm, "omniroute-server placeholder; axum wiring lands in next slice");
    Ok(())
}
