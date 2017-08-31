'use strict';

const { ipcMain } = require('electron');
const iothub = require('azure-iothub');
const settings = require('electron-settings');

var connectionString;
var registry;

ipcMain.on('registry-request', (event, arg) => {
    // ipcMain.emit('get-connection-string');
    registry = iothub.Registry.fromConnectionString(settings.get('connection-string'));
    // let x = JSON.stringify(registry);
    // console.log(x);
    settings.set('registry', registry);
});

ipcMain.on('connection-string', (arg) => {
    connectionString = arg;
});

ipcMain.on('get-registry', (arg) => {
    ipcMain.emit('registry', registry);
});