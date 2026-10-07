# Quickstart Code Examples

Simple, copy-paste scripts to get your first response from a local OmniRoute server in under a minute.

## Prerequisites

Start OmniRoute locally first:

```bash
npx omniroute
# Server is now live at http://localhost:20128/v1
```

## Examples

| File                                       | Language    | Dependency                          |
| ------------------------------------------ | ----------- | ----------------------------------- |
| [`python_requests.py`](python_requests.py) | Python      | `pip install requests`              |
| [`nodejs_axios.js`](nodejs_axios.js)       | Node.js     | `npm install axios`                 |
| [`curl_terminal.sh`](curl_terminal.sh)     | Bash / cURL | `curl` (pre-installed on Mac/Linux) |
| [`php_curl.php`](php_curl.php)             | PHP         | PHP 7.4+ with cURL                  |

All examples use **`auto`** — the zero-configuration router that works immediately with no provider sign-up required.

## Key Settings (same in all examples)

| Setting         | Value              | Why                                                   |
| --------------- | ------------------ | ----------------------------------------------------- |
| `model`         | `auto`             | Zero-configuration routing, works out of the box      |
| `stream`        | `false`            | Returns standard JSON instead of SSE stream           |
| `Authorization` | `Bearer dummy-key` | Any non-empty string satisfies the header requirement |

## What to Change

To use a specific model, replace `auto` with any model ID from:

```bash
curl http://localhost:20128/v1/models
```
