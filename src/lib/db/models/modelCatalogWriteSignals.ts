import { backupDbFile } from "../backup";
import { invalidateModelCatalogCache } from "../readCache";

export function finishModelCatalogWriteWithBackup(): void {
  backupDbFile("pre-write");
  invalidateModelCatalogCache();
}

export function finishModelCatalogWriteWithoutBackup(): void {
  invalidateModelCatalogCache();
}
