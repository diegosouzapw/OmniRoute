Feature: Proxy egress isolation and IPv6-only enforcement
  As an operator routing provider traffic through proxies
  I want every request to egress only through the assigned proxy (and only over IPv6 when an IPv6 proxy is set)
  So that the real host IP and IPv4 are never leaked

  Scenario: IPv6-literal proxy de-brackets and connects over IPv6
    Given a proxy configured as socks5://[2001:db8::1]:1080
    When the dispatcher options are built
    Then the SOCKS host is 2001:db8::1 and the resolved family is 6

  Scenario: IPv6 hostname proxy forces IPv6-only egress
    Given a proxy hostname with family=ipv6
    When the dispatcher family is resolved
    Then the connect family is pinned to 6

  Scenario: IPv6-only egress is fail-closed when no AAAA exists
    Given a proxy hostname with family=ipv6 and no AAAA record
    When the family is asserted
    Then it is refused and never egresses over IPv4

  Scenario: Family directive contradicting a literal is rejected
    Given a proxy 203.0.113.7 with family=ipv6
    When the dispatcher family is resolved
    Then it throws a configuration error

  Scenario: Web TLS clients are fail-closed
    Given a web TLS client whose proxy resolution throws
    When the proxy URL is resolved
    Then it throws instead of connecting directly
