/**
 * Compatibility facade for model-to-combo mapping persistence.
 */

import type {
  CreateModelComboMappingInput,
  ModelComboMapping,
  ModelComboMappingPage,
  UpdateModelComboMappingInput,
} from "@/domain/persistence/comboRepositories";
import { routingConfigRepositories } from "./repositories/routingConfigRepositories";

export type { ModelComboMapping } from "@/domain/persistence/comboRepositories";

const repository = routingConfigRepositories.modelComboMappings;

export function getModelComboMappings(options?: {
  limit?: number;
  offset?: number;
}): Promise<ModelComboMappingPage> {
  return repository.list(options);
}

export function getModelComboMappingById(id: string): Promise<ModelComboMapping | null> {
  return repository.findById(id);
}

export function createModelComboMapping(
  data: CreateModelComboMappingInput
): Promise<ModelComboMapping> {
  return repository.create(data);
}

export function updateModelComboMapping(
  id: string,
  data: UpdateModelComboMappingInput
): Promise<ModelComboMapping | null> {
  return repository.update(id, data);
}

export function deleteModelComboMapping(id: string): Promise<boolean> {
  return repository.deleteById(id);
}

export function resolveComboForModel(model: string): Promise<Record<string, unknown> | null> {
  return repository.resolveForModel(model);
}
