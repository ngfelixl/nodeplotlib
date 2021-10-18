/**
 * A stack is triggered when the `plot()` function
 * is being executed. The stack will be cleaned
 * based on two scenarios.
 *
 * In the first scenario the stack does not contain
 * a stream of data. This means the data does not
 * change over time. When the data has arrived in the
 * frontend it triggers a notification and the stack
 * can be cleared.
 *
 * In the second scenario the stack contains one or
 * more plots that are updated via a stream. The stack
 * is represented in the frontend as a tab. If the
 * user closes the tab or the entire app, the stream is
 * not needed anymore and the stack can be cleared.
 */
export interface Stack {
  id: number;
  name: string;
  containsStreams: boolean;
  transferred: boolean;
  plotIds: number[];
}
