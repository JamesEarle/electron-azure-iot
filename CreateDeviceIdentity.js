'use strict';

const { ipcMain } = require('electron');
var iothub = require('azure-iothub');

// var conn = "HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=";
// var registry = iothub.Registry.fromConnectionString(conn);

var registry;
var device = new iothub.Device(null);

ipcMain.on('click-confirm', (event, arg) => {
    device.deviceId = arg;
    ipcMain.emit('registry-request'); //ensure registry has been created
    ipcMain.emit('get-registry');
	createDevice(device);
});

ipcMain.on('registry', (arg) => {
    registry = arg;
})

function createDevice (device) {
    
    registry.create(device, function (err, deviceInfo, res) {
        if (err) { // already exists
            registry.get(device.deviceId, printDeviceInfo);
            console.log("err");
        }
        if (deviceInfo) {
            printDeviceInfo(err, deviceInfo, res);
        }
    });
}

function printDeviceInfo(err, deviceInfo, res) {
    if (deviceInfo) {
        console.log('Device ID: ' + deviceInfo.deviceId);
        console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
    }
}