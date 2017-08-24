'use strict';

let { ipcMain } = require('electron');
let iothub = require('azure-iothub');

var connectionString;
var registry;

ipcMain.on('registry-request', (event, arg) => {
    console.log('starting registry creation');
    // event.sender.send('get-connection-string', '');
    ipcMain.emit('get-connection-string'); // doesn't count as event, event is undefined when emitting
    // registry = iothub.Registry.fromConnectionString(connectionString);
    // console.log('Successfully created registry.');
});

ipcMain.on('connection-string', (event, arg) => {
    connectionString = arg;
    console.log("conn string = " + connectionString);
});

// ipcMain.emit?
ipcMain.on('get-registry', (event, arg) => {
    event.sender.send('registry', registry);
});