'use strict';
const { ipcMain } = require('electron');
const settings = require('electron-settings');

let registry;

ipcMain.on('list-request', (event, arg) => {
    ipcMain.emit('registry-request'); // check if this is necessary
    // ipcMain.emit('get-registry');
    registry = settings.get('registry');
    // ipcMain.emit('read-device-list');
    console.log(registry);
    registry.list((err, result) => {
        ipcMain.emit('devices', result);
    });
});

ipcMain.on('registry', (arg) => {
    registry = arg;
});
        
ipcMain.on('read-device-list', () => {
    registry.list((err, result) => {
        ipcMain.emit('devices', result);
    });
});