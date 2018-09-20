"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const opn = require("opn");
const express = require("express");
let serverInstances = 0;
const app = express();
const port = 8080;
let server;
let container = [];
let resetFlag = false;
function clear() {
    container = [];
}
exports.clear = clear;
function stack(data) {
    checkReset();
    container.push(data);
}
exports.stack = stack;
function plot(data) {
    checkReset();
    if (data) {
        container.push(data);
    }
    spawn();
    resetFlag = true;
}
exports.plot = plot;
function checkReset() {
    if (resetFlag) {
        container = [];
        resetFlag = false;
    }
}
function spawn() {
    if (serverInstances === 0) {
        app.use(express.static(path_1.join(__dirname, 'www')));
        app.get('/data', (_, res) => {
            res.send(container);
            server.close();
        });
        server = app.listen(port, () => {
            opn(`http://localhost:${port}`);
        });
        serverInstances++;
    }
}
//# sourceMappingURL=index.js.map