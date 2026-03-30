#!/usr/bin/env python3
"""
OmniRoute i18n Translation Validator
Script for comparing source (en.json) with any translation
Detects missing translations and source changes needing updates

Usage:
    python validate_translation.py              # Uses TRANSLATION_LANG env or --lang argument
    python validate_translation.py --lang cs    # Validate Czech (cs.json)
    python validate_translation.py -l de       # Validate German (de.json)
    TRANSLATION_LANG=fr python validate_translation.py  # Validate French

Environment variables:
    TRANSLATION_LANG    Target language code (e.g., cs, de, fr)
"""

import json
import sys
import os
from pathlib import Path
from typing import Dict, List, Set, Tuple, Any
import argparse

# Colors (ANSI)
RED = '\033[0;31m'
GREEN = '\033[0;32m'
YELLOW = '\033[1;33m'
BLUE = '\033[0;34m'
NC = '\033[0m'

# Configuration - find repo root relative to this script
_script_dir = Path(__file__).parent.resolve()
# If script is in scripts/ subfolder, go up one level to repo root
if _script_dir.name == "scripts":
    SCRIPT_DIR = _script_dir.parent
else:
    SCRIPT_DIR = _script_dir

MESSAGES_DIR = SCRIPT_DIR / "src" / "i18n" / "messages"
SOURCE_FILE = MESSAGES_DIR / "en.json"

# Get target language from env or argument
def get_target_lang() -> str:
    """Get target language from ENV or CLI argument."""
    # First check environment variable
    env_lang = os.environ.get('TRANSLATION_LANG')
    if env_lang:
        return env_lang
    
    # Then check command line argument (will be set in main)
    if hasattr(get_target_lang, 'cli_lang'):
        return get_target_lang.cli_lang
    
    # Default to cs for backwards compatibility
    return "cs"

# Keys that should NOT be translated (technical terms, proper names, etc.)
UNTRANSLATABLE_KEYS = {
    # ICU/Plural formats
    "apiManager.modelsCount",
    # Technical/Protocol names
    "a2aDashboard.metadata",
    "a2aDashboard.ok",
    "a2aDashboard.url",
    "cliTools.baseUrlPlaceholder",
    "cliTools.platforms",
    "cliTools.toolDescriptions.claude",
    "cliTools.toolDescriptions.codex",
    "cliTools.toolDescriptions.cursor",
    "combos.roundRobin",
    "common.model",
    "docs.clientCherryStudioTitle",
    "docs.clientClaudeTitle",
    "docs.clientCursorTitle",
    "docs.github",
    "docs.protocolA2aTitle",
    "docs.protocolMcpTitle",
    "endpoint.chat",
    "endpoint.chatCompletions",
    "endpoint.cloudProxy",
    "endpoint.mcpCardTitle",
    "endpoint.rerank",
    "header.a2a",
    "header.mcp",
    "health.cpu",
    "health.latencyP50",
    "health.latencyP95",
    "health.latencyP99",
    "health.millisecondsShort",
    "health.notAvailable",
    "health.ok",
    "home.aliasLabel",
    "home.oauthLabel",
    "landing.brandName",
    "landing.flowProviderAnthropic",
    "landing.flowProviderGemini",
    "landing.flowProviderGithubCopilot",
    "landing.flowProviderOpenAI",
    "landing.flowToolClaudeCode",
    "landing.flowToolCline",
    "landing.flowToolCursor",
    "landing.flowToolOpenAICodex",
    "landing.github",
    "legal.terms",
    "legal.privacy",
    "logs.endpoint",
    "logs.proxy",
    "logs.console",
    "logs.request",
    "logs.audit",
    "media.interpolation",
    "media.upscale",
    "media.samples",
    "search.search",
    "search.searchTools",
    "search.webSearch",
    "search.fileSearch",
    "settings.theme",
    "settings.language",
    "settings.currency",
    "settings.timezone",
    "stats.requests",
    "stats.tokens",
    "stats.latency",
    "stats.errors",
    "themesPage.dark",
    "themesPage.light",
    "themesPage.system",
    "translator.translate",
    "translator.translateFrom",
    "translator.translateTo",
    "translator.detect",
    "translator.detectedLanguage",
    "usage.totalRequests",
    "usage.totalTokens",
    "usage.inputTokens",
    "usage.outputTokens",
    "usage.promptTokens",
    "usage.completionTokens",
    "usage.cacheReadTokens",
    "usage.cacheWriteTokens",
}


def print_header(msg: str) -> None:
    print(f"\n{BLUE}{'='*50}{NC}")
    print(f"{BLUE}{msg}{NC}")
    print(f"{BLUE}{'='*50}{NC}")


def print_success(msg: str) -> None:
    print(f"{GREEN}✓ {msg}{NC}")


def print_warning(msg: str) -> None:
    print(f"{YELLOW}⚠ {msg}{NC}")


def print_error(msg: str) -> None:
    print(f"{RED}✗ {msg}{NC}")


def load_json(path: Path) -> Dict:
    """Load JSON file"""
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        print_error(f"Invalid JSON in {path}: {e}")
        sys.exit(1)


def get_all_keys(obj: Any, prefix: str = "") -> Set[str]:
    """Recursively get all leaf keys from JSON object"""
    keys = set()
    if isinstance(obj, dict):
        for key, value in obj.items():
            new_prefix = f"{prefix}.{key}" if prefix else key
            if isinstance(value, dict):
                keys.update(get_all_keys(value, new_prefix))
            elif isinstance(value, list):
                # Handle arrays - check first element for structure
                if value and isinstance(value[0], dict):
                    for i, item in enumerate(value):
                        keys.update(get_all_keys(item, f"{new_prefix}[{i}]"))
                else:
                    keys.add(new_prefix)
            else:
                keys.add(new_prefix)
    return keys


def find_missing_keys(source: Dict, trans: Dict) -> Set[str]:
    """Keys in source but not in translation"""
    source_keys = get_all_keys(source)
    trans_keys = get_all_keys(trans)
    return source_keys - trans_keys


def find_extra_keys(source: Dict, trans: Dict) -> Set[str]:
    """Keys in translation but not in source"""
    source_keys = get_all_keys(source)
    trans_keys = get_all_keys(trans)
    return trans_keys - source_keys


def get_value_by_path(obj: Dict, path: str) -> Any:
    """Get value from nested dict using dot notation"""
    keys = path.replace('[', '.').replace(']', '').split('.')
    current = obj
    for key in keys:
        if key.isdigit():
            idx = int(key)
            if isinstance(current, list) and idx < len(current):
                current = current[idx]
            else:
                return None
        else:
            if isinstance(current, dict) and key in current:
                current = current[key]
            else:
                return None
    return current


def find_untranslated(source: Dict, trans: Dict) -> Set[str]:
    """Keys where source value equals translation (not translated), excluding untranslatable keys"""
    source_keys = get_all_keys(source)
    untranslated = set()
    
    for key in source_keys:
        # Skip keys that are in the untranslatable list
        if key in UNTRANSLATABLE_KEYS:
            continue
            
        source_val = get_value_by_path(source, key)
        trans_val = get_value_by_path(trans, key)
        
        if source_val is not None and source_val == trans_val:
            untranslated.add(key)
    
    return untranslated


def find_placeholder_issues(source: Dict, trans: Dict) -> List[Tuple[str, str, str]]:
    """
    Find placeholder mismatches between source and translation.
    Only checks top-level placeholders like {count}, {day}, NOT ICU inner content.
    Returns list of (key, source_placeholder, trans_placeholder)
    """
    source_keys = get_all_keys(source)
    issues = []
    
    for key in source_keys:
        source_val = get_value_by_path(source, key)
        trans_val = get_value_by_path(trans, key)
        
        if source_val is None or trans_val is None:
            continue
            
        if not isinstance(source_val, str) or not isinstance(trans_val, str):
            continue
        
        # Only extract top-level placeholders: {name}, {count}, {day}, NOT {# X} inside ICU
        import re
        # Match {name} but NOT {# inside ICU plural
        source_placeholders = set(re.findall(r'\{[a-zA-Z][^}]*\}', source_val))
        trans_placeholders = set(re.findall(r'\{[a-zA-Z][^}]*\}', trans_val))
        
        # Check for missing placeholders
        missing = source_placeholders - trans_placeholders
        if missing:
            issues.append((key, str(source_placeholders), str(trans_placeholders)))
    
    return issues


def compare_category(source: Dict, trans: Dict, category: str) -> Tuple[bool, List[str]]:
    """Compare a specific category, return (complete, missing_keys)"""
    if category not in source:
        return False, [f"Category '{category}' not in source"]
    
    if category not in trans:
        return False, [f"Category '{category}' missing in translation"]
    
    source_keys = get_all_keys(source[category])
    trans_keys = get_all_keys(trans[category])
    missing = source_keys - trans_keys
    
    return len(missing) == 0, list(missing)


def get_translation_file() -> Path:
    """Get the translation file path based on target language."""
    lang = get_target_lang()
    return MESSAGES_DIR / f"{lang}.json"


def generate_report():
    """Generate full translation report"""
    translation_file = get_translation_file()
    print_header("OmniRoute Translation Report")
    print(f"Source: {SOURCE_FILE}")
    print(f"Translation: {translation_file}\n")
    
    source = load_json(SOURCE_FILE)
    trans = load_json(translation_file)
    
    # Count keys
    source_count = len(get_all_keys(source))
    trans_count = len(get_all_keys(trans))
    
    print(f"{BLUE}Key Statistics:{NC}")
    print(f"  Source keys: {source_count}")
    print(f"  Translation keys: {trans_count}\n")
    
    # Missing keys
    print_header("Missing Translations")
    missing = find_missing_keys(source, trans)
    if missing:
        print(f"{RED}Found {len(missing)} missing keys:{NC}")
        for key in sorted(missing)[:50]:  # Limit output
            print(f"  - {key}")
        if len(missing) > 50:
            print(f"  ... and {len(missing) - 50} more")
    else:
        print_success("No missing translations!")
    
    # Extra keys
    print_header("Extra Keys")
    extra = find_extra_keys(source, trans)
    if extra:
        print(f"{YELLOW}Found {len(extra)} extra keys:{NC}")
        for key in sorted(extra)[:50]:
            print(f"  - {key}")
    else:
        print_success("No extra keys!")
    
    # Untranslated
    print_header("Untranslated Keys (same as source)")
    untranslated = find_untranslated(source, trans)
    if untranslated:
        print(f"{YELLOW}Found {len(untranslated)} untranslated keys:{NC}")
        for key in sorted(untranslated)[:50]:
            print(f"  - {key}")
        if len(untranslated) > 50:
            print(f"  ... and {len(untranslated) - 50} more")
    else:
        print_success("All keys appear to be translated!")
    
    # Placeholder issues
    print_header("Placeholder Mismatches")
    placeholder_issues = find_placeholder_issues(source, trans)
    if placeholder_issues:
        print(f"{YELLOW}Found {len(placeholder_issues)} placeholder mismatches:{NC}")
        for key, src_ph, trans_ph in placeholder_issues[:20]:
            print(f"  - {key}")
            print(f"    Source: {src_ph}")
            print(f"    Trans:  {trans_ph}")
        if len(placeholder_issues) > 20:
            print(f"  ... and {len(placeholder_issues) - 20} more")
    else:
        print_success("All placeholders match!")
    
    # Per-category status
    print_header("Per-Category Status")
    for category in sorted(source.keys()):
        complete, missing = compare_category(source, trans, category)
        if complete:
            print_success(f"{category} - complete")
        else:
            print_error(f"{category} - missing {len(missing)} keys")
    
    # Summary
    print_header("Summary")
    if not missing and not extra and not untranslated:
        print(f"{GREEN}🎉 Translation is fully synchronized!{NC}")
        return 0
    else:
        print(f"{RED}Translation needs attention:{NC}")
        print(f"  - Missing: {len(missing)}")
        print(f"  - Extra: {len(extra)}")
        print(f"  - Untranslated: {len(untranslated)}")
        return 1


def quick_check() -> int:
    """Quick check - just show counts"""
    translation_file = get_translation_file()
    source = load_json(SOURCE_FILE)
    trans = load_json(translation_file)
    
    missing = find_missing_keys(source, trans)
    untranslated = find_untranslated(source, trans)
    
    print(f"Missing: {len(missing)}")
    print(f"Untranslated: {len(untranslated)}")
    
    return 0 if not missing and not untranslated else 1


def show_diff(category: str) -> int:
    """Show detailed diff for a category"""
    translation_file = get_translation_file()
    source = load_json(SOURCE_FILE)
    trans = load_json(translation_file)
    
    if category not in source:
        print_error(f"Category '{category}' not found in source")
        print("Available categories:")
        for cat in sorted(source.keys()):
            print(f"  - {cat}")
        return 1
    
    print_header(f"Diff for category: {category}")
    
    print(f"{BLUE}{'Key':<30} | {'Source':<25} | {'Translation':<25}{NC}")
    print("-" * 85)
    
    source_keys = get_all_keys(source[category])
    
    for key in sorted(source_keys):
        source_val = get_value_by_path(source[category], key)
        trans_val = get_value_by_path(trans.get(category, {}), key)
        
        # Truncate long values
        source_str = str(source_val)[:25] if source_val else "(null)"
        trans_str = str(trans_val)[:25] if trans_val else "(missing)"
        
        if source_val == trans_val:
            status = f"{YELLOW}(same){NC}"
        elif trans_val is None:
            status = f"{RED}(missing){NC}"
        else:
            status = f"{GREEN}(ok){NC}"
        
        print(f"{key:<30} | {source_str:<25} | {trans_str:<25} {status}")
    
    return 0


def export_csv(output_file: str) -> int:
    """Export to CSV"""
    translation_file = get_translation_file()
    source = load_json(SOURCE_FILE)
    trans = load_json(translation_file)
    
    print_header(f"Exporting to CSV: {output_file}")
    
    source_keys = get_all_keys(source)
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("key,source_value,translation_value,status\n")
        
        for key in sorted(source_keys):
            source_val = get_value_by_path(source, key)
            trans_val = get_value_by_path(trans, key)
            
            # Escape commas
            source_str = str(source_val).replace(',', ';')
            trans_str = str(trans_val).replace(',', ';') if trans_val else ""
            
            if trans_val is None:
                status = "MISSING"
            elif source_val == trans_val:
                status = "UNTRANSLATED"
            else:
                status = "OK"
            
            f.write(f'"{key}","{source_str}","{trans_str}",{status}\n')
    
    print_success(f"Exported to {output_file}")
    return 0


def export_markdown(output_file: str) -> int:
    """Export all keys to separate Markdown files - translated and untranslated"""
    translation_file = get_translation_file()
    source = load_json(SOURCE_FILE)
    trans = load_json(translation_file)
    
    print_header(f"Exporting to Markdown: {output_file}")
    
    source_keys = get_all_keys(source)
    missing = find_missing_keys(source, trans)
    untranslated = find_untranslated(source, trans)
    
    # Separate translated and untranslated
    translated_keys = []
    untranslated_sorted = sorted(untranslated)
    
    for key in sorted(source_keys):
        if key not in missing and key not in untranslated:
            translated_keys.append(key)
    
    translated_count = len(translated_keys)
    untranslated_count = len(untranslated_sorted)
    
    # Export untranslated (main output file)
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Nepřeložené klíče (Untranslated Keys)\n\n")
        f.write(f"Zdroj: `{SOURCE_FILE.name}` | Překlad: `{TRANSLATION_FILE.name}`\n\n")
        
        f.write(f"**Celkem: {untranslated_count} nepreložených klíčů**\n\n")
        
        f.write("| # | Klíč (Key) | Originál | Nepřeloženo |\n")
        f.write("|---|------------|----------|------------|\n")
        
        for i, key in enumerate(untranslated_sorted, 1):
            source_val = get_value_by_path(source, key)
            trans_val = get_value_by_path(trans, key)
            
            source_str = str(source_val).replace('|', '\\|')[:60]
            trans_str = str(trans_val).replace('|', '\\|')[:60]
            
            f.write(f"| {i} | `{key}` | {source_str} | {trans_str} |\n")
        
        f.write("\n## Shrnutí (Summary)\n\n")
        f.write(f"- Celkem klíčů: {len(source_keys)}\n")
        f.write(f"- Chybějících: {len(missing)}\n")
        f.write(f"- Nepřeložených: {untranslated_count}\n")
        f.write(f"- Přeložených: {translated_count}\n")
    
    # Export translated to separate file
    translated_file = output_file.replace('.md', '_translated.md')
    translation_filename = translation_file.name
    with open(translated_file, 'w', encoding='utf-8') as f:
        f.write("# Přeložené klíče (Translated Keys)\n\n")
        f.write(f"Zdroj: `{SOURCE_FILE.name}` | Překlad: `{translation_filename}`\n\n")
        
        f.write(f"**Celkem: {translated_count} přeložených klíčů**\n\n")
        
        f.write("| # | Klíč (Key) | Originál | Překlad |\n")
        f.write("|---|------------|----------|---------|\n")
        
        for i, key in enumerate(translated_keys, 1):
            source_val = get_value_by_path(source, key)
            trans_val = get_value_by_path(trans, key)
            
            source_str = str(source_val).replace('|', '\\|')[:40]
            trans_str = str(trans_val).replace('|', '\\|')[:40]
            
            f.write(f"| {i} | `{key}` | {source_str} | {trans_str} |\n")
    
    print_success(f"Exported: {output_file} ({untranslated_count} keys)")
    print_success(f"Exported: {translated_file} ({translated_count} keys)")
    return 0


def usage():
    print("""
OmniRoute i18n Translation Validator

Usage: validate_translation.py [command] [options]

Options:
  -l, --lang <code>    Target language code (e.g., cs, de, fr)
                      Default: cs or TRANSLATION_LANG env variable

Commands:
  (default)        Generate full report
  quick            Quick check - just show counts
  diff <category>  Show detailed diff for a category
  csv [file]       Export to CSV (default: translation_report.csv)
  md [file]        Export to Markdown (default: translation_report.md)

Examples:
  python validate_translation.py                 # Full report (default: cs)
  python validate_translation.py --lang de        # Validate German
  python validate_translation.py -l fr            # Validate French
  TRANSLATION_LANG=es python validate_translation.py  # Validate Spanish
  python validate_translation.py quick            # Quick status check
  python validate_translation.py diff common      # Diff common category
  python validate_translation.py csv              # Export to CSV
  python validate_translation.py md               # Export to Markdown
""")


def main():
    # Parse global arguments first
    parser = argparse.ArgumentParser(add_help=False)
    parser.add_argument('-l', '--lang', dest='lang', default=None)
    parser.add_argument('command', nargs='?')
    parser.add_argument('arg', nargs='?')
    
    # Parse known args only to allow commands to handle their own args
    args, _ = parser.parse_known_args()
    
    # Set language from argument or use default
    if args.lang:
        get_target_lang.cli_lang = args.lang
    elif not os.environ.get('TRANSLATION_LANG'):
        # Default to cs for backwards compatibility
        get_target_lang.cli_lang = "cs"
    
    # Check if translation file exists
    translation_file = get_translation_file()
    if not translation_file.exists():
        print_error(f"Translation file not found: {translation_file}")
        print(f"Available languages:")
        for f in sorted(MESSAGES_DIR.glob("*.json")):
            if f.name != "en.json":
                print(f"  - {f.stem}")
        return 1
    
    # Execute command
    if not args.command or args.command in ('help', '--help', '-h'):
        return generate_report()
    
    if args.command == "quick":
        return quick_check()
    elif args.command == "diff":
        if not args.arg:
            print_error("Please specify category")
            usage()
            return 1
        return show_diff(args.arg)
    elif args.command == "csv":
        output = args.arg if args.arg else "translation_report.csv"
        return export_csv(output)
    elif args.command == "md":
        output = args.arg if args.arg else "translation_report.md"
        return export_markdown(output)
    else:
        print_error(f"Unknown command: {args.command}")
        usage()
        return 1


if __name__ == "__main__":
    sys.exit(main())