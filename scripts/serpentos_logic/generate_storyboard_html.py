#!/usr/bin/env python3
"""
Generate a rich, interactive Storyboard Approval Gallery HTML for a RUN_ID directory.
"""

import argparse
import json
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent


def generate_html(run_dir: Path):
    run_id = run_dir.name
    html_path = run_dir / "storyboard_approval.html"

    # Load prompt scenes
    prompts_20s_path = REPO_ROOT / "data" / "veo_prompts_preroll_20s.json"
    prompts_50s_path = REPO_ROOT / "data" / "veo_prompts_satc_50s_full.json"

    scenes_20s = []
    if prompts_20s_path.exists():
        with open(prompts_20s_path, "r", encoding="utf-8") as f:
            scenes_20s = json.load(f).get("scenes", [])

    scenes_50s = []
    if prompts_50s_path.exists():
        with open(prompts_50s_path, "r", encoding="utf-8") as f:
            scenes_50s = json.load(f).get("scenes", [])

    storyboard_20s_dir = run_dir / "20s" / "storyboard"
    storyboard_50s_dir = run_dir / "50s" / "storyboard"

    # Build cards HTML for 20s
    cards_20s_html = []
    for idx, sc in enumerate(scenes_20s, 1):
        scene_id = sc.get("scene_id", f"SCENE_{idx:02d}")
        title = sc.get("title") or sc.get("subject", "N/A")
        duration = sc.get("edit_duration_seconds") or sc.get("duration_seconds", 4)
        cost_tier = sc.get("cost_tier", "standard")
        prompt_text = sc.get("prompt", "")

        # Match frame
        frame_rel = "20s/storyboard/scene_02_start_frame.jpg"
        for f in storyboard_20s_dir.glob("*.jpg"):
            if scene_id.lower() in f.stem.lower() or f"scene_{idx:02d}" in f.stem.lower():
                frame_rel = f"20s/storyboard/{f.name}"
                break
        else:
            matching = sorted(list(storyboard_20s_dir.glob("*.jpg")))
            if idx <= len(matching):
                frame_rel = f"20s/storyboard/{matching[idx-1].name}"

        cards_20s_html.append(f"""
        <div class="card" data-cut="20s">
            <div class="card-image-wrap" onclick="openModal('{frame_rel}', '{scene_id}: {title}')">
                <img src="{frame_rel}" alt="{scene_id}" loading="lazy" />
                <span class="badge badge-{cost_tier}">{cost_tier.upper()}</span>
                <span class="badge badge-time">{duration}s</span>
            </div>
            <div class="card-body">
                <div class="card-header">
                    <span class="scene-id">{scene_id}</span>
                    <span class="status-pending">🟡 PENDING</span>
                </div>
                <h3 class="scene-title">{title}</h3>
                <p class="scene-prompt">{prompt_text[:140]}...</p>
            </div>
        </div>
        """)

    # Build cards HTML for 50s
    cards_50s_html = []
    for idx, sc in enumerate(scenes_50s, 1):
        scene_id = sc.get("scene_id", f"S{idx:02d}")
        subject = sc.get("subject", "N/A")
        duration = sc.get("duration_seconds", 4)
        prompt_text = sc.get("environment", "") + " | " + sc.get("camera", "")

        frame_rel = "50s/storyboard/S01_TITLE_PRESENTATION_LAST.jpg"
        for f in storyboard_50s_dir.glob("*.jpg"):
            if scene_id.split("_")[0].lower() in f.stem.lower():
                frame_rel = f"50s/storyboard/{f.name}"
                break

        cards_50s_html.append(f"""
        <div class="card" data-cut="50s">
            <div class="card-image-wrap" onclick="openModal('{frame_rel}', '{scene_id}: {subject}')">
                <img src="{frame_rel}" alt="{scene_id}" loading="lazy" />
                <span class="badge badge-hero">HBO 1998</span>
                <span class="badge badge-time">{duration}s</span>
            </div>
            <div class="card-body">
                <div class="card-header">
                    <span class="scene-id">{scene_id}</span>
                    <span class="status-pending">🟡 PENDING</span>
                </div>
                <h3 class="scene-title">{subject}</h3>
                <p class="scene-prompt">{prompt_text}</p>
            </div>
        </div>
        """)

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎬 777Ladies Storyboard Approval — {run_id}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <style>
        :root {{
            --bg: #090a0f;
            --surface: #11131c;
            --surface-hover: #181b28;
            --border: #232738;
            --gold: #d4af37;
            --gold-glow: rgba(212, 175, 55, 0.2);
            --text: #f0f2f8;
            --text-muted: #8c93a8;
            --hero-badge: #e11d48;
            --std-badge: #3b82f6;
        }}
        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}
        body {{
            background-color: var(--bg);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            min-height: 100vh;
            padding-bottom: 80px;
        }}
        header {{
            background: linear-gradient(180deg, rgba(17, 19, 28, 0.95) 0%, rgba(9, 10, 15, 0.8) 100%);
            border-bottom: 1px solid var(--border);
            padding: 28px 40px;
            position: sticky;
            top: 0;
            z-index: 100;
            backdrop-filter: blur(16px);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }}
        .brand {{
            display: flex;
            align-items: center;
            gap: 16px;
        }}
        .brand-logo {{
            font-family: 'Cinzel', serif;
            font-size: 24px;
            font-weight: 700;
            color: var(--gold);
            letter-spacing: 2px;
            text-shadow: 0 0 20px var(--gold-glow);
        }}
        .run-tag {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            background: rgba(212, 175, 55, 0.1);
            color: var(--gold);
            border: 1px solid rgba(212, 175, 55, 0.3);
            padding: 4px 10px;
            border-radius: 6px;
        }}
        .tabs {{
            display: flex;
            gap: 8px;
            background: var(--surface);
            padding: 6px;
            border-radius: 12px;
            border: 1px solid var(--border);
        }}
        .tab-btn {{
            background: transparent;
            border: none;
            color: var(--text-muted);
            padding: 8px 18px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }}
        .tab-btn.active {{
            background: var(--gold);
            color: #000;
            box-shadow: 0 0 16px var(--gold-glow);
        }}
        .actions {{
            display: flex;
            gap: 12px;
        }}
        .btn-approve {{
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: #fff;
            border: none;
            padding: 10px 22px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
            transition: transform 0.15s;
        }}
        .btn-approve:hover {{
            transform: translateY(-1px);
        }}
        .container {{
            max-width: 1520px;
            margin: 40px auto;
            padding: 0 40px;
        }}
        .section-header {{
            margin-bottom: 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }}
        .section-title {{
            font-family: 'Cinzel', serif;
            font-size: 22px;
            color: #fff;
            letter-spacing: 1px;
        }}
        .grid {{
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
            gap: 24px;
            margin-bottom: 56px;
        }}
        .card {{
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 16px;
            overflow: hidden;
            transition: all 0.25s;
            display: flex;
            flex-direction: column;
        }}
        .card:hover {{
            transform: translateY(-4px);
            border-color: rgba(212, 175, 55, 0.5);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }}
        .card-image-wrap {{
            position: relative;
            aspect-ratio: 16 / 9;
            background: #000;
            cursor: zoom-in;
            overflow: hidden;
        }}
        .card-image-wrap img {{
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }}
        .card-image-wrap:hover img {{
            transform: scale(1.05);
        }}
        .badge {{
            position: absolute;
            top: 12px;
            padding: 4px 10px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.5px;
            backdrop-filter: blur(8px);
        }}
        .badge-hero {{
            left: 12px;
            background: rgba(225, 29, 72, 0.85);
            color: #fff;
        }}
        .badge-standard {{
            left: 12px;
            background: rgba(59, 130, 246, 0.85);
            color: #fff;
        }}
        .badge-time {{
            right: 12px;
            background: rgba(0, 0, 0, 0.75);
            color: var(--gold);
            border: 1px solid rgba(212, 175, 55, 0.3);
        }}
        .card-body {{
            padding: 20px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
        }}
        .card-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }}
        .scene-id {{
            font-family: 'JetBrains Mono', monospace;
            font-size: 13px;
            font-weight: 600;
            color: var(--gold);
        }}
        .status-pending {{
            font-size: 12px;
            color: #facc15;
            font-weight: 600;
        }}
        .scene-title {{
            font-size: 16px;
            font-weight: 600;
            color: #fff;
            margin-bottom: 10px;
            line-height: 1.4;
        }}
        .scene-prompt {{
            font-size: 13px;
            color: var(--text-muted);
            line-height: 1.5;
        }}
        /* Modal Lightbox */
        #modal {{
            display: none;
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 1000;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            backdrop-filter: blur(8px);
        }}
        #modal img {{
            max-width: 85%;
            max-height: 80vh;
            border-radius: 12px;
            box-shadow: 0 0 50px rgba(0,0,0,0.8);
            border: 1px solid var(--border);
        }}
        #modal-caption {{
            margin-top: 16px;
            font-size: 18px;
            font-weight: 600;
            color: var(--gold);
        }}
    </style>
</head>
<body>
    <header>
        <div class="brand">
            <span class="brand-logo">777LADIES</span>
            <span class="run-tag">RUN: {run_id}</span>
        </div>
        <div class="tabs">
            <button class="tab-btn active" onclick="filterCuts('all', this)">All Cuts (21)</button>
            <button class="tab-btn" onclick="filterCuts('20s', this)">20s Preroll (9)</button>
            <button class="tab-btn" onclick="filterCuts('50s', this)">50s Full Cut (12)</button>
        </div>
        <div class="actions">
            <button class="btn-approve" onclick="approveAll()">✅ Approve All Storyboards</button>
        </div>
    </header>

    <div class="container">
        <div id="section-20s" class="cut-section">
            <div class="section-header">
                <h2 class="section-title">🎬 20s Preroll Cut — 9 Keyframes (Imagen 3 / 35mm HBO Style)</h2>
            </div>
            <div class="grid">
                {"".join(cards_20s_html)}
            </div>
        </div>

        <div id="section-50s" class="cut-section">
            <div class="section-header">
                <h2 class="section-title">📽️ 50s Full Original Length Cut — 12 Keyframes</h2>
            </div>
            <div class="grid">
                {"".join(cards_50s_html)}
            </div>
        </div>
    </div>

    <div id="modal" onclick="closeModal()">
        <img id="modal-img" src="" alt="Zoomed Storyboard" />
        <div id="modal-caption"></div>
    </div>

    <script>
        function filterCuts(cut, btn) {{
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const sec20 = document.getElementById('section-20s');
            const sec50 = document.getElementById('section-50s');

            if (cut === 'all') {{
                sec20.style.display = 'block';
                sec50.style.display = 'block';
            }} else if (cut === '20s') {{
                sec20.style.display = 'block';
                sec50.style.display = 'none';
            }} else if (cut === '50s') {{
                sec20.style.display = 'none';
                sec50.style.display = 'block';
            }}
        }}

        function openModal(src, caption) {{
            document.getElementById('modal-img').src = src;
            document.getElementById('modal-caption').textContent = caption;
            document.getElementById('modal').style.display = 'flex';
        }}

        function closeModal() {{
            document.getElementById('modal').style.display = 'none';
        }}

        function approveAll() {{
            document.querySelectorAll('.status-pending').forEach(el => {{
                el.textContent = '🟢 APPROVED';
                el.style.color = '#10b981';
            }});
            alert('✅ Storyboard Keyframes Approved for RUN: {run_id}! Ready for Veo 3.1 video generation.');
        }}
    </script>
</body>
</html>
"""

    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"✅ Generated interactive HTML gallery: {html_path}")
    return html_path


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--run-dir", default="output/20260710_053000")
    args = parser.parse_args()
    generate_html(REPO_ROOT / args.run_dir)
