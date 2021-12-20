import { copySync } from 'fs-extra';

copySync('dist/apps/web', 'dist/libs/nodeplotlib/src/lib/server/web');
