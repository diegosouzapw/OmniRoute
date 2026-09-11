/**
 * WebGL renderer for the weaving animation.
 *
 * Deliberately dependency-free: the whole effect is one fullscreen triangle and
 * three small programs, so a 3D engine would be several hundred kilobytes spent
 * on abstractions none of this needs.
 *
 * Lifetime: construct once per context, `resize` on layout changes, `render`
 * per frame with a scroll-derived progress, `dispose` on unmount. Everything
 * allocated here is released in `dispose`, including the context itself.
 */
import { QUALITY, type QualityTier } from "./quality";
import { RUG_SOURCE } from "./rugSource";
import {
  DERIVE_KNOTS_FS,
  DERIVE_STRUCTURE_FS,
  QUAD_VS,
  SCREEN_VS,
  WEAVE_FS,
} from "./weaveShaders";

export interface WeaveFrame {
  /** Weaving progress, 0 (bare loom) to 1 (finished rug). */
  progress: number;
  /** Seconds since init, for the thread tension at the front. */
  time: number;
  /** Micro-camera zoom, 1 = the whole rug. */
  zoom: number;
  /** Vertical point the micro-camera holds on, in rug coordinates. */
  focusY: number;
  /** 0..1 fade on the live thread tension. */
  tension: number;
}

type GL = WebGLRenderingContext;

const CONTEXT_ATTRS: WebGLContextAttributes = {
  alpha: false,
  antialias: false,
  depth: false,
  stencil: false,
  preserveDrawingBuffer: false,
  powerPreference: "high-performance",
};

function compile(gl: GL, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("could not create shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`shader compile failed: ${log ?? "unknown"}`);
  }
  return shader;
}

function link(gl: GL, vertexSource: string, fragmentSource: string): WebGLProgram {
  const program = gl.createProgram();
  if (!program) throw new Error("could not create program");
  const vs = compile(gl, gl.VERTEX_SHADER, vertexSource);
  const fs = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.bindAttribLocation(program, 0, "aPos");
  gl.linkProgram(program);
  // The shaders are owned by the program once linked.
  gl.deleteShader(vs);
  gl.deleteShader(fs);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`program link failed: ${log ?? "unknown"}`);
  }
  return program;
}

function createLatticeTexture(gl: GL, columns: number, rows: number): WebGLTexture {
  const texture = gl.createTexture();
  if (!texture) throw new Error("could not create texture");
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, columns, rows, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  // One texel is one knot: nearest, so a knot keeps a single dye colour.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
}

export class WeaveRenderer {
  private readonly gl: GL;
  private readonly weaveProgram: WebGLProgram;
  private readonly quadBuffer: WebGLBuffer;
  private readonly knotTexture: WebGLTexture;
  private readonly structureTexture: WebGLTexture;
  private readonly uniforms: Record<string, WebGLUniformLocation | null>;
  private readonly columns: number;
  private readonly rows: number;

  private tier: QualityTier;
  private drawingWidth = 1;
  private lastBox = { width: 0, height: 0, ratio: 1 };
  private disposed = false;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    artwork: TexImageSource,
    tier: QualityTier
  ) {
    const gl = (canvas.getContext("webgl", CONTEXT_ATTRS) ??
      canvas.getContext("experimental-webgl", CONTEXT_ATTRS)) as GL | null;
    if (!gl) throw new Error("WebGL unavailable");

    this.gl = gl;
    this.tier = tier;
    this.columns = RUG_SOURCE.knotColumns;
    this.rows = Math.round(RUG_SOURCE.knotColumns / RUG_SOURCE.aspectRatio);

    const quad = gl.createBuffer();
    if (!quad) throw new Error("could not create buffer");
    this.quadBuffer = quad;
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    // One oversized triangle covers the viewport with no seam down the middle.
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    this.knotTexture = createLatticeTexture(gl, this.columns, this.rows);
    this.structureTexture = createLatticeTexture(gl, this.columns, this.rows);

    try {
      this.deriveLattice(artwork);
    } catch (error) {
      this.dispose();
      throw error;
    }

    this.weaveProgram = link(gl, SCREEN_VS, WEAVE_FS);
    this.uniforms = Object.fromEntries(
      [
        "uKnots",
        "uStructure",
        "uGrid",
        "uProgress",
        "uTime",
        "uZoom",
        "uFocus",
        "uPixelsPerKnot",
        "uOctaves",
        "uAnim",
      ].map((name) => [name, gl.getUniformLocation(this.weaveProgram, name)])
    );
  }

  /**
   * Projects the artwork onto the knot lattice and derives the per-knot material
   * data, once. The full-resolution artwork is released immediately afterwards —
   * from here on the rug is rebuilt from the lattice, which is both the reason
   * the motifs step like hand-knotting and why steady-state VRAM stays small.
   */
  private deriveLattice(artwork: TexImageSource): void {
    const gl = this.gl;

    const source = gl.createTexture();
    const framebuffer = gl.createFramebuffer();
    if (!source || !framebuffer) throw new Error("could not create GL objects");

    let knotProgram: WebGLProgram | null = null;
    let structureProgram: WebGLProgram | null = null;

    try {
      // No flip: texel row 0 stays the top of the rug, all the way through.
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
      gl.bindTexture(gl.TEXTURE_2D, source);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, artwork);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
      gl.viewport(0, 0, this.columns, this.rows);

      knotProgram = link(gl, QUAD_VS, DERIVE_KNOTS_FS);
      gl.useProgram(knotProgram);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        this.knotTexture,
        0
      );
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        throw new Error("knot lattice framebuffer incomplete");
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, source);
      gl.uniform1i(gl.getUniformLocation(knotProgram, "uSrc"), 0);
      gl.uniform2f(gl.getUniformLocation(knotProgram, "uGrid"), this.columns, this.rows);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      structureProgram = link(gl, QUAD_VS, DERIVE_STRUCTURE_FS);
      gl.useProgram(structureProgram);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        this.structureTexture,
        0
      );
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        throw new Error("structure framebuffer incomplete");
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.knotTexture);
      gl.uniform1i(gl.getUniformLocation(structureProgram, "uKnots"), 0);
      gl.uniform2f(gl.getUniformLocation(structureProgram, "uGrid"), this.columns, this.rows);
      const { x0, y0, x1, y1, threshold } = RUG_SOURCE.inscription;
      gl.uniform4f(gl.getUniformLocation(structureProgram, "uInscription"), x0, y0, x1, y1);
      gl.uniform1f(gl.getUniformLocation(structureProgram, "uInkThreshold"), threshold);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } finally {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.deleteFramebuffer(framebuffer);
      gl.deleteTexture(source);
      if (knotProgram) gl.deleteProgram(knotProgram);
      if (structureProgram) gl.deleteProgram(structureProgram);
    }
  }

  /** Lowers quality after the frame budget has been missed, and re-applies it. */
  setTier(tier: QualityTier): void {
    if (tier === this.tier) return;
    this.tier = tier;
    const { width, height, ratio } = this.lastBox;
    this.lastBox = { width: 0, height: 0, ratio: 1 };
    this.resize(width, height, ratio);
  }

  /**
   * Sizes the drawing buffer for a CSS box. Resolution follows the device's
   * pixel ratio up to the tier's ceiling, then a total-pixel budget, so a large
   * desktop window costs no more than a phone does.
   */
  resize(cssWidth: number, cssHeight: number, devicePixelRatio: number): void {
    if (this.disposed || cssWidth <= 0 || cssHeight <= 0) return;
    const box = this.lastBox;
    if (box.width === cssWidth && box.height === cssHeight && box.ratio === devicePixelRatio) return;
    this.lastBox = { width: cssWidth, height: cssHeight, ratio: devicePixelRatio };
    const settings = QUALITY[this.tier];

    let ratio = Math.min(devicePixelRatio, settings.maxDpr);
    const budgeted = Math.sqrt(settings.pixelBudget / (cssWidth * cssHeight));
    ratio = Math.max(1, Math.min(ratio, budgeted));

    const width = Math.max(1, Math.round(cssWidth * ratio));
    const height = Math.max(1, Math.round(cssHeight * ratio));
    if (this.canvas.width === width && this.canvas.height === height) return;

    this.canvas.width = width;
    this.canvas.height = height;
    this.drawingWidth = width;
    this.gl.viewport(0, 0, width, height);
  }

  render(frame: WeaveFrame): void {
    if (this.disposed) return;
    const gl = this.gl;
    const settings = QUALITY[this.tier];

    gl.useProgram(this.weaveProgram);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.knotTexture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.structureTexture);

    gl.uniform1i(this.uniforms.uKnots, 0);
    gl.uniform1i(this.uniforms.uStructure, 1);
    gl.uniform2f(this.uniforms.uGrid, this.columns, this.rows);
    gl.uniform1f(this.uniforms.uProgress, frame.progress);
    gl.uniform1f(this.uniforms.uTime, frame.time);
    gl.uniform1f(this.uniforms.uZoom, frame.zoom);
    gl.uniform2f(this.uniforms.uFocus, 0.5, frame.focusY);
    // Drives the shader's own level of detail, so nothing finer than the pixel
    // grid is drawn as aliasing.
    gl.uniform1f(this.uniforms.uPixelsPerKnot, (this.drawingWidth / this.columns) * frame.zoom);
    gl.uniform1f(this.uniforms.uOctaves, settings.octaves);
    gl.uniform1f(this.uniforms.uAnim, settings.tension && frame.tension > 0.01 ? 1 : 0);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    const gl = this.gl;
    gl.deleteBuffer(this.quadBuffer);
    gl.deleteTexture(this.knotTexture);
    gl.deleteTexture(this.structureTexture);
    if (this.weaveProgram) gl.deleteProgram(this.weaveProgram);
    // Hand the driver its memory back now rather than waiting for GC.
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  }
}
