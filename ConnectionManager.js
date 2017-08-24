'use strict';

let { ipcMain } = require('electron');

var deleteThis = "HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=";

var connectionString;

ipcMain.on('connection-request', (event, arg) => {
    connectionString = deleteThis;
    // connectionString = arg;
    // event.sender.send('registry-request');
    ipcMain.emit('registry-request');
    console.log("Connection string set");
});


ipcMain.on('get-connection-string', (event, arg) => {
    event.sender.send('connection-string', connectionString);
});