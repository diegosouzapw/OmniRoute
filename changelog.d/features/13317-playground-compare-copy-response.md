- **feat(playground): copy an individual Compare column's response.** Each column in the Compare
  tab now has a copy button beside the remove button, reusing the existing `useCopyToClipboard`
  hook to copy that column's response text and show a checkmark while `disabled` on an empty
  response. (The independent-scrolling half of this PR was already fixed separately in #13532.)
  (#13317 — thanks @ventulus95)
