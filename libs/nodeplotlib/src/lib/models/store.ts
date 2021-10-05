
export interface EntityStore<T> {
  ids: number[];
  entities: {[id: number]: T}
}

export interface Action<T = unknown> {
  type: string;
  payload?: T;
}

export interface Update<T = unknown> {
  id: number;
  changes: Partial<T>
}
