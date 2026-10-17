## Purpose

Surfaces per-model Arena ELO intelligence scores as a visual bar chart panel on the provider detail page, so operators can compare model quality within a provider at a glance.

## ADDED Requirements

### Requirement: API returns intelligence scores for a provider's models
The system SHALL expose a `GET /api/provider-intelligence?provider=<id>` endpoint that returns intelligence scores for all models belonging to the specified provider.

#### Scenario: Valid provider with scored models
- **WHEN** a management-authenticated request is made with a known provider ID that has models in the intelligence table
- **THEN** the response is HTTP 200 with a JSON array of objects each containing `modelId`, `modelName`, `score` (0–1 normalized), `eloRaw`, `confidence`, `category`, and `isFree`

#### Scenario: Valid provider with no scored models
- **WHEN** a management-authenticated request is made with a known provider ID that has no matching entries in the intelligence table
- **THEN** the response is HTTP 200 with an empty array

#### Scenario: Missing provider parameter
- **WHEN** the `provider` query parameter is absent
- **THEN** the response is HTTP 400

#### Scenario: Unauthenticated request
- **WHEN** the request does not carry valid management credentials
- **THEN** the response is HTTP 401

### Requirement: Panel overlays the model grid on the provider detail page
The system SHALL render a comparison panel as an inline overlay (absolutely positioned) over the model grid when the user activates it, leaving the rest of the page layout unchanged.

#### Scenario: Opening the panel
- **WHEN** the user clicks the "Compare" button in the model list toolbar
- **THEN** the panel overlays the model grid and the model grid is no longer interactable

#### Scenario: Closing the panel
- **WHEN** the user clicks the close button inside the panel
- **THEN** the panel is dismissed and the model grid becomes interactable again

### Requirement: Panel displays a horizontal bar chart of model scores
The system SHALL render one bar per model, sorted by score descending, with bar width proportional to the normalized score (0–1).

#### Scenario: Models with scores
- **WHEN** the panel loads and intelligence data is available
- **THEN** each model is shown as a labeled horizontal bar whose width reflects its score relative to the maximum score in the set

#### Scenario: Models without scores
- **WHEN** a model has no matching intelligence entry
- **THEN** it is shown with a zero-width bar and a "No data" label

### Requirement: Panel supports per-model checkbox selection
The system SHALL render a checkbox beside each model bar; unchecking a model hides its bar from the chart.

#### Scenario: Deselecting a model
- **WHEN** the user unchecks a model's checkbox
- **THEN** that model's bar is hidden from the chart

#### Scenario: Select All
- **WHEN** the user clicks "Select All"
- **THEN** all checkboxes are checked and all bars are visible

### Requirement: Panel supports a Free-only filter
The system SHALL provide a toggle that, when active, restricts the chart to models that are free (as determined by `isFreeModel`).

#### Scenario: Enabling Free-only
- **WHEN** the user activates the Free-only toggle
- **THEN** only models for which `isFreeModel` returns true are shown in the chart

#### Scenario: No free models
- **WHEN** Free-only is active and the provider has no free models
- **THEN** an empty state message is shown

### Requirement: Panel supports text search filtering
The system SHALL provide a text input that filters the visible bars to models whose ID or name contains the search string (case-insensitive).

#### Scenario: Matching search
- **WHEN** the user types a string in the search box
- **THEN** only bars whose model ID or name contains that string (case-insensitive) are shown

#### Scenario: No matches
- **WHEN** the search string matches no models
- **THEN** an empty state message is shown
