
const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const wsServer = require('./socketServer'); 

const perspectivePath = "C:\\dev\\perspective\\packages\\";
//const perspectivePath = "C:\\dev\\perspectiveUnmodded\\perspective\\packages\\";

const perspectiveComponents = [
  "perspective-viewer\\build\\perspective.view.js",
  "perspective-viewer-hypergrid\\build\\hypergrid.plugin.js",
  "perspective-viewer-highcharts\\build\\highcharts.plugin.js",
  "perspective-viewer-d3fc\\build\\d3fc.plugin.js",
  "perspective\\build\\perspective.js",
  "perspective\\build\\perspective.asmjs.worker.js",
  "perspective.node.js",
  "perspective\\build\\perspective.wasm.worker.js",
  "perspective-viewer\\build\\material.css",
  "perspective-viewer\\build\\material.dark.css",
];

perspectiveComponents.forEach(component => {
  const componentFile = path.basename(component);
  app.use(`/${componentFile}`, express.static(path.join(perspectivePath, component)));
  app.use(`/${componentFile}.map`, express.static(path.join(perspectivePath, `${component}.map`)));
});

app.use(`/psp.async.wasm`, express.static(path.join(perspectivePath, "\\perspective\\build\\psp.async.wasm")));
app.use(`/psp.sync.wasm`, express.static(path.join(perspectivePath, "\\perspective\\build\\psp.sync.wasm")));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/data', (_, res) => res.json(data));
app.use('/staticStreamData', (_, res) => res.json(wsServer.data()));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

setInterval(() => wsServer.broadcast(), 1000000);

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