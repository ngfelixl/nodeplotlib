"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const opn = require("opn");
const express = require("express");
const fs_1 = require("fs");
const path_1 = require("path");
exports.server = {
    active: false,
    loading: false,
    instance: null
};
const app = express();
const port = 8080;
let tempContainer = [];
const plotContainer = {};
function clear() {
    tempContainer = [];
}
exports.clear = clear;
function stack(data) {
    tempContainer.push(data);
}
exports.stack = stack;
function plot(data, cb) {
    if (data) {
        tempContainer.push(data);
    }
    const id = Object.keys(plotContainer).length;
    plotContainer[id] = {
        opened: false,
        pending: false,
        request: false,
        data: tempContainer
    };
    tempContainer = [];
    spawn(() => {
        if (cb) {
            cb(id);
        }
    });
    return id;
}
exports.plot = plot;
function spawn(cb) {
    if (!exports.server.active && !exports.server.loading) {
        console.log('Open server');
        exports.server.loading = true;
        app.get('/data/:id', (req, res) => {
            const requestId = req.params.id;
            const container = plotContainer[requestId];
            const result = container && container.data;
            container.request = true;
            res.send(result);
            close();
        });
        app.get('/plots/:id', (req, res) => {
            const plotId = req.params.id;
            fs_1.readFile(path_1.join(__dirname, 'www', 'index.html'), 'utf-8', (error, file) => {
                fs_1.readFile(path_1.join(__dirname, 'www', 'script.js'), 'utf-8', (err, script) => {
                    script = script.replace('{{plotId}}', `${plotId}`);
                    file = file.replace('{{script}}', script);
                    return res.send(file);
                });
            });
        });
        exports.server.instance = app.listen(port, () => {
            exports.server.active = true;
            exports.server.loading = false;
            openPlots();
            cb();
        });
    }
    else if (exports.server.active) {
        openPlots();
        cb();
    }
}
function openPlots() {
    const promises = [];
    for (const plotEntry of Object.entries(plotContainer)) {
        if (!plotEntry[1].opened && !plotEntry[1].pending) {
            plotEntry[1].pending = true;
            promises.push(opn(`http://localhost:${port}/plots/${plotEntry[0]}`)
                .then(() => {
                plotEntry[1].opened = true;
                plotEntry[1].pending = false;
            }));
        }
    }
}
function close() {
    const pending = Object.values(plotContainer)
        .map(o => o.pending)
        .reduce((a, b) => a || b);
    const requested = Object.values(plotContainer)
        .map(o => o.request)
        .reduce((a, b) => a && b);
    if (exports.server.instance && exports.server.active && !pending && requested) {
        console.log('Close server');
        exports.server.instance.close(() => {
            exports.server.instance = null;
        });
        exports.server.active = false;
    }
}
//# sourceMappingURL=index.js.map