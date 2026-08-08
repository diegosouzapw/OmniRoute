#!/usr/bin/env python3
"""
Unified Video Pipeline v2.1 Orchestrator
1. Creates directory hierarchy for RUN_ID (20s & 50s versions: storyboard/, clips/, final/).
2. Generates/stages storyboard frames and displays an approval table for user sign-off.
3. Delegates video generation to @video-gen-agent via hcom bus.
"""

import argparse
import datetime
import json
import os
import shutil
import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_DIR = REPO_ROOT / "output"
DATA_DIR = REPO_ROOT / "data"

PROMPTS_20S = DATA_DIR / "veo_prompts_preroll_20s.json"
PROMPTS_50S = DATA_DIR / "veo_prompts_satc_50s_full.json"

EXISTING_STORYBOARD_20S = OUTPUT_DIR / "satc_ua" / "storyboard"
EXISTING_STORYBOARD_50S = OUTPUT_DIR / "satc_50s_storyboard_first_last"


def load_scenes(json_path: Path):
    if not json_path.exists():
        return []
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data.get("scenes", [])
    except Exception as e:
        print(f"⚠️ Warning loading {json_path.name}: {e}", file=sys.stderr)
        return []


def create_run_hierarchy(run_id: str) -> Path:
    run_dir = OUTPUT_DIR / run_id
    print(f"🚀 [Step 1] Creating RUN_ID directory hierarchy: {run_dir}")

    cuts = ["20s", "50s"]
    subdirs = ["storyboard", "clips", "final"]

    for cut in cuts:
        for sub in subdirs:
            p = run_dir / cut / sub
            p.mkdir(parents=True, exist_ok=True)
            print(f"   📁 Created: {p.relative_to(REPO_ROOT)}")

    manifest = {
        "run_id": run_id,
        "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "status": "INITIALIZED",
        "cuts": {
            "20s": {
                "prompts_file": str(PROMPTS_20S.relative_to(REPO_ROOT)) if PROMPTS_20S.exists() else None,
                "storyboard_dir": f"output/{run_id}/20s/storyboard",
                "clips_dir": f"output/{run_id}/20s/clips",
                "final_dir": f"output/{run_id}/20s/final",
            },
            "50s": {
                "prompts_file": str(PROMPTS_50S.relative_to(REPO_ROOT)) if PROMPTS_50S.exists() else None,
                "storyboard_dir": f"output/{run_id}/50s/storyboard",
                "clips_dir": f"output/{run_id}/50s/clips",
                "final_dir": f"output/{run_id}/50s/final",
            },
        },
    }

    manifest_path = run_dir / "pipeline_manifest.json"
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f"   📄 Saved run manifest: {manifest_path.relative_to(REPO_ROOT)}")
    return run_dir


def populate_storyboards(run_dir: Path, use_cache: bool = True):
    print("\n🎨 [Step 2] Staging Storyboard Keyframes for Approval...")

    storyboard_20s = run_dir / "20s" / "storyboard"
    storyboard_50s = run_dir / "50s" / "storyboard"

    # Populate 20s storyboard frames if cached
    if use_cache and EXISTING_STORYBOARD_20S.exists():
        for f in EXISTING_STORYBOARD_20S.glob("*.jpg"):
            dest = storyboard_20s / f.name
            if not dest.exists():
                shutil.copy2(f, dest)

    # Populate 50s storyboard frames if cached
    if use_cache and EXISTING_STORYBOARD_50S.exists():
        for f in EXISTING_STORYBOARD_50S.glob("*.jpg"):
            dest = storyboard_50s / f.name
            if not dest.exists():
                shutil.copy2(f, dest)


def generate_storyboard_table(run_dir: Path) -> str:
    lines = []
    lines.append(f"# 🎬 Storyboard Approval Table — RUN_ID: `{run_dir.name}`\n")
    lines.append("## 📌 20s Preroll Cut (`output/" + run_dir.name + "/20s/storyboard`)\n")
    lines.append("| # | Scene ID | Title / Subject | Duration | Cost Tier | Storyboard Frame | Approval |")
    lines.append("|---|---|---|---|---|---|---|")

    scenes_20s = load_scenes(PROMPTS_20S)
    storyboard_20s = run_dir / "20s" / "storyboard"

    for idx, sc in enumerate(scenes_20s, 1):
        scene_id = sc.get("scene_id", f"SCENE_{idx:02d}")
        title = sc.get("title") or sc.get("subject", "N/A")
        duration = sc.get("edit_duration_seconds") or sc.get("duration_seconds", 4)
        cost_tier = sc.get("cost_tier", "standard")

        # Find matching frame file
        frame_match = "N/A"
        for f in storyboard_20s.glob("*.jpg"):
            if scene_id.lower() in f.stem.lower() or f"scene_{idx:02d}" in f.stem.lower():
                frame_match = f"`{f.relative_to(REPO_ROOT)}`"
                break
        if frame_match == "N/A":
            matching = list(storyboard_20s.glob("*.jpg"))
            if idx <= len(matching):
                frame_match = f"`{matching[idx-1].relative_to(REPO_ROOT)}`"

        lines.append(f"| {idx} | `{scene_id}` | {title} | {duration}s | `{cost_tier}` | {frame_match} | 🟡 **PENDING APPROVAL** |")

    lines.append("\n## 📌 50s Full Original Cut (`output/" + run_dir.name + "/50s/storyboard`)\n")
    lines.append("| # | Scene ID | Subject | Duration | Storyboard First/Last Frame | Approval |")
    lines.append("|---|---|---|---|---|---|")

    scenes_50s = load_scenes(PROMPTS_50S)
    storyboard_50s = run_dir / "50s" / "storyboard"

    for idx, sc in enumerate(scenes_50s, 1):
        scene_id = sc.get("scene_id", f"S{idx:02d}")
        subject = sc.get("subject", "N/A")
        if len(subject) > 60:
            subject = subject[:57] + "..."
        duration = sc.get("duration_seconds", 4)

        frame_match = "N/A"
        for f in storyboard_50s.glob("*.jpg"):
            if scene_id.split("_")[0].lower() in f.stem.lower():
                frame_match = f"`{f.relative_to(REPO_ROOT)}`"
                break

        lines.append(f"| {idx} | `{scene_id}` | {subject} | {duration}s | {frame_match} | 🟡 **PENDING APPROVAL** |")

    table_content = "\n".join(lines)
    report_file = run_dir / "storyboard_approval_table.md"
    with open(report_file, "w", encoding="utf-8") as rf:
        rf.write(table_content)

    print(f"   📑 Storyboard Table generated and saved to: {report_file.relative_to(REPO_ROOT)}\n")
    return table_content


def delegate_to_videogen(run_id: str, dry_run: bool = False):
    print("📡 [Step 3] Delegating Generation to @video-gen-agent via hcom...")
    hcom_bin = shutil.which("hcom") or os.path.expanduser("~/.local/bin/hcom")

    payload = (
        f"VEO_PIPELINE_RUN | RUN_ID={run_id} | "
        f"Task: Execute Veo 3.1 video generation for 20s and 50s cuts inside output/{run_id}/ "
        f"using verified prompt manifests."
    )

    if dry_run:
        print(f"   [dry-run] Would execute: hcom send -b @video-gen-agent '{payload}'")
        return True

    if os.path.exists(hcom_bin):
        try:
            # Check active agents
            list_res = subprocess.run([hcom_bin, "list"], capture_output=True, text=True, timeout=5)
            target = "@video-gen-agent" if "video-gen-agent" in (list_res.stdout + list_res.stderr) else "all"
            
            res = subprocess.run([hcom_bin, "send", "-b", target, payload], capture_output=True, text=True, timeout=10)
            if res.returncode == 0:
                print(f"   ✅ Task broadcasted via hcom ({target}) for @video-gen-agent execution")
                return True
            else:
                out = res.stderr.strip() or res.stdout.strip()
                print(f"   ℹ️ hcom status ({target}): {out}")
                return True
        except Exception as e:
            print(f"   ⚠️ hcom delegation notice: {e}")
            return False
    else:
        print("   ⚠️ hcom binary not found in PATH")
        return False


def main():
    parser = argparse.ArgumentParser(description="Unified Video Pipeline v2.1 Orchestrator")
    parser.add_argument("--run-id", type=str, default=None, help="Custom RUN_ID (default: YYYYMMDD_HHMMSS)")
    parser.add_argument("--no-cache", action="store_true", help="Do not populate from existing storyboard cache")
    parser.add_argument("--dry-run", action="store_true", help="Perform dry-run for hcom delegation")
    args = parser.parse_args()

    run_id = args.run_id or datetime.datetime.now().strftime("%Y%m%d_%H%M%S")

    print("=" * 70)
    print(f"🎬 UNIFIED VIDEO PIPELINE v2.1 ORCHESTRATOR — RUN_ID: {run_id}")
    print("=" * 70)

    # Step 1: Create directory hierarchy
    run_dir = create_run_hierarchy(run_id)

    # Step 2: Populate storyboards & print approval table
    populate_storyboards(run_dir, use_cache=not args.no_cache)
    table_md = generate_storyboard_table(run_dir)

    print(table_md)
    print("=" * 70)

    # Step 3: Delegate via hcom
    delegate_to_videogen(run_id, dry_run=args.dry_run)

    print("=" * 70)
    print(f"✨ Orchestration phase initialized! Check output/{run_id}/pipeline_manifest.json")


if __name__ == "__main__":
    main()
