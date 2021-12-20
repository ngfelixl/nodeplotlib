# NodePlotLib

[![NodeJS CI](https://github.com/ngfelixl/nodeplotlib/workflows/Node.js%20CI/badge.svg)](https://github.com/ngfelixl/nodeplotlib/actions?query=workflow%3A%22Node.js+CI%22)
[![Coverage Status](https://coveralls.io/repos/github/ngfelixl/nodeplotlib/badge.svg?branch=master)](https://coveralls.io/github/ngfelixl/nodeplotlib?branch=master)
[![npm](https://img.shields.io/npm/v/nodeplotlib?color=#00f800)](https://npmjs.com/package/nodeplotlib)
[![npm](https://img.shields.io/npm/dt/nodeplotlib.svg)](https://npmjs.com/package/nodeplotlib)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/nodeplotlib/)

This readme contains all the necessary information for the development. [Here](./libs/nodeplotlib/README.md) you can find the users instructions that you also find in the npm description.

## Installation

```sh
npm install nodeplotlib
# or
yarn add nodeplotlib
```

## Serving the app for development

```
npx nx run web:build -- --watch
NODE_ENV=development npx nx run dev-server:serve
// or on Windows cmd
set "NODE_ENV=development" && npx nx run dev-server:serve
// or on Windows Powershell
($env:NODE_ENV = "development") -and (npx nx run dev-server:serve)
```

Unfortunately, it

## Behind the scenes

The lib launches a webserver and opens new tabs for every plot located at
`http://localhost:{{PORT}}`, where `PORT` is a free port determined by the express
server itself. At this address the Angular application will be served temporarily.
The server and the app set up a connection via socket.io. This way a realtime
transmission is possible.

The client side js requests the plot data at `http://localhost:8080/data/:id`. After all
pending plots are opened in a unique tab and all the data is requested, the
server shuts down. If you fire another plot the server starts again provides
your plot and shuts down automatically.

Another port can be provided via PORT environment variable.

## Contributing

Contributions in all forms are welcome.

## Developers guide

Fork the [Github repository](https://github.com/ngfelixl/nodeplotlib) and clone
it to your PC. Install the npm dependencies using the `install` command. It installs
the dependencies and copies plotly types to project source. These won't affect
the git tree.

## Roadmap

It would be nice to make the library compatible with Observable-streams and update
the plots in real-time.

## Contributors

<a href="https://github.com/ngfelixl"><img src="https://avatars2.githubusercontent.com/u/24190530" title="ngfelixl" width="100" height="100"></a>
<a href="https://github.com/mitsos1os"><img src="https://avatars3.githubusercontent.com/u/8208733" title="mitsos1os" width="100" height="100"></a>
<a href="https://github.com/medved-nsk"><img src="https://avatars1.githubusercontent.com/u/6310906" title="medved-nsk" width="100" height="100"></a>
<a href="https://github.com/Moumouls"><img src="https://avatars.githubusercontent.com/u/27959372" title="Moumouls" width="100" height="100"></a>
<a href="https://github.com/grgr-dkrk"><img src="https://avatars.githubusercontent.com/u/40130327" title="guruguru-dekiruko" width="100" height="100"></a>
