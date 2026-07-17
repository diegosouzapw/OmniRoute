# Product Requirements Document: bifrost-extensions

## Executive Summary

bifrost-extensions provides a comprehensive plugin ecosystem for the Bifrost infrastructure platform, enabling seamless integration with external services, custom protocol implementations, and domain-specific extensions that extend Bifrost's core capabilities without compromising its architectural integrity.

The platform transforms Bifrost from a closed platform into an extensible infrastructure operating system where every integration—whether proprietary, open-source, or custom—follows consistent patterns for discoverability, security, and reliability. By providing first-class extensibility with isolation by default, declarative configuration, and graduated quality gates, bifrost-extensions enables organizations to tailor their infrastructure platform to specific needs while maintaining operational excellence.

This PRD establishes the comprehensive requirements for the bifrost-extensions ecosystem, covering the extension framework, SDK, registry, and management tools that enable a thriving extension marketplace.

---

## Problem Statement

### Current State Challenges

Infrastructure platforms face significant challenges with extensibility:

1. **Closed Platforms**: Existing platforms are monolithic and closed, forcing organizations to fork or maintain patches for custom needs.

2. **Integration Complexity**: Connecting external services requires deep platform knowledge and fragile custom integrations.

3. **Security Concerns**: Extensions often run with full platform privileges, creating security risks and blast radius concerns.

4. **Version Conflicts**: Extension dependencies conflict with platform dependencies, creating "dependency hell" situations.

5. **Quality Variation**: Extensions vary widely in quality, with no standardized testing or validation requirements.

6. **Discovery Problems**: Finding and evaluating extensions is difficult, with no centralized registry or quality signals.

7. **Lifecycle Management**: Installing, upgrading, and uninstalling extensions is manual and error-prone.

### Impact Analysis

These challenges result in:
- Platform lock-in preventing technology adoption
- Security incidents from privileged extensions
- Operational overhead from custom integration maintenance
- Delayed feature delivery due to platform bottlenecks
- Technical debt from extension workarounds
- Community fragmentation

### Solution Vision

bifrost-extensions provides:
- First-class extension API with same capabilities as core components
- Sandboxed execution model for extension isolation
- Declarative configuration for extension management
- Comprehensive observability for all extensions
- Semantic versioning contracts for compatibility
- Graduated quality gates for extension promotion
- Centralized registry with security scanning

---

## Target Users

### Primary Users

#### 1. Integration Engineers (Hiroshi)
- **Profile**: Integration Specialist at enterprise
- **Task**: Connect Bifrost to legacy mainframe
- **Goals**: Build reliable protocol adapter
- **Pain Points**:
  - Unclear extension APIs
  - Missing documentation
  - Hard to test extensions
  - No debugging tools
- **Success Criteria**: Production-grade adapter in 2 weeks

#### 2. Platform Engineers (Sarah)
- **Profile**: Platform Lead managing 50 clusters
- **Task**: Deploy and manage extensions fleet-wide
- **Goals**: Zero-touch extension management
- **Pain Points**:
  - Manual extension installs
  - Version conflicts
  - No visibility into extension health
  - Difficult rollback procedures
- **Success Criteria**: Automated extension rollout with monitoring

#### 3. Extension Authors (Alex)
- **Profile**: Independent developer building open source extension
- **Task**: Create and publish monitoring integration
- **Goals**: Share extension with community
- **Pain Points**:
  - Publishing complexity
  - Unclear quality bars
  - No distribution mechanism
  - Limited debugging tools
- **Success Criteria**: Extension published and adopted by 10+ teams

### Secondary Users

#### 4. SRE Teams
- **Profile**: Monitoring extension health and performance
- **Needs**: Observability integration, incident response playbooks
- **Usage**: Extension monitoring, troubleshooting

#### 5. Security Teams
- **Profile**: Auditing extension permissions and behavior
- **Needs**: Security scanning, policy enforcement, audit trails
- **Usage**: Security reviews, compliance verification

### User Personas Summary

| Persona | Role | Primary Goal | Key Pain Point | Success Metric |
|---------|------|--------------|----------------|----------------|
| Hiroshi | Integration Eng | Build adapter | Unclear APIs | 2-week delivery |
| Sarah | Platform Lead | Fleet management | Manual installs | Zero-touch |
| Alex | Extension Author | Publish extension | Publishing complexity | 10+ adoptions |
| SRE | Operations | Extension monitoring | No visibility | Full observability |
| Security | Security | Audit compliance | Policy gaps | 100% scanned |

---

## Functional Requirements

### FR-1: Extension Framework

#### FR-1.1: Extension Manifest
- The system SHALL define extension manifest schema (YAML/JSON)
- The system SHALL capture extension metadata (name, version, author, description)
- The system SHALL declare dependencies and requirements
- The system SHALL specify capabilities and permissions

#### FR-1.2: Lifecycle Management
- The system SHALL support extension installation from registry
- The system SHALL support extension version upgrades
- The system SHALL support graceful extension shutdown
- The system SHALL support extension uninstallation with cleanup

#### FR-1.3: Resource Allocation
- The system SHALL allocate CPU resources per extension
- The system SHALL allocate memory limits per extension
- The system SHALL allocate storage quotas per extension
- The system SHALL enforce resource limits at runtime

#### FR-1.4: Health Checking
- The system SHALL implement health check protocol for extensions
- The system SHALL detect extension failures automatically
- The system SHALL attempt automatic recovery for failed extensions
- The system SHALL provide health status in management UI

### FR-2: Extension Types

#### FR-2.1: Protocol Adapters
- The system SHALL support custom wire protocol adapters
- The system SHALL provide protocol negotiation hooks
- The system SHALL support protocol transformation
- The system SHALL provide protocol testing utilities

#### FR-2.2: Storage Backends
- The system SHALL support custom database connectors
- The system SHALL support cache backends
- The system SHALL support object storage adapters
- The system SHALL provide storage interface contracts

#### FR-2.3: Authentication Providers
- The system SHALL support custom identity providers
- The system SHALL support OAuth/OIDC adapters
- The system SHALL support SAML integration
- The system SHALL provide authentication flow hooks

#### FR-2.4: Telemetry Exporters
- The system SHALL support custom metrics exporters
- The system SHALL support log forwarding adapters
- The system SHALL support trace exporters
- The system SHALL provide telemetry format conversion

#### FR-2.5: Policy Engines
- The system SHALL support custom authorization logic
- The system SHALL support request/response transformation
- The system SHALL support rate limiting policies
- The system SHALL support custom validation rules

### FR-3: Extension SDK

#### FR-3.1: Language SDKs
- The system SHALL provide Go SDK for extension development
- The system SHALL provide Rust SDK for extension development
- The system SHALL provide Python SDK for extension development
- The system SHALL provide TypeScript SDK for extension development

#### FR-3.2: API Bindings
- The system SHALL provide type definitions for all extension APIs
- The system SHALL provide client libraries for platform APIs
- The system SHALL provide serialization/deserialization helpers
- The system SHALL provide error handling utilities

#### FR-3.3: Testing Utilities
- The system SHALL provide extension testing framework
- The system SHALL provide mock platform services
- The system SHALL provide integration test runners
- The system SHALL provide test assertion libraries

#### FR-3.4: Documentation Generators
- The system SHALL generate API documentation from code
- The system SHALL generate extension manifest documentation
- The system SHALL provide example generators
- The system SHALL support custom documentation templates

### FR-4: Extension Registry

#### FR-4.1: Central Catalog
- The system SHALL provide centralized extension catalog
- The system SHALL support extension search by name, category, tags
- The system SHALL provide extension detail pages
- The system SHALL support extension versioning display

#### FR-4.2: Version Management
- The system SHALL enforce semantic versioning for extensions
- The system SHALL track version dependencies
- The system SHALL detect version conflicts
- The system SHALL provide version resolution strategies

#### FR-4.3: Security Scanning
- The system SHALL scan extensions for known vulnerabilities
- The system SHALL scan extension dependencies
- The system SHALL provide security scoring
- The system SHALL block extensions with critical vulnerabilities

#### FR-4.4: Extension Signing
- The system SHALL support extension signing by authors
- The system SHALL verify extension signatures on install
- The system SHALL provide key management for publishers
- The system SHALL support signature revocation

### FR-5: Management Tools

#### FR-5.1: CLI Tool
- The system SHALL provide extension CLI for all operations
- The system SHALL support extension listing and search
- The system SHALL support extension install/uninstall
- The system SHALL support extension configuration

#### FR-5.2: Web UI
- The system SHALL provide browser-based extension management
- The system SHALL provide extension discovery interface
- The system SHALL provide extension configuration UI
- The system SHALL provide extension monitoring dashboards

#### FR-5.3: CI/CD Integration
- The system SHALL provide CI templates for extension testing
- The system SHALL support automated extension publishing
- The system SHALL support extension validation in CI
- The system SHALL provide release automation

#### FR-5.4: Testing Harness
- The system SHALL provide automated extension testing
- The system SHALL provide compatibility testing
- The system SHALL provide performance testing
- The system SHALL provide security testing integration

---

## Non-Functional Requirements

### NFR-1: Performance

#### NFR-1.1: Extension Load Time
- Extension cold start SHALL be <5 seconds
- Extension hot reload SHALL be <1 second
- Extension API calls SHALL add <10ms overhead

#### NFR-1.2: Resource Efficiency
- Extension isolation overhead SHALL be <10%
- Memory overhead per extension SHALL be <50MB
- Extension communication SHALL use zero-copy where possible

### NFR-2: Security

#### NFR-2.1: Isolation
- Extensions SHALL run in isolated processes or sandboxes
- Extensions SHALL NOT access other extension memory
- Extensions SHALL have explicit permission grants
- Platform APIs SHALL enforce authorization per extension

#### NFR-2.2: API Stability
- Extension APIs SHALL maintain backward compatibility
- Breaking changes SHALL require major version bumps
- Deprecation SHALL include 6-month notice period

### NFR-3: Reliability

#### NFR-3.1: Failure Isolation
- Extension failures SHALL NOT affect core platform
- Extension failures SHALL NOT affect other extensions
- Failed extensions SHALL be automatically restarted

#### NFR-3.2: Health Monitoring
- Extension health SHALL be monitored continuously
- Health check accuracy SHALL be >99%
- Health status SHALL be available via API and UI

### NFR-4: Observability

#### NFR-4.1: Metrics
- Extensions SHALL expose metrics via standard interface
- Platform SHALL aggregate extension metrics
- Custom metrics dimensions SHALL be supported

#### NFR-4.2: Logging
- Extensions SHALL use structured logging
- Logs SHALL be aggregated in central system
- Log levels SHALL be configurable per extension

#### NFR-4.3: Tracing
- Extension calls SHALL participate in distributed tracing
- Trace context SHALL propagate through extension boundaries

---

## User Stories

### US-1: Building Protocol Adapter

**As an** integration engineer (Hiroshi),  
**I want to** build a custom protocol adapter using the SDK,  
**So that** I can connect Bifrost to our legacy systems.

**Acceptance Criteria**:
- Given the SDK documentation, when I follow the tutorial, then I can create a working adapter
- Given my adapter code, when I run the test framework, then tests pass
- Given a completed adapter, when I submit for review, then it passes quality checks

### US-2: Fleet Extension Management

**As a** platform lead (Sarah),  
**I want to** deploy extensions across all 50 clusters automatically,  
**So that** I can ensure consistent functionality fleet-wide.

**Acceptance Criteria**:
- Given the CLI tool, when I run fleet deploy, then extensions roll out to all clusters
- Given a deployment, when I check status, then I see per-cluster health
- Given a failed deployment, when detected, then automatic rollback occurs

### US-3: Publishing Extension

**As an** extension author (Alex),  
**I want to** publish my monitoring extension to the registry,  
**So that** other teams can discover and use it.

**Acceptance Criteria**:
- Given my extension, when I run publish command, then it uploads to registry
- Given a published extension, when viewed in registry, then documentation is displayed
- Given a new version, when published, then users are notified of update

### US-4: Monitoring Extension Health

**As an** SRE,  
**I want to** view real-time health of all running extensions,  
**So that** I can respond to issues quickly.

**Acceptance Criteria**:
- Given the monitoring dashboard, when I view extensions, then health status is visible
- Given an unhealthy extension, when detected, then an alert is triggered
- Given historical data, when viewed, then uptime metrics are displayed

### US-5: Security Review

**As a** security engineer,  
**I want to** review security scan results before approving extensions,  
**So that** we maintain security standards.

**Acceptance Criteria**:
- Given a new extension, when scanned, then vulnerability report is generated
- Given scan results, when reviewed, then I can approve or reject
- Given an approved extension, when installed, then signature is verified

---

## Features

### Feature 1: Extension Runtime

**Description**: Core runtime environment for loading, executing, and managing extensions safely.

**Components**:
- Extension loader
- Sandbox/wasm runtime
- API gateway for extension calls
- Lifecycle manager

**User Value**: Safe execution; platform protection; reliable operation.

**Dependencies**: Core Bifrost platform

**Priority**: P0 (Critical)

### Feature 2: Extension SDK

**Description**: Development kits for building extensions in multiple languages.

**Components**:
- Go SDK
- Rust SDK
- Python SDK
- TypeScript SDK
- Testing framework

**User Value**: Easy extension development; language choice; testing support.

**Dependencies**: Extension Runtime

**Priority**: P0 (Critical)

### Feature 3: Extension Registry

**Description**: Central catalog for discovering, publishing, and managing extensions.

**Components**:
- Registry service
- Search and discovery
- Version management
- Security scanning
- Signing infrastructure

**User Value**: Extension discovery; quality assurance; trust and security.

**Dependencies**: Extension SDK

**Priority**: P0 (Critical)

### Feature 4: Management Console

**Description**: Web UI and CLI for extension management operations.

**Components**:
- Web management UI
- CLI tool
- Configuration management
- Monitoring dashboards

**User Value**: Easy management; visibility; operational control.

**Dependencies**: Extension Runtime, Registry

**Priority**: P1 (High)

### Feature 5: Quality Gates

**Description**: Graduated quality stages for extension promotion (experimental, beta, stable).

**Components**:
- Automated testing harness
- Quality scoring
- Promotion workflows
- Review processes

**User Value**: Quality assurance; trust signals; risk management.

**Dependencies**: Extension SDK, Registry

**Priority**: P1 (High)

### Feature 6: CI/CD Integration

**Description**: Templates and tools for extension CI/CD pipelines.

**Components**:
- GitHub Actions templates
- GitLab CI templates
- Automated publishing
- Test runners

**User Value**: Streamlined development; automated testing; easy publishing.

**Dependencies**: Extension SDK, Registry

**Priority**: P2 (Medium)

---

## Metrics & KPIs

### Technical Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Extension Load Time | <5s | Cold start measurement |
| API Stability | 100% | Backward compatibility tests |
| Isolation Overhead | <10% | Benchmark with/without sandbox |
| Health Check Accuracy | >99% | Failure detection validation |

### Adoption Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Available Extensions | 50+ | Registry count |
| Active Extensions | 100+ | Running instances |
| Extension Authors | 30+ | Unique publishers |
| SDK Downloads | 1000+ | Package manager stats |

### Quality Metrics

| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Test Coverage | >80% | Per-extension coverage |
| Documentation | 100% | README + API docs |
| Security Scan Pass | 100% | Automated scanning |
| Stable Promotions | 20+ | Extensions reaching stable |

---

## Release Criteria

### MVP Release (Month 3)

**Must Have**:
- [ ] Extension runtime with basic sandboxing
- [ ] Go SDK with core APIs
- [ ] CLI tool for extension management
- [ ] Basic registry with upload/download
- [ ] 5 reference extensions
- [ ] Documentation and tutorials

**Exit Criteria**:
- Extensions load and execute safely
- SDK passes integration tests
- 3+ internal extensions in production
- Security review passed

### Beta Release (Month 6)

**Must Have**:
- [ ] Multi-language SDK (Go, Rust, Python)
- [ ] Web UI for registry
- [ ] Security scanning integration
- [ ] Extension signing
- [ ] Quality gate framework
- [ ] 20+ extensions in registry

**Exit Criteria**:
- 10+ external extension authors
- All extensions pass security scan
- >99% health check accuracy
- User satisfaction >4.0/5

### GA Release (Month 9)

**Must Have**:
- [ ] All planned SDK languages
- [ ] Full quality gate implementation
- [ ] CI/CD integration templates
- [ ] Advanced monitoring
- [ ] Enterprise features (SSO, etc.)
- [ ] 50+ extensions available

**Exit Criteria**:
- 50+ active extensions in production
- 30+ extension authors
- 1000+ SDK downloads
- Enterprise customers using extensions

### Enterprise Release (Month 12)

**Must Have**:
- [ ] Advanced security policies
- [ ] Custom extension hosting
- [ ] Enterprise support SLAs
- [ ] Compliance reporting
- [ ] Professional services offerings

**Exit Criteria**:
- Enterprise extension marketplace active
- Revenue targets met
- 99.99% extension uptime
- Customer satisfaction >4.5/5

---

## Appendix

### A. Glossary

- **Extension**: A plugin that adds functionality to Bifrost
- **SDK**: Software Development Kit for building extensions
- **Sandbox**: Isolated execution environment for extensions
- **Manifest**: Configuration file declaring extension properties
- **Registry**: Central repository for extension distribution

### B. References

- WebAssembly System Interface: https://wasi.dev/
- Open Policy Agent: https://www.openpolicyagent.org/
- Semantic Versioning: https://semver.org/

### C. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-04-05 | Extension Lead | Initial PRD creation |

---

## Additional Sections

### Extension Runtime Architecture

#### Sandboxed Execution Model

The extension runtime provides secure isolation while maintaining performance:

```
┌─────────────────────────────────────────────────────────────────┐
│                     Extension Runtime Architecture                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                    Host Platform (Bifrost)                   │  │
│  │  ┌────────────────────────────────────────────────────┐  │  │
│  │  │                Extension Manager                       │  │  │
│  │  │  • Lifecycle control                                   │  │  │
│  │  │  • Resource allocation                                 │  │  │
│  │  │  • Health monitoring                                   │  │  │
│  │  │  • API gateway                                         │  │  │
│  │  └────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                              │                                   │
│                              │ gRPC/IPC                         │
│                              ▼                                   │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                   Extension Sandbox                        │  │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐   │  │
│  │  │   Extension  │ │   Extension  │ │   Extension  │   │  │
│  │  │   Process 1  │ │   Process 2  │ │   Process N  │   │  │
│  │  │  (isolated)  │ │  (isolated)  │ │  (isolated)  │   │  │
│  │  └──────────────┘ └──────────────┘ └──────────────┘   │  │
│  │                                                              │  │
│  │  Resource Limits:                                           │  │
│  │  • CPU: Configurable shares                                 │  │
│  │  • Memory: Hard limits with OOM handling                    │  │
│  │  • Network: Allowed endpoints whitelist                     │  │
│  │  • Storage: Quota enforcement                               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

#### Extension API Gateway

The API gateway mediates all communication between extensions and the host:

**Request Flow**:
1. Extension makes API call through SDK
2. SDK serializes request and sends via IPC
3. Gateway validates request against extension permissions
4. Gateway applies rate limiting and quotas
5. Host service processes the request
6. Response returns through reverse path

**Security Controls**:
- Capability-based access control
- Request signing and verification
- Payload size limits
- Timeout enforcement
- Audit logging of all calls

### Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Extension crashes host | Low | Critical | Process isolation, panic handling, circuit breakers |
| Resource exhaustion by extension | Medium | High | Resource quotas, cgroup limits, monitoring |
| Extension API abuse | Medium | Medium | Rate limiting, quota enforcement, throttling |
| Malicious extension code | Low | Critical | Code review, sandboxing, permission restrictions |
| Extension compatibility issues | High | Medium | Version pinning, compatibility testing, gradual rollout |
| Secret leakage via extensions | Medium | High | Secret injection (not access), audit logging |
| Extension supply chain attacks | Medium | High | Signed extensions, hash verification, audit trail |
| Configuration conflicts | Medium | Medium | Validation, namespacing, conflict detection |

### Extension Lifecycle Management

#### Installation Flow

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  User    │───▶│ Validate │───▶│ Download │───▶│  Verify  │───▶│  Stage   │
│ Request  │    │  Name/   │    │  Binary  │    │Signature │    │  Files   │
└──────────┘    │ Version  │    │          │    │/Checksum │    │          │
                └──────────┘    └──────────┘    └──────────┘    └────┬─────┘
                                                                     │
                ┌──────────┐    ┌──────────┐    ┌──────────┐        │
                │   Start  │◀───│ Configure│◀───│ Initialize│◀───────┘
                │ Extension│    │  Runtime │    │  Extension│
                └──────────┘    └──────────┘    └──────────┘
```

#### Upgrade Strategy

**Rolling Upgrade**:
1. New version staged alongside running version
2. Existing connections drained from old version
3. New version started
4. Old version stopped after grace period
5. Rollback available if health checks fail

**Breaking Change Handling**:
- Extension declares supported API versions
- Host selects compatible API version
- Deprecation warnings logged
- Migration path documented

### Extension SDK Architecture

#### Go SDK Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                     Go SDK Architecture                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Layer 4: Application Layer                                      │
│  • Extension implementation                                        │
│  • Business logic                                                │
│                                                                  │
│  Layer 3: SDK Interface Layer                                      │
│  • High-level APIs                                               │
│  • Convenience methods                                           │
│  • Type-safe wrappers                                            │
│                                                                  │
│  Layer 2: Protocol Layer                                           │
│  • gRPC client                                                   │
│  • Message serialization                                         │
│  • Connection management                                         │
│                                                                  │
│  Layer 1: Transport Layer                                          │
│  • IPC/Unix domain sockets                                         │
│  • Connection pooling                                            │
│  • Health checks                                                 │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Extension Registry Architecture

#### Registry Data Model

```yaml
Extension:
  id: unique-identifier
  name: human-readable-name
  versions:
    - version: semantic-version
      checksums:
        amd64: sha256-hash
        arm64: sha256-hash
      dependencies:
        - name: dependency-name
          version_range: semver-range
      capabilities:
        - capability-name
      api_versions:
        - v1
        - v2
      metadata:
        author: author-name
        license: license-type
        description: description-text
        tags: [tag1, tag2]
  ratings:
    average: 4.5
    count: 123
  downloads: 10000
```

*This document is a living specification. Updates require Extension Lead approval and version increment.*

### Extension Security Model

#### Sandboxing Approaches

The extension framework supports multiple isolation strategies:

**Process Isolation (Default)**:
- Extensions run in separate OS processes
- Inter-process communication via gRPC/Unix sockets
- Memory isolation enforced by OS
- Capability-based permission model

**Future: WebAssembly Sandboxing**:
- Extensions compiled to WASM
- WASMtime runtime for execution
- Capability-based security model
- Near-native performance

**Future: Container Isolation**:
- Extensions packaged as containers
- Kubernetes Pod security policies
- Resource quotas enforced
- Network policies applied

#### Security Audit Requirements

Before acceptance to registry:
- Static analysis (clippy, cargo-audit)
- Dependency vulnerability scan
- License compliance check
- Manual security review for critical extensions

### Extension Lifecycle Hooks

```rust
pub trait LifecycleHooks {
    // Called during installation
    fn on_install(&self) -> Result<(), InstallError>;
    
    // Called during uninstallation
    fn on_uninstall(&self) -> Result<(), UninstallError>;
    
    // Called when configuration changes
    fn on_config_change(&mut self, old: &Config, new: &Config) 
        -> Result<(), ConfigError>;
    
    // Called before host shutdown
    fn on_host_shutdown(&self) -> Result<(), ShutdownError>;
    
    // Called periodically for health checks
    fn on_health_check(&self) -> HealthStatus;
}
```

