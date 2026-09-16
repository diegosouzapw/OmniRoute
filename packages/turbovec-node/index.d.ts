export class TurbovecIdMapIndex {
  constructor(dim: number, bitWidth: number)
  addWithIds(vectors: Float32Array, ids: BigInt64Array): void
  search(queries: Float32Array, k: number): { scores: number[], ids: number[] }
  load(path: string): TurbovecIdMapIndex
  write(path: string): void
  sync(path: string): void
  remove(id: number): void
}
