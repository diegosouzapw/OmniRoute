export type ComboRecord = Record<string, unknown>;

export interface ComboUpdateResult {
  combo: ComboRecord;
  previousName: string;
  currentName: string;
  modelsFieldProvided: boolean;
}

export interface ComboReorderResult {
  combos: ComboRecord[];
  rowsReordered: number;
}

export interface ComboRepository {
  list(limit?: number, offset?: number): Promise<ComboRecord[]>;
  count(): Promise<number>;
  findById(id: string): Promise<ComboRecord | null>;
  findByName(name: string): Promise<ComboRecord | null>;
  findByNameInsensitive(name: string): Promise<ComboRecord | null>;
  create(data: ComboRecord): Promise<ComboRecord>;
  update(id: string, data: ComboRecord): Promise<ComboUpdateResult | null>;
  reorder(comboIds: string[]): Promise<ComboReorderResult>;
  deleteById(id: string): Promise<boolean>;
}

export interface ModelComboMapping {
  id: string;
  pattern: string;
  comboId: string;
  comboName?: string;
  priority: number;
  enabled: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateModelComboMappingInput {
  pattern: string;
  comboId: string;
  priority?: number;
  enabled?: boolean;
  description?: string;
}

export type UpdateModelComboMappingInput = Partial<CreateModelComboMappingInput>;

export interface ModelComboMappingPage {
  items: ModelComboMapping[];
  total: number;
}

export interface ModelComboMappingRepository {
  list(options?: { limit?: number; offset?: number }): Promise<ModelComboMappingPage>;
  findById(id: string): Promise<ModelComboMapping | null>;
  create(data: CreateModelComboMappingInput): Promise<ModelComboMapping>;
  update(id: string, data: UpdateModelComboMappingInput): Promise<ModelComboMapping | null>;
  deleteById(id: string): Promise<boolean>;
  resolveForModel(model: string): Promise<ComboRecord | null>;
}
