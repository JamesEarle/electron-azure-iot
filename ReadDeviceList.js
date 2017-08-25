'use strict';
const { ipcMain } = require('electron');

ipcMain.on('list-request', (event, arg) => {
    ipcMain.emit('registry-request');
    ipcMain.emit('get-registry');
});


ipcMain.on('registry', (registry) => {
    registry.list((err, result) => {
        ipcMain.emit('devices', result);
    });
});