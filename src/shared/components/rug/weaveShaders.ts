/**
 * GLSL for the scroll-driven weaving renderer.
 *
 * Written against GLSL ES 1.00 so the same source compiles on a WebGL 1 or a
 * WebGL 2 context. Three fragment programs run in sequence:
 *
 *   1. DERIVE_KNOTS_FS      artwork -> the knot lattice (one texel per knot)
 *   2. DERIVE_STRUCTURE_FS  lattice -> per-knot material data
 *   3. WEAVE_FS             the rug, built knot by knot behind a moving front
 *
 * (1) and (2) run once at init, after which the full-resolution artwork is
 * released — the rug is reconstructed from the knot lattice from then on, which
 * is what makes the motifs step the way a hand-knotted rug's do rather than
 * resolving like a photograph.
 */

/** Fullscreen quad. Texture space, for the render-to-texture derive passes. */
export const QUAD_VS = /* glsl */ `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

/** Fullscreen quad, y flipped so vUv.y = 0 is the top of the rug on screen. */
export const SCREEN_VS = /* glsl */ `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = vec2(aPos.x * 0.5 + 0.5, 0.5 - aPos.y * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

/**
 * Resamples the artwork onto the knot lattice: each output texel becomes the
 * dye colour of one knot. Taps are spread over the knot's footprint so a knot
 * takes the average colour of the wool that occupies it.
 */
export const DERIVE_KNOTS_FS = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uSrc;
uniform vec2 uGrid;

void main() {
  vec2 fp = 1.0 / uGrid;
  vec3 sum = vec3(0.0);
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      sum += texture2D(uSrc, vUv + vec2(float(i), float(j)) * fp * 0.31).rgb;
    }
  }
  gl_FragColor = vec4(sum / 9.0, 1.0);
}
`;

/**
 * Per-knot material data:
 *   R  pile bias      Dark, iron-mordanted wool corrodes and wears lower than the
 *                     light wool beside it — the relief an aged Persian rug has.
 *   G  motif contour  Where a motif changes colour the weaver changed yarn, and
 *                     the pile is fractionally disturbed along that seam.
 *   B  inscription    Coverage of the cream silk forming "MiLADEiA", so the
 *                     letters carry the slightly higher, glossier pile they have
 *                     on the real rug.
 */
export const DERIVE_STRUCTURE_FS = /* glsl */ `
precision highp float;
varying vec2 vUv;
uniform sampler2D uKnots;
uniform vec2 uGrid;
uniform vec4 uInscription;
uniform float uInkThreshold;

float lum(vec2 uv) {
  return dot(texture2D(uKnots, uv).rgb, vec3(0.2126, 0.7152, 0.0722));
}

void main() {
  vec2 t = 1.0 / uGrid;
  float tl = lum(vUv + vec2(-t.x, -t.y));
  float tc = lum(vUv + vec2(0.0, -t.y));
  float tr = lum(vUv + vec2(t.x, -t.y));
  float ml = lum(vUv + vec2(-t.x, 0.0));
  float mm = lum(vUv);
  float mr = lum(vUv + vec2(t.x, 0.0));
  float bl = lum(vUv + vec2(-t.x, t.y));
  float bc = lum(vUv + vec2(0.0, t.y));
  float br = lum(vUv + vec2(t.x, t.y));

  float gx = -tl - 2.0 * ml - bl + tr + 2.0 * mr + br;
  float gy = -tl - 2.0 * tc - tr + bl + 2.0 * bc + br;
  float edge = clamp(length(vec2(gx, gy)) * 0.7, 0.0, 1.0);

  float pile = 0.42 + 0.58 * smoothstep(0.04, 0.62, mm);

  float inBand =
    step(uInscription.x, vUv.x) * step(vUv.x, uInscription.z) *
    step(uInscription.y, vUv.y) * step(vUv.y, uInscription.w);
  float ink = inBand * smoothstep(uInkThreshold - 0.07, uInkThreshold + 0.09, mm);

  gl_FragColor = vec4(pile, edge, ink, 1.0);
}
`;

/**
 * The weave itself.
 *
 * Everything below the weaving front is bare warp on the loom. Everything above
 * it is pile: two tufts per knot, each shaded as a cylinder, standing on a
 * foundation of warps the knot is tied around and wefts beaten down between the
 * rows. The front is not a line — it is a zigzag left by the shuttle crossing
 * one row at a time, roughened because no weaver keeps a straight edge, and the
 * pile behind it is still untrimmed for a few dozen rows before it settles.
 */
export const WEAVE_FS = /* glsl */ `
precision highp float;
varying vec2 vUv;

uniform sampler2D uKnots;
uniform sampler2D uStructure;
uniform vec2  uGrid;
uniform float uProgress;
uniform float uTime;
uniform float uZoom;
uniform vec2  uFocus;
uniform float uPixelsPerKnot;
uniform float uOctaves;
uniform float uAnim;

/** Undyed cotton the rug is strung and wefted with. */
const vec3 FOUNDATION = vec3(0.795, 0.735, 0.640);
/** Shadow behind the warps, where the loom is. */
const vec3 LOOM = vec3(0.038, 0.030, 0.028);

/**
 * Exposure returning the lit pile to the artwork's own value. Diffuse and
 * occlusion together average well below 1, so without this the rug renders
 * darker and muddier than the carpet it was measured from.
 */
const float EXPOSURE = 1.63;

/** Rows over which a knot goes from just-tied to standing at full height. */
const float PILE_RAMP    = 14.0;
/** Rows the pile stays shaggy and unsheared behind the front. */
const float TRIM_RAMP    = 55.0;
/** Rows the front leans by across the width — knots are tied in one direction. */
const float SHUTTLE_SKEW = 5.0;
/** Rows of slow undulation in the front, from uneven tension across the warp. */
const float FRONT_WAVE   = 14.0;
/** Rows either side of the front where the working weft shots are exposed. */
const float WEFT_SPAN    = 2.6;
/** Rows of knot-scale fray along the front. */
const float FRONT_ROUGH  = 3.5;
/**
 * Rows already on the loom at progress 0. Enough that the start of the weave
 * reads as a rug being begun rather than as an empty black stage.
 */
const float CAST_ON      = 26.0;
const vec3  LUMA         = vec3(0.2126, 0.7152, 0.0722);

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

vec2 hash22(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
  q += dot(q, q.yzx + 33.33);
  return fract((q.xx + q.yz) * q.zy);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = p - i;
  f = f * f * (3.0 - 2.0 * f);
  float a = hash22(i).x;
  float b = hash22(i + vec2(1.0, 0.0)).x;
  float c = hash22(i + vec2(0.0, 1.0)).x;
  float d = hash22(i + vec2(1.0, 1.0)).x;
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

/**
 * Detail that has dropped below the pixel grid is faded toward its mean rather
 * than left to alias: knot-scale structure first, then the finer warp and fibre
 * scale. This is also what keeps a low-DPR phone looking like textile instead of
 * moire.
 */
float knotDetail() { return smoothstep(0.75, 2.30, uPixelsPerKnot); }
float microDetail() { return smoothstep(1.60, 4.20, uPixelsPerKnot); }

/** Cylindrical cross-section — the profile a real strand shades with. */
float strand(float d, float w) {
  float t = clamp(abs(d) / w, 0.0, 1.0);
  return sqrt(max(0.0, 1.0 - t * t));
}

/** Fine strands within a tuft, stretched along the direction the fibre runs. */
float fibre(vec2 p) {
  vec2 q = vec2(p.x * 8.0 - p.y * 0.9, p.y * 1.6);
  float n = vnoise(q);
  if (uOctaves > 1.5) n = n * 0.68 + 0.32 * vnoise(q * vec2(2.3, 1.9));
  if (uOctaves > 2.5) n = n * 0.80 + 0.20 * vnoise(q * vec2(5.1, 3.3));
  return mix(0.5, n, microDetail());
}

/**
 * Rows woven past this point. Positive is behind the front (woven), negative is
 * still bare warp. Returned alongside the three states it drives.
 */
float weavingState(vec2 p, out float pile, out float trim, out float weftLive) {
  float frontRow = CAST_ON + uGrid.y * uProgress
                 + (PILE_RAMP + TRIM_RAMP + CAST_ON) * uProgress * uProgress * uProgress;

  float rowIdx = floor(p.y);

  // The weaver works each row in one direction, so the front leans rather than
  // running level, undulates with the tension across the warp, and frays at the
  // knot scale. None of the three is a straight horizontal edge.
  float t = frontRow - p.y - (p.x / uGrid.x - 0.5) * SHUTTLE_SKEW;
  t += (vnoise(vec2(p.x * 0.012, 7.3)) - 0.5) * FRONT_WAVE;
  t += (vnoise(vec2(p.x * 0.055, rowIdx * 0.37)) - 0.5) * FRONT_ROUGH;

  pile = clamp(t / PILE_RAMP, 0.0, 1.0);
  trim = clamp((t - PILE_RAMP) / TRIM_RAMP, 0.0, 1.0);
  weftLive = exp(-(t * t) / (WEFT_SPAN * WEFT_SPAN));
  return t;
}

/**
 * Shape of the pile surface, independent of how far the knot has grown.
 * Sampled three times to build the normal.
 */
float heightAt(vec2 p, float trim, vec3 st) {
  vec2 cell = floor(p);
  vec2 f = p - cell;
  vec2 r1 = hash22(cell);
  vec2 r2 = hash22(cell + vec2(17.3, 41.7));

  // A Persian knot presents two tufts, leaning down the nap.
  float lean = 0.13 * (f.y - 0.5);
  float c1 = 0.27 + r1.x * 0.09 + lean;
  float c2 = 0.73 - r1.y * 0.09 + lean;
  float w = 0.235 + r2.x * 0.065;
  float tuft = max(strand(f.x - c1, w), strand(f.x - c2, w));
  float row = strand(f.y - 0.5, 0.56 + r2.y * 0.10);

  // The groove between rows is cut deeper than the one between tufts: a beaten
  // weft pulls the rows apart harder than the knot collar separates its lobes.
  row *= row;
  float h = mix(0.42, tuft * row, knotDetail()) * (0.80 + 0.40 * r1.y);
  h *= 0.62 + 0.38 * st.r;
  h *= 1.0 + 0.09 * st.b;
  h *= 1.0 + 0.06 * st.g;
  h *= 1.0 + 0.22 * (fibre(p) - 0.5);
  return h * mix(1.18, 1.0, trim);
}

/**
 * Pile shadowing itself. Marches a few steps toward the light and asks whether
 * anything upstream stands high enough to block it. This is what stops the
 * weave reading as a bumpy photograph: without it every tuft is lit from the
 * same angle regardless of what is in front of it.
 */
float selfShadow(vec2 p, float h, float trim, vec3 st) {
  vec2 step = vec2(-0.52, -0.86) * 0.42;
  float shade = 1.0;
  for (int i = 1; i <= 3; i++) {
    float d = float(i);
    float above = heightAt(p + step * d, trim, st) - h - d * 0.20;
    shade = min(shade, 1.0 - clamp(above * 1.7, 0.0, 1.0));
  }
  return shade;
}

/** Warp cords. A Persian knot is tied around a pair, so two per knot column. */
float warpAt(vec2 p) {
  float x = p.x * 2.0;
  float i = floor(x);
  float w = 0.30 + hash11(i + 3.1) * 0.07;
  return mix(0.55, strand(fract(x) - 0.5 + (hash11(i) - 0.5) * 0.18, w), microDetail());
}

/** The weft shot, passing over and under alternate warps and beaten down. */
float weftAt(vec2 p, float beat) {
  float row = floor(p.y);
  float over = mod(floor(p.x * 2.0) + row, 2.0) * 2.0 - 1.0;
  float yc = row + 0.5 + over * mix(0.30, 0.13, beat);
  float w = 0.28 + hash11(row * 1.7) * 0.06;
  return mix(0.5, strand(p.y - yc, w), microDetail()) * (over > 0.0 ? 1.0 : 0.5);
}

void main() {
  // Restrained micro-camera, drifting in toward the weaving front.
  vec2 uv = clamp((vUv - uFocus) / uZoom + uFocus, vec2(0.0), vec2(1.0));
  vec2 p = uv * uGrid;

  // No village loom holds a perfectly square lattice.
  p += vec2(
    (vnoise(vec2(uv.x * 3.0, uv.y * 46.0)) - 0.5) * 0.55 +
    (vnoise(uv * vec2(1.4, 4.0)) - 0.5) * 1.60,
    (vnoise(vec2(uv.x * 5.0, uv.y * 7.0)) - 0.5) * 0.70
  );

  // Rows of knots drift sideways rather than stacking into clean columns.
  p.x += (hash11(floor(p.y)) - 0.5) * 0.34;

  float pile, trim, weftLive;
  float t = weavingState(p, pile, trim, weftLive);

  // A whisper of live tension where the weaver is working.
  if (uAnim > 0.5) {
    float near = exp(-(t * t) / 144.0);
    p += near * vec2(0.11 * sin(uTime * 1.9 + p.y * 0.7),
                     0.07 * sin(uTime * 2.6 + p.x * 0.31));
  }

  vec2 cell = floor(p);
  vec2 knotUv = (cell + 0.5) / uGrid;
  vec3 dye = texture2D(uKnots, knotUv).rgb;
  vec3 st = texture2D(uStructure, knotUv).rgb;

  // Abrash: hand-dyed yarn shifts knot to knot and lot to lot.
  vec2 rr = hash22(cell + vec2(91.7, 13.3));
  dye *= 1.0 + (rr.x - 0.5) * 0.07
             + (vnoise(vec2(cell.x * 0.010, cell.y * 0.055)) - 0.5) * 0.13;
  dye.r *= 1.0 + (rr.y - 0.5) * 0.035;
  dye.b *= 1.0 - (rr.y - 0.5) * 0.030;

  float eps = 0.55 / max(uPixelsPerKnot, 0.001);
  float h0 = heightAt(p, trim, st);
  float hx = heightAt(p + vec2(eps, 0.0), trim, st);
  float hy = heightAt(p + vec2(0.0, eps), trim, st);

  // Pile only a few rows old is still short, so it self-shadows far less.
  float relief = 0.40 * mix(0.30, 1.0, pile);
  vec3 N = normalize(vec3((h0 - hx) / eps * relief, (h0 - hy) / eps * relief, 1.0));

  vec3 L = normalize(vec3(-0.40, -0.66, 0.64));
  float ndl = max(dot(N, L), 0.0);
  float wrapped = dot(N, L) * 0.5 + 0.5;
  float diff = mix(wrapped * wrapped, ndl, 0.5);
  float ao = mix(1.0, mix(0.46, 1.04, smoothstep(0.0, 0.82, h0)), pile);

  // Cast shadow between the tufts, on the tiers that can afford the taps.
  float shade = 1.0;
  if (uOctaves > 1.5) shade = mix(1.0, selfShadow(p, h0, trim, st), pile * 0.85);

  // Anisotropic sheen along the fibre — silk, not varnish.
  vec3 T = normalize(vec3(0.17 + (rr.y - 0.5) * 0.22, 1.0, 0.0));
  T = normalize(T - N * dot(T, N));
  vec3 halfV = normalize(L + vec3(0.0, 0.0, 1.0));
  float tdh = dot(T, halfV);
  float sheen = pow(sqrt(max(0.0, 1.0 - tdh * tdh)), 24.0);

  float fib = fibre(p);
  // Wool is not opaque: light entering a tuft scatters through it and leaves
  // warmer, which is what keeps deep shadow in a rug coloured rather than black.
  vec3 through = dye * dye * vec3(1.25, 0.86, 0.72);
  vec3 col = dye * EXPOSURE * (0.30 + 0.90 * diff * shade) * ao
           + through * 0.11 * (1.0 - shade * 0.65) * pile;
  col += mix(dye, vec3(1.0), 0.60) * sheen * (0.050 + 0.085 * st.b)
       * (0.55 + 0.90 * fib) * mix(0.40, 1.0, trim);

  // Fibre tips catch light and read a little lighter and less saturated.
  float tip = smoothstep(0.58, 1.0, h0);
  col = mix(col, mix(col, vec3(dot(col, LUMA)), 0.32) * 1.09, tip * 0.24);

  // Patina. Decades of light and footfall never land evenly.
  col *= 0.960 + 0.078 * vnoise(uv * vec2(3.1, 5.3));

  // Below the front: bare warps, receding into the shadow of the loom.
  float beat = clamp(t / 3.0, 0.0, 1.0);
  float warp = warpAt(p);
  float weft = weftAt(p, beat);
  float depth = 0.26 + 0.74 * exp(-max(0.0, -t) / 110.0);
  vec3 warpCol = FOUNDATION * (0.08 + 0.36 * warp) * (0.62 + 0.38 * fib);
  vec3 outCol = mix(mix(LOOM, warpCol, smoothstep(0.02, 0.50, warp) * depth), col, pile);

  // The weft shot the weaver has just passed, lying across the warps.
  float weftVis = weftLive * (1.0 - pile * 0.72) * smoothstep(0.02, 0.35, weft);
  outCol = mix(outCol, FOUNDATION * (0.30 + 0.55 * weft) * (0.62 + 0.42 * fib), weftVis * 0.80);

  gl_FragColor = vec4(outCol, 1.0);
}
`;
