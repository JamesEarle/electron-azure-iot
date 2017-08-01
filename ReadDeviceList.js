'use strict';

const { ipcMain } = require('electron');

var iothub = require('azure-iothub');
var conn = "HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=";
var registry = iothub.Registry.fromConnectionString(conn);
var device = new iothub.Device(null);

ipcMain.on('list-request', (event, arg) => {
	registry.list((err, result) => {
		console.log(result);
	});
});
