import { EntityStore, PlotData, Stack } from '.';

export interface DataTransferObject {
  stacks: EntityStore<Stack>;
  plots: EntityStore<PlotData>;
}
