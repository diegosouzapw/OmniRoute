//! Quickstart example for pheno-flags.
//!
//! Set env vars before running:
//!   MYAPP_DARK_MODE=1 MYAPP_BETA=yes MYAPP_DEBUG=0 cargo run --example quickstart

use pheno_flags::FlagSet;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    // Load from env (prefix MYAPP_)
    let flags = FlagSet::from_env("MYAPP")?;

    // Programmatic injection
    let flags = flags
        .with("dark_mode", true)
        .with("beta_export", false);

    // Lookups (O(1) hashmap)
    if flags.is_enabled("DARK_MODE") {
        println!("✓ Dark mode: enabled");
    } else {
        println!("  Dark mode: disabled");
    }

    if flags.is_enabled("BETA") {
        println!("✓ Beta features: enabled");
    }

    // Snapshot for observability (sorted BTreeMap)
    println!("\nAll flags snapshot:");
    for (k, v) in flags.snapshot() {
        println!("  {} = {}", k, v);
    }

    Ok(())
}
