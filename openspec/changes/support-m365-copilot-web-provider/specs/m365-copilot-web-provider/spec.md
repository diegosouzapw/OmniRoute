## ADDED Requirements

### Requirement: M365 Copilot Web provider identity
OmniRoute SHALL expose Microsoft 365 Enterprise Copilot as a separate web-session
provider with provider ID `copilot-m365-web`, without reusing the personal
`copilot-web` provider ID or alias.

#### Scenario: Provider is registered separately
- **WHEN** provider metadata, provider registry, and executor dispatch are loaded
- **THEN** `copilot-m365-web` is available as its own provider and `copilot-web`
  remains available as the personal Microsoft Copilot Web provider

#### Scenario: Enterprise provider requires credentials
- **WHEN** API-key optionality is evaluated for `copilot-m365-web`
- **THEN** OmniRoute MUST require a credential and MUST NOT treat it as an
  anonymous or no-auth provider

### Requirement: M365 Copilot credential validation
OmniRoute SHALL accept an M365 Copilot `access_token` JWT and validate its
M365-specific structure before using it for upstream requests.

#### Scenario: Valid M365 token is accepted
- **WHEN** a user provides a JWT whose `aud` is `https://substrate.office.com/sydney`,
  whose `exp` is in the future, and whose payload contains the required user and
  tenant claims
- **THEN** validation succeeds or proceeds to an M365/Substrate-specific probe without
  sending the token to the personal `copilot.microsoft.com` validation endpoint

#### Scenario: Wrong audience is rejected
- **WHEN** a user provides a JWT whose `aud` does not match
  `https://substrate.office.com/sydney`
- **THEN** validation fails with an actionable message explaining that the token is
  not an M365 Copilot/Substrate token

#### Scenario: Expired token is rejected
- **WHEN** a user provides a JWT whose `exp` is in the past or too close to expiry
- **THEN** validation fails with a re-authentication message and OmniRoute MUST NOT
  attempt an upstream WebSocket connection

#### Scenario: Missing tenant identity is rejected
- **WHEN** a user provides a JWT that lacks the claims needed to construct the
  M365 Chathub user/tenant path
- **THEN** validation fails with a message asking the user to re-extract a supported
  M365 Copilot token

#### Scenario: Missing user identity is rejected
- **WHEN** a user provides a JWT that contains a tenant claim but lacks the supported
  user identity claim for the M365 Chathub path
- **THEN** validation fails with a message asking the user to re-extract a supported
  M365 Copilot token

### Requirement: M365 Chathub request routing
OmniRoute SHALL route `copilot-m365-web` chat requests through the Microsoft 365
Copilot Chathub/BizChat WebSocket protocol instead of the personal Copilot session
start protocol.

#### Scenario: Enterprise chat request uses M365 Chathub
- **WHEN** a chat completion request targets `copilot-m365-web` with a valid M365
  token
- **THEN** OmniRoute opens a WebSocket connection to the M365 Chathub endpoint using
  the token-derived user and tenant identity

#### Scenario: Personal session start is not used
- **WHEN** a chat completion request targets `copilot-m365-web`
- **THEN** OmniRoute MUST NOT call `POST https://copilot.microsoft.com/c/api/start`
  and MUST NOT send the personal `{ event: "send", conversationId, content, mode }`
  message format

### Requirement: OpenAI request to BizChat translation
OmniRoute SHALL translate OpenAI chat-completion requests into the minimum supported
M365 BizChat send frame.

#### Scenario: User message is sent to BizChat
- **WHEN** a request contains OpenAI-format `messages` with a latest user message
- **THEN** OmniRoute sends equivalent user content in the M365 BizChat request frame

#### Scenario: Missing user message is rejected
- **WHEN** a request contains no usable user message
- **THEN** OmniRoute returns a client error using the standard OmniRoute error
  response shape

### Requirement: BizChat response translation
OmniRoute SHALL translate M365 BizChat response frames into OpenAI-compatible chat
completion responses.

#### Scenario: Streaming text is returned as SSE chunks
- **WHEN** the M365 WebSocket returns streamed assistant text
- **THEN** OmniRoute emits `text/event-stream` chat-completion chunks containing the
  assistant text and terminates the stream with a completion event

#### Scenario: Non-streaming response is collected
- **WHEN** the client requests a non-streaming response
- **THEN** OmniRoute collects the M365 assistant text and returns a JSON chat
  completion response

#### Scenario: Upstream BizChat error is sanitized
- **WHEN** the M365 WebSocket returns an error frame or transport failure
- **THEN** OmniRoute returns a sanitized error response without raw stack traces,
  absolute paths, or raw upstream token values

### Requirement: Access token redaction
OmniRoute SHALL prevent M365 Copilot `access_token` values from appearing in
client-visible executor metadata, response bodies, and loggable URLs.

#### Scenario: Reported WebSocket URL is redacted
- **WHEN** the executor reports the upstream URL after constructing a WebSocket URL
  that requires `access_token` as a query parameter
- **THEN** the reported URL contains a redacted token placeholder and does not contain
  the raw JWT

#### Scenario: Error body excludes token
- **WHEN** request routing or WebSocket connection fails after a token has been parsed
- **THEN** the returned error body MUST NOT include the raw JWT or an unredacted
  `access_token` query value

### Requirement: M365 credential guidance and extraction
OmniRoute SHALL provide M365-specific credential metadata and token extraction
guidance without changing personal Copilot guidance.

#### Scenario: Dashboard requests M365 access token
- **WHEN** a user adds or edits a `copilot-m365-web` connection in the dashboard
- **THEN** OmniRoute presents credential guidance for an M365 Copilot/Substrate
  `access_token` rather than the personal `copilot.microsoft.com` token guidance

#### Scenario: Token extraction only uses verified surfaces
- **WHEN** in-app login or token extraction is configured for `copilot-m365-web`
- **THEN** extraction sources are limited to browser origins and token locations that
  have been verified for M365 Copilot sessions

#### Scenario: Unverified extraction surfaces are not configured
- **WHEN** no verified browser origin or token location exists for `copilot-m365-web`
- **THEN** OmniRoute provides manual credential entry guidance without adding a
  fabricated automatic extraction source

### Requirement: Personal Copilot Web non-regression
OmniRoute SHALL preserve existing personal `copilot-web` behavior while adding
`copilot-m365-web`.

#### Scenario: Personal validator remains personal
- **WHEN** `copilot-web` credentials are validated
- **THEN** OmniRoute continues to validate them against the personal Copilot endpoint
  and does not apply M365 JWT audience checks

#### Scenario: Personal executor remains personal
- **WHEN** a chat request targets `copilot-web`
- **THEN** OmniRoute continues using the personal Copilot executor, session start
  flow, model mapping, and response translation behavior
