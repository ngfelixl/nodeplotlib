import * as lib from '../src/plot';

describe('stack', () => {
  beforeEach(() => {
    lib.plots.length = 0;
  });

  it('should add a new plot', () => {
    lib.stack([]);

    expect(lib.plots.length).toBe(1);
  });

  it('should stack data with layout', () => {
    lib.stack([], {});

    expect(lib.plots.length).toBe(1);
  });
});
