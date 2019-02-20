import * as lib from '../src/plot';

describe('clear', () => {
  beforeEach(() => {
    lib.plots.push('fdsa' as any);
  });

  it('should clear the plots array', () => {
    lib.clear();

    expect(lib.plots).toEqual([]);
  });

  it('should be clearable multiple times', () => {
    lib.clear();
    lib.clear();

    expect(lib.plots).toEqual([]);
  });
});
