# Journey Traceability

**Repo:** argis-extensions: VSCode extensions  
**Standard:** [phenotype-infra journey-traceability standard](https://github.com/kooshapari/phenotype-infra/blob/main/docs/governance/journey-traceability-standard.md)  
**Schema:** [phenotype-journeys Manifest schema](https://github.com/kooshapari/phenotype-journeys/blob/main/schema/manifest.schema.json)

## User-facing flows

- CLI command invocation and flag handling
- Configuration file loading
- Output formatting and error reporting

## Keyframe capture schedule

Keyframes should be captured for: command entry, flag parsing, output rendering, error states, completion.

## Icon set

Iconography lives at `docs/operations/iconography/`. See `SPEC.md` for style guide.

## Manifest location

Journey manifests: `docs/journeys/manifests/`  
Manifest schema: `manifest.schema.json` (from phenotype-journeys)

## CI Gate

Journey gate workflow: `.github/workflows/journey-gate.yml`  
Gate status: **Stub — populate manifests to pass CI**
