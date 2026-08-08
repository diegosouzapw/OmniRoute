feat(images): execute full combo strategy + fallback in /v1/images/generations (#9239)

Add open-sse/services/imageCombo.ts that expands combo targets, filters
to images-capable, executes priority strategy with handleImageGeneration
per target, and returns first success or last failure. Route patches
detect combo names before model resolution and divert to the new
execution path.
