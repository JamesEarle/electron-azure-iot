'use strict';

const { ipcMain } = require('electron');

var registry;

ipcMain.on('delete-device', (event, arg) => {
    ipcMain.emit('get-registry');
    registry.delete(arg, (err) => {
        if (err) {
            console.log(err);
        }
    });
    ipcMain.emit('delete', arg);
    event.sender.send('table-refresh');
});

ipcMain.on('registry', (arg) => {
    registry = arg;
});