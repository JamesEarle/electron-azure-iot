'use strict';

const { ipcMain } = require('electron');

var iothub = require('azure-iothub');
var device = new iothub.Device(null);

var registry;

exports.createRegistry = (conn) => {
    if(conn !== "") {
        console.log("registry created");
        this.registry = iothub.Registry.fromConnectionString(conn);
    }
}

// store in an array in this class?
exports.getDeviceAt = (i) => {
    return this.registry.list((err, result) => {
        if(i < result.length) {
            console.log(result[i]);
        } else {
            console.log("Device request out of bounds.");
        }
    });
}

// unused
exports.registryList = () => {
    return this.registry.list((err, result) => {
        // console.log(result);
    });
}

ipcMain.on('list-request', (event, arg) => {
	this.registry.list((err, result) => {
        event.sender.send('devices', result);
	});
});