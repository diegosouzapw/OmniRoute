/**
 * Runtime extension used by the stream implementations in this package.
 *
 * The DOM `Transformer` declaration does not expose a cancellation hook, but
 * supported runtimes invoke it when the readable side is cancelled. Keeping the
 * extension explicit preserves timer cleanup without weakening the base type.
 */
export type CancelableTransformer<I = unknown, O = unknown> = Transformer<I, O> & {
  cancel(reason?: unknown): void | Promise<void>;
};

export function withTransformerCancellation<I, O>(
  transformer: CancelableTransformer<I, O>
): Transformer<I, O> {
  return transformer;
}
