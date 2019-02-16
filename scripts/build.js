const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '..', 'src', 'models', 'plotly.js');
const distPath = path.join(__dirname, '..', 'dist', 'lib', 'models', 'plotly.js');

const scriptPath = path.join(__dirname, '..', 'node_modules', 'plotly.js', 'dist');
const wwwPath = path.join(__dirname, '..', 'dist', 'www');

if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath);
}

if (!fs.existsSync(path.join(distPath, 'd3'))) {
  fs.mkdirSync(path.join(distPath, 'd3'));
}

fs.copyFileSync(
  path.join(srcPath, 'index.d.ts'),
  path.join(distPath, 'index.d.ts')
);

fs.copyFileSync(
  path.join(srcPath, 'd3', 'index.d.ts'),
  path.join(distPath, 'd3', 'index.d.ts')
);

fs.copyFileSync(
  path.join(scriptPath, 'plotly.min.js'),
  path.join(wwwPath, 'plotly.min.js')
);
