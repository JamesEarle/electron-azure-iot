'use strict';

const { ipcMain } = require('electron');
var iothub = require('azure-iothub');

var registry;
var device = new iothub.Device(null);

ipcMain.on('click-confirm', (event, arg) => {
    device.deviceId = arg;
    ipcMain.emit('registry-request'); //ensure registry has been created
    ipcMain.emit('get-registry');
    createDevice(device, event);
    ipcMain.emit('table-refresh');
});

ipcMain.on('registry', (arg) => {
    registry = arg;
})

function createDevice (device, event) {
    registry.create(device, function (err, deviceInfo, res) {
        if (err) { // already exists
            registry.get(device.deviceId, printDeviceInfo);
            console.log("err");
        }
        if (deviceInfo) {
            ipcMain.emit('create', deviceInfo);
        }
    });
}

function printDeviceInfo(err, deviceInfo, res) {
    if (deviceInfo) {
        console.log('Device ID: ' + deviceInfo.deviceId);
        console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
    }
}