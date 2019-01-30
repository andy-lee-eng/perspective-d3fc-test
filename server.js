
const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const wsServer = require('./socketServer'); 

const perspectivePath = "node_modules/@jpmorganchase";
const perspectiveComponents = [
  { path: `perspective-viewer/build/perspective.view.js`, map: true },
  { path: `perspective-viewer-hypergrid/build/hypergrid.plugin.js`, map: true },
  { path: `perspective-viewer-highcharts/build/highcharts.plugin.js`, map: true },
  { path: `perspective-viewer-d3fc/build/d3fc.plugin.js`, map: true },
  { path: `perspective/build/perspective.js`, map: true },
  { path: `perspective/build/perspective.asmjs.worker.js`, map: true },
  { path: `perspective.node.js`, map: true },
  { path: `perspective/build/perspective.wasm.worker.js`, map: true },
  { path: `perspective-viewer/build/material.css`, map: true },
  { path: '/perspective/build/psp.async.wasm' },
  { path: '/perspective/build/psp.sync.wasm' }
];
perspectiveComponents.forEach(component => {
  const componentFile = path.basename(component.path);
  app.use(`/${componentFile}`, express.static(path.join(perspectivePath, component.path)));
  if (component.map) {
    app.use(`/${componentFile}.map`, express.static(path.join(perspectivePath, `${component.path}.map`)));
  }
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/staticStreamData', (req,res) => res.json(wsServer.data()));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

setInterval(() => wsServer.broadcast(), 30000000);

// Start a Browsersync proxy
const bs = require("browser-sync").create();
bs.init({
    proxy: "http://localhost:3001"
});
bs.watch(path.join(perspectivePath, "/perspective-viewer-d3fc/build/d3fc.plugin.js"), (event, file) => {
  if (event === 'change') {
    console.log(`change to ${file}`);
    bs.reload('d3fc.plugin.js');
  }
});
