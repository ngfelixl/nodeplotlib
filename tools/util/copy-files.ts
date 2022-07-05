import { copySync } from 'fs-extra';

copySync('dist/apps/web', 'dist/libs/nodeplotlib/web');
copySync('libs/nodeplotlib/README.md', 'dist/libs/nodeplotlib/README.md');
