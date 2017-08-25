'use strict';

const { ipcMain } = require('electron');

var registry;

ipcMain.on('delete-device', (event, arg) => {
    ipcMain.emit('registry-request'); // not necessary, can't delete without list first so always initialized
    ipcMain.emit('get-registry');
    registry.delete(arg, (err) => {
        if(err) {
            console.log(err);
        }
    });
});

ipcMain.on('registry', (arg) => {
    registry = arg;
});