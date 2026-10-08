export interface TagBlock {
  /** Index of the opening tag. */
  start: number;
  /** Index just past the closing tag. */
  end: number;
  /** Text between the tags, untrimmed. */
  inner: string;
}

function globalCopy(re: RegExp): RegExp {
  return new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`);
}

/**
 * Every `open ... close` block in `text`, in order, found by scanning forward once. A single
 * pattern such as `<tag>\s*([\s\S]*?)\s*<\/tag>` has overlapping whitespace classes and a lazy
 * scan that restarts at every opening tag, so a long run of spaces or of unclosed tags makes it
 * quadratic or worse. This is used on text the caller or an upstream model controls, where that
 * would stall the event loop for every other request. An opening tag with no closing tag after it
 * ends the scan, since no later opening tag can be closed either.
 */
export function findTagBlocks(text: string, openTag: RegExp, closeTag: RegExp): TagBlock[] {
  const open = globalCopy(openTag);
  const close = globalCopy(closeTag);
  const blocks: TagBlock[] = [];
  let position = 0;
  for (;;) {
    open.lastIndex = position;
    const opening = open.exec(text);
    if (!opening) break;
    const innerStart = opening.index + opening[0].length;
    close.lastIndex = innerStart;
    const closing = close.exec(text);
    if (!closing) break;
    const end = closing.index + closing[0].length;
    blocks.push({
      start: opening.index,
      end,
      inner: text.slice(innerStart, closing.index),
    });
    position = end;
  }
  return blocks;
}
