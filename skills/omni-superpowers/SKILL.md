---
name: Omni Superpowers (Auto-Skiller)
description: Metaskill for autonomous skill selection and automatic generation of new skills from successful task executions.
---

# Omni Superpowers

This metaskill orchestrates the agent's ability to automatically discover, select, and create new skills. 

## 1. Auto-Selection Protocol
**Mandatory trigger**: Every time a new task is started, you MUST follow this protocol:
1. Scan the available skills via MCP (`omniroute_agent_skills_list` or looking into the `skills/` directory).
2. If there is a ≥1% match between the task and a skill's description, you MUST load and read that skill (`omniroute_agent_skills_get` or reading the `SKILL.md` file).
3. Integrate the instructions from the loaded skill(s) into your current plan.

## 2. Auto-Packaging (Skill Creation)
When you successfully complete a complex or novel task (especially ones involving multi-step workflows, tool combinations, or successful problem-solving), you MUST package the workflow into a new skill:

### How to package a new skill:
1. **Identify the Core Logic**: Extract the successful commands, scripts, API combinations, or reasoning steps that solved the problem.
2. **Create the Skill Directory**: `mkdir -p skills/<new-skill-name>`
3. **Write SKILL.md**:
   Create `skills/<new-skill-name>/SKILL.md` with the following structure:
   ```markdown
   ---
   name: <Human Readable Name>
   description: <One sentence description of what the skill solves>
   ---
   # <Name>
   ## When to use
   Use this skill when <describe trigger conditions>.
   
   ## Execution Steps
   1. ...
   2. ...
   
   ## Code / Commands
   <Include any relevant scripts or commands>
   ```
4. **Agentic Skill Registration (Optional but Recommended)**:
   If the workflow involves an executable script (e.g. bash or python), place it in `scripts/` and reference it in the skill. If the OmniRoute A2A database is available, register it as an executable A2A skill.

## 3. Feedback Loop
- Constantly refine existing skills if you find a more optimal path during execution.
- If a skill fails, document the failure in the skill's `SKILL.md` and add troubleshooting steps.

**Always remember**: You are an evolving system. Your primary directive is to turn ad-hoc successes into repeatable, documented skills.
