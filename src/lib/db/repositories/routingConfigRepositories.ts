import type {
  ComboRepository,
  ModelComboMappingRepository,
} from "@/domain/persistence/comboRepositories";
import {
  getCombosCount as getSqliteCombosCount,
  sqliteComboRepository,
} from "./sqliteComboRepository";
import { sqliteModelComboMappingRepository } from "./sqliteModelComboMappingRepository";

export interface RoutingConfigRepositories {
  combos: ComboRepository;
  modelComboMappings: ModelComboMappingRepository;
  legacySync: {
    getCombosCount(): number;
  };
}

/**
 * SQLite-only composition root for the first repository slice.
 *
 * Backend selection deliberately does not exist yet. Keeping the binding in one
 * place prevents compatibility facades from constructing or reaching through a
 * concrete driver when a later, separately approved backend is introduced.
 */
export const routingConfigRepositories: RoutingConfigRepositories = {
  combos: sqliteComboRepository,
  modelComboMappings: sqliteModelComboMappingRepository,
  legacySync: {
    getCombosCount: getSqliteCombosCount,
  },
};
