"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";

type ParsedProxyEntry = {
  name: string;
  host: string;
  port: number;
  username: string;
  password: string;
  type: string;
  region: string;
  status: string;
  notes: string;
};

type ParseError = {
  line: number;
  reason: string;
};

type BulkImportResult = {
  created: number;
  updated: number;
  failed: number;
};

const BULK_IMPORT_TEMPLATE = `# Proxy Bulk Import
# Format: NAME|HOST|PORT|USERNAME|PASSWORD|TYPE|REGION|STATUS|NOTES
# Required: NAME, HOST, PORT
# Optional: USERNAME, PASSWORD, TYPE (http|https|socks5, default: socks5), REGION, STATUS (active|inactive, default: active), NOTES
# Lines starting with # are ignored. Existing proxies (same host+port) will be updated.
#
# SOCKS5 examples:
# proxy-us|138.99.147.218|50101|myuser|mypass|socks5|US-East|active|US production proxy
# proxy-eu|200.234.177.62|50101|myuser|mypass|socks5|EU-West
#
# HTTP/HTTPS examples:
# http-proxy|10.0.0.50|8080|||http||active|Internal HTTP proxy
# https-proxy|proxy.example.com|443|admin|secret123|https|US|active
`;

const VALID_TYPES = new Set(["http", "https", "socks5"]);
const VALID_STATUSES = new Set(["active", "inactive"]);

export function parseBulkImportText(text: string): {
  entries: ParsedProxyEntry[];
  errors: ParseError[];
  skipped: number;
} {
  const lines = text.split("\n");
  const entries: ParsedProxyEntry[] = [];
  const errors: ParseError[] = [];
  let skipped = 0;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i].trim();
    if (!raw || raw.startsWith("#")) {
      skipped++;
      continue;
    }

    const parts = raw.split("|").map((p) => p.trim());
    const [name, host, portStr, username, password, type, region, status, notes] = parts;
    const lineNum = i + 1;

    if (!name) {
      errors.push({ line: lineNum, reason: "bulkImportErrorMissingName" });
      continue;
    }
    if (!host) {
      errors.push({ line: lineNum, reason: "bulkImportErrorMissingHost" });
      continue;
    }
    const port = Number(portStr);
    if (!portStr || isNaN(port) || port < 1 || port > 65535) {
      errors.push({ line: lineNum, reason: "bulkImportErrorInvalidPort" });
      continue;
    }
    const normalizedType = (type || "socks5").toLowerCase();
    if (!VALID_TYPES.has(normalizedType)) {
      errors.push({ line: lineNum, reason: "bulkImportErrorInvalidType" });
      continue;
    }
    const normalizedStatus = (status || "active").toLowerCase();
    if (!VALID_STATUSES.has(normalizedStatus)) {
      errors.push({ line: lineNum, reason: "bulkImportErrorInvalidStatus" });
      continue;
    }

    entries.push({
      name,
      host,
      port,
      username: username || "",
      password: password || "",
      type: normalizedType,
      region: region || "",
      status: normalizedStatus,
      notes: notes || "",
    });
  }

  return { entries, errors, skipped };
}

interface UseProxyBulkImportOptions {
  onImport: (entries: ParsedProxyEntry[]) => Promise<BulkImportResult>;
}

export function useProxyBulkImport({ onImport }: UseProxyBulkImportOptions) {
  const t = useTranslations("proxyRegistry");
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(BULK_IMPORT_TEMPLATE);
  const [parsed, setParsed] = useState<ParsedProxyEntry[]>([]);
  const [errors, setErrors] = useState<ParseError[]>([]);
  const [skipped, setSkipped] = useState(0);
  const [parsedOnce, setParsedOnce] = useState(false);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState<BulkImportResult | null>(null);

  const handleParse = useCallback(() => {
    const { entries, errors: parseErrors, skipped: skippedLines } = parseBulkImportText(text);
    setParsed(entries);
    setErrors(parseErrors);
    setSkipped(skippedLines);
    setParsedOnce(true);
    setResult(null);
  }, [text]);

  const handleImport = useCallback(async () => {
    if (parsed.length === 0) return;
    setImporting(true);
    try {
      const res = await onImport(parsed);
      setResult(res);
      if (res.failed === 0) {
        setText(BULK_IMPORT_TEMPLATE);
        setParsed([]);
        setErrors([]);
        setSkipped(0);
        setParsedOnce(false);
      }
    } finally {
      setImporting(false);
    }
  }, [parsed, onImport]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setText(BULK_IMPORT_TEMPLATE);
    setParsed([]);
    setErrors([]);
    setSkipped(0);
    setParsedOnce(false);
    setResult(null);
  }, []);

  return {
    open,
    setOpen,
    text,
    setText,
    parsed,
    errors,
    skipped,
    parsedOnce,
    importing,
    result,
    t,
    handleParse,
    handleImport,
    handleClose,
  };
}
