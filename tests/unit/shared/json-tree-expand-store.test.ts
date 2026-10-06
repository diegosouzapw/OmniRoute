import assert from "node:assert/strict";
import test, { beforeEach } from "node:test";
import useJsonTreeExpandStore, {
  DEFAULT_JSON_TREE_EXPAND_LEVEL,
} from "../../../src/store/jsonTreeExpandStore.ts";

// Regression guard: collapse/expand-level controls track one level per
// section (sectionId), not one global level for the whole page -- different
// payload/stream boxes carry "interesting" data at different nesting depths.
// Level is 0-indexed to match react-json-view-lite's own
// shouldExpandNode(level) convention: 0 means nothing is expanded.

function reset() {
  useJsonTreeExpandStore.setState({ levels: {} });
}

beforeEach(reset);

test("an unset section defaults to the default expand level", () => {
  assert.equal(useJsonTreeExpandStore.getState().levels.openaiRequest, undefined);
});

test("collapseAll sets only the given section's level to 0", () => {
  useJsonTreeExpandStore.getState().collapseAll("openaiRequest");
  assert.equal(useJsonTreeExpandStore.getState().levels.openaiRequest, 0);
  assert.equal(useJsonTreeExpandStore.getState().levels.providerRequest, undefined);
});

test("expandAll sets only the given section's level to the max depth", () => {
  useJsonTreeExpandStore.getState().expandAll("openaiRequest");
  assert.equal(useJsonTreeExpandStore.getState().levels.openaiRequest, 64);
  assert.equal(useJsonTreeExpandStore.getState().levels.providerRequest, undefined);
});

test("collapseOneLevel decrements from the default and clamps at 0, independently per section", () => {
  const { collapseOneLevel } = useJsonTreeExpandStore.getState();
  collapseOneLevel("openaiRequest");
  assert.equal(
    useJsonTreeExpandStore.getState().levels.openaiRequest,
    DEFAULT_JSON_TREE_EXPAND_LEVEL - 1
  );
  assert.equal(useJsonTreeExpandStore.getState().levels.providerRequest, undefined);

  collapseOneLevel("openaiRequest");
  collapseOneLevel("openaiRequest");
  collapseOneLevel("openaiRequest");
  assert.equal(useJsonTreeExpandStore.getState().levels.openaiRequest, 0);
});

test("expandOneLevel increments and clamps at the max, independently per section", () => {
  useJsonTreeExpandStore.setState({ levels: { openaiRequest: 63 } });
  const { expandOneLevel } = useJsonTreeExpandStore.getState();
  expandOneLevel("openaiRequest");
  assert.equal(useJsonTreeExpandStore.getState().levels.openaiRequest, 64);
  expandOneLevel("openaiRequest");
  assert.equal(useJsonTreeExpandStore.getState().levels.openaiRequest, 64);
});
