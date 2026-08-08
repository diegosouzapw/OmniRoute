# Custom Infrastructure (Terraform)

> **Assumes `/google-agents-cli-scaffold` scaffolding.** These patterns apply to projects with `deployment/terraform/` directories.

## Where to Put Custom Terraform

| Scenario                          | Location                               |
| --------------------------------- | -------------------------------------- |
| Single-project infrastructure     | `deployment/terraform/single-project/` |
| CI/CD environments (staging/prod) | `deployment/terraform/cicd/`           |

## Example: Custom Resources

```hcl
# deployment/terraform/single-project/custom_resources.tf

resource "google_pubsub_topic" "events" {
  name    = "${var.project_name}-events"
  project = var.project_id
}

resource "google_bigquery_dataset" "analytics" {
  dataset_id = "${replace(var.project_name, "-", "_")}_analytics"
  project    = var.project_id
  location   = var.region
}

# Eventarc trigger for Cloud Storage
resource "google_eventarc_trigger" "storage_trigger" {
  name     = "${var.project_name}-storage-trigger"
  location = var.region
  project  = var.project_id

  matching_criteria {
    attribute = "type"
    value     = "google.cloud.storage.object.v1.finalized"
  }
  matching_criteria {
    attribute = "bucket"
    value     = google_storage_bucket.uploads.name
  }

  destination {
    cloud_run_service {
      service = google_cloud_run_v2_service.app.name
      region  = var.region
      path    = "/apps/${var.project_name}/trigger/eventarc"
    }
  }

  service_account = google_service_account.app_sa.email
}
```

**For CI/CD environments (staging/prod):**

Add resources to `deployment/terraform/cicd/` (applies to staging and prod):

```hcl
# deployment/terraform/cicd/custom_resources.tf
# Resources here are created in BOTH staging and prod projects
# Use for_each with local.deploy_project_ids for multi-environment

resource "google_pubsub_topic" "events" {
  for_each = local.deploy_project_ids
  name     = "${var.project_name}-events"
  project  = each.value
}
```

## IAM for Custom Resources

**Single-project** (`deployment/terraform/single-project/`):

```hcl
resource "google_pubsub_topic_iam_member" "app_publisher" {
  topic   = google_pubsub_topic.events.name
  project = var.project_id
  role    = "roles/pubsub.publisher"
  member  = "serviceAccount:${google_service_account.app_sa.email}"
}

# Grant BigQuery data editor
resource "google_bigquery_dataset_iam_member" "app_editor" {
  dataset_id = google_bigquery_dataset.analytics.dataset_id
  project    = var.project_id
  role       = "roles/bigquery.dataEditor"
  member     = "serviceAccount:${google_service_account.app_sa.email}"
}
```

**CI/CD** (`deployment/terraform/cicd/`) — use `for_each` to apply across environments:

```hcl
resource "google_pubsub_topic_iam_member" "app_publisher" {
  for_each = local.deploy_project_ids
  topic    = google_pubsub_topic.events[each.key].name
  project  = each.value
  role     = "roles/pubsub.publisher"
  member   = "serviceAccount:${google_service_account.app_sa[each.key].email}"
}
```

## Applying Custom Infrastructure

```bash
# For single-project infrastructure
agents-cli infra single-project  # Runs terraform apply in deployment/terraform/single-project/

# For CI/CD, infrastructure is applied automatically on push
```

## Common Patterns

**Cloud Storage trigger (Eventarc):**

- Create bucket in Terraform
- Create Eventarc trigger pointing to `/apps/{app_name}/trigger/eventarc` endpoint
- Grant `eventarc.eventReceiver` role to app service account

**Pub/Sub processing:**

- Create topic and push subscription in Terraform
- Point subscription to `/apps/{app_name}/trigger/pubsub` endpoint
- Grant `iam.serviceAccountTokenCreator` role for push auth

**BigQuery Remote Function:**

- Create BigQuery connection in Terraform
- Grant connection service account permission to invoke Cloud Run
- Create the remote function via SQL after deployment

**Cloud SQL sessions:**

- Already configured when using `--session-type cloud_sql` via the Agents CLI (see `/google-agents-cli-scaffold`)
- Additional tables/schemas can be added via migration scripts

## Terraform State Management

### Remote State (Default)

By default, `infra cicd` creates a GCS bucket for remote Terraform state:

```hcl
# Auto-configured backend in deployment/terraform/cicd/backend.tf
terraform {
  backend "gcs" {
    bucket = "{cicd_project}-terraform-state"
    prefix = "{repository_name}/{prod|single-project}"
  }
}
```

The state bucket is named `{cicd_project}-terraform-state` and uses the repository name + environment as the prefix to isolate state per project and environment.

### Local State

Use the `--local-state` flag with `infra cicd` to skip remote backend setup and store state locally:

```bash
agents-cli infra cicd \
  --staging-project STAGING_PROJECT \
  --prod-project PROD_PROJECT \
  --repository-name REPO_NAME \
  --create \
  --local-state
```

Local state is stored in `deployment/terraform/cicd/terraform.tfstate`. This is suitable for single-developer projects but not recommended for teams (state conflicts).

### Importing Existing Resources

If resources already exist (e.g., created manually or by a previous deployment), import them into Terraform state:

```bash
# Import a Cloud Run service
cd deployment/terraform/single-project
terraform import google_cloud_run_v2_service.app \
  projects/PROJECT_ID/locations/REGION/services/SERVICE_NAME

# Import a service account
terraform import google_service_account.app_sa \
  projects/PROJECT_ID/serviceAccounts/SA_EMAIL

# Import a secret
terraform import google_secret_manager_secret.my_secret \
  projects/PROJECT_ID/secrets/SECRET_NAME
```

After importing, run `terraform plan` to verify the imported state matches the configuration. Fix any drift before applying.
