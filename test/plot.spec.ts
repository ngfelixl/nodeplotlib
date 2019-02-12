import { plot } from '../src/index';
// import { Server } from '../src/server';
jest.mock('../src/server');

describe('plot', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call "spawn" once', () => {
    plot();
  });

  it('should stack data and call "spawn" once when using with data', () => {
    plot([], {});
  });
});
