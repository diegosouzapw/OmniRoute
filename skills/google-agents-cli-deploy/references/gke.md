# GKE Infrastructure

> **Assumes `agents-cli` scaffolding.** If your project isn't scaffolded yet, see `/google-agents-cli-scaffold` first.

## Deployment Architecture

GKE uses **container-based deployment** to a managed GKE Autopilot cluster. Your agent is packaged as a Docker container (same Dockerfile as Cloud Run), pushed to Artifact Registry, and deployed via Terraform-managed Kubernetes resources.

## Dockerfile

Scaffolded projects include a `Dockerfile` using single-stage build with `uv` for dependency management — same as Cloud Run. Check the project root `Dockerfile` for the exact configuration.

## Kubernetes Resources (Terraform-Managed)

All Kubernetes resources are managed by Terraform in `deployment/terraform/cicd/service.tf` (staging/prod) and `deployment/terraform/single-project/service.tf` (single-project). CI/CD pipelines only update the container image via `kubectl set image`.

| Resource                                      | Purpose                                                                                                                             |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **`kubernetes_deployment_v1`**                | Pod spec, container config, resource requests/limits, startup/readiness/liveness probes, env vars, optional Cloud SQL proxy sidecar |
| **`kubernetes_service_v1`**                   | LoadBalancer service exposing port 8080                                                                                             |
| **`kubernetes_horizontal_pod_autoscaler_v2`** | HorizontalPodAutoscaler (2-10 replicas, 70% CPU target)                                                                             |
| **`kubernetes_pod_disruption_budget_v1`**     | PodDisruptionBudget (minAvailable: 1)                                                                                               |
| **`kubernetes_service_account_v1`**           | Kubernetes ServiceAccount for Workload Identity                                                                                     |
| **`kubernetes_namespace_v1`**                 | Namespace for the application                                                                                                       |
| **`kubernetes_secret_v1`**                    | DB password secret (Cloud SQL only)                                                                                                 |

## Terraform Infrastructure

GKE infrastructure is provisioned in `deployment/terraform/single-project/service.tf`. Check that file for current configuration.

Key differences from Cloud Run: Terraform provisions a full networking stack (VPC, subnet, Cloud NAT for private node internet access) and a GKE Autopilot cluster with private nodes. Cloud SQL (optional, when `session_type == "cloud_sql"`) uses a proxy sidecar in the pod rather than Cloud Run's Unix socket volume mount.

## Workload Identity

GKE uses Workload Identity to map Kubernetes service accounts to GCP service accounts. The Kubernetes SA is annotated with the GCP `app_sa` email and bound via an `iam.workloadIdentityUser` IAM binding in Terraform.

This lets pods authenticate as `app_sa` without service account keys — same security model as Cloud Run's service identity, but configured through Kubernetes.

## Session Types

| Type              | Configuration                                                                | Use Case                                                        |
| ----------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **In-memory**     | Default (`shared://session` resolved by `app_utils/services.py` (in-memory)) | Local dev only; lost on pod restart                             |
| **Cloud SQL**     | `--session-type cloud_sql` at scaffold time                                  | Production persistent sessions (Cloud SQL proxy sidecar in pod) |
| **Agent Runtime** | Managed Agent Engine sessions (`agentengine://{resource_name}`)              | When using Agent Runtime as session backend                     |

The concrete session URI for `cloud_sql` / `agent_platform_sessions` is now built inside `app_utils/services.py`, not `fast_api_app.py`.

Cloud SQL in GKE uses a **proxy sidecar container** in the pod (unlike Cloud Run which uses a Unix socket volume mount). The sidecar is configured in the `kubernetes_deployment_v1` Terraform resource.

## FastAPI Endpoints

Scaffolded apps serve the ADK HTTP surface (`/run_sse`, `/apps/...`), A2A routes under `/a2a/{app_name}` (JSON-RPC + agent card — A2A is built into every ADK agent), and `/feedback`. Exact routes vary by template; check `app/fast_api_app.py`.

## Testing Your Deployed Agent

GKE LoadBalancer services are **internal by default** — they are not accessible from outside the VPC. Use `kubectl port-forward` to access the service locally:

```bash
# Start port-forward (runs in background)
kubectl port-forward svc/SERVICE_NAME 8080:8080 -n NAMESPACE &

# Test health endpoint
curl "http://127.0.0.1:8080/"

# Create a session
curl -X POST "http://127.0.0.1:8080/apps/app/users/test-user/sessions" \
  -H "Content-Type: application/json" \
  -d '{}'

# Send a message via SSE streaming
curl -X POST "http://127.0.0.1:8080/run_sse" \
  -H "Content-Type: application/json" \
  -d '{
    "app_name": "app",
    "user_id": "test-user",
    "session_id": "SESSION_ID",
    "new_message": {"role": "user", "parts": [{"text": "Hello!"}]}
  }'
```

## Network & Ingress

GKE LoadBalancer services are **internal by default** (the `cloud.google.com/load-balancer-type: "Internal"` annotation is set in Terraform). The internal IP is used for pod-to-pod A2A communication within the cluster. Use `kubectl port-forward` for local access.
