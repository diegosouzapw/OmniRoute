"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, Toggle } from "@/shared/components";
import { cn } from "@/shared/utils/cn";
import { useTranslations } from "next-intl";
import {
  HIDDEN_SIDEBAR_ITEMS_SETTING_KEY,
  SIDEBAR_SECTION_ORDER_KEY,
  SIDEBAR_ITEM_ORDER_KEY,
  SIDEBAR_PRESET_KEY,
  SIDEBAR_SETTINGS_UPDATED_EVENT,
  SIDEBAR_SECTIONS,
  SIDEBAR_PRESETS,
  applySectionOrder,
  applyItemOrder,
  getSectionItems,
  normalizeHiddenSidebarItems,
  type HideableSidebarItemId,
  type SidebarSectionId,
  type SidebarItemOrder,
  type SidebarPresetId,
  type SidebarSectionDefinition,
  type SidebarSectionChild,
  type SidebarItemDefinition,
  type SidebarItemGroup,
} from "@/shared/constants/sidebarVisibility";

// ─── Sortable section row ──────────────────────────────────────────────────────

interface SortableSectionProps {
  section: SidebarSectionDefinition & { title: string };
  hiddenSet: Set<HideableSidebarItemId>;
  itemOrder: string[];
  onToggleItem: (id: HideableSidebarItemId) => void;
  onItemReorder: (sectionId: SidebarSectionId, newOrder: string[]) => void;
  getLabel: (key: string, fallback: string) => string;
}

function SortableSection({
  section,
  hiddenSet,
  itemOrder,
  onToggleItem,
  onItemReorder,
  getLabel,
}: SortableSectionProps) {
  const tSidebar = useTranslations("sidebar");
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const [expanded, setExpanded] = useState(true);

  const allChildren = section.children as SidebarSectionChild[];
  const getChildId = (c: SidebarSectionChild) =>
    "type" in c && c.type === "group" ? c.id : (c as SidebarItemDefinition).id;

  const orderedChildren = applyItemOrder(allChildren, itemOrder);
  const childIds = orderedChildren.map(getChildId);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleItemDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = childIds.indexOf(active.id as string);
    const newIdx = childIds.indexOf(over.id as string);
    if (oldIdx === -1 || newIdx === -1) return;
    onItemReorder(section.id as SidebarSectionId, arrayMove(childIds, oldIdx, newIdx));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "rounded-lg border border-border bg-surface/40 transition-shadow",
        isDragging && "shadow-lg opacity-80"
      )}
    >
      {/* Section header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/70">
        <button
          {...listeners}
          {...attributes}
          className="text-text-muted/40 hover:text-text-muted/80 cursor-grab active:cursor-grabbing touch-none shrink-0"
          title={tSidebar("dragReorderSection")}
          aria-label={tSidebar("dragReorderSection")}
        >
          <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
        </button>
        <button
          onClick={() => setExpanded((p) => !p)}
          className="flex-1 flex items-center gap-2 text-left"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted/70">
            {section.title}
          </span>
          <span
            className={cn(
              "material-symbols-outlined text-[14px] text-text-muted/40 transition-transform ml-auto",
              expanded && "rotate-180"
            )}
          >
            expand_more
          </span>
        </button>
      </div>

      {/* Section children with inner DnD */}
      {expanded && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleItemDragEnd}
        >
          <SortableContext items={childIds} strategy={verticalListSortingStrategy}>
            <div className="divide-y divide-border/70">
              {orderedChildren.map((child) => {
                if ("type" in child && child.type === "group") {
                  const group = child as SidebarItemGroup;
                  return (
                    <SortableChildRow key={group.id} id={group.id}>
                      <GroupRow
                        group={group}
                        hiddenSet={hiddenSet}
                        onToggleItem={onToggleItem}
                        getLabel={getLabel}
                      />
                    </SortableChildRow>
                  );
                }
                const item = child as SidebarItemDefinition;
                return (
                  <SortableChildRow key={item.id} id={item.id}>
                    <ItemRow
                      item={item}
                      hiddenSet={hiddenSet}
                      onToggleItem={onToggleItem}
                      getLabel={getLabel}
                    />
                  </SortableChildRow>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}

// ─── Sortable child row wrapper ────────────────────────────────────────────────

function SortableChildRow({ id, children }: { id: string; children: React.ReactNode }) {
  const tSidebar = useTranslations("sidebar");
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id,
  });
  const style = { transform: CSS.Transform.toString(transform), transition };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn("flex items-start gap-2", isDragging && "opacity-60")}
    >
      <button
        {...listeners}
        {...attributes}
        className="mt-3.5 ml-4 text-text-muted/30 hover:text-text-muted/70 cursor-grab active:cursor-grabbing touch-none shrink-0"
        title={tSidebar("dragReorderItem")}
        aria-label={tSidebar("dragReorderItem")}
      >
        <span className="material-symbols-outlined text-[14px]">drag_indicator</span>
      </button>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

// ─── Item row ─────────────────────────────────────────────────────────────────

interface ItemRowProps {
  item: SidebarItemDefinition;
  hiddenSet: Set<HideableSidebarItemId>;
  onToggleItem: (id: HideableSidebarItemId) => void;
  getLabel: (key: string, fallback: string) => string;
}

// Items that must always remain visible (safety guard)
const PROTECTED_ITEM_IDS = new Set(["settings-sidebar"]);

function ItemRow({ item, hiddenSet, onToggleItem, getLabel }: ItemRowProps) {
  const tSidebar = useTranslations("sidebar");
  const isProtected = PROTECTED_ITEM_IDS.has(item.id);
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <div className="flex items-center gap-2 min-w-0">
        <span className="material-symbols-outlined text-[16px] text-text-muted/50 shrink-0">
          {item.icon}
        </span>
        <p className="font-medium truncate">{getLabel(item.i18nKey, item.id)}</p>
      </div>
      {isProtected ? (
        <span
          className="material-symbols-outlined text-[16px] text-text-muted/40"
          title={tSidebar("cannotHide")}
          aria-label={tSidebar("alwaysVisible")}
        >
          lock
        </span>
      ) : (
        <Toggle checked={!hiddenSet.has(item.id)} onChange={() => onToggleItem(item.id)} />
      )}
    </div>
  );
}

// ─── Group row (items inside group, no sub-DnD) ───────────────────────────────

interface GroupRowProps {
  group: SidebarItemGroup;
  hiddenSet: Set<HideableSidebarItemId>;
  onToggleItem: (id: HideableSidebarItemId) => void;
  getLabel: (key: string, fallback: string) => string;
}

function GroupRow({ group, hiddenSet, onToggleItem, getLabel }: GroupRowProps) {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full">
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-4 py-2.5 w-full text-left hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
      >
        <span
          className={cn(
            "material-symbols-outlined text-[12px] text-text-muted/40 transition-transform",
            open && "rotate-90"
          )}
        >
          chevron_right
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted/50">
          {getLabel(group.titleKey, group.titleFallback)}
        </span>
        <span className="ml-auto text-xs text-text-muted/40">
          {group.items.filter((i) => !hiddenSet.has(i.id)).length}/{group.items.length}
        </span>
      </button>
      {open && (
        <div className="divide-y divide-border/50 pl-2">
          {group.items.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-4 px-4 py-2.5">
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[14px] text-text-muted/40 shrink-0">
                  {item.icon}
                </span>
                <p className="text-sm font-medium truncate">{getLabel(item.i18nKey, item.id)}</p>
              </div>
              <Toggle
                size="sm"
                checked={!hiddenSet.has(item.id)}
                onChange={() => onToggleItem(item.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SidebarTab() {
  const t = useTranslations("settings");
  const tSidebar = useTranslations("sidebar");

  const getLabel = useCallback(
    (key: string, fallback: string) =>
      typeof tSidebar.has === "function" && tSidebar.has(key) ? tSidebar(key) : fallback,
    [tSidebar]
  );
  const getSettingsLabel = useCallback(
    (key: string, fallback: string) =>
      typeof t.has === "function" && t.has(key) ? t(key) : fallback,
    [t]
  );

  const [loading, setLoading] = useState(true);
  const [hiddenSidebarItems, setHiddenSidebarItems] = useState<HideableSidebarItemId[]>([]);
  const [sectionOrder, setSectionOrder] = useState<SidebarSectionId[]>([]);
  const [itemOrder, setItemOrder] = useState<SidebarItemOrder>({});
  const [activePreset, setActivePreset] = useState<SidebarPresetId | null>(null);
  const [confirmPreset, setConfirmPreset] = useState<SidebarPresetId | null>(null);
  const [showDebug, setShowDebug] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setHiddenSidebarItems(
          normalizeHiddenSidebarItems(data?.[HIDDEN_SIDEBAR_ITEMS_SETTING_KEY])
        );
        setSectionOrder(
          Array.isArray(data?.[SIDEBAR_SECTION_ORDER_KEY]) ? data[SIDEBAR_SECTION_ORDER_KEY] : []
        );
        setItemOrder(
          data?.[SIDEBAR_ITEM_ORDER_KEY] && typeof data[SIDEBAR_ITEM_ORDER_KEY] === "object"
            ? data[SIDEBAR_ITEM_ORDER_KEY]
            : {}
        );
        setActivePreset(data?.[SIDEBAR_PRESET_KEY] ?? null);
        setShowDebug(data?.debugMode === true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const patch = async (updates: Record<string, unknown>) => {
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        window.dispatchEvent(new CustomEvent(SIDEBAR_SETTINGS_UPDATED_EVENT, { detail: updates }));
      } else {
        console.error("Failed to update sidebar settings:", res.statusText);
      }
    } catch (err) {
      console.error("Error updating sidebar settings:", err);
    }
  };

  const toggleItem = (id: HideableSidebarItemId) => {
    // Protected items can never be hidden
    if (PROTECTED_ITEM_IDS.has(id)) return;
    const next = hiddenSidebarItems.includes(id)
      ? hiddenSidebarItems.filter((x) => x !== id)
      : [...hiddenSidebarItems, id];
    setHiddenSidebarItems(next);
    // Any manual change → custom mode
    setActivePreset(null);
    patch({ [HIDDEN_SIDEBAR_ITEMS_SETTING_KEY]: next, [SIDEBAR_PRESET_KEY]: null });
  };

  const hiddenSet = new Set(hiddenSidebarItems);

  const visibleSections = SIDEBAR_SECTIONS.filter((s) => s.visibility !== "debug" || showDebug).map(
    (s) => ({ ...s, title: getLabel(s.titleKey, s.titleFallback) })
  );

  const orderedSections = applySectionOrder(visibleSections, sectionOrder);

  const sectionIds = orderedSections.map((s) => s.id);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleSectionDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = sectionIds.indexOf(active.id as SidebarSectionId);
    const newIdx = sectionIds.indexOf(over.id as SidebarSectionId);
    if (oldIdx === -1 || newIdx === -1) return;
    const newOrder = arrayMove(sectionIds, oldIdx, newIdx) as SidebarSectionId[];
    setSectionOrder(newOrder);
    setActivePreset(null);
    patch({ [SIDEBAR_SECTION_ORDER_KEY]: newOrder, [SIDEBAR_PRESET_KEY]: null });
  };

  const handleItemReorder = (sectionId: SidebarSectionId, newOrder: string[]) => {
    const next = { ...itemOrder, [sectionId]: newOrder };
    setItemOrder(next);
    setActivePreset(null);
    patch({ [SIDEBAR_ITEM_ORDER_KEY]: next, [SIDEBAR_PRESET_KEY]: null });
  };

  const applyPreset = (presetId: SidebarPresetId) => {
    const preset = SIDEBAR_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    // Ensure protected items are never hidden, even if a preset includes them
    const safeHidden = preset.hiddenItems.filter((id) => !PROTECTED_ITEM_IDS.has(id));
    setHiddenSidebarItems(safeHidden);
    setSectionOrder([]);
    setItemOrder({});
    setActivePreset(presetId);
    setConfirmPreset(null);
    patch({
      [HIDDEN_SIDEBAR_ITEMS_SETTING_KEY]: safeHidden,
      [SIDEBAR_SECTION_ORDER_KEY]: [],
      [SIDEBAR_ITEM_ORDER_KEY]: {},
      [SIDEBAR_PRESET_KEY]: presetId,
    });
  };

  const resetToDefault = () => applyPreset("all");

  const presetLabels: Record<SidebarPresetId, string> = {
    all: getSettingsLabel("presetAll", "All"),
    minimal: getSettingsLabel("presetMinimal", "Minimal"),
    developer: getSettingsLabel("presetDeveloper", "Developer"),
    admin: getSettingsLabel("presetAdmin", "Admin"),
  };

  const presetDescriptions: Record<SidebarPresetId, string> = {
    all: getSettingsLabel("presetAllDesc", "Show everything"),
    minimal: getSettingsLabel("presetMinimalDesc", "Core pages only"),
    developer: getSettingsLabel("presetDeveloperDesc", "Dev & proxy tools"),
    admin: getSettingsLabel("presetAdminDesc", "Monitoring & audit"),
  };

  return (
    <Card>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-500">
          <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
            view_sidebar
          </span>
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            {getSettingsLabel("settingsSidebarTitle", "Sidebar Customization")}
          </h3>
          <p className="text-sm text-text-muted">
            {getSettingsLabel(
              "settingsSidebarDesc",
              "Control which items appear in the sidebar and their order"
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Presets */}
        <div>
          <div className="mb-3">
            <p className="font-medium">{getSettingsLabel("sidebarPresets", "Presets")}</p>
            <p className="text-sm text-text-muted">
              {getSettingsLabel(
                "sidebarPresetsDesc",
                "Start from a role-based layout. Any change after applying a preset switches to Custom."
              )}
            </p>
          </div>

          {/* Active preset badge */}
          <div className="mb-3 flex items-center gap-2 text-sm">
            <span className="text-text-muted">
              {getSettingsLabel("activePresetLabel", "Active:")}
            </span>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium",
                activePreset
                  ? "bg-primary/10 text-primary"
                  : "bg-surface border border-border text-text-muted"
              )}
            >
              {activePreset
                ? presetLabels[activePreset]
                : getSettingsLabel("presetCustom", "Custom")}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SIDEBAR_PRESETS.map((preset) => {
              const isActive = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  disabled={loading}
                  onClick={() => {
                    if (activePreset === preset.id) return;
                    if (
                      activePreset !== null ||
                      hiddenSidebarItems.length > 0 ||
                      sectionOrder.length > 0
                    ) {
                      setConfirmPreset(preset.id);
                    } else {
                      applyPreset(preset.id);
                    }
                  }}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-3 rounded-lg border transition-colors disabled:opacity-60",
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border hover:border-primary/40 bg-surface/40 text-text-main"
                  )}
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                    aria-hidden="true"
                  >
                    {preset.icon}
                  </span>
                  <span className="text-sm font-semibold">{presetLabels[preset.id]}</span>
                  <span
                    className={cn(
                      "text-[10px] text-center",
                      isActive ? "text-primary/70" : "text-text-muted"
                    )}
                  >
                    {presetDescriptions[preset.id]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Confirm preset dialog */}
          {confirmPreset && (
            <div className="mt-3 p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 flex items-center gap-3">
              <span className="material-symbols-outlined text-amber-500 text-[18px] shrink-0">
                warning
              </span>
              <p className="text-sm flex-1">
                {getSettingsLabel(
                  "presetConfirmWarning",
                  `Applying "${presetLabels[confirmPreset]}" will replace your current visibility and order settings.`
                )}
              </p>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setConfirmPreset(null)}
                  className="px-3 py-1.5 text-sm rounded-md border border-border hover:bg-surface/80 transition-colors"
                >
                  {getSettingsLabel("cancelLabel", "Cancel")}
                </button>
                <button
                  onClick={() => applyPreset(confirmPreset)}
                  className="px-3 py-1.5 text-sm rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  {getSettingsLabel("applyLabel", "Apply")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Visibility & order */}
        <div>
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className="font-medium">
                {getSettingsLabel("sidebarOrder", "Visibility & Order")}
              </p>
              <p className="text-sm text-text-muted">
                {getSettingsLabel(
                  "sidebarOrderDesc",
                  "Toggle items on/off and drag to reorder sections and their entries."
                )}
              </p>
            </div>
            <button
              onClick={resetToDefault}
              disabled={loading}
              className="shrink-0 text-sm text-text-muted hover:text-text-main border border-border rounded-md px-3 py-1.5 hover:bg-surface/80 transition-colors disabled:opacity-50"
            >
              {getSettingsLabel("resetDefault", "Reset to default")}
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleSectionDragEnd}
            >
              <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
                {orderedSections.map((section) => (
                  <SortableSection
                    key={section.id}
                    section={section}
                    hiddenSet={hiddenSet}
                    itemOrder={itemOrder[section.id as SidebarSectionId] ?? []}
                    onToggleItem={toggleItem}
                    onItemReorder={handleItemReorder}
                    getLabel={getLabel}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>

          <p className="mt-3 text-xs text-text-muted">
            {getSettingsLabel(
              "sidebarVisibilityHint",
              "A sidebar section hides automatically when all of its entries are hidden"
            )}
          </p>
        </div>
      </div>
    </Card>
  );
}
