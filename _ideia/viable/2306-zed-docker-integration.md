# Feature: Support Zed IDE Integration When OmniRoute Runs in Docker

> GitHub Issue: #2306 — opened by @KrisnaSantosa15 on 2026-05-16T13:12:49Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

I want to use the Zed IDE OAuth / import integration inside OmniRoute, but it currently does not work when OmniRoute is running inside Docker while Zed IDE is installed on the host machine.

When I click the "Import from Zed" button, OmniRoute shows this error:

> "Zed IDE does not appear to be installed on this system."

From my understanding, OmniRoute currently checks for a local Zed installation inside the container environment, not on the Docker host.

My setup:
- OmniRoute runs in Docker
- Zed IDE is installed on the Linux host machine
- I mounted the Zed binary path and exposed PATH variables into the container

However, OmniRoute still cannot detect Zed.

I already tried:
- Mounting `/home/user.local`
- Extending `PATH`
- Setting `ZED_ALLOW_ROOT=true`

But the import flow still fails.

### Proposed Solution

Add official support for Zed integration when OmniRoute runs inside Docker containers either exposing PATH and ENV from host machine to docker or adding new feature to upload/import zed creds manually.

### Alternatives Considered

Current workarounds attempted:
- Mounting host `.local` directory into the container
- Injecting host PATH into container PATH
- Running with `ZED_ALLOW_ROOT=true`

None of these worked.

Alternative workaround would be running OmniRoute directly on the host machine instead of Docker, but that removes the portability and isolation benefits of containerized deployment.

### Acceptance Criteria

- OmniRoute can successfully detect Zed IDE when the binary is mounted from the Docker host
- "Import from Zed" works in Docker deployments
- OAuth/authentication flow completes successfully
- Documentation includes a Docker example for Zed integration
- Existing non-Docker Zed integrations continue working without regression

### Area

OAuth / Authentication

### Related Provider(s)

Zed IDE

### Additional Context

This issue specifically affects self-hosted/containerized setups.

Many developers use Docker for OmniRoute deployment while keeping IDEs installed on the host machine, so supporting host-to-container IDE integrations would improve the developer experience significantly.

### Expected Test Plan

- Add integration tests for Docker-based Zed detection
- Validate custom `ZED_BINARY_PATH` environment variable behavior
- Ensure mounted host binaries are detected correctly
- Ensure existing native/non-Docker Zed integration tests remain green

## 💬 Community Discussion

No comments yet.

## 🎯 Refined Feature Description

When OmniRoute runs in Docker, it cannot interact with the host's Zed IDE or its credentials easily because Zed's config files and binaries are on the host. Even mounting the binaries doesn't always work if the container OS differs or if Zed requires specific host-level APIs/DBs to read its credentials.
We should add a manual import option for Zed credentials on the UI, or allow parsing Zed's credential files directly if they are mounted. Or simply allow the user to manually paste their Zed auth token like other providers.

### What it solves
- Unblocks Zed integration for Docker users.

### How it should work (high level)
1. Add a "Manual Import" tab/button in the Zed provider setup modal.
2. The user can paste their Zed OAuth token manually.
3. OmniRoute uses the pasted token directly instead of executing the Zed binary.

### Affected areas
- `src/components/providers/zed/...` (or wherever the Zed UI is)
- `src/lib/oauth/services/zed.ts`

## 📎 Attachments & References
- None

## 🔗 Related Ideas
- None
