'use strict';

const { ipcMain } = require('electron');
const iothub = require('azure-iothub');
const settings = require('electron-settings');

var registry;

ipcMain.on('registry-request', (event, arg) => {
    registry = iothub.Registry.fromConnectionString(settings.get('connection-string'));
});

ipcMain.on('get-registry', (arg) => {
    ipcMain.emit('registry', registry);
});