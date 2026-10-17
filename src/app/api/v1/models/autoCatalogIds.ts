import {
  AUTO_FAMILY_IDS,
  AUTO_SUFFIX_VARIANTS,
  AUTO_TEMPLATE_VARIANTS,
  createBuiltinAutoCombo,
} from "@omniroute/open-sse/services/autoCombo/builtinCatalog";
import { VALID_VARIANTS } from "@omniroute/open-sse/services/autoCombo/autoPrefix";
import {
  createVirtualAutoCombo,
  createVirtualAutoComboFromPrepared,
  type PreparedVirtualAutoComboInputs,
} from "@omniroute/open-sse/services/autoCombo/virtualFactory";

/**
 * Ids the `/v1/models` catalog advertises for the built-in auto combos.
 *
 * Derives the set from the same three lists the catalog loop used to
 * enumerate, plus the bare `auto` id and every `auto/<variant>` the parser
 * accepts that those lists do not already cover. A future parser variant is
 * announced without further edits.
 *
 * `auto/` is intentionally absent: it is a non-canonical alias of `auto`,
 * still routable when sent explicitly, but never emitted as a catalog id.
 */
export function getAdvertisedAutoIds(): string[] {
  const ids = new Set<string>([
    ...Object.keys(AUTO_TEMPLATE_VARIANTS),
    ...AUTO_SUFFIX_VARIANTS,
    ...AUTO_FAMILY_IDS,
  ]);
  ids.add("auto");
  for (const variant of VALID_VARIANTS) {
    const id = `auto/${variant}`;
    if (!ids.has(id)) ids.add(id);
  }
  return [...ids];
}

/**
 * Materialize one advertised auto id, reusing the catalog's shared prepared
 * inputs. The bare `auto` id has no template, suffix or family mapping, so
 * the built-in path throws `Unknown built-in` for it — it takes the
 * dedicated default branch instead, which is the same unconstrained virtual
 * combo, named back to the requested id.
 */
export async function materializeAdvertisedAutoCombo(
  autoId: string,
  suffix: string,
  prepared: PreparedVirtualAutoComboInputs | undefined
) {
  if (autoId === "auto") {
    const combo = prepared
      ? await createVirtualAutoComboFromPrepared(prepared, undefined)
      : await createVirtualAutoCombo(undefined);
    combo.name = autoId;
    combo.id = autoId;
    return combo;
  }
  return createBuiltinAutoCombo(autoId, suffix, prepared);
}
