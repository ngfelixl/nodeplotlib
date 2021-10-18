export interface EntityStore<T> {
  ids: number[];
  entities: {[id: number]: T}
}
