import { openWindow } from './open-window';
import { exec } from 'child_process';
import { type } from 'os';
jest.mock('child_process');
jest.mock('os');

describe('openWindow', () => {
  let execMock: jest.MockedFunction<typeof exec>;
  let typeMock: jest.MockedFunction<typeof type>;

  beforeEach(() => {
    execMock = exec as jest.MockedFunction<typeof exec>;
    typeMock = type as jest.MockedFunction<typeof type>;
  });

  afterEach(() => {
    delete process.env.NODEPLOTLIB_PORT;
  });

  it('should not call the exec function if NODEPLOTLIB_PORT is set', () => {
    process.env.NODEPLOTLIB_PORT = '123';
    openWindow('location');
    expect(execMock).not.toBeCalled();
  });

  it('should not call the exec function if NODEPLOTLIB_PORT is set to ""', () => {
    process.env.NODEPLOTLIB_PORT = '';
    openWindow('location');
    expect(execMock).not.toBeCalled();
  });

  it('should call the exec function for linux correctly', () => {
    typeMock.mockImplementation(() => 'Linux');
    openWindow('location');
    expect(execMock).toBeCalledWith('xdg-open location');
  });

  it('should call the exec function for windows correctly', () => {
    typeMock.mockImplementation(() => 'Windows_NT');
    openWindow('location');
    expect(execMock).toBeCalledWith('start location');
  });

  it('should call the exec function for mac correctly', () => {
    typeMock.mockImplementation(() => 'Darwin');
    openWindow('location');
    expect(execMock).toBeCalledWith('open location');
  });
});
