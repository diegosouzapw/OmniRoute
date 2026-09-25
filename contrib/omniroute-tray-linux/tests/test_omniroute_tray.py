#!/usr/bin/env python3
"""Unit tests for omniroute_tray module."""

import json
import os
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

# Ensure repo root is on sys.path
REPO_ROOT = Path(__file__).resolve().parent.parent
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

import omniroute_tray as tray


class TestCLI(unittest.TestCase):
    """Test CLI flags and invocations."""

    def test_help_flags(self):
        for flag in ["--help", "-h"]:
            res = subprocess.run(
                [sys.executable, str(REPO_ROOT / "omniroute_tray.py"), flag],
                capture_output=True,
                text=True,
                timeout=5,
            )
            self.assertEqual(res.returncode, 0, f"Failed for flag {flag}")
            self.assertIn("OmniRoute Tray", res.stdout)
            self.assertIn("Options:", res.stdout)

    def test_version_flags(self):
        for flag in ["--version", "-v"]:
            res = subprocess.run(
                [sys.executable, str(REPO_ROOT / "omniroute_tray.py"), flag],
                capture_output=True,
                text=True,
                timeout=5,
            )
            self.assertEqual(res.returncode, 0, f"Failed for flag {flag}")
            self.assertIn(f"v{tray.TRAY_VERSION}", res.stdout)

    def test_cost_range_flags(self):
        # --cost with --range should parse cleanly without unhandled argument error
        res = subprocess.run(
            [sys.executable, str(REPO_ROOT / "omniroute_tray.py"), "--cost", "--range", "7d"],
            capture_output=True,
            text=True,
            timeout=15,
        )
        # Should not throw unhandled exception or argparse crash
        self.assertNotIn("Traceback (most recent call last):", res.stderr)

    def test_snapshot_range_flags(self):
        # --snapshot with --range should parse cleanly and return valid JSON
        res = subprocess.run(
            [sys.executable, str(REPO_ROOT / "omniroute_tray.py"), "--snapshot", "--range", "30d"],
            capture_output=True,
            text=True,
            timeout=20,
        )
        self.assertEqual(res.returncode, 0)
        self.assertNotIn("Traceback", res.stderr)
        data = json.loads(res.stdout)
        self.assertIn("server_running", data)
        self.assertIn("doctor", data)
        self.assertIn("tray_version", data)

    def test_check_tray_cli(self):
        res = subprocess.run(
            [sys.executable, str(REPO_ROOT / "omniroute_tray.py"), "--check-tray"],
            capture_output=True,
            text=True,
            timeout=10,
        )
        self.assertEqual(res.returncode, 0)
        self.assertNotIn("Traceback", res.stderr)
        data = json.loads(res.stdout)
        self.assertIn("update_available", data)
        self.assertIn("local_commit", data)
        self.assertIn("remote_commit", data)


class TestProcessDetection(unittest.TestCase):
    """Test process commandline heuristic in _is_server_argv."""

    def test_direct_binary(self):
        self.assertTrue(tray._is_server_argv(["omniroute", "serve"]))
        self.assertTrue(tray._is_server_argv(["/usr/local/bin/omniroute", "serve"]))
        self.assertTrue(tray._is_server_argv(["omniroute", "serve", "--port", "20128"]))

    def test_script_host_wrapper(self):
        self.assertTrue(tray._is_server_argv(["node", "/path/to/omniroute", "serve"]))
        self.assertTrue(tray._is_server_argv(["nodejs", "/path/to/omniroute", "serve"]))
        self.assertTrue(tray._is_server_argv(["bun", "/home/user/.local/bin/omniroute", "serve"]))
        self.assertTrue(tray._is_server_argv(["python3", "/opt/omniroute", "serve"]))

    def test_unrelated_processes_rejected(self):
        # A grep or editor that mentions omniroute serve should not be flagged
        self.assertFalse(tray._is_server_argv(["grep", "omniroute serve"]))
        self.assertFalse(tray._is_server_argv(["vim", "omniroute", "serve.txt"]))
        self.assertFalse(tray._is_server_argv(["bash", "-c", "echo omniroute serve"]))
        # Non-serve subcommands
        self.assertFalse(tray._is_server_argv(["omniroute", "status"]))
        self.assertFalse(tray._is_server_argv(["omniroute", "version"]))
        self.assertFalse(tray._is_server_argv(["omniroute", "doctor"]))
        # Too short argv
        self.assertFalse(tray._is_server_argv(["omniroute"]))
        self.assertFalse(tray._is_server_argv([]))


class TestModelFormatting(unittest.TestCase):
    """Test derive_pretty_model_name taxonomy mappings."""

    def test_claude_models(self):
        self.assertEqual(tray.derive_pretty_model_name("claude-3-5-sonnet"), "Claude 3.5 Sonnet")
        self.assertEqual(tray.derive_pretty_model_name("claude-3-7-sonnet"), "Claude 3.7 Sonnet")
        self.assertEqual(
            tray.derive_pretty_model_name("claude-3-7-sonnet-thinking"),
            "Claude 3.7 Sonnet (Thinking)",
        )
        self.assertEqual(tray.derive_pretty_model_name("claude-3-5-haiku"), "Claude 3.5 Haiku")
        self.assertEqual(tray.derive_pretty_model_name("claude-3-opus"), "Claude 3 Opus")

    def test_openai_models(self):
        self.assertEqual(tray.derive_pretty_model_name("gpt-4o"), "GPT-4o")
        self.assertEqual(tray.derive_pretty_model_name("gpt-4o-mini"), "GPT-4o mini")
        self.assertEqual(tray.derive_pretty_model_name("o1"), "o1")
        self.assertEqual(tray.derive_pretty_model_name("o1-mini"), "o1-mini")
        self.assertEqual(tray.derive_pretty_model_name("o3"), "o3")
        self.assertEqual(tray.derive_pretty_model_name("o3-mini"), "o3-mini")
        self.assertEqual(tray.derive_pretty_model_name("gpt-4-turbo"), "GPT-4 Turbo")

    def test_deepseek_models(self):
        self.assertEqual(tray.derive_pretty_model_name("deepseek-r1"), "DeepSeek R1")
        self.assertEqual(tray.derive_pretty_model_name("deepseek-v3"), "DeepSeek V3")
        self.assertEqual(tray.derive_pretty_model_name("deepseek-reasoner"), "DeepSeek R1")

    def test_gemini_models(self):
        self.assertEqual(tray.derive_pretty_model_name("gemini-2.0-flash"), "Gemini 2.0 Flash")
        self.assertEqual(tray.derive_pretty_model_name("gemini-3.7-flash"), "Gemini 3.7 Flash")
        self.assertEqual(tray.derive_pretty_model_name("gemini-3.1-pro"), "Gemini 3.1 Pro")

    def test_kimi_models(self):
        self.assertEqual(tray.derive_pretty_model_name("kimi-k2"), "Kimi K2")
        self.assertEqual(tray.derive_pretty_model_name("kimi-k3"), "Kimi K3")


class TestUtilities(unittest.TestCase):
    """Test formatters and utility methods."""

    def test_format_tokens(self):
        self.assertEqual(tray.format_tokens(0), "0 tokens")
        self.assertEqual(tray.format_tokens(450), "450 tokens")
        self.assertEqual(tray.format_tokens(1500), "1.5K tokens")
        self.assertEqual(tray.format_tokens(2500000), "2.5M tokens")

    def test_compact_tokens(self):
        self.assertEqual(tray.compact_tokens(0), "0")
        self.assertEqual(tray.compact_tokens(500), "500")
        self.assertEqual(tray.compact_tokens(1500), "1.5K")
        self.assertEqual(tray.compact_tokens(2500000), "2.5M")

    def test_derive_short_tag(self):
        self.assertEqual(tray.derive_short_tag("monthly"), "mo")
        self.assertEqual(tray.derive_short_tag("weekly"), "wk")
        self.assertEqual(tray.derive_short_tag("session"), "sess")
        self.assertEqual(tray.derive_short_tag("5h"), "5h")
        self.assertEqual(tray.derive_short_tag("daily"), "1d")
        self.assertEqual(tray.derive_short_tag("custom (sess) limit"), "sess")

    def test_format_reset_countdown_invalid(self):
        self.assertEqual(tray.format_reset_countdown(None), "")
        self.assertEqual(tray.format_reset_countdown(""), "")
        self.assertEqual(tray.format_reset_countdown("not-a-date"), "")


class TestUsageCapability(unittest.TestCase):
    """Test connection usage support filtering to prevent log spam."""

    def test_supported_oauth_connections(self):
        self.assertTrue(tray.is_connection_usage_supported({"provider": "agy", "authType": "oauth"}))
        self.assertTrue(tray.is_connection_usage_supported({"provider": "kiro", "authType": "oauth"}))
        self.assertTrue(tray.is_connection_usage_supported({"provider": "claude", "authType": "oauth"}))

    def test_unsupported_connections(self):
        # API key providers not in APIKEY_USAGE_SUPPORTED_PROVIDERS
        self.assertFalse(tray.is_connection_usage_supported({"provider": "opencode", "authType": "apikey"}))
        self.assertFalse(tray.is_connection_usage_supported({"provider": "openrouter", "authType": "apikey"}))
        self.assertFalse(tray.is_connection_usage_supported({"provider": "nvidia", "authType": "apikey"}))
        self.assertFalse(tray.is_connection_usage_supported({"provider": "agentrouter", "authType": "apikey"}))
        # Empty or invalid
        self.assertFalse(tray.is_connection_usage_supported({}))
        self.assertFalse(tray.is_connection_usage_supported(None))

    def test_supported_apikey_connections(self):
        self.assertTrue(tray.is_connection_usage_supported({"provider": "deepseek", "authType": "apikey"}))
        self.assertTrue(tray.is_connection_usage_supported({"provider": "minimax", "authType": "api_key"}))


class TestSettings(unittest.TestCase):
    """Test settings persistence and migration resilience."""

    def test_defaults(self):
        s = tray.Settings()
        self.assertEqual(s.api_base, tray.DEFAULT_API_BASE)
        self.assertEqual(s.cost_range, "30d")
        self.assertEqual(s.percent_mode, "left")

    def test_save_and_load_with_unknown_fields(self):
        with tempfile.TemporaryDirectory() as tmpdir:
            test_file = Path(tmpdir) / "settings.json"
            with patch.object(tray, "SETTINGS_FILE", test_file), patch.object(
                tray, "APP_CONFIG_DIR", Path(tmpdir)
            ):
                # Save settings
                s = tray.Settings(api_base="http://127.0.0.1:20128", cost_range="7d")
                s.save()
                self.assertTrue(test_file.exists())

                # Add unknown field (simulating forward compatibility)
                raw = json.loads(test_file.read_text())
                raw["future_feature_key"] = "enabled"
                test_file.write_text(json.dumps(raw))

                # Load settings again; should succeed and ignore unknown field
                loaded = tray.Settings.load()
                self.assertEqual(loaded.cost_range, "7d")
                self.assertFalse(hasattr(loaded, "future_feature_key"))


class TestTrayUpdateLogic(unittest.TestCase):
    """Test check_tray_update evaluation logic."""

    @patch("omniroute_tray.get_tray_repo_dir", return_value=Path("/tmp/fake_repo"))
    @patch("omniroute_tray.get_tray_commit", return_value="abc1234")
    @patch("omniroute_tray.subprocess.run")
    def test_check_tray_update_available(self, mock_run, mock_commit, mock_repo):
        mock_proc = unittest.mock.MagicMock()
        mock_proc.returncode = 0
        mock_proc.stdout = "def5678901234567890\trefs/heads/main\n"
        mock_run.return_value = mock_proc

        res = tray.check_tray_update()
        self.assertTrue(res["success"])
        self.assertTrue(res["update_available"])
        self.assertEqual(res["remote_commit"], "def5678")
        self.assertIn("Update available", res["message"])

    @patch("omniroute_tray.get_tray_repo_dir", return_value=Path("/tmp/fake_repo"))
    @patch("omniroute_tray.get_tray_commit", return_value="abc1234")
    @patch("omniroute_tray.subprocess.run")
    def test_check_tray_already_up_to_date(self, mock_run, mock_commit, mock_repo):
        mock_proc = unittest.mock.MagicMock()
        mock_proc.returncode = 0
        mock_proc.stdout = "abc1234901234567890\trefs/heads/main\n"
        mock_run.return_value = mock_proc

        res = tray.check_tray_update()
        self.assertTrue(res["success"])
        self.assertFalse(res["update_available"])
        self.assertEqual(res["message"], "Up to date with latest release")


if __name__ == "__main__":
    unittest.main()
