#!/usr/bin/env python3
"""
🎬 Image-to-Text Prompt Generator for Veo 3
Generates a clean Opus-grade Veo 3 prompt from a storyboard screenshot,
explicitly removing any titles, overlays, or text.
"""

import os
import sys
import json
import argparse
from serpent_genai import setup_logging, get_genai_client
from google.genai import types

logger = setup_logging(__name__)

def main():
    parser = argparse.ArgumentParser(description="Image-to-Text Prompt Generator for Veo 3")
    parser.add_argument("image_path", nargs="?", default="/Users/work/Movies/sex new/storybord/scene_08_start_frame.jpg", help="Path to input frame image")
    args = parser.parse_args()

    image_path = args.image_path
    if not os.path.exists(image_path):
        logger.error(f"Image file not found: {image_path}")
        return

    client = get_genai_client()
    if not client:
        logger.error("Failed to initialize GenAI client with ADC fallback compliance.")
        return

    system_instruction = (
        "You are an expert film director and cinematic prompt engineer for Google Veo 3. "
        "Analyze the visual content of the provided storyboard frame image and produce a highly detailed "
        "Text-to-Video generation prompt.\n"
        "CRITICAL INSTRUCTION: Completely ignore and omit any text, titles, numbers, subtitles, or graphic overlays "
        "present in the input frame. The generated video must have ZERO text or typography.\n\n"
        "Format your prompt EXACTLY with these three mandatory blocks:\n"
        "[MOTION] <cinematic camera movement and continuous subject action starting frame 1>\n"
        "[TECH] Video: 5s, 24fps, cinematic 35mm film grain, dynamic lighting, no static frames, NO TEXT, NO TITLES, NO WATERMARKS.\n"
        "[ANTI-STATIC] Continuous motion from frame 1. No freeze-frames or establishing stills.\n"
    )

    try:
        from PIL import Image
        logger.info(f"Analyzing frame: {image_path} ...")
        img = Image.open(image_path)

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[
                img,
                "Describe the visual scene in detail for Veo 3 Text-to-Video generation. Ensure NO TEXT or titles appear in the output prompt description."
            ],
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.3
            )
        )

        prompt_text = response.text.strip()
        logger.info("\n==================================================")
        logger.info("✨ GENERATED VEO 3 PROMPT (CLEAN / NO TITLES):")
        logger.info("==================================================")
        logger.info(prompt_text)
        logger.info("==================================================\n")

        out_path = "data/scene_08_clean_prompt.txt"
        os.makedirs("data", exist_ok=True)
        with open(out_path, "w") as f:
            f.write(prompt_text)
        logger.info(f"Saved clean prompt to {out_path}")
    except Exception as e:
        logger.error(f"Error generating prompt from image: {e}")

if __name__ == "__main__":
    main()

