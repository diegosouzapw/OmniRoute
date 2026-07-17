# Hello World

<StoryHeader
    title="First Operation"
    duration="2"
    difficulty="beginner"
/>

## Objective

Run your first Kogito operation.

## Implementation

```rust
use Kogito::Client;

#[tokio::main]
async fn main() {
    let client = Client::new().await.unwrap();
    let result = client.hello().await.unwrap();
    println!("{}", result);
}
```

## Output

```
Hello from Kogito!
```
