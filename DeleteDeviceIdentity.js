'use strict';

const { ipcMain } = require('electron');

var registry;

ipcMain.on('delete-device', (event, arg) => {
    ipcMain.emit('get-registry');
    registry.delete(arg, (err) => {
        if(err) {
            console.log(err);
        }
    });
    // then erase table and repopulate
    event.sender.send('table-reset');
});

ipcMain.on('registry', (arg) => {
    registry = arg;
});