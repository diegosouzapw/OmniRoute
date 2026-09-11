/**
 * Scroll-to-weave mapping and the micro-camera.
 *
 * Kept pure and separate from the component so the mapping can be tested
 * directly: it is the part that has to stay exactly reversible and exactly
 * deterministic, whatever the scroll input was.
 */

/** Normalises to [0, 1], collapsing -0 and NaN to 0 so uniforms stay clean. */
const clamp01 = (value: number) => (value > 0 ? (value > 1 ? 1 : value) : 0);

/**
 * Weaving progress for a sticky stage inside a taller section.
 *
 * `rectTop` is the section's offset from the top of the viewport, so progress is
 * a pure function of scroll position — scrolling back up runs the weave backward
 * through exactly the same states, and interrupting a scroll leaves it wherever
 * the page actually is rather than wherever an animation had got to.
 */
export function scrollProgress(rectTop: number, sectionHeight: number, stageHeight: number): number {
  const travel = sectionHeight - stageHeight;
  if (!Number.isFinite(travel) || travel <= 0) return rectTop <= 0 ? 1 : 0;
  return clamp01(-rectTop / travel);
}

/**
 * Frame-rate independent approach toward the scroll target, so the weave
 * follows the page without snapping on a flung scroll. Settles exactly on the
 * target rather than creeping, which is what lets the render loop go idle.
 */
export function approach(current: number, target: number, dt: number, responsiveness = 9): number {
  if (!Number.isFinite(dt) || dt <= 0) return current;
  // Cap the step so a backgrounded tab resumes in a few frames instead of one
  // jump, without ever drifting out of sync with the real scroll position.
  const step = 1 - Math.exp(-responsiveness * Math.min(dt, 0.1));
  const next = current + (target - current) * step;
  return Math.abs(target - next) < 1e-4 ? target : next;
}

/**
 * A single slow swell of magnification across the section: the view drifts in
 * far enough to read individual knots and fibres around the middle of the weave,
 * and back out to the whole rug at either end. Uniform, so the carpet's
 * proportions never change.
 */
export function cameraZoom(progress: number, maxZoom: number): number {
  const swell = Math.sin(Math.PI * clamp01(progress));
  return 1 + (maxZoom - 1) * swell * swell;
}

/**
 * The point the magnified view holds on. Follows the weaving front part of the
 * way, so the detail the camera drifts into is the work in progress rather than
 * a fixed point on the rug.
 */
export function cameraFocus(progress: number, zoom: number): number {
  const inset = 1 - 1 / zoom;
  if (inset < 1e-4) return 0.5;
  // Where the visible window should be centred, biased toward the front.
  const centre = 0.5 + (clamp01(progress) - 0.5) * 0.6;
  return clamp01((centre - 0.5 / zoom) / inset);
}

/**
 * Fade on the live thread tension at the weaving front. Full while the weave is
 * moving, easing off shortly after it stops, so an idle page settles to a still
 * rug and the render loop can stop drawing.
 */
export function tensionLevel(msSinceMotion: number, holdMs = 2200, fadeMs = 900): number {
  if (!Number.isFinite(msSinceMotion) || msSinceMotion < 0) return 1;
  if (msSinceMotion <= holdMs) return 1;
  return clamp01(1 - (msSinceMotion - holdMs) / fadeMs);
}

/**
 * Fits the rug into a box without ever changing its proportions.
 */
export function fitRug(
  boxWidth: number,
  boxHeight: number,
  aspectRatio: number
): { width: number; height: number } {
  if (boxWidth <= 0 || boxHeight <= 0) return { width: 0, height: 0 };
  const width = Math.min(boxWidth, boxHeight * aspectRatio);
  return { width, height: width / aspectRatio };
}
