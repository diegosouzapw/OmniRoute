#!/usr/bin/env python3
"""
tcp-close-analyzer.py — dependency-free pcap analyzer for OmniRoute<->Caddy
traffic, focused on ONE question: who closes the TCP connection first, the
client (Caddy, on behalf of whoever it's proxying for) or the server
(the omniroute-dev container)?

Why this exists: the dashboard's HTTP-level status (499 "Request aborted")
only tells us OmniRoute's own executor detected a dropped connection — it
doesn't tell us whether the underlying TCP socket was actually closed by the
far end, or whether OmniRoute itself is the one tearing it down (e.g. an
idle/read timeout on OmniRoute's side that then gets misreported as a client
abort). Reading the raw TCP FIN/RST packets settles that unambiguously.

No third-party dependencies (no scapy/dpkt/tshark) — just stdlib `struct`,
parsing the libpcap file format and IPv4/TCP headers directly. Good enough
for this one question; not a general-purpose pcap toolkit.

────────────────────────────────────────────────────────────────────────────
CAPTURING (run this yourself — needs root/sudo for CAP_NET_RAW; also see
--show-capture-cmd)
────────────────────────────────────────────────────────────────────────────

Rootless Podman gotcha: there is usually NO `podman3`/`podmanN` bridge
visible from the host's default network namespace. Every rootless-Podman
network for a given user lives inside a per-user (or per-container, on
current netavark/pasta setups) network namespace, not the host's root
namespace — `tcpdump -i podman3` on the host will fail with "No such device
exists" even though the container is clearly running. Attach to the
container's OWN namespace via its PID instead:

    PID=$(podman inspect omniroute-dev --format '{{.State.Pid}}')
    sudo nsenter -t "$PID" -n tcpdump -i any -w /tmp/omniroute-capture.pcap \\
        'host <omniroute-container-ip> and port 20128'

Find the container's IP first with:
    podman inspect omniroute-dev --format '{{.NetworkSettings.Networks}}'

That captures all traffic between Caddy and the omniroute-dev container on
its bridge network — this is the UNENCRYPTED hop (Caddy terminates TLS
before this point), so HTTP headers and bodies are visible in cleartext.
`-i any` produces "Linux cooked" framing (linktype SLL/SLL2, not Ethernet)
— this script auto-detects and handles both, plus classic Ethernet.

Reproduce the issue (let the agentic client run its task until it happens
again), then Ctrl+C the tcpdump. Make the file readable:

    sudo chmod 644 /tmp/omniroute-capture.pcap

Then run this script against it:

    python3 scripts/sre/tcp-close-analyzer.py /tmp/omniroute-capture.pcap

────────────────────────────────────────────────────────────────────────────
USAGE
────────────────────────────────────────────────────────────────────────────

    python3 tcp-close-analyzer.py CAPTURE.pcap [--out streams.jsonl]
    python3 tcp-close-analyzer.py CAPTURE.pcap --find "some-marker-or-uuid"
    python3 tcp-close-analyzer.py --show-capture-cmd

Output: one JSON object per TCP stream written to --out (default:
<pcap>.streams.jsonl next to the input file), each with:
  - stream 4-tuple, first/last packet timestamps, packet count
  - correlationId / requestId, if an `x-correlation-id:` / `x-request-id:`
    HTTP header was seen in either direction's reassembled byte stream
    (best-effort substring search, not a full HTTP parser). In practice
    OmniRoute doesn't echo these on every hop, so this is a bonus, not the
    primary way to find a stream — see --find below.
  - the HTTP request line / response status line, if found the same way
  - every FIN/RST seen on the stream, each tagged with which side sent it
    ("client" = whichever endpoint sent the connection-opening bare SYN,
    "server" = the other side) and at what offset into the stream's life
  - a `verdict` field: "client_closed_first" / "server_closed_first" /
    "no_close_seen" / "simultaneous"

Finding the RIGHT stream for a specific request: the reliable technique
(used live to debug real OpenClaw traffic) is NOT the correlationId header
— it's dropping a literal, unique marker string into the actual message you
send through the client under test (e.g. type "hur går det? <a fresh uuid>"
into the chat), then:

    python3 tcp-close-analyzer.py CAPTURE.pcap --find "<that uuid>"

This greps every stream's reassembled payload bytes for the marker and
prints which stream(s) it appears in plus surrounding context — agentic
clients typically resend the whole growing conversation history on every
turn, so the SAME marker will show up in several streams/requests once it's
in history; the first stream it appears in is the one that carried it live.
Cross-reference the matched stream's timing against
`data/call_logs/<date>/*.json` (grep the same marker there — request
bodies are stored on disk) to pull the matching correlationId, model,
comboName, and any error from the persisted call log.

Then: grep/jq the JSONL by correlationId to line up with a specific
dashboard log entry, e.g.:
    grep '"correlationId": "9ce2069d-a898-4c36-828d-7ca08bfc10c4"' streams.jsonl
"""
import argparse
import json
import socket
import struct
import sys
from pathlib import Path

# --- libpcap file format -----------------------------------------------
PCAP_MAGIC_LE = 0xA1B2C3D4
PCAP_MAGIC_LE_NS = 0xA1B23C4D
PCAP_MAGIC_BE = 0xD4C3B2A1
PCAP_MAGIC_BE_NS = 0x4D3CB2A1


def read_pcap_packets(path):
    """Yield (timestamp_seconds: float, raw_packet_bytes: bytes, linktype: int)
    for each packet in a classic (not pcapng) libpcap file. Handles both byte
    orders and both micro/nanosecond-resolution timestamp variants."""
    with open(path, "rb") as f:
        magic_bytes = f.read(4)
        if len(magic_bytes) < 4:
            raise ValueError("file too short to be a pcap")
        (magic,) = struct.unpack("<I", magic_bytes)
        if magic in (PCAP_MAGIC_LE, PCAP_MAGIC_LE_NS):
            endian = "<"
        elif magic in (PCAP_MAGIC_BE, PCAP_MAGIC_BE_NS):
            endian = ">"
            (magic,) = struct.unpack(">I", magic_bytes)
        else:
            raise ValueError(
                f"not a libpcap file (magic=0x{magic:08x}) — pcapng captures "
                "aren't supported by this parser; re-capture with "
                "`tcpdump -w file.pcap` (classic format, the default)"
            )
        ns_resolution = magic in (PCAP_MAGIC_LE_NS, PCAP_MAGIC_BE_NS)

        global_header = f.read(20)
        if len(global_header) < 20:
            raise ValueError("truncated pcap global header")
        _ver_maj, _ver_min, _thiszone, _sigfigs, snaplen, linktype = struct.unpack(
            endian + "HHiIII", global_header
        )
        if linktype not in SUPPORTED_LINKTYPES:
            print(
                f"warning: linktype={linktype} is not one of the supported "
                f"{sorted(SUPPORTED_LINKTYPES)} — packet parsing may misparse",
                file=sys.stderr,
            )

        while True:
            rec_header = f.read(16)
            if len(rec_header) < 16:
                return
            ts_sec, ts_frac, incl_len, _orig_len = struct.unpack(endian + "IIII", rec_header)
            data = f.read(incl_len)
            if len(data) < incl_len:
                return
            frac_divisor = 1_000_000_000 if ns_resolution else 1_000_000
            yield (ts_sec + ts_frac / frac_divisor, data, linktype)


# --- Link-layer / IPv4 / TCP header parsing -----------------------------

TCP_FLAG_FIN = 0x01
TCP_FLAG_SYN = 0x02
TCP_FLAG_RST = 0x04
TCP_FLAG_PSH = 0x08
TCP_FLAG_ACK = 0x10

LINKTYPE_ETHERNET = 1
LINKTYPE_LINUX_SLL = 113  # "cooked v1" — produced by `tcpdump -i any` on older kernels
LINKTYPE_LINUX_SLL2 = 276  # "cooked v2" — produced by `tcpdump -i any` on current kernels
SUPPORTED_LINKTYPES = {LINKTYPE_ETHERNET, LINKTYPE_LINUX_SLL, LINKTYPE_LINUX_SLL2}


def _strip_link_layer(packet_bytes, linktype):
    """Returns (ethertype, ip_offset) for the three link types we handle, or
    None if the link-layer header doesn't fit or isn't recognized."""
    if linktype == LINKTYPE_ETHERNET:
        if len(packet_bytes) < 14:
            return None
        eth_type = struct.unpack("!H", packet_bytes[12:14])[0]
        offset = 14
        if eth_type == 0x8100:  # 802.1Q VLAN tag — skip it
            if len(packet_bytes) < 18:
                return None
            eth_type = struct.unpack("!H", packet_bytes[16:18])[0]
            offset = 18
        return (eth_type, offset)
    if linktype == LINKTYPE_LINUX_SLL2:
        # Fixed 20-byte header: protocol(2) reserved(2) if_index(4) hatype(2)
        # pkttype(1) halen(1) addr(8). Protocol (ethertype) is the first field.
        if len(packet_bytes) < 20:
            return None
        proto = struct.unpack("!H", packet_bytes[0:2])[0]
        return (proto, 20)
    if linktype == LINKTYPE_LINUX_SLL:
        # Fixed 16-byte header: pkttype(2) arphrd(2) addrlen(2) addr(8) protocol(2).
        if len(packet_bytes) < 16:
            return None
        proto = struct.unpack("!H", packet_bytes[14:16])[0]
        return (proto, 16)
    return None


def parse_ethernet_ipv4_tcp(packet_bytes, linktype=LINKTYPE_ETHERNET):
    """Returns a dict with src/dst ip:port, tcp flags, seq/ack, and payload,
    or None if this packet isn't IPv4/TCP under the given link type (IPv6 is
    not handled — not needed for this container-to-container capture)."""
    stripped = _strip_link_layer(packet_bytes, linktype)
    if stripped is None:
        return None
    eth_type, offset = stripped
    if eth_type != 0x0800:  # not IPv4
        return None

    ip_start = offset
    if len(packet_bytes) < ip_start + 20:
        return None
    ver_ihl = packet_bytes[ip_start]
    ihl = (ver_ihl & 0x0F) * 4
    protocol = packet_bytes[ip_start + 9]
    if protocol != 6:  # not TCP
        return None
    src_ip = socket.inet_ntoa(packet_bytes[ip_start + 12 : ip_start + 16])
    dst_ip = socket.inet_ntoa(packet_bytes[ip_start + 16 : ip_start + 20])

    tcp_start = ip_start + ihl
    if len(packet_bytes) < tcp_start + 20:
        return None
    src_port, dst_port = struct.unpack("!HH", packet_bytes[tcp_start : tcp_start + 4])
    seq, ack = struct.unpack("!II", packet_bytes[tcp_start + 4 : tcp_start + 12])
    data_offset_flags = struct.unpack("!H", packet_bytes[tcp_start + 12 : tcp_start + 14])[0]
    data_offset = ((data_offset_flags >> 12) & 0x0F) * 4
    flags = data_offset_flags & 0x1FF

    payload_start = tcp_start + data_offset
    payload = packet_bytes[payload_start:] if len(packet_bytes) > payload_start else b""

    return {
        "src_ip": src_ip,
        "dst_ip": dst_ip,
        "src_port": src_port,
        "dst_port": dst_port,
        "seq": seq,
        "ack": ack,
        "flags": flags,
        "syn": bool(flags & TCP_FLAG_SYN),
        "ack_flag": bool(flags & TCP_FLAG_ACK),
        "fin": bool(flags & TCP_FLAG_FIN),
        "rst": bool(flags & TCP_FLAG_RST),
        "psh": bool(flags & TCP_FLAG_PSH),
        "payload": payload,
    }


def flag_str(pkt):
    parts = []
    if pkt["syn"]:
        parts.append("SYN")
    if pkt["ack_flag"]:
        parts.append("ACK")
    if pkt["fin"]:
        parts.append("FIN")
    if pkt["rst"]:
        parts.append("RST")
    if pkt["psh"]:
        parts.append("PSH")
    return "|".join(parts) or "-"


def stream_key(pkt):
    """Canonical, direction-independent key for a TCP 4-tuple."""
    a = (pkt["src_ip"], pkt["src_port"])
    b = (pkt["dst_ip"], pkt["dst_port"])
    return tuple(sorted([a, b]))


def extract_header_value(buf: bytes, header_name: bytes):
    lower = buf.lower()
    needle = header_name.lower() + b":"
    idx = lower.find(needle)
    if idx == -1:
        return None
    line_end = buf.find(b"\r\n", idx)
    if line_end == -1:
        line_end = buf.find(b"\n", idx)
    if line_end == -1:
        return None
    value = buf[idx + len(needle) : line_end].strip()
    try:
        return value.decode("utf-8", errors="replace")
    except Exception:
        return None


def extract_first_line(buf: bytes):
    nl = buf.find(b"\r\n")
    if nl == -1:
        nl = buf.find(b"\n")
    if nl == -1:
        return None
    try:
        return buf[:nl].decode("utf-8", errors="replace")
    except Exception:
        return None


def _build_streams(pcap_path: str):
    """Shared first pass: parse every packet and reassemble per-stream state
    (used by both `analyze` and `find_marker`)."""
    streams = {}  # key -> stream state dict
    packet_count = 0

    for ts, raw, linktype in read_pcap_packets(pcap_path):
        pkt = parse_ethernet_ipv4_tcp(raw, linktype)
        if pkt is None:
            continue
        packet_count += 1
        key = stream_key(pkt)
        st = streams.get(key)
        if st is None:
            st = {
                "endpoints": [
                    f"{key[0][0]}:{key[0][1]}",
                    f"{key[1][0]}:{key[1][1]}",
                ],
                "client": None,  # filled in on first bare SYN
                "server": None,
                "first_ts": ts,
                "last_ts": ts,
                "closes": [],  # list of {ts, side, flags}
                "packets": 0,
                "buf_a": bytearray(),  # payload bytes, endpoint[0] -> endpoint[1]
                "buf_b": bytearray(),  # payload bytes, endpoint[1] -> endpoint[0]
            }
            streams[key] = st

        st["last_ts"] = ts
        st["packets"] += 1

        src = f"{pkt['src_ip']}:{pkt['src_port']}"
        dst = f"{pkt['dst_ip']}:{pkt['dst_port']}"

        # A bare SYN (no ACK) identifies the connection initiator = "client".
        if pkt["syn"] and not pkt["ack_flag"] and st["client"] is None:
            st["client"] = src
            st["server"] = dst

        side = None
        if st["client"] is not None:
            side = "client" if src == st["client"] else "server"

        if pkt["payload"]:
            if src == st["endpoints"][0]:
                st["buf_a"].extend(pkt["payload"])
            else:
                st["buf_b"].extend(pkt["payload"])

        if pkt["fin"] or pkt["rst"]:
            st["closes"].append(
                {
                    "ts": round(ts, 6),
                    "side": side or "unknown",
                    "src": src,
                    "dst": dst,
                    "flags": flag_str(pkt),
                }
            )

    return streams, packet_count


def analyze(pcap_path: str, out_path: str):
    streams, packet_count = _build_streams(pcap_path)

    results = []
    for key, st in streams.items():
        buf_a = bytes(st["buf_a"])
        buf_b = bytes(st["buf_b"])
        correlation_id = extract_header_value(buf_a, b"x-correlation-id") or extract_header_value(
            buf_b, b"x-correlation-id"
        )
        request_id = extract_header_value(buf_a, b"x-request-id") or extract_header_value(
            buf_b, b"x-request-id"
        )
        first_line_a = extract_first_line(buf_a)
        first_line_b = extract_first_line(buf_b)

        closes = sorted(st["closes"], key=lambda c: c["ts"])
        if not closes:
            verdict = "no_close_seen"
        else:
            first = closes[0]
            others_same_ts = [c for c in closes if abs(c["ts"] - first["ts"]) < 1e-6]
            sides_at_first_ts = {c["side"] for c in others_same_ts}
            if len(sides_at_first_ts) > 1:
                verdict = "simultaneous"
            elif first["side"] == "client":
                verdict = "client_closed_first"
            elif first["side"] == "server":
                verdict = "server_closed_first"
            else:
                verdict = "unknown_side_closed_first"

        results.append(
            {
                "streamKey": f"{key[0][0]}:{key[0][1]}<->{key[1][0]}:{key[1][1]}",
                "client": st["client"],
                "server": st["server"],
                "firstTs": round(st["first_ts"], 6),
                "lastTs": round(st["last_ts"], 6),
                "durationSec": round(st["last_ts"] - st["first_ts"], 6),
                "packetCount": st["packets"],
                "correlationId": correlation_id,
                "requestId": request_id,
                "firstLineFromA": first_line_a,
                "firstLineFromB": first_line_b,
                "closes": closes,
                "verdict": verdict,
            }
        )

    results.sort(key=lambda r: r["firstTs"])

    with open(out_path, "w") as f:
        for r in results:
            f.write(json.dumps(r) + "\n")

    print(f"Parsed {packet_count} TCP/IPv4 packets across {len(results)} streams.")
    print(f"Wrote {out_path}")
    verdict_counts = {}
    for r in results:
        verdict_counts[r["verdict"]] = verdict_counts.get(r["verdict"], 0) + 1
    print("Verdict breakdown:", json.dumps(verdict_counts, indent=2))


def find_marker(pcap_path: str, marker: str, context: int = 200):
    """Grep every stream's reassembled payload for a literal substring —
    the reliable way to locate the request that carried a marker you
    deliberately typed into a live chat message (see module docstring)."""
    streams, packet_count = _build_streams(pcap_path)
    needle = marker.encode("utf-8", errors="replace")
    found_any = False

    for key, st in sorted(streams.items(), key=lambda kv: kv[1]["first_ts"]):
        for label, buf_bytes, direction in (
            ("buf_a", bytes(st["buf_a"]), f"{st['endpoints'][0]} -> {st['endpoints'][1]}"),
            ("buf_b", bytes(st["buf_b"]), f"{st['endpoints'][1]} -> {st['endpoints'][0]}"),
        ):
            idx = buf_bytes.find(needle)
            if idx == -1:
                continue
            found_any = True
            snippet = buf_bytes[max(0, idx - context) : idx + len(needle) + 40]
            print(f"=== FOUND in {label} (direction {direction}) ===")
            print(f"streamKey: {key[0][0]}:{key[0][1]}<->{key[1][0]}:{key[1][1]}")
            print(f"client: {st['client']}   first_ts: {round(st['first_ts'], 6)}")
            print(f"context: {snippet!r}")
            print()

    if not found_any:
        print(f"Marker {marker!r} not found in any of {len(streams)} streams "
              f"({packet_count} packets parsed).", file=sys.stderr)
        sys.exit(1)


def print_capture_instructions():
    print(
        """
Run this yourself (needs root/sudo — CAP_NET_RAW to open a packet socket).

Rootless Podman: there is no host-visible `podmanN` bridge — attach to the
container's own network namespace via its PID:

    PID=$(podman inspect omniroute-dev --format '{{.State.Pid}}')
    sudo nsenter -t "$PID" -n tcpdump -i any -w /tmp/omniroute-capture.pcap \\
        'host <omniroute-container-ip> and port 20128'

Find the container IP with:
    podman inspect omniroute-dev --format '{{.NetworkSettings.Networks}}'

That captures all traffic between Caddy and the omniroute-dev container —
the UNENCRYPTED hop (Caddy terminates TLS before this point), so HTTP
headers and bodies are visible in cleartext.

Reproduce the issue (let the agentic client run its task until it happens
again), then Ctrl+C the tcpdump. Make the file readable:

    sudo chmod 644 /tmp/omniroute-capture.pcap

Then run:

    python3 scripts/sre/tcp-close-analyzer.py /tmp/omniroute-capture.pcap
    # or, to find one specific request by a marker you typed into the chat:
    python3 scripts/sre/tcp-close-analyzer.py /tmp/omniroute-capture.pcap --find "<marker>"
"""
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("pcap", nargs="?", help="Path to a libpcap file captured with tcpdump -w")
    parser.add_argument("--out", help="Output JSONL path (default: <pcap>.streams.jsonl)")
    parser.add_argument(
        "--find", metavar="TEXT", help="Grep every stream's payload for a literal marker string and print matches"
    )
    parser.add_argument(
        "--show-capture-cmd", action="store_true", help="Print the tcpdump capture instructions and exit"
    )
    args = parser.parse_args()

    if args.show_capture_cmd or not args.pcap:
        print_capture_instructions()
        sys.exit(0 if args.show_capture_cmd else 1)

    if args.find:
        find_marker(args.pcap, args.find)
    else:
        out_path = args.out or str(Path(args.pcap).with_suffix("")) + ".streams.jsonl"
        analyze(args.pcap, out_path)
