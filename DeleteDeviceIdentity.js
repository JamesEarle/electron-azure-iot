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
    
    // create a message manager instead of this
    event.sender.send('output-text', "--------------------------------------------");            
    event.sender.send('output-text', "Device ID: " + arg);
    event.sender.send('output-text', "*** Deleting device from hub ***");
    event.sender.send('output-text', "--------------------------------------------");
    
    event.sender.send('table-refresh');
});

ipcMain.on('registry', (arg) => {
    registry = arg;
});