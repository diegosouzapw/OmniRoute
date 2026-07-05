use clap::Parser;

#[derive(Parser, Debug)]
#[command(name = "omniroute", version, about = "OmniRoute CLI (Rust)")]
struct Cli {
    #[arg(short, long, global = true)]
    verbose: bool,
}

fn main() -> anyhow::Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
        )
        .init();
    let cli = Cli::parse();
    tracing::info!(verbose = cli.verbose, "omniroute CLI placeholder; real commands land in next slice");
    Ok(())
}
