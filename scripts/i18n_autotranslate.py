#!/usr/bin/env python3
"""
OmniRoute i18n Auto-Translator
This script scans all docs/i18n directory markdown files and uses an LLM
API (like OmniRoute itself) to translate any English paragraphs into the 
target language.

Usage:
  python3 scripts/i18n_autotranslate.py --api-url http://localhost:20128/v1 --api-key sk-your-omniroute-key --model cx/gpt-5.4
"""

import os
import re
import sys
import glob
import json
import urllib.request
import urllib.error
import argparse
from pathlib import Path

# The base path of the project
SCRIPT_DIR = Path(__file__).parent.resolve()
PROJECT_ROOT = SCRIPT_DIR.parent
I18N_DIR = PROJECT_ROOT / "docs" / "i18n"

def get_language_name(lang_code):
    lang_map = {
        "pt-BR": "Portuguese (Brazil)", "es": "Spanish", "fr": "French", 
        "it": "Italian", "ru": "Russian", "zh-CN": "Simplified Chinese", 
        "de": "German", "in": "Hindi", "th": "Thai", "uk-UA": "Ukrainian", 
        "ar": "Arabic", "ja": "Japanese", "vi": "Vietnamese", "bg": "Bulgarian", 
        "da": "Danish", "fi": "Finnish", "he": "Hebrew", "hu": "Hungarian", 
        "id": "Indonesian", "ko": "Korean", "ms": "Malay", "nl": "Dutch", 
        "no": "Norwegian", "pt": "Portuguese (Portugal)", "ro": "Romanian", 
        "pl": "Polish", "sk": "Slovak", "sv": "Swedish", "phi": "Filipino", 
        "cs": "Czech"
    }
    return lang_map.get(lang_code, lang_code)

def translate_block(text, target_language, api_url, api_key, model):
    if not text.strip():
        return text

    prompt = (
        f"You are a professional technical translator working on the OmniRoute proxy project documentation.\n"
        f"Translate the following Markdown text from English to {target_language}.\n"
        f"CRITICAL RULES:\n"
        f"- Do NOT translate code blocks (```...```).\n"
        f"- Do NOT translate markdown formatting elements, links syntax, or image syntax.\n"
        f"- Retain formatting perfectly.\n"
        f"- Only return the translated text without introductory phrases.\n\n"
        f"{text}"
    )

    data = {
        "model": model,
        "messages": [
            {"role": "system", "content": "You are a direct translator. Output only the requested translation."},
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3,
        "stream": False
    }
    
    req = urllib.request.Request(
        f"{api_url}/chat/completions",
        data=json.dumps(data).encode('utf-8'),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            result = json.loads(response.read().decode())
            if "choices" in result and len(result["choices"]) > 0:
                translated = result["choices"][0]["message"]["content"]
                return translated.strip()
    except Exception as e:
        print(f"    ❌ API Error: {e}")
        return text

def process_file(file_path, target_language, api_url, api_key, model):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Simple heuristic: we look for English common words to identify if a block needs translation.
    # A true robust implementation would diff against the English source.
    # For now, we split by double newlines (markdown blocks)
    blocks = content.split('\n\n')
    translated_blocks = []
    
    english_words = [" the ", " is ", " are ", " this ", " that ", " a ", " to "]
    
    needs_update = False
    
    for block in blocks:
        # Skip translation if it's a pure code block or doesn't have English markers
        if block.startswith('```') or block.startswith('<div') or block.startswith('🌐') or block.startswith('|'):
            translated_blocks.append(block)
            continue
            
        is_english = any(w in block.lower() for w in english_words)
        
        if is_english and len(block.strip()) > 10:
            print(f"    🔄 Translating paragraph (length {len(block)})...")
            new_block = translate_block(block, target_language, api_url, api_key, model)
            if new_block != block:
                needs_update = True
            translated_blocks.append(new_block)
        else:
            translated_blocks.append(block)
            
    if needs_update:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write('\n\n'.join(translated_blocks))
        print(f"  ✅ Updated translations in {file_path.name}")
    else:
        print(f"  ⏩ {file_path.name} already fully translated or no English blocks found.")

def main():
    parser = argparse.ArgumentParser(description="OmniRoute Auto-Translator for i18n Markdown")
    parser.add_argument("--api-url", default="http://localhost:20128/v1", help="Base URL of OmniRoute or target provider")
    parser.add_argument("--api-key", default="sk-test", help="API Key for the provider")
    parser.add_argument("--model", default="gc/gemini-3-flash", help="Model name to use")
    parser.add_argument("--lang", default=None, help="Process only a specific language code (e.g. pt-BR)")
    
    args = parser.parse_args()
    
    print(f"🚀 Starting Auto-Translator")
    print(f"🔗 Target API: {args.api_url} | Model: {args.model}\n")
    
    if args.lang:
        lang_dirs = [d for d in I18N_DIR.iterdir() if d.is_dir() and d.name == args.lang]
    else:
        lang_dirs = [d for d in I18N_DIR.iterdir() if d.is_dir()]
    
    for lang_dir in lang_dirs:
        lang_code = lang_dir.name
        lang_name = get_language_name(lang_code)
        
        print(f"\n🌍 Processing {lang_name} ({lang_code})")
        
        md_files = list(lang_dir.glob("*.md"))
        for md_file in md_files:
            process_file(md_file, lang_name, args.api_url, args.api_key, args.model)
            
if __name__ == "__main__":
    main()
