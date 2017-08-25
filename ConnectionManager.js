'use strict';

let { ipcMain } = require('electron');

var deleteThis = "HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=";

var connectionString;

ipcMain.on('connection-request', (event, arg) => {
    connectionString = deleteThis;
    // connectionString = arg;
    console.log("Connection string set");
    // console.log("1 -"+ connectionString);
});


ipcMain.on('get-connection-string', (event, arg) => {
    // event.sender.send('connection-string', connectionString);
    // console.log('emit don\'t event ' + connectionString);
    ipcMain.emit('connection-string', connectionString);
});