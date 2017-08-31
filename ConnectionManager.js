'use strict';

const { ipcMain } = require('electron');
const settings = require('electron-settings');

var deleteThis = "HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=";
var connectionString;

ipcMain.on('connection-request', (event, arg) => {
    connectionString = deleteThis;
    settings.set('connection-string', connectionString);
});

ipcMain.on('get-connection-string', (event, arg) => {
    ipcMain.emit('connection-string', connectionString);
});