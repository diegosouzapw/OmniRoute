"use client";

/**
 * Scroll-driven weaving of the MiLADEiA rug.
 *
 * The section is a tall scroll track with a sticky stage. As the page moves, the
 * rug is knotted onto a bare loom from the top down: warp cords first, then weft
 * shots, then rows of coloured knots that grow, are beaten down and sheared. The
 * artwork is the source of truth throughout — it is quantised onto the rug's own
 * knot lattice and rebuilt from it, never faded or wiped in.
 *
 * Degrades in three steps: no WebGL, a reduced-motion preference, or a failed
 * init all leave the finished rug on screen as a plain image, which is also what
 * renders before the canvas is ready.
 */
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

import { detectTier, FrameBudget, lowerTier, type QualityTier } from "./quality";
import { withBasePath } from "@/shared/utils/basePath";

import { RUG_SOURCE } from "./rugSource";
import { WeaveRenderer } from "./weaveRenderer";
import {
  approach,
  cameraFocus,
  cameraZoom,
  fitRug,
  scrollProgress,
  tensionLevel,
} from "./weaveProgress";

export interface WeavingRugProps {
  /** Scroll distance the weave takes, in viewport heights. */
  scrollLength?: number;
  /**
   * How far the micro-camera drifts in at the middle of the weave. Kept small
   * on purpose: magnification crops, and losing the rug's outer guard borders
   * costs more than the extra fibre detail is worth.
   */
  maxZoom?: number;
  /** Alternative text for the rug. */
  alt?: string;
  className?: string;
}

const DEFAULT_ALT =
  'Hand-knotted Persian rug with a stepped central medallion and the word "MiLADEiA" woven into it in cream silk.';

/**
 * Layout is carried by the component's own stylesheet rather than utility
 * classes, so the rug sizes correctly wherever it is dropped in. The doubled
 * height declarations are deliberate: `svh` is a fixed fraction of the viewport,
 * so a mobile browser hiding its URL bar cannot resize the sticky stage
 * mid-scroll, and the `vh` line before it is the fallback for anything that does
 * not understand `svh`.
 */
const STYLES = `
.omniroute-weave {
  position: relative;
  height: calc(var(--omniroute-weave-track) * 100vh);
  height: calc(var(--omniroute-weave-track) * 100svh);
}
.omniroute-weave__stage {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  height: 100vh;
  height: 100svh;
  padding: 2rem 1rem;
}
@media (min-width: 640px) {
  .omniroute-weave__stage { padding: 3rem 2rem; }
}
.omniroute-weave__frame { position: relative; }
.omniroute-weave__art,
.omniroute-weave__canvas {
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
}
.omniroute-weave__art { object-fit: contain; }
.omniroute-weave__canvas {
  opacity: 0;
  transition: opacity 520ms cubic-bezier(0, 0, 0.2, 1);
}
.omniroute-weave__canvas[data-woven="true"] { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .omniroute-weave__canvas { transition: none; }
}
`;

export default function WeavingRug({
  scrollLength = 3.2,
  maxZoom = 1.06,
  alt = DEFAULT_ALT,
  className,
}: WeavingRugProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [frame, setFrame] = useState<{ width: number; height: number } | null>(null);
  const [woven, setWoven] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);
  const nearRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Live state the render loop owns. Kept in refs so scrolling never re-renders.
  const progressRef = useRef(0);
  const lastMotionRef = useRef(0);
  const tierRef = useRef<QualityTier>("medium");
  const rendererRef = useRef<WeaveRenderer | null>(null);
  const boxRef = useRef({ width: 0, height: 0 });
  const maxZoomRef = useRef(maxZoom);
  const controlRef = useRef<{ resume: () => void; pause: () => void } | null>(null);

  useEffect(() => {
    maxZoomRef.current = maxZoom;
  }, [maxZoom]);

  useEffect(() => {
    nearRef.current = nearViewport;
  }, [nearViewport]);

  /** Fits the rug to the stage without distorting it. */
  const measure = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const style = getComputedStyle(stage);
    const padX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const padY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const next = fitRug(
      stage.clientWidth - padX,
      stage.clientHeight - padY,
      RUG_SOURCE.aspectRatio
    );
    if (next.width <= 0) return;
    // Sub-pixel churn would resize the drawing buffer every frame on some zooms.
    if (Math.abs(next.width - boxRef.current.width) < 0.5) return;
    boxRef.current = next;
    setFrame(next);
  }, []);

  useEffect(() => {
    measure();
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    return () => observer.disconnect();
  }, [measure]);

  // A visitor who asks for less motion gets the finished rug, and gets it back
  // the moment they change their mind.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // Hold off initialising until the section is close enough to matter, so the
  // rest of the page is never waiting on the rug.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setNearViewport(entry.isIntersecting), {
      rootMargin: "150% 0px",
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const measured = frame !== null;

  useEffect(() => {
    if (!measured || reducedMotion) return;

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    const stage = stageRef.current;
    const image = imageRef.current;
    if (!canvas || !section || !stage || !image) return;

    let cancelled = false;
    let raf = 0;
    let running = false;
    let starting = false;
    let lastFrameTime = 0;
    let hasDrawn = false;
    const budget = new FrameBudget();

    const loop = (now: number) => {
      const renderer = rendererRef.current;
      if (!renderer || !running) return;
      raf = requestAnimationFrame(loop);
      const dt = lastFrameTime ? (now - lastFrameTime) / 1000 : 1 / 60;
      lastFrameTime = now;

      const box = boxRef.current;
      renderer.resize(box.width, box.height, window.devicePixelRatio || 1);

      const rect = section.getBoundingClientRect();
      const target = scrollProgress(rect.top, rect.height, stage.clientHeight);
      const previous = progressRef.current;
      const progress = approach(previous, target, dt);
      progressRef.current = progress;

      const moved = Math.abs(progress - previous) > 1e-5;
      if (moved) lastMotionRef.current = now;
      const tension = tensionLevel(now - lastMotionRef.current);

      // Nothing has changed and the front has settled: hold the last frame
      // rather than redrawing it, so an idle page costs no GPU time.
      if (moved || tension > 0.01 || !hasDrawn) {
        const zoom = cameraZoom(progress, maxZoomRef.current);
        renderer.render({
          progress,
          time: now / 1000,
          zoom,
          focusY: cameraFocus(progress, zoom),
          tension,
        });
        if (!hasDrawn) {
          hasDrawn = true;
          setWoven(true);
        }
      }

      if (budget.record(dt * 1000)) {
        const next = lowerTier(tierRef.current);
        if (next) {
          tierRef.current = next;
          renderer.setTier(next);
          budget.reset();
        }
      }
    };

    const start = async () => {
      if (starting || rendererRef.current) return;
      starting = true;
      try {
        // The fallback image is also the texture, so nothing is downloaded twice.
        await image.decode();
      } catch {
        starting = false;
        return;
      }
      if (cancelled) return;

      tierRef.current = detectTier();
      try {
        rendererRef.current = new WeaveRenderer(canvas, image, tierRef.current);
      } catch {
        // No WebGL, a lost context during init, a driver refusal — fall back to
        // the image underneath, which is already the finished rug.
        starting = false;
        setWoven(false);
        return;
      }
      starting = false;
      if (cancelled) {
        rendererRef.current.dispose();
        rendererRef.current = null;
        return;
      }
      if (running) raf = requestAnimationFrame(loop);
    };

    // The context is built once and then kept. Disposing it would call
    // `loseContext()`, and a canvas whose context has been force-lost can never
    // hand out another one — so scrolling away only stops the loop.
    const resume = () => {
      if (running || cancelled) return;
      running = true;
      lastFrameTime = 0;
      if (rendererRef.current) raf = requestAnimationFrame(loop);
      else void start();
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    controlRef.current = { resume, pause };

    const onContextLost = (event: Event) => {
      // Preventing the default is what makes the browser willing to restore it.
      event.preventDefault();
      pause();
      rendererRef.current = null;
      hasDrawn = false;
      setWoven(false);
    };
    const onContextRestored = () => {
      hasDrawn = false;
      lastFrameTime = 0;
      budget.reset();
      void start();
    };

    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);
    if (nearRef.current) resume();

    return () => {
      cancelled = true;
      pause();
      controlRef.current = null;
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      rendererRef.current?.dispose();
      rendererRef.current = null;
      setWoven(false);
    };
    // Deliberately not keyed on visibility or on the frame size: resizes reach
    // the renderer through `boxRef`, and scrolling away only pauses the loop.
  }, [measured, reducedMotion]);

  // Draw only while the section is worth drawing.
  useEffect(() => {
    if (nearViewport) controlRef.current?.resume();
    else controlRef.current?.pause();
  }, [nearViewport]);

  const frameStyle = frame
    ? { width: `${frame.width}px`, height: `${frame.height}px` }
    : { height: "100%", aspectRatio: `${RUG_SOURCE.aspectRatio}`, maxWidth: "100%" };

  return (
    <>
      {/* React dedupes this by `href`, so several rugs on a page share one copy. */}
      <style href="omniroute-weave" precedence="default">
        {STYLES}
      </style>
      <section
        ref={sectionRef}
        className={className ? `omniroute-weave ${className}` : "omniroute-weave"}
        style={{ "--omniroute-weave-track": scrollLength } as CSSProperties}
      >
        <div ref={stageRef} className="omniroute-weave__stage">
          <div className="omniroute-weave__frame" style={frameStyle}>
            {/* The finished rug. Visible until the weave is running, and the only
                thing shown where WebGL or motion is unavailable. It is also the
                texture the renderer reads, so it is never downloaded twice. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- the
                renderer uploads this element to the GPU as its texture, so it
                has to be a plain <img> whose bytes are the artwork; next/image
                would re-encode and swap it out from under the upload. */}
            <img
              ref={imageRef}
              className="omniroute-weave__art"
              // public/ assets are not covered by Next's assetPrefix, so a
              // subpath deploy needs the basePath applied by hand.
              src={withBasePath(RUG_SOURCE.artwork)}
              alt={alt}
              width={960}
              height={Math.round(960 / RUG_SOURCE.aspectRatio)}
              loading="lazy"
              decoding="async"
              onLoad={measure}
            />
            <canvas
              ref={canvasRef}
              className="omniroute-weave__canvas"
              data-woven={woven ? "true" : "false"}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>
    </>
  );
}
