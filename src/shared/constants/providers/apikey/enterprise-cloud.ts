/**
 * APIKEY provider catalog — enterprise-cloud family (hyperscaler & enterprise cloud platforms).
 * Pure data; merged by apikey/index.ts via spread (god-file decomposition; semantic split).
 */
export const APIKEY_PROVIDERS_ENTERPRISE = {
  "azure-openai": {
    id: "azure-openai",
    alias: "azure",
    name: "Azure OpenAI",
    icon: "cloud",
    color: "#0078D4",
    textIcon: "AZ",
    website: "https://azure.microsoft.com/products/ai-services/openai-service",
    authHint:
      "Use your Azure OpenAI API key. Base URL should be your resource endpoint, for example https://my-resource.openai.azure.com.",
    passthroughModels: true,
  },
  "azure-ai": {
    id: "azure-ai",
    alias: "azure-ai",
    name: "Azure AI Foundry",
    icon: "cloud",
    color: "#2563EB",
    textIcon: "AF",
    website: "https://learn.microsoft.com/azure/ai-foundry",
    authHint:
      "Use your Azure AI Foundry key. Base URL can be https://<resource>.services.ai.azure.com/openai/v1/ or https://<resource>.openai.azure.com/openai/v1/.",
    apiHint:
      "Foundry uses the OpenAI v1 surface with deployment names as models. OmniRoute normalizes root resource URLs to the v1 chat and /models endpoints.",
    passthroughModels: true,
  },
  bedrock: {
    id: "bedrock",
    alias: "bedrock",
    name: "Amazon Bedrock",
    icon: "cloud",
    color: "#FF9900",
    textIcon: "BR",
    website: "https://aws.amazon.com/bedrock",
    authHint:
      "Use your Amazon Bedrock API key and configure the AWS region where your models are enabled (for example eu-west-2). OmniRoute calls Bedrock's native Converse API directly.",
    apiHint:
      "Native Bedrock integration: model discovery uses Bedrock foundation models and inference profiles, while chat uses the regional Bedrock Runtime Converse/ConverseStream APIs.",
    passthroughModels: true,
  },
  watsonx: {
    id: "watsonx",
    alias: "watsonx",
    name: "IBM watsonx.ai Gateway",
    icon: "hub",
    color: "#0F62FE",
    textIcon: "WX",
    website: "https://www.ibm.com/products/watsonx-ai",
    authHint:
      "Use your watsonx bearer token. Base URL can be https://<region>.ml.cloud.ibm.com/ml/gateway/v1/ or a self-managed /ml/gateway/v1 endpoint.",
    apiHint:
      "The watsonx model gateway exposes OpenAI-compatible /chat/completions and /models under /ml/gateway/v1.",
    passthroughModels: true,
  },
  oci: {
    id: "oci",
    alias: "oci",
    name: "OCI Generative AI",
    icon: "cloud",
    color: "#C74634",
    textIcon: "OCI",
    website: "https://www.oracle.com/artificial-intelligence/generative-ai",
    authHint:
      "Use your OCI Generative AI API key or IAM bearer token. Base URL can be https://inference.generativeai.<region>.oci.oraclecloud.com/openai/v1/.",
    apiHint:
      "OCI exposes OpenAI-compatible chat and responses endpoints. Project ID is optional in OmniRoute but may be required for Responses and agentic workflows.",
    passthroughModels: true,
  },
  sap: {
    id: "sap",
    alias: "sap",
    name: "SAP Generative AI Hub",
    icon: "business",
    color: "#0FAAFF",
    textIcon: "SAP",
    website:
      "https://help.sap.com/docs/sap-ai-core/sap-ai-core-service-guide/generative-ai-hub-in-sap-ai-core",
    authHint:
      "Use your SAP AI Core bearer token. Base URL can be your AI_API_URL root or a deploymentUrl from Generative AI Hub.",
    apiHint:
      "Model discovery uses /v2/lm/scenarios/foundation-models/models on AI_API_URL. Chat requests use deploymentUrl/chat/completions and require AI-Resource-Group.",
    passthroughModels: true,
  },
  modal: {
    id: "modal",
    alias: "mdl",
    name: "Modal",
    icon: "cloud_queue",
    color: "#7C3AED",
    textIcon: "MDL",
    website: "https://modal.com/docs",
    authHint:
      "Use the bearer token that protects your Modal deployment, if enabled. Base URL should point to your OpenAI-compatible Modal app, for example https://<workspace>--<app>.modal.run/v1.",
    apiHint:
      "Modal commonly serves user-hosted OpenAI-compatible apps on /v1. OmniRoute will probe /v1/models and route chat traffic to /v1/chat/completions.",
    hasFree: true,
    freeNote: "$30/month free credits for new accounts",
    passthroughModels: true,
  },
  vertex: {
    id: "vertex",
    alias: "vertex",
    name: "Vertex AI",
    icon: "cloud",
    color: "#4285F4",
    textIcon: "VA",
    website: "https://cloud.google.com/vertex-ai",
    hasFree: true,
    authHint: "Provide Service Account JSON or OAuth access_token",
  },
  "vertex-partner": {
    id: "vertex-partner",
    alias: "vp",
    name: "Vertex AI Partners",
    icon: "cloud",
    color: "#34A853",
    textIcon: "VP",
    website: "https://cloud.google.com/vertex-ai",
    authHint: "Provide the same Service Account JSON used for Vertex AI partner models.",
  },
  "cloudflare-ai": {
    id: "cloudflare-ai",
    alias: "cf",
    name: "Cloudflare Workers AI",
    icon: "cloud",
    color: "#F48120",
    textIcon: "CF",
    website: "https://developers.cloudflare.com/workers-ai",
    hasFree: true,
    freeNote:
      "Free 10K Neurons/day: ~150 LLM responses or 500s Whisper audio — edge inference globally",
    authHint: "Requires API Token AND Account ID (found at dash.cloudflare.com)",
  },
  scaleway: {
    id: "scaleway",
    alias: "scw",
    name: "Scaleway AI",
    icon: "cloud",
    color: "#4F0599",
    textIcon: "SCW",
    website: "https://www.scaleway.com/en/ai/generative-apis",
    hasFree: true,
    freeNote: "1M free tokens for new accounts — EU/GDPR compliant (Paris), Qwen3 235B & Llama 70B",
  },
  ovhcloud: {
    id: "ovhcloud",
    alias: "ovh",
    name: "OVHcloud AI",
    icon: "cloud",
    color: "#2563EB",
    textIcon: "OVH",
    website: "https://www.ovhcloud.com",
  },
  heroku: {
    id: "heroku",
    alias: "heroku",
    name: "Heroku AI",
    icon: "cloud_upload",
    color: "#7C3AED",
    textIcon: "HK",
    website: "https://www.heroku.com",
  },
  databricks: {
    id: "databricks",
    alias: "databricks",
    name: "Databricks",
    icon: "table_chart",
    color: "#F97316",
    textIcon: "DB",
    website: "https://www.databricks.com",
  },
  datarobot: {
    id: "datarobot",
    alias: "datarobot",
    name: "DataRobot",
    icon: "precision_manufacturing",
    color: "#6D28D9",
    textIcon: "DR",
    website: "https://docs.datarobot.com",
    authHint:
      "Use your DataRobot API token. Optional Base URL can be the account root (for LLM Gateway) or a deployment URL under /api/v2/deployments/<id>.",
    apiHint:
      "The default gateway catalogs active models from /genai/llmgw/catalog/. Deployment URLs are also supported for direct OpenAI-compatible chat requests.",
    passthroughModels: true,
  },
  clarifai: {
    id: "clarifai",
    alias: "clarifai",
    name: "Clarifai",
    icon: "hub",
    color: "#7C3AED",
    textIcon: "CF",
    website: "https://docs.clarifai.com",
    authHint:
      "Use your Clarifai PAT or app-specific API key. OmniRoute targets the OpenAI-compatible endpoint at https://api.clarifai.com/v2/ext/openai/v1 and authenticates with Authorization: Key <token>.",
    apiHint:
      "Clarifai exposes OpenAI-compatible chat, responses and /models on /v2/ext/openai/v1. Public/community models typically require a PAT; app-scoped keys only work for resources inside that app.",
    passthroughModels: true,
  },
  snowflake: {
    id: "snowflake",
    alias: "snowflake",
    name: "Snowflake Cortex",
    icon: "ac_unit",
    color: "#29B5E8",
    textIcon: "SF",
    website: "https://www.snowflake.com",
  },
};
