import { getPort } from './get-port';

describe('getPort', () => {
  it('should return 0 if NODEPLOTLIB_PORT is undefined', () => {
    process.env.NODEPLOTLIB_PORT = undefined;
    expect(getPort()).toBe(0);
  });

  it('should return 0 if NODEPLOTLIB_PORT is null', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.env.NODEPLOTLIB_PORT = null as any;
    expect(getPort()).toBe(0);
  });

  it('should return 0 if NODEPLOTLIB_PORT is empty string', () => {
    process.env.NODEPLOTLIB_PORT = '';
    expect(getPort()).toBe(0);
  });

  it('should return 0 if NODEPLOTLIB_PORT is 0', () => {
    process.env.NODEPLOTLIB_PORT = '0';
    expect(getPort()).toBe(0);
  });

  it('should return the number if NODEPLOTLIB_PORT is a number and not 0', () => {
    process.env.NODEPLOTLIB_PORT = '123';
    expect(getPort()).toBe(123);
  });
});
