'use strict';

const { ipcMain } = require('electron');

ipcMain.on('create', (arg) => {
    sendLine();
    ipcMain.emit('output-text', "Device Key: " + arg.authentication.symmetricKey.primaryKey);
    ipcMain.emit('output-text', "Device ID: " + arg.deviceId);
    ipcMain.emit('output-text', "*** Added new device to hub ***");
    sendLine();
});

ipcMain.on('read', () => {
    sendLine();
    ipcMain.emit('output-text', "Retrieving device list...");
    sendLine();
});

ipcMain.on('delete', (arg) => {
    sendLine();
    ipcMain.emit('output-text', "Device ID: " + arg);
    ipcMain.emit('output-text', "*** Deleting device from hub ***");
    sendLine();
});

ipcMain.on('simulate', (event, arg) => {
    sendLine();
    ipcMain.emit('output-text', arg)
    sendLine();
});

function sendLine() {
    ipcMain.emit('output-text', "[---------------------------------------------------------]");                
}