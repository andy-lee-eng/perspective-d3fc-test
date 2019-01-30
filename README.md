# Test app for perspective-viewer-d3fc plugin

## Setup

The project expects to be the same root as the `perspective` project (e.g. uses relative path `../perspective`).
If the path is different, then update the relative scripts in `package.json`

### Install dependencies

    yarn

### Build custom version of material.dark theme

    npm run build:theme

### Link the d3fc plugin project

From the root of the `perspective` project, make sure the dependencies are all installed:

    cd ../perspective
    yarn

From the `perspective-view-d3fc` folder, register the project for `yarn link`

    cd packages/perspective-viewer-d3fc
    yarn link

From the `perspective-d3fc-test` project, link the local version of `perspective-view-d3fc`:

    cd ../../../perspective-d3fc-test
    yarn link @jpmorganchase/perspective-viewer-d3fc

## Debugging

### Watch mode

Open a Command window at the root of the `perspective` project, and run:

    .\node_modules\.bin\lerna.cmd run --scope  @jpmorganchase/perspective-viewer-d3fc watch

### Run the test project

From a second Command window, in the `perspective-d3fc-test` project, run:

    npm run start

