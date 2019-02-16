const fs = require('fs');
const path = require('path');

const plotlyPath = path.join(__dirname, '..', 'src', 'models', 'plotly.js');
const d3Path = path.join(__dirname, '..', 'src', 'models', 'plotly.js', 'd3');
const typesPath = path.join(__dirname, '..', 'node_modules', '@types');

if (!fs.existsSync(plotlyPath)) {
  fs.mkdirSync(plotlyPath);
}

if (!fs.existsSync(d3Path)) {
  fs.mkdirSync(d3Path);
}

fs.copyFileSync(
  path.join(typesPath, 'plotly.js', 'index.d.ts'),
  path.join(plotlyPath, 'index.d.ts')
);

fs.copyFileSync(
  path.join(typesPath, 'd3', 'index.d.ts'),
  path.join(d3Path, 'index.d.ts')
);

let plotlyTypes = fs.readFileSync(path.join(plotlyPath, 'index.d.ts'), 'utf-8');
plotlyTypes = plotlyTypes.replace('import * as _d3 from "d3";', 'import * as _d3 from "./d3/index";');
fs.writeFileSync(path.join(plotlyPath, 'index.d.ts'), plotlyTypes);