- **fix(oauth):** stop nulling the Claude refresh token on the first unrecoverable refresh
  failure so `CredentialHealth` no longer gets stuck sticky-dead — the retry budget from #11414
  can now actually spend its second attempt instead of finding an already-cleared token (#13183)
