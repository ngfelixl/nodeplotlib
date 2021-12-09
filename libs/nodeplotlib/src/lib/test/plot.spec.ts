import { plot, plots, stack } from '../plot';
// import { Server } from '../src/server';
jest.mock('../server');

describe('plot', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should throw an error if array length is 0', () => {
    expect(() => { plot([]) })
        .toThrow(new RegExp('Plot data must be an array with at least 1 element'))
  });

  it('should spawn the server if data is valid', () => {
    plot([{x: [1], y: [1], type: 'line' as any}]);
  });

  /* it('should stack data and call "spawn" once when using with data', () => {
    plot([], {});
  }); */

  it('should clear the temporary plots array', () => {
    stack([{x: [1], y: [2], type: 'line' as any}]);
    expect(plots.length).toBe(1);

    plot();
    expect(plots.length).toBe(0);
  });

  it('should throw an error if layout is not an object', () => {
    expect(() => { plot([{x: [1], y: [1], type: 'line' as any}], 'test' as any) })
        .toThrow(new RegExp('Layout must be an object'));
  });
});
