#!/usr/bin/env python3
"""
Translation check script for OmniRoute.
Checks if all translation keys used in code exist in en.json.

Usage:
    python scripts/i18n/check_translations.py
    python scripts/i18n/check_translations.py --verbose
    python scripts/i18n/check_translations.py --fix
"""

import json
import re
import os
import sys
import argparse


def get_namespaces_in_code(src_dir='src'):
    """Find all namespaces used in code via useTranslations()."""
    used_ns = set()
    for root, dirs, files in os.walk(src_dir):
        for f in files:
            if not (f.endswith('.tsx') or f.endswith('.ts')):
                continue
            try:
                content = open(os.path.join(root, f), 'r', encoding='utf-8').read()
                matches = re.findall(r'useTranslations\(["\']+([^"\']+)["\']+\)', content)
                used_ns.update(matches)
            except (IOError, UnicodeDecodeError) as e:
                print(f"Warning: could not process file {os.path.join(root, f)}: {e}", file=sys.stderr)
    return used_ns


def get_keys_in_json(json_path):
    """Get all keys (including nested) from a JSON file."""
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    keys = set()
    
    def traverse(obj, prefix=''):
        if isinstance(obj, dict):
            for k, v in obj.items():
                key = f"{prefix}.{k}" if prefix else k
                keys.add(key)
                if isinstance(v, dict):
                    traverse(v, key)
        elif isinstance(obj, list):
            for item in obj:
                traverse(item, prefix)
    
    traverse(data)
    return keys


def check_translations(src_dir='src', en_json_path='src/i18n/messages/en.json', verbose=False):
    """Check if all translation keys used in code exist in en.json."""
    # Get namespaces used in code
    used_ns = get_namespaces_in_code(src_dir)
    
    # Get namespaces in en.json
    with open(en_json_path, 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    en_ns = set(en_data.keys())
    
    # Find missing namespaces
    missing_ns = sorted(used_ns - en_ns)
    
    # Get all keys from en.json
    en_keys = get_keys_in_json(en_json_path)
    
    # Get all keys used in code
    used_keys = set()
    for root, dirs, files in os.walk(src_dir):
        for f in files:
            if not (f.endswith('.tsx') or f.endswith('.ts')):
                continue
            try:
                content = open(os.path.join(root, f), 'r', encoding='utf-8').read()
                matches = re.findall(r't\([\'"]+([^\'")]+)[\'"]+\)', content)
                used_keys.update(matches)
            except (IOError, UnicodeDecodeError) as e:
                print(f"Warning: could not process file {os.path.join(root, f)}: {e}", file=sys.stderr)
    
    # Filter out non-translation keys
    # Note: check if key IS a path or ends with extension, not just contains it
    # e.g., "invoice.ts.description" (ts = timestamp) should NOT be filtered
    # but "components/Button.tsx" or "utils.ts" should be
    def is_likely_file_path(key: str) -> bool:
        if key.endswith('.ts') or key.endswith('.tsx') or key.endswith('.js') or key.endswith('.json'):
            return True
        if '/.ts' in key or '/.tsx' in key or '/.js' in key or '/.json' in key:
            return True
        if '\\.ts' in key or '\\.tsx' in key or '\\.js' in key or '\\.json' in key:
            return True
        return False
    
    filtered = {k for k in used_keys if len(k) > 1 
                and not any(x in k for x in ['../', '@', '\\', '#', '?'])
                and not is_likely_file_path(k)
                and k not in ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH']
                and not k.startswith('#')
                and k not in [',', '-', '.', ':', '?', ' ', '']}
    
    # Find missing keys
    real_missing = []
    for k in filtered:
        if k in en_keys:
            continue
        
        # Check if key matches any full key in en.json
        matched = False
        for ek in en_keys:
            if k in ek or ek.endswith(k):
                matched = True
                break
        
        if matched:
            continue
        
        # Filter out paths and obvious non-translations
        if k.startswith('./') or k.startswith('/') or k.startswith('x-') or k.startswith('user-'):
            continue
        # Use same logic - check if key IS a path or ends with extension
        if is_likely_file_path(k):
            continue
        if k in ['Authorization', 'Content-Disposition', 'IOPlatformUUID', 'REG_SZ']:
            continue
            
        real_missing.append(k)
    
    return missing_ns, sorted(real_missing)


def main():
    parser = argparse.ArgumentParser(description='Check translation keys in en.json')
    parser.add_argument('--verbose', '-v', action='store_true', help='Show detailed output')
    parser.add_argument('--fix', action='store_true', help='Generate fix suggestions')
    parser.add_argument('--src', default='src', help='Source directory')
    parser.add_argument('--json', default='src/i18n/messages/en.json', help='Path to en.json')
    args = parser.parse_args()
    
    missing_ns, missing_keys = check_translations(args.src, args.json, args.verbose)
    
    has_issues = False
    
    if missing_ns:
        has_issues = True
        print("=== MISSING NAMESPACES ===")
        for ns in missing_ns:
            print(f"  - {ns}")
            if args.fix:
                print(f"    → Add '{ns}' section to en.json")
    
    if missing_keys:
        has_issues = True
        print("\n=== MISSING TRANSLATION KEYS ===")
        for k in missing_keys:
            print(f"  - {k}")
            if args.fix:
                print(f"    → Add to appropriate namespace in en.json")
    
    if not has_issues:
        print("✓ All translation namespaces and keys are present in en.json")
        sys.exit(0)
    else:
        print(f"\nTotal: {len(missing_ns)} namespace(s), {len(missing_keys)} key(s) missing")
        sys.exit(1)


if __name__ == '__main__':
    main()
