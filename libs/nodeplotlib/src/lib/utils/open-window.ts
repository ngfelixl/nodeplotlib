import { exec } from 'child_process';
import { type } from 'os';

export function openWindow(location: string) {
  if (process.env.NODEPLOTLIB_PORT) {
    return;
  }

  switch (type()) {
    case 'Linux':
      exec(`xdg-open ${location}`);
      break;
    case 'Darwin':
      exec(`open ${location}`);
      break;
    case 'Windows_NT':
      exec(`start ${location}`);
      break;
  }
}
