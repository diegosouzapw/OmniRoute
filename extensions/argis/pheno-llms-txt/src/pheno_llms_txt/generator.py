"""Generator for the v1-spec llms.txt file."""

from __future__ import annotations

import sys
from dataclasses import dataclass
from pathlib import Path

try:
    import structlog
    log = structlog.get_logger(__name__)
except ImportError:  # pragma: no cover
    import logging
    log = logging.getLogger(__name__)  # type: ignore[assignment]


@dataclass(frozen=True)
class Section:
    """A section of the llms.txt index.

    `links` is a list of `(title, url)` tuples. An optional third
    element `(title, url, description)` is also accepted.
    """

    title: str
    links: list[tuple[str, str]] | list[tuple[str, str, str]]

    def __post_init__(self) -> None:
        if not self.title:
            raise ValueError("Section.title must be non-empty")
        if not self.links:
            raise ValueError(f"Section {self.title!r} must have at least one link")


def _render_link(link: tuple[str, ...]) -> str:
    title, url = link[0], link[1]
    desc = link[2] if len(link) >= 3 else ""
    if desc:
        return f"- [{title}]({url}): {desc}"
    return f"- [{title}]({url})"


def _render_section(section: Section) -> str:
    lines = [f"## {section.title}", ""]
    for link in section.links:
        lines.append(_render_link(link))
    return "\n".join(lines)


def generate(
    project_name: str,
    summary: str,
    sections: list[Section],
    out_path: str | Path = "llms.txt",
) -> str:
    """Render the llms.txt content; write to ``out_path`` (or stdout if ``-``).

    Returns the rendered text. Sections + links are sorted deterministically
    by title for stable diffs.
    """
    if not project_name:
        raise ValueError("project_name must be non-empty")
    if not summary:
        raise ValueError("summary must be non-empty")

    sorted_sections = sorted(sections, key=lambda s: s.title)
    body = "\n\n".join(_render_section(s) for s in sorted_sections)
    text = f"# {project_name}\n\n> {summary}\n\n{body}\n"

    if str(out_path) == "-":
        sys.stdout.write(text)
    else:
        Path(out_path).write_text(text, encoding="utf-8")
        log.info("llms_txt.generated", project=project_name, path=str(out_path), sections=len(sections))
    return text
