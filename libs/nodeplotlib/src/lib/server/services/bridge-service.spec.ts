import { BridgeService } from './bridge.service';
import { openWindow } from '../../utils/open-window';
jest.mock('../../utils/open-window');

describe('BridgeService', () => {
  it('should emit a shutdown$ event if the shutdown function is called', (done) => {
    const bridgeService = new BridgeService();
    bridgeService.shutdown$.subscribe(() => {
      done();
    });
    bridgeService.shutdown();
  });

  it('call the openWindow function with the url if a port is set', () => {
    const bridgeService = new BridgeService();
    bridgeService.setPort(1234);
    expect(openWindow).toHaveBeenCalledWith(`http://localhost:1234`);
  });
});
