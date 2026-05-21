// AUTO-GENERATED. Do not edit.
import { register_chat } from "./chat.mjs";
import { register_messages } from "./messages.mjs";
import { register_responses } from "./responses.mjs";
import { register_embeddings } from "./embeddings.mjs";
import { register_images } from "./images.mjs";
import { register_audio } from "./audio.mjs";
import { register_moderations } from "./moderations.mjs";
import { register_rerank } from "./rerank.mjs";
import { register_system } from "./system.mjs";
import { register_models } from "./models.mjs";
import { register_providers } from "./providers.mjs";
import { register_provider_nodes } from "./provider-nodes.mjs";
import { register_api_keys } from "./api-keys.mjs";
import { register_combos } from "./combos.mjs";
import { register_settings } from "./settings.mjs";
import { register_compression } from "./compression.mjs";
import { register_usage } from "./usage.mjs";
import { register_pricing } from "./pricing.mjs";
import { register_translator } from "./translator.mjs";
import { register_cli_tools } from "./cli-tools.mjs";
import { register_oauth } from "./oauth.mjs";
import { register_cloud } from "./cloud.mjs";
import { register_fallback } from "./fallback.mjs";
import { register_telemetry } from "./telemetry.mjs";

export const API_TAGS = [
  "chat",
  "messages",
  "responses",
  "embeddings",
  "images",
  "audio",
  "moderations",
  "rerank",
  "system",
  "models",
  "providers",
  "provider-nodes",
  "api-keys",
  "combos",
  "settings",
  "compression",
  "usage",
  "pricing",
  "translator",
  "cli-tools",
  "oauth",
  "cloud",
  "fallback",
  "telemetry",
];

export function registerApiCommands(program) {
  const api = program
    .command("api")
    .description("Direct REST API access (generated from OpenAPI spec)");
  api
    .command("tags")
    .description("List available API tag groups")
    .action(() => {
      API_TAGS.forEach((t) => console.log(t));
    });
  register_chat(api);
  register_messages(api);
  register_responses(api);
  register_embeddings(api);
  register_images(api);
  register_audio(api);
  register_moderations(api);
  register_rerank(api);
  register_system(api);
  register_models(api);
  register_providers(api);
  register_provider_nodes(api);
  register_api_keys(api);
  register_combos(api);
  register_settings(api);
  register_compression(api);
  register_usage(api);
  register_pricing(api);
  register_translator(api);
  register_cli_tools(api);
  register_oauth(api);
  register_cloud(api);
  register_fallback(api);
  register_telemetry(api);
}
