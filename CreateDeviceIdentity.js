'use strict';

var iothub = require('azure-iothub');

var conn = "HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=";

var registry = iothub.Registry.fromConnectionString(conn);

var device = new iothub.Device(null);

console.log("required");

function setId(id) {
    device.deviceId = id;
}

function id() {
    return device.deviceId;
}

function createDevice (id) {
    registry.create(device, function (err, deviceInfo, res) {
        if (err) { // already exists
            registry.get(id, printDeviceInfo);
        }
        if (deviceInfo) {
            printDeviceInfo(err, deviceInfo, res)
        }
    });
}

function printDeviceInfo(err, deviceInfo, res) {
    if (deviceInfo) {
        console.log('Device ID: ' + deviceInfo.deviceId);
        console.log('Device key: ' + deviceInfo.authentication.symmetricKey.primaryKey);
    }
}