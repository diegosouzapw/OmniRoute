# Quick Start

<UserJourney
  :steps="[{ title: '1. Install', desc: 'Add to project' },
           { title: '2. Configure', desc: 'Set up config' },
           { title: '3. Run', desc: 'Execute first op' },
           { title: '4. Verify', desc: 'Check health' }]"
  :estimatedDuration="5"
/>

## Installation

```bash
cargo add Kogito
```

## Configuration

```yaml
# config.yaml
name: my-project
```

## Usage

```rust
use Kogito::Client;

#[tokio::main]
async fn main() {
    let client = Client::new().await.unwrap();
    client.run().await.unwrap();
}
```
