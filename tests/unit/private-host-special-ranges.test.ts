/**
 * The outbound URL guard classifies a host by its spelling, and the same classifier judges
 * every DNS answer for a caller-supplied image URL. Addresses that reach internal services
 * through another spelling have to be recognised too: a trailing dot on a name, IPv6 forms that
 * carry an IPv4 address (NAT64, 6to4, IPv4-compatible), the Azure fabric address, and the
 * multicast and protocol-assignment ranges. Public addresses and single-label names
 * used by container networks must keep passing.
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";

import {
  isCloudMetadataHost,
  isPrivateHost,
  mappedIpv4Host,
  parseAndValidateNonMetadataUrl,
  parseAndValidatePublicUrl,
  OutboundUrlGuardError,
} from "../../src/shared/network/outboundUrlGuard.ts";

const INTERNAL_HOSTS = [
  "localhost.",
  "foo.localhost.",
  "printer.local.",
  "metadata.google.internal.",
  "168.63.129.16",
  "192.0.0.192",
  "224.0.0.1",
  "239.255.255.250",
  "127.0.0.1.",
  "[::7f00:1]",
  "[::a00:1]",
  "[64:ff9b::a9fe:a9fe]",
  "[64:ff9b::7f00:1]",
  "[2002:a9fe:a9fe::1]",
  "[2002:7f00:1::]",
  "[fec0::1]",
  "[fe90::1]",
  "[febf::1]",
  "[ff02::1]",
  "[0:0:0:0:0:0:0:1]",
];

const PUBLIC_HOSTS = [
  "api.openai.com",
  "example.com.",
  "8.8.8.8",
  "93.184.216.34",
  "[2606:4700:4700::1111]",
  "[64:ff9b::808:808]",
  "[2002:808:808::1]",
  "[::808:808]",
  "198.18.0.1",
];

describe("isPrivateHost - alternative spellings of internal addresses", () => {
  for (const host of INTERNAL_HOSTS) {
    it(`treats ${host} as private`, () => {
      assert.equal(isPrivateHost(host), true);
    });
  }

  for (const host of PUBLIC_HOSTS) {
    it(`treats ${host} as public`, () => {
      assert.equal(isPrivateHost(host), false);
    });
  }
});

describe("isCloudMetadataHost - alternative spellings of metadata endpoints", () => {
  for (const host of [
    "168.63.129.16",
    "metadata.google.internal.",
    "metadata.goog.",
    "[64:ff9b::a9fe:a9fe]",
    "[2002:a9fe:a9fe::1]",
    "[::a9fe:a9fe]",
    "[64:ff9b::6464:64c8]",
  ]) {
    it(`treats ${host} as metadata`, () => {
      assert.equal(isCloudMetadataHost(host), true);
    });
  }

  it("still accepts public hosts and container-network names", () => {
    for (const host of ["ollama", "api.openai.com", "1.1.1.1", "[64:ff9b::808:808]"]) {
      assert.equal(isCloudMetadataHost(host), false, host);
    }
  });
});

describe("URL validation with the alternative spellings", () => {
  for (const host of INTERNAL_HOSTS) {
    it(`public-only rejects http://${host}/`, () => {
      assert.throws(
        () => parseAndValidatePublicUrl(`http://${host}/`),
        (error: unknown) => error instanceof OutboundUrlGuardError
      );
    });
  }

  for (const host of ["168.63.129.16", "metadata.google.internal.", "[64:ff9b::a9fe:a9fe]"]) {
    it(`block-metadata rejects http://${host}/`, () => {
      assert.throws(
        () => parseAndValidateNonMetadataUrl(`http://${host}/`),
        (error: unknown) => error instanceof OutboundUrlGuardError
      );
    });
  }

  it("block-metadata still allows a container service name and a LAN address", () => {
    assert.doesNotThrow(() => parseAndValidateNonMetadataUrl("http://ollama:11434/"));
    assert.doesNotThrow(() => parseAndValidateNonMetadataUrl("http://192.168.1.5:8080/"));
    assert.doesNotThrow(() => parseAndValidateNonMetadataUrl("http://127.0.0.1:11434/"));
  });

  it("public-only still allows public addresses", () => {
    for (const host of PUBLIC_HOSTS) {
      assert.doesNotThrow(() => parseAndValidatePublicUrl(`http://${host}/`), host);
    }
  });
});

describe("isPrivateHost / isCloudMetadataHost - the spellings a DNS answer or raw text can take", () => {
  it("reads a dotted IPv4 tail, an uppercase literal and a zone id", () => {
    for (const host of [
      "::ffff:169.254.169.254",
      "::ffff:10.0.0.5",
      "::169.254.169.254",
      "64:ff9b::169.254.169.254",
      "64:ff9b::10.0.0.5",
      "2002:a9fe:a9fe::1",
      "FD00::1",
      "FE80::1%eth0",
      "FEC0::1",
      "FF02::1",
      "::FFFF:A9FE:A9FE",
    ]) {
      assert.equal(isPrivateHost(host), true, host);
    }
    for (const host of [
      "::ffff:169.254.169.254",
      "64:ff9b::169.254.169.254",
      "::169.254.169.254",
      "::FFFF:A9FE:A9FE",
      "2002:A9FE:A9FE::1",
    ]) {
      assert.equal(isCloudMetadataHost(host), true, host);
    }
  });

  it("does not take a public address for an internal one because of its spelling", () => {
    for (const host of [
      "::ffff:8.8.8.8",
      "64:ff9b::8.8.8.8",
      "2606:4700:4700::1111",
      "::808:808",
    ]) {
      assert.equal(isCloudMetadataHost(host), false, host);
    }
    assert.equal(isPrivateHost("64:ff9b::8.8.8.8"), false);
  });

  it("matches the AWS IPv6 metadata address however it is written", () => {
    for (const host of [
      "fd00:ec2::254",
      "FD00:EC2::254",
      "fd00:ec2:0:0:0:0:0:254",
      "fd00:0ec2::254",
      "[fd00:ec2::254]",
    ]) {
      assert.equal(isCloudMetadataHost(host), true, host);
    }
    for (const host of ["fd00:ec2::255", "fd00:ec3::254", "fd00:ec2::2540"]) {
      assert.equal(isCloudMetadataHost(host), false, host);
    }
  });

  it("blocks the Azure and Oracle metadata addresses unconditionally", () => {
    for (const host of ["168.63.129.16", "192.0.0.192"]) {
      assert.equal(isCloudMetadataHost(host), true, host);
      assert.throws(
        () => parseAndValidateNonMetadataUrl(`http://${host}/`),
        OutboundUrlGuardError,
        host
      );
    }
  });
});

describe("mappedIpv4Host", () => {
  it("unwraps only the IPv4-mapped form, in any spelling", () => {
    assert.equal(mappedIpv4Host("::ffff:a9fe:a9fe"), "169.254.169.254");
    assert.equal(mappedIpv4Host("::ffff:169.254.169.254"), "169.254.169.254");
    assert.equal(mappedIpv4Host("[::FFFF:7F00:1]"), "127.0.0.1");
    assert.equal(mappedIpv4Host("0:0:0:0:0:ffff:7f00:1"), "127.0.0.1");
  });

  it("leaves every other IPv6 form, and plain IPv4, alone", () => {
    for (const host of [
      "64:ff9b::7f00:1",
      "2002:7f00:1::",
      "::7f00:1",
      "::1",
      "fd00::1",
      "127.0.0.1",
      "localhost",
    ]) {
      assert.equal(mappedIpv4Host(host), null, host);
    }
  });
});

describe("validateProxyUrl - the upstream proxy target keeps its own rule", () => {
  it("still refuses multicast, in either family, and keeps the loopback exception", async () => {
    const { validateProxyUrl } = await import("../../src/lib/db/upstreamProxy.ts");
    for (const url of [
      "http://224.0.0.1:8080/",
      "http://239.255.255.250:8080/",
      "http://[::ffff:224.0.0.1]:8080/",
      "http://[ff02::1]:8080/",
      "http://169.254.169.254/",
    ]) {
      assert.equal(validateProxyUrl(url).valid, false, url);
    }
    for (const url of [
      "http://localhost:8317/",
      "http://127.0.0.1:8317/",
      "http://[::ffff:127.0.0.1]:8317/",
      "https://proxy.example.com:8443/",
    ]) {
      assert.equal(validateProxyUrl(url).valid, true, url);
    }
  });
});
