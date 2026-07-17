"""The llms.txt v1 format spec — pinned as a module constant.

This module is the source of truth for the format version we emit. The
external canonical spec lives at <https://llmstxt.org>.
"""

from __future__ import annotations

#: The format version of the llms.txt we emit. Bumping this constant
#: implies a breaking change to consumers.
FORMAT_VERSION = "v1"
