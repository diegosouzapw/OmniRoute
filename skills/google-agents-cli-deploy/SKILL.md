---
name: google-agents-cli-deploy
description: >
  This skill should be used when the user wants to "deploy an agent",
  "deploy my ADK agent", "set up CI/CD", "configure secrets",
  "troubleshoot a deployment", or needs guidance on Agent Runtime,
  Cloud Run, or GKE deployment targets.
  Covers deployment workflows, service accounts, rollback, and production infrastructure.
  Part of the Google ADK (Agent Development Kit) skills suite.
  Do NOT use for API code patterns (use google-agents-cli-adk-code), evaluation
  (use google-agents-cli-eval), or project scaffolding (use google-agents-cli-scaffold).
metadata:
  author: Google
  license: Apache-2.0
  version: 0.6.0
  requires:
    bins:
      - agents-cli
    install: "uv tool install google-agents-cli"
---

# ADK Deployment Guide

> **Requires:** `agents-cli` (`uv tool install google-agents-cli`) — [install uv](https://docs.astral.sh/uv/getting-started/installation/index.md) first if needed.

> Prefer using the `agents-cli` commands throughout this guide — they wrap Terraform, Docker, and deployment into a tested pipeline. If your project isn't scaffolded yet, see `/google-agents-cli-scaffold` to add deployment support first.

### Reference Files

For deeper details, consult these reference files in `references/`:

- **`cloud-run.md`** — Scaling defaults, Dockerfile, session types, networking
- **`agent-runtime.md`** — container-based deploy, unified FastAPI app, the `/api` passthrough, Terraform resource, deployment metadata, CI/CD differences
- **`gke.md`** — GKE Autopilot cluster, Kubernetes manifests, Workload Identity, session types, networking
- **`terraform-patterns.md`** — Custom infrastructure, IAM, state management, importing resources
- **`batch-inference.md`** — BigQuery Remote Function trigger; for Pub/Sub / Eventarc see `/google-agents-cli-adk-code`
- **`cicd-pipeline.md`** — Full CI/CD pipeline setup, `infra cicd` flags, runner comparison, WIF auth, pipeline stages
- **`testing-deployed-agents.md`** — Testing instructions per deployment target, curl examples, load tests

> **Observability:** See the `/google-agents-cli-observability` skill for Cloud Trace, prompt-response logging, BigQuery Analytics, and third-party integrations.

---

## Deployment Target Decision Matrix

Choose the right deployment target based on your requirements:

| Criteria | Agent Runtime | Cloud Run | GKE |
|----------|-------------|-----------|-----|
| **Languages** | Python | Python | Python (+ others via custom containers) |
| **Scaling** | Managed auto-scaling (configurable min/max, concurrency) | Fully configurable (min/max instances, concurrency, CPU allocation) | Full Kubernetes scaling (HPA, VPA, node auto-provisioning) |
| **Networking** | VPC-SC and PSC-I supported (private VPC connectivity via network attachments) | Full VPC support, direct VPC egress, IAP, ingress rules | Full Kubernetes networking |
| **Session state** | Native `VertexAiSessionService` (persistent, managed) | In-memory (dev), Cloud SQL, or Agent Platform Sessions backend | In-memory (dev), Cloud SQL, or Agent Platform Sessions backend |
| **Batch/event processing** | Trigger endpoints reachable via the Agent Engine `/api` passthrough | Native trigger endpoints (Pub/Sub, Eventarc); see `/google-agents-cli-adk-code` | Custom (Kubernetes Jobs, Pub/Sub) |
| **Cost model** | vCPU-hours + memory-hours (not billed when idle) | Per-instance-second + min instance costs | Node pool costs (always-on or auto-provisioned) |
| **Setup complexity** | Lower (managed, purpose-built for agents) | Medium (Dockerfile, Terraform, networking) | Higher (Kubernetes expertise required) |
| **Best for** | Managed infrastructure, minimal ops | Custom infra, full networking control | Full Kubernetes control |

**Ask the user** which deployment target fits their needs. Each is a valid production choice with different trade-offs.

> **Product name mapping:** "Agent Engine" / "Vertex AI Agent Engine" is now **Agent Runtime**. Use `--deployment-target agent_runtime`.

> **Ambient / scheduled / event-driven agents:** ADK's `trigger_sources` registers `/apps/{app}/trigger/*` endpoints on the same FastAPI app for **all** targets. On **Cloud Run** / **GKE** these are public HTTP routes you point a Pub/Sub push subscription or Eventarc trigger at; on **Agent Runtime** the same routes are reachable through the Agent Engine `/api` passthrough (e.g. `.../reasoningEngines/v1/{resource}/api/apps/{app}/trigger/pubsub`). Cloud Run remains the simplest target for unauthenticated trigger sources. See `/google-agents-cli-adk-code` (`references/adk-python.md`, section "12. Event-Driven / Ambient Agents") for the `trigger_sources` pattern.

> **OAuth / user consent agents:** Use **Agent Runtime** with Gemini Enterprise for agents that need OAuth 2.0 user consent (e.g., accessing Google Drive, Calendar, or other user-scoped APIs). Cloud Run does not currently support managed OAuth flows. See the `adk-ae-oauth` sample in `/google-agents-cli-workflow` Phase 1.

---

## Deploying to Dev

### Deploy Workflow

**Task tracking:** Deployment involves multiple sequential steps (infra setup, CI/CD configuration, deploy, verification). Use a task list to track progress through these steps — skipping one often causes failures in later steps that are hard to trace back.

1. If prototype (no deployment target), first enhance: `agents-cli scaffold enhance . --deployment-target <target>`
2. **Notify the human**: "Eval scores meet thresholds and tests pass. Ready to deploy to dev?"
3. **Wait for explicit approval**
4. Once approved: `agents-cli deploy`

> **Agent Runtime timeout recovery:** Agent Runtime deploys can take 5-10 minutes and may exceed command timeouts. If the deploy command is cancelled or times out, the deployment continues server-side. Run `agents-cli deploy --status` to check progress — poll every 60 seconds until it reports completion or failure.

**IMPORTANT**: Never run `agents-cli deploy` without explicit human approval.

> **Do NOT run `agents-cli infra single-project` before deploying.** It is not a prerequisite — `agents-cli deploy` works on its own. Run it separately if the user needs observability features (prompt-response logging, BigQuery analytics) — see `/google-agents-cli-observability`.

### Single-Project Infrastructure Setup (Optional — Advanced)

`agents-cli infra single-project` runs `terraform apply` in `deployment/terraform/single-project/`. Use this to **provision single-project GCP infrastructure without CI/CD** (service accounts, IAM bindings, telemetry resources, Artifact Registry). Also useful to test things in a single project before going to production. It is NOT required for deploying.

```bash
# Optional — provision infrastructure in a single GCP project
agents-cli infra single-project
```

> **Note:** `agents-cli deploy` doesn't automatically use the Terraform-created `app_sa`. Pass the service account explicitly: `agents-cli deploy --service-account SA_EMAIL`.

### Deploy Flag Reference

| Flag | Description | Targets |
|------|-------------|---------|
| `--project` | GCP project ID | All |
| `--region` | GCP region | All |
| `--service-account` | Service account email for the deployed agent | All |
| `--service-name` | Override the deployed service name (Cloud Run service or Agent Runtime display name); defaults to the project name. If you override it, consider updating your Terraform and CI (if present) — they name resources from the project name. Not supported for GKE, whose names are fully owned by Terraform. | Agent Runtime, Cloud Run |
| `--secrets` | Comma-separated `ENV=SECRET` or `ENV=SECRET:VERSION` pairs | Agent Runtime, Cloud Run |
| `--update-env-vars` | Comma-separated `KEY=VALUE` environment variables | Agent Runtime, Cloud Run |
| `--agent-identity` | Enable [agent identity](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity) (Preview) | Agent Runtime |
| `--network-attachment` | Network attachment resource name for [PSC interface](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/private-service-connect-interface) (enables private VPC connectivity) | Agent Runtime |
| `--dns-peering-domain` | DNS peering domain suffix, e.g. `my-internal.corp.` (requires `--network-attachment`) | Agent Runtime |
| `--dns-peering-project` | Project ID hosting the Cloud DNS managed zone for DNS peering (requires `--network-attachment`) | Agent Runtime |
| `--dns-peering-network` | VPC network name in the target project for DNS peering (requires `--network-attachment`) | Agent Runtime |
| `--memory` | Memory limit (default: `4Gi`) | Agent Runtime, Cloud Run |
| `--cpu` | CPU limit (default: `1`) | Agent Runtime, Cloud Run |
| `--min-instances` | Minimum number of instances (default: `1`) | Agent Runtime, Cloud Run |
| `--max-instances` | Maximum number of instances (default: `10`) | Agent Runtime, Cloud Run |
| `--concurrency` | Concurrent requests per container (default: `8`; see [Sizing a deployment](#sizing-a-deployment)) | Agent Runtime, Cloud Run |
| `--num-workers` | Worker processes per container (default: `1`) | Agent Runtime |
| `--port` | Container port | Cloud Run, Agent Runtime |
| `--build-args` | Comma-separated `KEY=VALUE` Docker build args | Agent Runtime |
| `--iap` | Enable Identity-Aware Proxy | Cloud Run |
| `--image` | Container image URI (skips source build; not supported for Agent Runtime) | Cloud Run, GKE |
| `--no-wait` | Start deployment and return immediately | Agent Runtime, Cloud Run |
| `--status` | Check the status of a pending `--no-wait` deployment | Agent Runtime, Cloud Run |
| `--list` | List existing deployments and exit | All |
| `--dry-run` / `-n` | Print what would be executed without running it | All |
| `--no-confirm-project` | Skip project confirmation prompt | All |

Run `agents-cli deploy --help` for the full flag reference.

> **Advanced Cloud Run Deploys:** If you need features not exposed via `agents-cli` flags, use `--dry-run` (or `-n`) to print the full `gcloud` command, copy it, and add additional arguments as needed.

> **Project Confirmation:** If the project is resolved automatically (not passed via `--project`), the command will prompt for confirmation in interactive mode. Since agents typically run in non-interactive mode, you MUST pass `--no-confirm-project` to proceed if you are relying on automatic project resolution.

---

## Sizing a deployment

Defaults (same on Agent Runtime, Cloud Run, and the generated `service.tf`): `--cpu 1`, `--memory 4Gi`, `--num-workers 1`, `--concurrency 8`, `--min-instances 1`, `--max-instances 10`.

The params are coupled — scale them together:

- **Workers = vCPUs.** Each worker is one GIL-bound process that saturates one core, so raise `--num-workers` with `--cpu` (e.g. `--cpu 4` → `--num-workers 4`) or you pay for idle cores.
- **Memory bounds concurrency.** Each concurrent request keeps its full working set (context window, history, RAG chunks, response buffer) in memory while it waits on the model, so peak ≈ base + `concurrency × per-request memory`. Memory — not CPU — is the first limit, so raising `--concurrency` without `--memory` is the main OOM cause.
- **Concurrency default is conservative.** An async worker can serve many concurrent requests while it waits on the model, but per-request memory is agent-specific, so `8` protects a memory-heavy (RAG/multimodal) agent. Light agents can raise it to 16–32+ after load-testing. See [Underutilized asynchronous workers](https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/optimize-and-scale#underutilized-workers).

```bash
# 4x throughput: scale every param, not just one
agents-cli deploy --cpu 4 --num-workers 4 --concurrency 16 --memory 16Gi
```

**Tune with the scaffolded load test** (`tests/load_test/`, run locally or in the CI/CD staging pipeline): drive load, watch *max* latency and memory/OOM restarts, then adjust — high max latency → raise concurrency (+ workers/cpu); OOM → raise memory or lower concurrency.

> `--num-workers` is Agent-Runtime-only (Cloud Run runs one uvicorn process). On **GKE** these flags are rejected — size via the Terraform manifests + HorizontalPodAutoscaler under `deployment/terraform/`.

---

## Production Deployment — CI/CD Pipeline

For the full CI/CD pipeline setup guide — prerequisites, `infra cicd` flags, runner comparison, WIF authentication, pipeline stages, and production approval — see `references/cicd-pipeline.md`.

---

## Cloud Run Specifics

For detailed infrastructure configuration (scaling defaults, Dockerfile, FastAPI endpoints, session types, networking), see `references/cloud-run.md`. For ADK docs on Cloud Run deployment, fetch `https://adk.dev/deploy/cloud-run/index.md`.

For event-driven / ambient agent deployment on Cloud Run, see the [`ambient-expense-agent`](https://github.com/google/adk-samples/tree/main/python/agents/ambient-expense-agent) sample and `/google-agents-cli-adk-code` (`references/adk-python.md`, section "12. Event-Driven / Ambient Agents") for the `trigger_sources` pattern.

---

## Agent Runtime Specifics

Agent Runtime is a managed Vertex AI service for deploying Python ADK agents. Uses container-based deployment: `agents-cli deploy` packages your project and Agent Engine builds the image from your project's `Dockerfile` (required) — the same `fast_api_app:app` image that serves Cloud Run and GKE.

> **No `gcloud` CLI exists for Agent Runtime.** Deploy via `agents-cli deploy`. Query via the Python `vertexai.Client` SDK.

Deployments can take 5-10 minutes. Use `--no-wait` to start a deployment and return immediately, then check on it later with `--status`:

```bash
# Start deployment without blocking
agents-cli deploy --no-wait

# Check on progress later
agents-cli deploy --status
```

When `--status` detects the operation has completed, it writes `deployment_metadata.json` and prints the same success output as a normal deploy.

For detailed infrastructure configuration (container deploy flow, the unified FastAPI app and `/api` passthrough, Terraform resource, deployment metadata, session/artifact services, CI/CD differences), see `references/agent-runtime.md`. For ADK docs on Agent Runtime deployment, fetch `https://adk.dev/deploy/agent-runtime/index.md`.

---

## GKE Specifics

For detailed infrastructure configuration (Kubernetes manifests, Terraform resources, Workload Identity, session types, networking), see `references/gke.md`. For ADK docs on GKE deployment, fetch `https://adk.dev/deploy/gke/index.md`.

---

## Service Account Architecture

Scaffolded projects use two service accounts:

- **`app_sa`** (per environment) — Runtime identity for the deployed agent. Roles defined in `deployment/terraform/iam.tf`.
- **`cicd_runner_sa`** (CI/CD project) — CI/CD pipeline identity (GitHub Actions / Cloud Build). Lives in the CI/CD project (defaults to prod project), needs permissions in **both** staging and prod projects.

Check `deployment/terraform/iam.tf` for exact role bindings. Cross-project permissions (Cloud Run service agents, artifact registry access) are also configured there.

**Common 403 errors:**
- "Permission denied on Cloud Run" → `cicd_runner_sa` missing deployment role in the target project
- "Cannot act as service account" → Missing `iam.serviceAccountUser` binding on `app_sa`
- "Secret access denied" → `app_sa` missing `secretmanager.secretAccessor`
- "Cloud SQL connection failed / Not authorized" → Runtime service account missing `roles/cloudsql.client`
- "Artifact Registry read denied" → Cloud Run service agent missing read access in CI/CD project

---

## Required Permissions for CI/CD Setup

- **`roles/secretmanager.admin`** granted to the Cloud Build service account (`service-<PROJECT_NUMBER>@gcp-sa-cloudbuild.iam.gserviceaccount.com`) in the CI/CD project. This allows Cloud Build to access the GitHub token stored in Secret Manager.

---

## Required APIs

The following Google Cloud APIs must be enabled in your project for the skills and deployment to work:

- **`cloudbuild.googleapis.com`** — Required for building container images and running CI/CD pipelines.
- **`secretmanager.googleapis.com`** — Required for managing secrets and API keys.
- **`run.googleapis.com`** — Required for deploying to Cloud Run.

Ensure these are enabled before running deployment or CI/CD setup commands:
```bash
gcloud services enable cloudbuild.googleapis.com secretmanager.googleapis.com run.googleapis.com --project=YOUR_PROJECT_ID
```

---

## Secret Manager (for API Credentials)

Instead of passing sensitive keys as environment variables, use GCP Secret Manager.

```bash
# Create a secret
echo -n "YOUR_API_KEY" | gcloud secrets create MY_SECRET_NAME --data-file=-

# Update an existing secret
echo -n "NEW_API_KEY" | gcloud secrets versions add MY_SECRET_NAME --data-file=-
```

**Grant access:** For Cloud Run, grant `secretmanager.secretAccessor` to `app_sa`. For Agent Runtime, grant it to the platform-managed SA (`service-PROJECT_NUMBER@gcp-sa-aiplatform-re.iam.gserviceaccount.com`). For GKE, grant `secretmanager.secretAccessor` to `app_sa`. Access secrets via Kubernetes Secrets or directly via the Secret Manager API with Workload Identity.

**Pass secrets at deploy time (Agent Runtime, Cloud Run):**
```bash
agents-cli deploy --secrets "API_KEY=my-api-key,DB_PASS=db-password:2"
```

Format: `ENV_VAR=SECRET_ID` or `ENV_VAR=SECRET_ID:VERSION` (defaults to latest). Access in code via `os.environ.get("API_KEY")`.

---

## Cloud SQL Permissions (Manual Deployment)

When using Cloud SQL with Cloud Run in a **manual deployment** (e.g., adding `--add-cloudsql-instances` in non-Terraform setups), you must manually grant the `Cloud SQL Client` role to the runtime service account.

Without this, the deployment may succeed but fail at runtime with `cloudsql.instances.get` authorization errors.

```bash
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member="serviceAccount:YOUR_RUNTIME_SA_EMAIL" \
  --role="roles/cloudsql.client"
```

> **Note:** In full Terraform-managed setups (`infra cicd` / `infra single-project`), this role is configured and managed automatically.

---

## Observability

See the **agents-cli-observability** skill for observability configuration (Cloud Trace, prompt-response logging, BigQuery Analytics, third-party integrations).

---

## Testing Your Deployed Agent

The quickest way to test a deployed agent is `agents-cli run --url <service-url> --mode <a2a|adk> "your prompt"` — it handles auth, sessions, and streaming automatically (supports Agent Runtime and Cloud Run).

For advanced testing (custom headers, session reuse, scripting, load tests), see `references/testing-deployed-agents.md`.

---

## Deploying with a UI (IAP)

IAP (Identity-Aware Proxy) secures a Cloud Run service so only authorized Google accounts can access it. Enable it by adding the `--iap` flag when deploying (Cloud Run only): `agents-cli deploy --iap`.

For Agent Runtime with a custom frontend, use a **decoupled deployment** — deploy the frontend separately to Cloud Run or Cloud Storage, connecting to the Agent Runtime backend API.

For more information on IAP with Cloud Run, see the [Cloud Console IAP settings](https://cloud.google.com/run/docs/securing/identity-aware-proxy-cloud-run#manage_user_or_group_access).

---

## Rollback & Recovery

The primary rollback mechanism is **git-based**: fix the issue, commit, and push to `main`. The CI/CD pipeline will automatically build and deploy the new version through staging → production.

For immediate Cloud Run rollback without a new commit, use revision traffic shifting:
```bash
gcloud run revisions list --service=SERVICE_NAME --region=REGION
gcloud run services update-traffic SERVICE_NAME \
  --to-revisions=REVISION_NAME=100 --region=REGION
```

Agent Runtime doesn't support revision-based rollback — fix and redeploy via `agents-cli deploy`.

For GKE rollback, use `kubectl rollout undo`:
```bash
kubectl rollout undo deployment/DEPLOYMENT_NAME -n NAMESPACE
kubectl rollout status deployment/DEPLOYMENT_NAME -n NAMESPACE
```

---

## Custom Infrastructure (Terraform)

**CRITICAL**: When your agent requires custom infrastructure (Cloud SQL, Pub/Sub, Eventarc, BigQuery, etc.), you MUST define it in Terraform — never create resources manually via `gcloud` commands. Exception: quick experimentation is fine with `gcloud` or console, but production infrastructure must be in Terraform.

For custom infrastructure patterns, consult `references/terraform-patterns.md` for:
- Where to put custom Terraform files (single-project vs CI/CD)
- Resource examples (Pub/Sub, BigQuery, Eventarc triggers)
- IAM bindings for custom resources
- Terraform state management (remote vs local, importing resources)
- Common infrastructure patterns

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Terraform state locked | `terraform force-unlock -force LOCK_ID` in deployment/terraform/ |
| GitHub Actions auth failed | Re-run `terraform apply` in CI/CD terraform dir; verify WIF pool/provider |
| Cloud Build authorization pending | Use `github_actions` runner instead |
| Resource already exists | `terraform import` (see `references/terraform-patterns.md`) |
| Agent Runtime deploy timeout / hangs | Deployments take 5-10 min; check if engine was created (see Agent Runtime Specifics) |
| Secret not available | Verify `secretAccessor` granted to `app_sa` (not the default compute SA) |
| Cloud SQL connection failed / 403 | Grant `roles/cloudsql.client` to the runtime service account when using manual deployments |
| 403 on deploy | Check `deployment/terraform/iam.tf` — `cicd_runner_sa` needs deployment + SA impersonation roles in the target project |
| 403 when testing Cloud Run | Default is `--no-allow-unauthenticated`; include `Authorization: Bearer $(gcloud auth print-identity-token)` header |
| Cold starts too slow | Set `min_instance_count > 0` in Cloud Run Terraform config |
| Cloud Run 503 errors | Check resource limits (memory/CPU), increase `max_instance_count`, or check container crash logs |
| 403 right after granting IAM role | IAM propagation is not instant — wait a couple of minutes before retrying. Don't keep re-granting the same role |
| Resource seems missing but Terraform created it | Run `terraform state list` to check what Terraform actually manages. Resources created via `null_resource` + `local-exec` (e.g., BQ linked datasets) won't appear in `gcloud` CLI output |
| Deployment failed or agent not responding | Check Cloud Logging: `gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=SERVICE" --project=PROJECT --limit=50 --format="table(timestamp,severity,textPayload)"` for Cloud Run, or `gcloud logging read "resource.type=aiplatform.googleapis.com/ReasoningEngine" --project=PROJECT --limit=50` for Agent Runtime |
| Agent returns errors after deploy | Open Cloud Logging in Console → filter by service name (Cloud Run) or reasoning engine resource (Agent Runtime) → look for Python tracebacks or permission errors in recent log entries |

---

## Platform Registration

For registering deployed agents with Gemini Enterprise, see `/google-agents-cli-publish`.

---

## Related Skills

- `/google-agents-cli-workflow` — Development workflow, coding guidelines, and operational rules
- `/google-agents-cli-adk-code` — ADK Python API quick reference for writing agent code
- `/google-agents-cli-eval` — Evaluation methodology, dataset schema, and the eval-fix loop
- `/google-agents-cli-scaffold` — Project creation and enhancement with `agents-cli scaffold create` / `scaffold enhance`
- `/google-agents-cli-observability` — Cloud Trace, logging, BigQuery Analytics, and third-party integrations
- `/google-agents-cli-publish` — Gemini Enterprise registration
