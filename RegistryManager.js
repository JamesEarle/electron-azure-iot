'use strict';

let { ipcMain } = require('electron');
let iothub = require('azure-iothub');

var connectionString;
var registry;

ipcMain.on('registry-request', (event, arg) => {
    ipcMain.emit('get-connection-string');
    registry = iothub.Registry.fromConnectionString(connectionString);
});

ipcMain.on('connection-string', (arg) => {
    connectionString = arg;
});

ipcMain.on('get-registry', (arg) => {
    ipcMain.emit('registry', registry);
});