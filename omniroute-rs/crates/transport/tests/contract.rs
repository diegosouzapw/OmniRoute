//! OpenAPI + response-shape contract test.

use std::sync::Arc;

use omniroute_core::{ChatMessage, ChatRequest};
use omniroute_providers::Registry;
use omniroute_transport::{router, AppState};

async fn spawn_server() -> std::net::SocketAddr {
    let state = AppState { registry: Arc::new(Registry::default()), http: reqwest::Client::new() };
    let app = router(state);
    let listener = tokio::net::TcpListener::bind("127.0.0.1:0").await.unwrap();
    let addr = listener.local_addr().unwrap();
    tokio::spawn(async move {
        axum::serve(listener, app).await.unwrap();
    });
    addr
}

#[tokio::test]
async fn health_endpoint_returns_ok() {
    let addr = spawn_server().await;
    let res = reqwest::Client::new()
        .get(format!("http://{}/health", addr))
        .send().await.unwrap();
    assert_eq!(res.status(), 200);
    let body = res.text().await.unwrap();
    assert_eq!(body, "ok");
}

#[tokio::test]
async fn openapi_json_includes_chat_completions_path() {
    let addr = spawn_server().await;
    let res = reqwest::Client::new()
        .get(format!("http://{}/openapi.json", addr))
        .send().await.unwrap();
    assert_eq!(res.status(), 200);
    let body: serde_json::Value = res.json().await.unwrap();
    assert_eq!(body["openapi"], "3.1.0");
    assert!(body["paths"]["/v1/chat/completions"].is_object());
    assert!(body["paths"]["/v1/chat/completions"]["post"].is_object());
}

#[tokio::test]
async fn chat_completions_with_no_provider_returns_503() {
    let addr = spawn_server().await;
    let req = ChatRequest {
        model: "gpt-4o".to_string(),
        messages: vec![ChatMessage { role: "user".to_string(), content: "hi".to_string() }],
        temperature: None,
        max_tokens: None,
        stream: false,
    };
    let res = reqwest::Client::new()
        .post(format!("http://{}/v1/chat/completions", addr))
        .json(&req)
        .send().await.unwrap();
    assert_eq!(res.status(), 503);
}

#[test]
fn chat_request_response_shape_matches_openai() {
    let req = ChatRequest {
        model: "gpt-4o".to_string(),
        messages: vec![
            ChatMessage { role: "system".to_string(), content: "You are helpful.".to_string() },
            ChatMessage { role: "user".to_string(), content: "Hello.".to_string() },
        ],
        temperature: Some(0.7),
        max_tokens: Some(64),
        stream: false,
    };
    let json = serde_json::to_string(&req).unwrap();
    assert!(json.contains("\"model\":\"gpt-4o\""));
    assert!(json.contains("\"role\":\"user\""));
    assert!(json.contains("\"temperature\":0.7"));
    assert!(json.contains("\"max_tokens\":64"));
}
