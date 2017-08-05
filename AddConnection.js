'use strict';

let { ipcMain } = require('electron');
let connection = require('./ReadDeviceList');
let d2cMessages = require('./ReadD2CMessages');

var deleteThis = "HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=";

ipcMain.on('connection-request', (event, arg) => {
    connection.createRegistry(deleteThis); // should use arg, hardcoded for dev
    d2cMessages.createConnection(deleteThis);
    console.log("Succesfully connected");
});