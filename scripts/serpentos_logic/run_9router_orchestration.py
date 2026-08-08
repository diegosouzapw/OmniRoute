#!/usr/bin/env python3
"""
🌐 9Router Multi-Agent Delegation & Orchestrator Suite
Executes a multi-agent orchestration workflow using 9Router proxy (:20128/v1):
1. Planning Agent (free-reasoning): Formulates architectural step-by-step pipeline.
2. Coding Agent (free-coder): Synthesizes concrete configurations / code blocks.
3. Reviewing Agent (free-agent): Performs Quality Assurance & DoD check.
"""

import argparse
import json
import os
import sys
from pathlib import Path
from delegate_via_9router import delegate_task


def run_orchestration(task_description: str, save_report: Path = None):
    print("=" * 70)
    print("🚀 9ROUTER MULTI-AGENT PROXY ORCHESTRATION SUITE")
    print("=" * 70)

    # 1. Planning Phase
    print("\n🧠 [Stage 1/3] Delegating to PLANNING agent (free-reasoning)...")
    plan_res = delegate_task(
        role="planning",
        system_prompt="You are an expert AI Architect and Orchestrator. Produce concise, highly actionable step-by-step execution plans.",
        prompt=f"Create a concise 3-step execution plan for the following task: {task_description}"
    )
    plan_text = plan_res.get("response", "Error generating plan") if plan_res["status"] == "success" else f"Error: {plan_res.get('error')}"
    print(f"── Plan Output ──\n{plan_text}")

    # 2. Coding Phase
    print("\n💻 [Stage 2/3] Delegating to CODING agent (free-coder)...")
    code_res = delegate_task(
        role="coding",
        system_prompt="You are a Principal Software & AI Pipeline Engineer. Output clean configuration JSON or code corresponding to the plan.",
        prompt=f"Based on this plan:\n{plan_text}\n\nGenerate a concise configuration JSON or execution command snippet for: {task_description}"
    )
    code_text = code_res.get("response", "Error generating code") if code_res["status"] == "success" else f"Error: {code_res.get('error')}"
    print(f"── Code Output ──\n{code_text}")

    # 3. Reviewing Phase
    print("\n🔍 [Stage 3/3] Delegating to REVIEWING agent (free-agent)...")
    review_res = delegate_task(
        role="reviewing",
        system_prompt="You are a Lead QA & DoD Verification Specialist. Verify compliance and report pass/fail.",
        prompt=f"Review the following execution plan and configuration snippet against production standards:\nPlan: {plan_text}\nConfig: {code_text}\nGive a brief verification verdict."
    )
    review_text = review_res.get("response", "Error generating review") if review_res["status"] == "success" else f"Error: {review_res.get('error')}"
    print(f"── Review Output ──\n{review_text}")

    report = {
        "task": task_description,
        "stages": {
            "planning": {"model": plan_res.get("model"), "output": plan_text},
            "coding": {"model": code_res.get("model"), "output": code_text},
            "reviewing": {"model": review_res.get("model"), "output": review_text}
        }
    }

    if save_report:
        save_report.parent.mkdir(parents=True, exist_ok=True)
        with open(save_report, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)
        print(f"\n📑 Saved full orchestration report to: {save_report}")

    print("=" * 70)
    return report


def main():
    parser = argparse.ArgumentParser(description="Run 3-stage 9Router Multi-Agent Orchestration")
    parser.add_argument("--task", type=str, required=True, help="Task description to orchestrate")
    parser.add_argument("--output", type=Path, default=Path("output/9router_orchestration_report.json"),
                        help="Path to save JSON report")
    args = parser.parse_args()

    run_orchestration(args.task, save_report=args.output)


if __name__ == "__main__":
    main()
