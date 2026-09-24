"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { PoolVisibilityMember, PoolVisibilityPayload } from "./proxyRegistryTypes";

type MemberEgress = {
  host: string;
  port: number;
  egressIp: string | null;
  at: string | null;
};

type MemberEgressBody = {
  windowHours: number;
  members: MemberEgress[];
};

function loadMemberEgress(
  query: string,
  setLoaded: (loaded: { query: string; body: MemberEgressBody | null }) => void,
  isCancelled: () => boolean
): void {
  fetch(`/api/settings/proxies/pool/member-egress?${query}`)
    .then((res) => (res.ok ? res.json() : null))
    .then((body: unknown) => {
      if (!isCancelled()) setLoaded({ query, body: isMemberEgressBody(body) ? body : null });
    })
    .catch(() => {
      if (!isCancelled()) setLoaded({ query, body: null });
    });
}

function loadPoolVisibility(
  query: string,
  setVisibility: (payload: PoolVisibilityPayload | null) => void,
  isCancelled: () => boolean
): void {
  fetch(`/api/admin/proxy-pool-visibility?${query}`)
    .then((res) => (res.ok ? res.json() : null))
    .then((payload: unknown) => {
      if (isCancelled()) return;
      setVisibility(parseVisibilityPayload(payload));
    })
    .catch(() => {
      if (isCancelled()) return;
      setVisibility(null);
    });
}

function parseVisibilityPayload(payload: unknown): PoolVisibilityPayload | null {
  const record = payload as { members?: unknown };
  if (record && Array.isArray(record.members)) return payload as PoolVisibilityPayload;
  return null;
}

function findVisibleMember(
  visibility: PoolVisibilityPayload | null,
  proxyId: string | null | undefined
): PoolVisibilityMember | undefined {
  if (!proxyId) return undefined;
  return visibility?.members.find((m) => m.id === proxyId);
}

function formatSetAsideNote(
  t: (key: string, params?: Record<string, string | number>) => string,
  member: PoolVisibilityMember
): string {
  if (member.signal !== "set-aside" || !member.setAside) return "";
  const reason = t("poolSetAsideReason", { kind: member.setAside.kind });
  const until = t("poolSetAsideUntil", { endsAt: member.setAside.endsAt });
  const repeat = t("poolSetAsideRepeat", { count: member.setAside.streak });
  return ` · ${reason} ${until} ${repeat}`;
}

function isMemberEgressBody(value: unknown): value is MemberEgressBody {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  if (typeof record.windowHours !== "number" || !Array.isArray(record.members)) return false;
  return record.members.every(
    (member) =>
      !!member &&
      typeof member === "object" &&
      typeof (member as Record<string, unknown>).host === "string" &&
      typeof (member as Record<string, unknown>).port === "number" &&
      (typeof (member as Record<string, unknown>).egressIp === "string" ||
        (member as Record<string, unknown>).egressIp === null) &&
      (typeof (member as Record<string, unknown>).at === "string" ||
        (member as Record<string, unknown>).at === null)
  );
}

/**
 * One line per pool member under the pool editor: the last egress IP observed through
 * that member's (host, port) over the window. Renders nothing when the observation is
 * off, failed, or the request itself errored; a member with no traffic in the window
 * renders the "no traffic" line instead of being hidden.
 */
export function PoolMemberEgressLines({ query }: { query: string }) {
  const [visibility, setVisibility] = useState<PoolVisibilityPayload | null>(null);
  const t = useTranslations("proxyRegistry");
  const [loaded, setLoaded] = useState<{ query: string; body: MemberEgressBody | null }>({
    query: "",
    body: null,
  });

  useEffect(() => {
    let cancelled = false;
    const isCancelled = () => cancelled;
    loadMemberEgress(query, (loaded) => setLoaded(loaded), isCancelled);
    loadPoolVisibility(query, (payload) => setVisibility(payload), isCancelled);
    return () => {
      cancelled = true;
    };
  }, [query]);

  const body = loaded.query === query ? loaded.body : null;

  const rankNote = (proxyId: string | null | undefined): string => {
    const visible = findVisibleMember(visibility, proxyId);
    if (!visible) return "";
    return ` #${visible.rank} · ${t("poolPreferenceOrder")}${formatSetAsideNote(t, visible)}`;
  };

  if (!body) {
    if (!visibility) return null;
    return (
      <div className="flex flex-col gap-1" data-testid="proxy-registry-pool-member-egress">
        {visibility.members.map((member) => (
          <p
            key={member.id ?? member.display ?? member.rank}
            className="text-xs text-text-muted"
            title={t("poolSinceRestart")}
          >
            {member.display ?? t("poolUnknownAddress")}
            {rankNote(member.id)}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1" data-testid="proxy-registry-pool-member-egress">
      {body.members.map((member) => (
        <p
          key={`${member.host}:${member.port}`}
          className="text-xs text-text-muted"
          title={t("poolMemberEgressHint")}
        >
          {member.egressIp
            ? t("poolMemberEgress", {
                host: member.host,
                port: member.port,
                egressIp: member.egressIp,
                hours: body.windowHours,
              })
            : t("poolMemberEgressEmpty", {
                host: member.host,
                port: member.port,
                hours: body.windowHours,
              })}
        </p>
      ))}
      {visibility?.members.map((member) => (
        <p
          key={`vis-${member.id ?? member.display ?? member.rank}`}
          className="text-xs text-text-muted"
          title={t("poolSinceRestart")}
        >
          {member.display ?? t("poolUnknownAddress")}
          {rankNote(member.id)}
        </p>
      ))}
    </div>
  );
}
