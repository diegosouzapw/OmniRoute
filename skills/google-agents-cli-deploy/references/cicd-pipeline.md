# Production Deployment — CI/CD Pipeline

**Best for:** Production applications, teams requiring staging → production promotion.

**Prerequisites:**

1. Project must NOT be in a gitignored folder
2. User must provide staging and production GCP project IDs
3. GitHub repository name and owner

**Steps:**

1. If prototype, first add Terraform/CI-CD files using the Agents CLI (see `/google-agents-cli-scaffold` for full options):

   ```bash
   agents-cli scaffold enhance . --cicd-runner github_actions
   ```

2. Ensure you're logged in to GitHub CLI:

   ```bash
   gh auth login  # (skip if already authenticated)
   ```

3. Run infra cicd:

   ```bash
   agents-cli infra cicd \
     --staging-project YOUR_STAGING_PROJECT \
     --prod-project YOUR_PROD_PROJECT \
     --repository-name YOUR_REPO_NAME \
     --create
   ```

4. Push code to trigger deployments

## Key `infra cicd` Flags

| Flag                 | Required | Description                                                                                                                                       |
| -------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--staging-project`  | Yes      | GCP project ID for staging environment                                                                                                            |
| `--prod-project`     | Yes      | GCP project ID for production environment                                                                                                         |
| `--repository-name`  | Yes      | GitHub repository name                                                                                                                            |
| `--create`           | No       | Create a new GitHub repository. Omit to use an existing one (the command verifies the repository exists either way)                               |
| `--repository-owner` | No       | GitHub repo owner. Defaults to your `gh` CLI user — set this when creating under (or pointing to) a GitHub organization or another user's account |
| `--cicd-project`     | No       | Separate GCP project for CI/CD infrastructure. Defaults to prod project                                                                           |
| `--region`           | No       | GCP region. Auto-detected or defaults to `us-east1`                                                                                               |
| `--local-state`      | No       | Store Terraform state locally instead of in GCS (see `references/terraform-patterns.md`)                                                          |

Run `agents-cli infra cicd --help` for the full flag reference (Cloud Build options, dev project, region, etc.).

## Choosing a CI/CD Runner

| Runner                       | Pros                                                      | Cons                                                                                                                 |
| ---------------------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| **github_actions** (Default) | No PAT needed, uses `gh auth`, WIF-based, fully automated | Requires GitHub CLI authentication                                                                                   |
| **google_cloud_build**       | Native GCP integration                                    | Requires `--github-pat` and `--github-app-installation-id` in programmatic mode (or `-i` for interactive OAuth flow) |

### Cloud Build Example

```bash
agents-cli infra cicd \
  --staging-project YOUR_STAGING_PROJECT \
  --prod-project YOUR_PROD_PROJECT \
  --repository-name YOUR_REPO_NAME \
  --create \
  --github-pat YOUR_PAT \
  --github-app-installation-id YOUR_APP_ID
```

## How Authentication Works (WIF)

Both runners use **Workload Identity Federation (WIF)** — GitHub/Cloud Build OIDC tokens are trusted by a GCP Workload Identity Pool, which grants `cicd_runner_sa` impersonation. No long-lived service account keys needed. Terraform in `infra cicd` creates the pool, provider, and SA bindings automatically. If auth fails, re-run `terraform apply` in the CI/CD Terraform directory.

## CI/CD Pipeline Stages

The pipeline has three stages:

1. **CI (PR checks)** — Triggered on pull request. Runs unit and integration tests.
2. **Staging CD** — Triggered on merge to `main`. Builds container, deploys to staging, runs load tests.
   > **Path filter:** Staging CD only triggers when relevant paths change — the agent directory (`app/**` by default), `data_ingestion/**`, `tests/**`, `deployment/**`, or `uv.lock`. The first push after `infra cicd` won't trigger staging CD unless one of these changes. If nothing happens after pushing, this is why.
3. **Production CD** — Triggered after successful staging deploy via `workflow_run`. Might require **manual approval** before deploying to production.
   > **Approving:** Go to GitHub Actions → the production workflow run → click "Review deployments" → approve the pending `production` environment. This is GitHub's environment protection rules, not a custom mechanism.

**IMPORTANT**: `infra cicd` creates infrastructure but doesn't deploy automatically. Terraform configures all required GitHub secrets and variables (WIF credentials, project IDs, service accounts). Push code to trigger the pipeline:

```bash
git add . && git commit -m "Initial agent implementation"
git push origin main
```

To approve production deployment:

```bash
# GitHub Actions: Approve via repository Actions tab (environment protection rules)

# Cloud Build: Find pending build and approve
gcloud builds list --project=PROD_PROJECT --region=REGION --filter="status=PENDING"
gcloud builds approve BUILD_ID --project=PROD_PROJECT
```

## Non-GitHub Providers (GitLab, Bitbucket, etc.)

The `agents-cli infra cicd` command only supports GitHub. It requires the `gh` CLI, uses the Terraform `github` provider, and both CI/CD runners (GitHub Actions, Cloud Build) assume a GitHub source repo.

For other git providers, use the scaffolded Terraform as a starting point:

1. Run `agents-cli scaffold enhance` to generate the Terraform and CI/CD files
2. Replace the `github` provider and resources in `deployment/terraform/cicd/` with your provider's equivalents
3. Adapt the CI/CD pipeline files (e.g., replace `.github/workflows/` with `.gitlab-ci.yml`)
4. Run `terraform apply` directly instead of `agents-cli infra cicd`
