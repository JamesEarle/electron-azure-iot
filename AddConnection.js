'use strict';

let { ipcMain } = require('electron');
let connection = require('./ReadDeviceList');

var deleteThis = "HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=";

ipcMain.on('connection-request', (event, arg) => {
    connection.createRegistry(deleteThis);
	console.log("Succesfully connected");
});