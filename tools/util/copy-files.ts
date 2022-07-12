import { copySync } from 'fs-extra';

copySync('dist/apps/web', 'dist/libs/nodeplotlib/src/lib/server/web');
copySync('libs/nodeplotlib/README.md', 'dist/libs/nodeplotlib/README.md');
copySync('LICENSE', 'dist/libs/nodeplotlib/LICENSE');
