'use strict';
const { ipcMain } = require('electron');

var registry;

ipcMain.on('list-request', (event, arg) => {
    ipcMain.emit('registry-request');
    ipcMain.emit('get-registry');
    ipcMain.emit('read-device-list');
});

ipcMain.on('registry', (arg) => {
    registry = arg;
});
        
ipcMain.on('read-device-list', () => {
    registry.list((err, result) => {
        ipcMain.emit('devices', result);
    });
});