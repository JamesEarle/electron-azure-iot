'use strict';
const { ipcMain } = require('electron');
const settings = require('electron-settings');

let registry;

ipcMain.on('list-request', (event, arg) => {
    ipcMain.emit('registry-request'); // check if this is necessary
    ipcMain.emit('get-registry');
    ipcMain.emit('read-device-list');
});

ipcMain.on('registry', (arg) => {
    registry = arg;
});
        
ipcMain.on('read-device-list', () => {
    ipcMain.emit('read');
    registry.list((err, result) => {
        ipcMain.emit('devices', result);
    });
});