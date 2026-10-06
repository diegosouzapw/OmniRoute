import sharp from "sharp";

type Rectangle = {
  height: number;
  value: number;
  width: number;
  x: number;
  y: number;
};

const FIXTURE_WIDTH = 256;
const FIXTURE_HEIGHT = 144;

async function renderJpeg(rectangles: readonly Rectangle[]): Promise<string> {
  const pixels = Buffer.alloc(FIXTURE_WIDTH * FIXTURE_HEIGHT * 3, 255);
  for (const rectangle of rectangles) {
    for (let y = rectangle.y; y < rectangle.y + rectangle.height; y++) {
      for (let x = rectangle.x; x < rectangle.x + rectangle.width; x++) {
        const offset = (y * FIXTURE_WIDTH + x) * 3;
        pixels[offset] = rectangle.value;
        pixels[offset + 1] = rectangle.value;
        pixels[offset + 2] = rectangle.value;
      }
    }
  }
  const jpeg = await sharp(pixels, {
    raw: { channels: 3, height: FIXTURE_HEIGHT, width: FIXTURE_WIDTH },
  })
    .jpeg({ chromaSubsampling: "4:4:4", quality: 100 })
    .toBuffer();
  return `data:image/jpeg;base64,${jpeg.toString("base64")}`;
}

export async function createVideoDedupFixtures(): Promise<{
  smallMotion: readonly [string, string];
  staticFrame: string;
  visibleText: readonly [string, string];
}> {
  const staticFrame = await renderJpeg([{ height: 48, value: 0, width: 48, x: 64, y: 48 }]);
  const movedFrame = await renderJpeg([{ height: 48, value: 0, width: 48, x: 68, y: 48 }]);
  // Rectangular strokes stand in for glyphs without depending on platform fonts.
  const textBefore = [
    { height: 64, value: 0, width: 8, x: 32, y: 32 },
    { height: 64, value: 0, width: 8, x: 48, y: 32 },
    { height: 64, value: 0, width: 8, x: 64, y: 32 },
  ] as const;
  const textAfter = [...textBefore, { height: 64, value: 0, width: 8, x: 80, y: 32 }] as const;
  return {
    smallMotion: [staticFrame, movedFrame],
    staticFrame,
    visibleText: [await renderJpeg(textBefore), await renderJpeg(textAfter)],
  };
}
