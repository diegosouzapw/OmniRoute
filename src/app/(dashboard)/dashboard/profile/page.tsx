"use client";

import { useState, useEffect, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Card, Badge } from "@/shared/components";
import { cumulativeXpForLevel, getLevelTier, getLevelTitle } from "@/lib/gamification/xp";

interface UserLevel {
  apiKeyId: string;
  totalXp: number;
  currentLevel: number;
  updatedAt: string;
}

interface BadgeDef {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  rarity: string;
  criteria: string | null;
  hidden: number;
  createdAt: string;
}

interface UserBadge {
  apiKeyId: string;
  badgeId: string;
  unlockedAt: string;
  badgeName?: string;
  badgeDescription?: string | null;
  badgeIcon?: string | null;
  badgeCategory?: string | null;
  badgeRarity?: string;
}

const TIER_CONFIG: Record<string, { labelKey: string; color: string; bg: string }> = {
  bronze: { labelKey: "tiers.bronze", color: "text-amber-600", bg: "bg-amber-600/10" },
  silver: { labelKey: "tiers.silver", color: "text-gray-300", bg: "bg-gray-300/10" },
  gold: { labelKey: "tiers.gold", color: "text-yellow-400", bg: "bg-yellow-400/10" },
  platinum: { labelKey: "tiers.platinum", color: "text-cyan-300", bg: "bg-cyan-300/10" },
  diamond: { labelKey: "tiers.diamond", color: "text-violet-400", bg: "bg-violet-400/10" },
};

const BADGE_ICONS: Record<string, string> = {
  sparkles: "auto_awesome",
  zap: "bolt",
  cpu: "memory",
  whale: "water",
  gift: "redeem",
  heart: "favorite",
  santa: "celebration",
  trophy: "emoji_events",
  compass: "explore",
  languages: "translate",
  blocks: "widgets",
  gauge: "speed",
  shield: "shield",
  flame: "local_fire_department",
  sword: "swords",
  crown: "workspace_premium",
  infinity: "all_inclusive",
  rocket: "rocket_launch",
  bug: "bug_report",
  "git-merge": "merge",
  medal: "military_tech",
  question: "help",
};

function BadgeIcon({ icon, earned }: { icon: string | null; earned: boolean }) {
  const materialIcon = icon ? BADGE_ICONS[icon] : null;
  return materialIcon ? (
    <span className="material-symbols-outlined text-[32px]" aria-hidden="true">
      {materialIcon}
    </span>
  ) : (
    <span aria-hidden="true">{earned ? "🏅" : "🔒"}</span>
  );
}

const RARITY_COLORS: Record<string, string> = {
  common: "text-gray-400 border-gray-500/30",
  uncommon: "text-green-400 border-green-500/30",
  rare: "text-blue-400 border-blue-500/30",
  epic: "text-purple-400 border-purple-500/30",
  legendary: "text-amber-400 border-amber-500/30",
};

export default function ProfilePage() {
  const t = useTranslations("common");
  const tg = useTranslations("gamification");
  const locale = useLocale();
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null);
  const [allBadges, setAllBadges] = useState<BadgeDef[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedBadge, setSelectedBadge] = useState<BadgeDef | null>(null);
  const [streak] = useState(0); // streak data comes from future API

  const fetchData = useCallback(async () => {
    try {
      const [levelRes, badgesRes, earnedRes] = await Promise.all([
        fetch("/api/gamification/level"),
        fetch("/api/gamification/badges"),
        fetch("/api/gamification/badges/earned"),
      ]);

      if (!levelRes.ok && !badgesRes.ok && !earnedRes.ok) {
        throw new Error(tg("profileLoadFailed"));
      }

      if (levelRes.ok) {
        const data = await levelRes.json();
        setUserLevel(data.level ?? data);
      }
      if (badgesRes.ok) {
        const data = await badgesRes.json();
        setAllBadges(data.badges ?? data ?? []);
      }
      if (earnedRes.ok) {
        const data = await earnedRes.json();
        setEarnedBadges(data.badges ?? data ?? []);
      }
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : tg("profileLoadFailed"));
    } finally {
      setLoading(false);
    }
  }, [tg]);

  useEffect(() => {
    const loadTimer = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => window.clearTimeout(loadTimer);
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-text-muted">{t("profileLoading")}</div>
      </div>
    );
  }

  const level = userLevel?.currentLevel ?? 1;
  const totalXp = userLevel?.totalXp ?? 0;
  const currentLevelCumulative = cumulativeXpForLevel(level);
  const nextLevelCumulative = cumulativeXpForLevel(level + 1);
  const xpInCurrentLevel = totalXp - currentLevelCumulative;
  const xpForNext = nextLevelCumulative - currentLevelCumulative;
  const xpProgress = xpForNext > 0 ? (xpInCurrentLevel / xpForNext) * 100 : 0;
  const tier = getLevelTier(level);
  const tierConfig = TIER_CONFIG[tier] || TIER_CONFIG.bronze;
  const earnedIds = new Set(earnedBadges.map((b) => b.badgeId));
  const translateBadge = (badge: BadgeDef, field: "name" | "description" | "criteria") => {
    const key = `badges.${badge.id}.${field}`;
    const fallback = field === "name" ? badge.name : badge.description || "";
    return tg.has(key) ? tg(key) : fallback;
  };
  const translateRarity = (rarity: string) => {
    const key = `rarities.${rarity}`;
    return tg.has(key) ? tg(key) : rarity;
  };
  const translateCategory = (category: string) => {
    const key = `categories.${category}`;
    return tg.has(key) ? tg(key) : category;
  };

  return (
    <div className="flex flex-col gap-6">
      {error && <div className="p-3 rounded-lg bg-red-500/10 text-red-400 text-sm">{error}</div>}

      {/* Level & XP Card */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black ${tierConfig.bg} ${tierConfig.color}`}
            >
              {level}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {tg(`levelTitles.${getLevelTitle(level).toLowerCase()}`)}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className={`${tierConfig.bg} ${tierConfig.color} border-0`}>
                  {tg("tierLabel", { tier: tg(tierConfig.labelKey) })}
                </Badge>
                {streak > 0 && (
                  <span className="text-sm text-orange-400 flex items-center gap-1">
                    🔥 {tg("dayStreak", { count: streak })}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-text-muted">
                {tg("levelProgress", { current: level, next: level + 1 })}
              </span>
              <span className="text-text-muted">
                {xpInCurrentLevel.toLocaleString()} / {xpForNext.toLocaleString()} XP
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-border overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
                style={{ width: `${Math.min(xpProgress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-text-muted mt-1">
              {tg("totalXpEarned", { count: totalXp.toLocaleString() })}
            </p>
          </div>
        </div>
      </Card>

      {/* Streak display */}
      {streak > 0 && (
        <Card>
          <div className="flex items-center gap-4">
            <div className="text-5xl">🔥</div>
            <div>
              <p className="text-2xl font-bold">{tg("dayStreak", { count: streak })}</p>
              <p className="text-sm text-text-muted">{tg("maintainStreak")}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Badges Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4">
          {tg("badgesTitle", { earned: earnedBadges.length, total: allBadges.length })}
        </h3>

        {allBadges.length === 0 ? (
          <Card>
            <div className="text-center py-12 text-text-muted">{tg("noBadges")}</div>
          </Card>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {allBadges.map((badge) => {
              const isEarned = earnedIds.has(badge.id);
              const earnedInfo = earnedBadges.find((b) => b.badgeId === badge.id);
              const rarityColor = RARITY_COLORS[badge.rarity] || RARITY_COLORS.common;

              return (
                <button
                  key={badge.id}
                  onClick={() => setSelectedBadge(badge)}
                  className={`relative p-4 rounded-xl border transition-all text-left ${
                    isEarned
                      ? `${rarityColor} bg-surface hover:shadow-md`
                      : "border-border/50 bg-surface/50 opacity-50 grayscale hover:opacity-70"
                  }`}
                >
                  <div className="text-3xl mb-2">
                    <BadgeIcon icon={badge.icon} earned={isEarned} />
                  </div>
                  <p className="font-semibold text-sm truncate">
                    {badge.hidden && !isEarned ? "???" : translateBadge(badge, "name")}
                  </p>
                  <p className="text-xs text-text-muted mt-1 line-clamp-2">
                    {badge.hidden && !isEarned
                      ? tg("hiddenBadge")
                      : translateBadge(badge, "description")}
                  </p>
                  {isEarned && earnedInfo?.unlockedAt && (
                    <p className="text-[10px] text-text-muted mt-2">
                      {tg("earnedDate", {
                        date: new Date(earnedInfo.unlockedAt).toLocaleDateString(locale),
                      })}
                    </p>
                  )}
                  {!isEarned && badge.criteria && (
                    <div className="mt-2">
                      <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                        <div className="h-full w-0 rounded-full bg-violet-500/50" />
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Badge Detail Modal */}
      {selectedBadge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-surface border border-border rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">
                  <BadgeIcon icon={selectedBadge.icon} earned={earnedIds.has(selectedBadge.id)} />
                </span>
                <div>
                  <h2 className="text-lg font-semibold">{translateBadge(selectedBadge, "name")}</h2>
                  <span
                    className={`text-xs px-2 py-0.5 rounded ${RARITY_COLORS[selectedBadge.rarity] || RARITY_COLORS.common} bg-surface`}
                  >
                    {translateRarity(selectedBadge.rarity)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="text-text-muted hover:text-text-main text-xl"
                aria-label={t("close")}
              >
                ×
              </button>
            </div>

            {selectedBadge.description && (
              <p className="text-sm text-text-muted mb-4">
                {translateBadge(selectedBadge, "description")}
              </p>
            )}

            {selectedBadge.category && (
              <p className="text-xs text-text-muted mb-2">
                {tg("category")}:{" "}
                <span className="text-text-main">{translateCategory(selectedBadge.category)}</span>
              </p>
            )}

            {selectedBadge.criteria && (
              <div className="p-3 rounded-lg bg-surface/50 border border-border/50">
                <p className="text-xs font-medium text-text-muted mb-1">{t("profileHowToEarn")}</p>
                <p className="text-sm">{translateBadge(selectedBadge, "criteria")}</p>
              </div>
            )}

            {earnedIds.has(selectedBadge.id) && (
              <div className="mt-4 p-3 rounded-lg bg-emerald-500/10 text-emerald-400 text-sm">
                ✓{" "}
                {tg("earnedOn", {
                  date: new Date(
                    earnedBadges.find((b) => b.badgeId === selectedBadge.id)?.unlockedAt || ""
                  ).toLocaleDateString(locale),
                })}
              </div>
            )}

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedBadge(null)}
                className="px-4 py-2 text-sm rounded-lg border border-border text-text-muted hover:text-text-main transition-colors"
              >
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
