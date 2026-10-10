{{/*
Guard rails. Helm only executes code inside a `define`, so these live in one
template that deployment.yaml includes — code at the top level of a _*.tpl file
is parsed and then silently discarded, which makes a bare `fail` there a no-op.
*/}}
{{- define "omniroute.validate" -}}
{{- if gt (int .Values.replicaCount) 1 -}}
{{- fail "omniroute: replicaCount must be 1 — stock OmniRoute is a single Node process writing one SQLite file, and a second pod on the same volume corrupts it. For more capacity install the chart N times, each with its own PVC (see docs/ops/KUBERNETES_DEPLOYMENT_GUIDE.md -> Scale-out)." -}}
{{- end -}}
{{- if and .Values.secrets.create .Values.secrets.existingSecret -}}
{{- fail "omniroute: set either secrets.create=true or secrets.existingSecret, not both." -}}
{{- end -}}
{{- if ne .Values.persistence.accessMode "ReadWriteOnce" -}}
{{- fail "omniroute: persistence.accessMode must be ReadWriteOnce — a shared-write volume invites a second SQLite writer, which corrupts the database." -}}
{{- end -}}
{{- if ge (int .Values.config.shutdownTimeoutMs) (mul (sub (int .Values.terminationGracePeriodSeconds) (int .Values.preStopSleepSeconds)) 1000) -}}
{{- fail "omniroute: config.shutdownTimeoutMs must be smaller than (terminationGracePeriodSeconds - preStopSleepSeconds) * 1000, or the kubelet SIGKILLs the pod mid-drain and in-flight SSE streams are cut instead of drained." -}}
{{- end -}}
{{- end -}}

{{- define "omniroute.name" -}}
{{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "omniroute.fullname" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- $name := default .Chart.Name .Values.nameOverride -}}
{{- if contains $name .Release.Name -}}
{{- .Release.Name | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}
{{- end -}}

{{- define "omniroute.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "omniroute.labels" -}}
helm.sh/chart: {{ include "omniroute.chart" . }}
{{ include "omniroute.selectorLabels" . }}
{{- if .Chart.AppVersion }}
app.kubernetes.io/version: {{ .Chart.AppVersion | quote }}
{{- end }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/part-of: omniroute
{{- end -}}

{{- define "omniroute.selectorLabels" -}}
app.kubernetes.io/name: {{ include "omniroute.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- define "omniroute.serviceAccountName" -}}
{{- if .Values.serviceAccount.create -}}
{{- default (include "omniroute.fullname" .) .Values.serviceAccount.name -}}
{{- else -}}
{{- default "default" .Values.serviceAccount.name -}}
{{- end -}}
{{- end -}}

{{/*
Name of the Secret holding JWT_SECRET / API_KEY_SECRET / STORAGE_ENCRYPTION_KEY /
INITIAL_PASSWORD. Either the chart creates it or the operator points at one that
already exists; requiring exactly one of the two avoids a release that silently
starts with no auth secrets.
*/}}
{{- define "omniroute.secretName" -}}
{{- if .Values.secrets.create -}}
{{- include "omniroute.fullname" . -}}
{{- else if .Values.secrets.existingSecret -}}
{{- .Values.secrets.existingSecret -}}
{{- else -}}
{{- fail "omniroute: no secret configured. Set secrets.existingSecret to a pre-created Secret (recommended), or secrets.create=true with secrets.jwtSecret / apiKeySecret / storageEncryptionKey / initialPassword." -}}
{{- end -}}
{{- end -}}

{{- define "omniroute.pvcName" -}}
{{- if .Values.persistence.existingClaim -}}
{{- .Values.persistence.existingClaim -}}
{{- else -}}
{{- printf "%s-data" (include "omniroute.fullname" .) -}}
{{- end -}}
{{- end -}}
