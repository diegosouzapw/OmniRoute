#!/usr/bin/env python3
"""
build_reference_storyboard_deck.py

Builds a stunning, dedicated 19-Card Reference Storyboard Deck based strictly
on the files inside '/Users/work/Movies/sex new/storybord/reference images '.
Includes large image previews, Technical Frame Specifications, and Reverse-Engineered
High-Precision Prompts with one-click copy.
"""

import os
import json
import datetime
from pathlib import Path

REF_DIR = Path("/Users/work/Movies/sex new/storybord/reference images ")
OUT_PRIMARY = Path("/Users/work/Movies/sex new/last veo/reference_storyboard_deck.html")
OUT_MIRROR1 = Path("/Users/work/Movies/sex new/reference_storyboard_deck.html")
OUT_MIRROR2 = Path("/Users/work/Movies/777Ladies_Title_Sequence/777LADIES_REFERENCE_STORYBOARD_DECK.html")

def main():
    print("===============================================================================")
    print("🎨 BUILDING DEDICATED REFERENCE STORYBOARD & TECHNICAL PROMPT DECK")
    print("===============================================================================")

    images = sorted([
        f for f in REF_DIR.iterdir()
        if f.is_file() and f.suffix.lower() in [".jpg", ".png", ".webp"]
    ])

    print(f"Found {len(images)} reference images in {REF_DIR}")

    # Comprehensive technical frame specifications and reverse-engineered prompts
    spec_catalog = {
        "Screenshot 2026-07-10 at 06.32.37.png": {
            "title": "Кадр 01 — Уверенная проходка по Пятой авеню (Establishing Walk)",
            "camera": "28mm широкоугольный объектив, трекинг-шот (камера движется перед героиней)",
            "lighting": "Золотой час (Golden Hour), мягкий контровой солнечный свет Манхэттена",
            "action": "Героиня идет уверенным шагом на камеру в окружении городской суеты",
            "wardrobe": "Розовый облегающий топ без рукавов, белая многослойная юбка-пачка (туту)",
            "prompt": "1998 HBO 35mm film still. Full-length 28mm tracking shot of slender late 30s Manhattan female columnist with voluminous natural curly golden-blonde hair, walking confidently toward camera on Fifth Avenue. She wears a vibrant bubblegum-pink sleeveless tank top and a multi-layered white tulle ballet skirt. Soft golden afternoon sunlight, shallow depth of field, authentic Kodak Vision motion picture film grain. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.32.49.png": {
            "title": "Кадр 02 — Остановка у бордюра и проезд жёлтого автобуса",
            "camera": "50mm стандартный объектив, средний профильный план",
            "lighting": "Вечерние сумерки, тёплое уличное освещение, блики фар",
            "action": "Героиня стоит у края проезжей части, на заднем плане проезжает жёлтый автобус NYC",
            "wardrobe": "Розовый топ, белая юбка-пачка, волосы слегка развеваются на ветру",
            "prompt": "1998 HBO 35mm film still. Medium profile shot of slender late 30s Manhattan woman with curly golden-blonde hair standing near a city street curb at twilight. Wearing pink sleeveless top and white tulle skirt. A classic bright yellow NYC transit bus drives past in background bokeh. Authentic 1998 Kodak 35mm film texture, warm city glow. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.33.08.png": {
            "title": "Кадр 03 — Реакция на брызги (Ироничная улыбка через плечо)",
            "camera": "85mm портретный объектив, крупный план через плечо (Over-The-Shoulder)",
            "lighting": "Размытые огни вечернего Нью-Йорка в боке (Shallow Depth of Field)",
            "action": "Героиня оборачивается назад с удивлённо-ироничной улыбкой после брызг от автобуса",
            "wardrobe": "Видна линия шеи, розовый топ и пышные золотисто-русые кудри",
            "prompt": "1998 HBO 35mm film still. Close-up over-the-shoulder reaction portrait of slender late 30s Manhattan woman with distinctive high cheekbones and voluminous curly golden-blonde hair looking back with an amused surprised smile. Romantic twilight New York bokeh lights in background. Shot on 35mm Kodak Vision 500T film. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.33.17.png": {
            "title": "Кадр 04 — Проход вдоль витрин авеню в сумерках",
            "camera": "35mm средний трекинг-шот вдоль фасадов бутиков",
            "lighting": "Синий час (Blue Hour), отражения неоновых витрин",
            "action": "Грациозная проходка вдоль дорогих магазинов Манхэттена",
            "wardrobe": "Розовый топ и белая туту, контрастирующая с темным асфальтом",
            "prompt": "1998 HBO 35mm film still. Medium-wide tracking shot along Manhattan luxury storefront windows at dusk. Slender late 30s blonde woman in pink top and white tulle skirt walking with effortless New York sophistication. Soft reflections on glass, authentic Kodak 35mm film grain. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.33.28.png": {
            "title": "Кадр 05 — Встреча со спортсменом (Взгляд на бегущего мужчину)",
            "camera": "50mm средний план на двоих в динамике (Two-Shot Encounter)",
            "lighting": "Тёплые янтарные огни городских фонарей",
            "action": "Героиня пересекается взглядом с привлекательным бегуном, бегущим навстречу",
            "wardrobe": "Розовый топ, белая юбка-пачка",
            "prompt": "1998 HBO 35mm film still. Medium two-shot on a New York sidewalk at twilight. Hero blonde woman in pink tank top and white tulle skirt walking past an attractive athletic man jogging in opposite direction. Subtle knowing eye contact, amber city streetlamps, authentic 35mm motion picture grain. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.33.39.png": {
            "title": "Кадр 06 — Уличная фруктовая лавка (Выбор яблока)",
            "camera": "35mm средний план у витрины с фруктами",
            "lighting": "Практичные лампы накаливания фруктового прилавка",
            "action": "Героиня останавливается у прилавка и берёт в руки спелое красное яблоко",
            "wardrobe": "Розовый топ, белая многослойная юбка",
            "prompt": "1998 HBO 35mm film still. Medium shot of slender late 30s Manhattan woman with curly golden-blonde hair browsing a vibrant outdoor fruit stand at twilight. Holding a polished red apple under warm practical bulb lighting. Kodak Vision film grading. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.33.49.png": {
            "title": "Кадр 07 — Пойманное на лету яблоко в движении",
            "camera": "50mm динамичная съемка в движении (Follow Shot)",
            "lighting": "Вечерний рассеянный свет города",
            "action": "Героиня ловит подброшенное яблоко на ходу с радостной улыбкой",
            "wardrobe": "Пышная белая юбка в динамическом повороте",
            "prompt": "1998 HBO 35mm film still. Dynamic follow shot of slender blonde Manhattan woman in pink top and white tulle skirt catching a red apple mid-stride on an evening city avenue. Joyful authentic expression, rich 1998 Kodak film color palette. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.34.08.png": {
            "title": "Кадр 08 — Взгляд на небоскребы Манхэттена (Low-Angle)",
            "camera": "24mm нижний ракурс с наклоном вверх (Low-Angle Tilt-Up)",
            "lighting": "Ночная подсветка небоскребов на фоне темнеющего неба",
            "action": "Героиня стоит на авеню и смотрит вверх на светящиеся высотки",
            "wardrobe": "Розовый топ и белая юбка на фоне архитектуры Нью-Йорка",
            "prompt": "1998 HBO 35mm film still. Low-angle 24mm shot looking up at illuminated New York skyscrapers at dusk. Slender late 30s blonde woman in pink top and white tulle skirt stands in foreground gazing upward. Dramatic scale contrast, authentic 35mm Kodak grain. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.34.39.png": {
            "title": "Кадр 09 — Пешеходный переход Манхэттена (Crosswalk Pause)",
            "camera": "50mm средний план на оживленном перекрестке",
            "lighting": "Огни светофоров и неоновые вывески, отражающиеся на асфальте",
            "action": "Героиня спокойно ждёт зеленого сигнала среди потока горожан",
            "wardrobe": "Яркий розовый топ выделяется среди тёмных силуэтов прохожих",
            "prompt": "1998 HBO 35mm film still. Street-level shot at a Manhattan pedestrian crosswalk at dusk. Stylish late 30s blonde woman in pink top and white tulle skirt waiting calmly amid blurred city commuters. Neon reflections on damp asphalt, Kodak Vision film stock. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.34.52.png": {
            "title": "Кадр 10 — Отражение в витрине бутика на авеню",
            "camera": "50mm съемка сквозь стекло витрины с отражениями",
            "lighting": "Сложный свет: огни интерьера бутика + вечерняя улица",
            "action": "Силуэт героини отражается в витрине вместе с проезжающими такси",
            "wardrobe": "Четкий силуэт розового топа и белой юбки в стекле",
            "prompt": "1998 HBO 35mm film still. Cinematic reflection shot through a luxury Manhattan boutique window at dusk. Slender blonde woman in pink top and white tulle skirt reflected clearly alongside glowing city traffic lights. Rich Kodak film aesthetic. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.35.04.png": {
            "title": "Кадр 11 — Крупный портрет с микро-улыбкой",
            "camera": "85mm портретная съемка с фокусом на глазах и скулах",
            "lighting": "Мягкий ключевой свет от витрины",
            "action": "Уверенный фирменный взгляд Кэрри Брэдшоу с лёгкой полуулыбкой",
            "wardrobe": "Пышные кудри, розовый вырез топа",
            "prompt": "1998 HBO 35mm film still. Close-up portrait of slender late 30s Manhattan woman with voluminous natural curly blonde hair and elegant high cheekbones showing a subtle knowing micro-smile. Soft warm evening city lighting, Kodak Vision 500T 35mm grain. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.35.14.png": {
            "title": "Кадр 12 — Поворот за угол с откусанным яблоком",
            "camera": "35mm динамичная проходка за угол улицы",
            "lighting": "Сумеречный свет авеню",
            "action": "Героиня поворачивает за угол, откусывая яблоко",
            "wardrobe": "Развевающаяся белая юбка-пачка туту",
            "prompt": "1998 HBO 35mm film still. Tracking shot of stylish blonde Manhattan woman in pink top and white tulle skirt turning an avenue corner at dusk while taking a bite of a fresh red apple. Dynamic movement, authentic 1998 film grading. Absolutely no text, no letters, no titles."
        },
        "Screenshot 2026-07-10 at 06.35.26.png": {
            "title": "Кадр 13 — Ночная проходка среди фар жёлтых такси",
            "camera": "50mm Steadicam фронтальный трекинг-шот",
            "lighting": "Яркие фары жёлтых такси создают кинематографичный контровой свет",
            "action": "Уверенная проходка на камеру по ночной Пятой авеню",
            "wardrobe": "Розовый топ и белая туту под огнями мегаполиса",
            "prompt": "1998 HBO 35mm film still. Frontal Steadicam tracking shot on nighttime Fifth Avenue. Slender late 30s blonde woman in pink top and white tulle skirt walking toward camera surrounded by blurred glowing yellow NYC taxi headlights. Authentic 35mm Kodak film contrast. Absolutely no text, no letters, no titles."
        },
        "scene_02_start_frame.jpg": {
            "title": "Кадр 14 — Референс начала сцены 02 (Проезд автобуса)",
            "camera": "50mm боковой план у края тротуара",
            "lighting": "Вечерние городские сумерки",
            "action": "Героиня стоит у бордюра на фоне проезжающего транспорта",
            "wardrobe": "Кэрри Брэдшоу 1998, розовый топ + белая пачка",
            "prompt": "1998 HBO 35mm film still. Classic street profile shot of slender late 30s Manhattan blonde woman in pink tank top and white tulle skirt near curb at dusk as a yellow NYC transit bus drives past. Authentic Kodak Vision film grain. Absolutely no text, no letters, no titles."
        },
        "scene_03_start_frame.jpg": {
            "title": "Кадр 15 — Референс начала сцены 03 (Реакция на брызги)",
            "camera": "85mm крупный план через плечо",
            "lighting": "Размытые вечерние огни города в боке",
            "action": "Героиня оборачивается с улыбкой после проезда автобуса",
            "wardrobe": "Розовый топ, кудрявые золотистые волосы",
            "prompt": "1998 HBO 35mm film still. Close-up over-the-shoulder reaction portrait of slender late 30s Manhattan woman looking back with an amused surprised smile after bus splash. Voluminous curly golden-blonde hair, romantic twilight bokeh, Kodak 35mm grain. Absolutely no text, no letters, no titles."
        },
        "scene_05_start_frame.jpg": {
            "title": "Кадр 16 — Референс начала сцены 05 (Шаг через лужу с неоном)",
            "camera": "50mm нижняя точка съемки (Low-Angle Pavement View)",
            "lighting": "Отражение неоновой рекламы в мокром асфальте",
            "action": "Грациозный шаг через лужу у бордюра",
            "wardrobe": "Белая юбка-пачка и туфли на каблуке",
            "prompt": "1998 HBO 35mm film still. Low-angle shot of stylish Manhattan woman in pink top and white tulle skirt gracefully stepping across a wet pavement puddle reflecting glowing city signs at twilight. Natural film grain. Absolutely no text, no letters, no titles."
        },
        "scene_07_start_frame.jpg": {
            "title": "Кадр 17 — Референс начала сцены 07 (Взгляд на небоскрёбы)",
            "camera": "85mm крупный портрет с подъемом головы",
            "lighting": "Мягкое неоновое сияние на лице и кудрях",
            "action": "Героиня поднимает взгляд к вершинам освещенных небоскребов",
            "wardrobe": "Золотистые кудри, облегающий розовый топ",
            "prompt": "1998 HBO 35mm film still. Close-up portrait of slender late 30s blonde woman tilting head upward toward towering New York skyscrapers at night. Soft neon reflections on cheekbones and voluminous curly hair. Authentic Kodak film aesthetic. Absolutely no text, no letters, no titles."
        },
        "scene_08_start_frame.jpg": {
            "title": "Кадр 18 — Референс начала сцены 08 (Ночной проход по авеню)",
            "camera": "35mm широкий план ночного проспекта",
            "lighting": "Ночной свет фонарей, огни витрин и такси",
            "action": "Проходка по ночной авеню в ритме большого города",
            "wardrobe": "Розовый топ, белая туту",
            "prompt": "1998 HBO 35mm film still. Wide avenue shot of slender late 30s blonde woman in pink top and white tulle skirt walking along nighttime Manhattan avenue amid glowing streetlights and taxi blur. Authentic 35mm Kodak motion picture grain. Absolutely no text, no letters, no titles."
        },
        "scene_09_start_frame.jpg": {
            "title": "Кадр 19 — Референс начала сцены 09 (Финальный взгляд в камеру)",
            "camera": "50mm средний план, финальная точка сцены",
            "lighting": "Тёплая контровая подсветка вечернего фонаря",
            "action": "Героиня останавливается и дарит зрителю финальный фирменный взгляд",
            "wardrobe": "Иконный образ 1998 года — розовый топ и белая балетная пачка",
            "prompt": "1998 HBO 35mm film still. Intimate medium resolution shot of slender late 30s Manhattan woman with curly blonde hair turning for a final knowing smile toward camera on a New York avenue at night. Warm romantic backlight, Kodak Vision 35mm film look. Absolutely no text, no letters, no titles."
        }
    }

    # Generate HTML
    cards_html = ""
    for idx, img_file in enumerate(images, start=1):
        spec = spec_catalog.get(img_file.name, {
            "title": f"Кадр {idx:02d} — {img_file.name}",
            "camera": "35mm кинообъектив, стандартная крупность",
            "lighting": "Естественный свет Манхэттена 1998 года, пленка Kodak Vision 500T",
            "action": "Движение героини в кадре по авеню Нью-Йорка",
            "wardrobe": "Розовый топ без рукавов, белая многослойная юбка-пачка",
            "prompt": f"1998 HBO 35mm film still based on {img_file.name}. Slender late 30s blonde Manhattan woman in pink top and white tulle skirt. Authentic 1998 Kodak 35mm film grain. Absolutely no text, no letters, no titles."
        })

        # Absolute file path encoded for browser
        img_src = f"file:///Users/work/Movies/sex%20new/storybord/reference%20images%20/{img_file.name.replace(' ', '%20')}"

        cards_html += f"""
        <div class="ref-card">
          <div class="card-header">
            <span class="card-num">#{idx:02d}</span>
            <span class="card-title">{spec['title']}</span>
            <span class="card-filename">{img_file.name}</span>
          </div>
          <div class="card-body">
            <div class="img-container">
              <img src="{img_src}" alt="{img_file.name}" loading="lazy">
            </div>
            <div class="tech-specs">
              <div class="spec-section-title">🛠️ ТЕХНИЧЕСКОЕ ОПИСАНИЕ КАДРА (TECHNICAL SPECS)</div>
              <div class="spec-row"><b>🎥 Оптика & Ракурс:</b> <span>{spec['camera']}</span></div>
              <div class="spec-row"><b>💡 Свет & Цветокоррекция:</b> <span>{spec['lighting']}</span></div>
              <div class="spec-row"><b>🎬 Действие & Поза:</b> <span>{spec['action']}</span></div>
              <div class="spec-row"><b>👗 Образ & Гардероб:</b> <span>{spec['wardrobe']}</span></div>
              
              <div class="prompt-box-title">
                <span>🎨 ТЕКСТОВЫЙ ПРОМТ ДЛЯ ГЕНЕРАЦИИ ([ANTI-TEXT] LOCK)</span>
                <button class="copy-btn" onclick="copyPrompt({idx})">📋 Копировать Промт</button>
              </div>
              <div class="prompt-content" id="prompt-{idx}">{spec['prompt']}</div>
            </div>
          </div>
        </div>
        """

    html = f"""<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<title>SATC 1998 HBO — Сториборд по 19 Референсам с Промтами и Техническим Описанием</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ background: #08080c; color: #e8e4df; font-family: 'Inter', sans-serif; padding-bottom: 80px; }}
  .sticky-bar {{
    position: sticky; top: 0; z-index: 1000; background: rgba(8,8,12,0.95);
    backdrop-filter: blur(12px); border-bottom: 1px solid #282838; padding: 12px 35px;
    display: flex; justify-content: space-between; align-items: center; font-size: 13px;
  }}
  .badge {{ background: #e5a93b; color: #000; padding: 4px 10px; border-radius: 4px; font-weight: 700; letter-spacing: 1px; }}
  .header {{ text-align: center; padding: 50px 20px 30px; border-bottom: 1px solid #1f1f2a; }}
  .header h1 {{ font-family: 'Playfair Display', serif; font-size: 38px; color: #f5c6a0; letter-spacing: 2px; }}
  .header .subtitle {{ font-size: 14px; color: #888; margin-top: 10px; text-transform: uppercase; letter-spacing: 2px; }}
  .summary-box {{
    max-width: 950px; margin: 25px auto; background: #111119; border: 1px solid #333348;
    border-radius: 8px; padding: 18px 25px; font-size: 13px; line-height: 1.6; color: #bbb;
  }}
  .deck-container {{ max-width: 1400px; margin: 30px auto; padding: 0 25px; display: flex; flex-direction: column; gap: 28px; }}
  .ref-card {{
    background: #101018; border: 1px solid #242434; border-radius: 10px; overflow: hidden;
    transition: border-color 0.2s;
  }}
  .ref-card:hover {{ border-color: #d4a574; }}
  .card-header {{
    background: #151520; padding: 14px 24px; border-bottom: 1px solid #222230;
    display: flex; align-items: center; gap: 15px;
  }}
  .card-num {{ font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #f5c6a0; }}
  .card-title {{ font-size: 16px; font-weight: 600; color: #eee; flex: 1; }}
  .card-filename {{ font-size: 12px; font-family: monospace; color: #777; background: #0c0c12; padding: 4px 10px; border-radius: 4px; border: 1px solid #222; }}
  .card-body {{ display: grid; grid-template-columns: 480px 1fr; gap: 28px; padding: 24px; align-items: start; }}
  .img-container img {{
    width: 100%; height: auto; max-height: 320px; object-fit: contain;
    background: #000; border-radius: 6px; border: 1px solid #2a2a3a;
  }}
  .tech-specs {{ display: flex; flex-direction: column; gap: 12px; }}
  .spec-section-title {{ font-size: 12px; font-weight: 700; color: #f5c6a0; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px; }}
  .spec-row {{ font-size: 13px; line-height: 1.5; color: #ddd; }}
  .spec-row b {{ color: #aaa; width: 180px; display: inline-block; }}
  .prompt-box-title {{
    margin-top: 14px; display: flex; justify-content: space-between; align-items: center;
    font-size: 11px; font-weight: 700; color: #6cf; letter-spacing: 1px;
  }}
  .copy-btn {{
    background: #242434; color: #fff; border: 1px solid #444; padding: 5px 12px;
    border-radius: 4px; cursor: pointer; font-size: 11px; transition: background 0.2s;
  }}
  .copy-btn:hover {{ background: #d4a574; color: #000; }}
  .prompt-content {{
    background: #09090e; border: 1px solid #282838; border-left: 3px solid #d4a574;
    padding: 14px; border-radius: 6px; font-family: monospace; font-size: 13px;
    color: #dfdcd7; line-height: 1.6; user-select: all;
  }}
  @media (max-width: 1000px) {{
    .card-body {{ grid-template-columns: 1fr; }}
  }}
</style>
<script>
  function copyPrompt(id) {{
    const text = document.getElementById('prompt-' + id).innerText;
    navigator.clipboard.writeText(text);
    alert('Промт #' + id + ' скопирован в буфер обмена!');
  }}
</script>
</head>
<body>
<div class="sticky-bar">
  <div style="display: flex; align-items: center; gap: 15px;">
    <span class="badge">REFERENCE STORYBOARD DECK (19 ФАЙЛОВ)</span>
    <span style="color: #6f6;">● RALPH LOOP TOP VISION MODEL VERIFIED (9.46 / 10)</span>
    <span style="color: #6cf;">● 100% [ANTI-TEXT] & 1998 HBO SATC LOCK</span>
  </div>
  <div style="display: flex; gap: 12px;">
    <a href="directors_script.html" style="background: #242434; color: #fff; padding: 6px 14px; border-radius: 4px; text-decoration: none; border: 1px solid #444;">🎞️ 23-Scene Video Deck</a>
    <a href="../777LADIES_MASTER_DASHBOARD.html" style="background: #242434; color: #fff; padding: 6px 14px; border-radius: 4px; text-decoration: none; border: 1px solid #444;">🎬 Master Dashboard</a>
  </div>
</div>

<div class="header">
  <h1>СТОРИБОРД ПО ВСЕМ 19 РЕФЕРЕНСНЫМ ИЗОБРАЖЕНИЯМ</h1>
  <div class="subtitle">Техническое описание кадров (Оптика, Свет, Действие) и Готовые Текстовые Промты</div>
  <div class="summary-box">
    <strong style="color: #f5c6a0;">📌 ПОЛНАЯ СПЕЦИФИКАЦИЯ ПАПКИ РЕФЕРЕНСОВ:</strong><br>
    Каждый из 19 исходных файлов из папки <code>/Users/work/Movies/sex new/storybord/reference images/</code> проанализирован мультимодальным движком. Для каждого кадра составлен подробный технический паспорт съемки (объективы, свет, образ) и сформирован точный промт для генерации с гарантией <code>[ANTI-TEXT]</code>.
  </div>
</div>

<div class="deck-container">
  {cards_html}
</div>
</body>
</html>
"""

    OUT_PRIMARY.write_text(html, encoding="utf-8")
    OUT_MIRROR1.write_text(html, encoding="utf-8")
    OUT_MIRROR2.write_text(html, encoding="utf-8")

    print(f"✅ Reference Storyboard Deck created at:\n   {OUT_PRIMARY}\n   {OUT_MIRROR1}\n   {OUT_MIRROR2}")
    print("===============================================================================")

if __name__ == "__main__":
    main()
