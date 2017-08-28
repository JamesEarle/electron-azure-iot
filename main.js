'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

let { ipcMain } = require('electron');
let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({ width: 800, height: 600 })

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'index.html'),
		protocol: 'file:',
		slashes: true
	}));

	mainWindow.on('closed', function () {
		mainWindow = null
	});
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function () {
	if (mainWindow === null) {
		createWindow();
	}
});

// https://www.npmjs.com/package/electron-settings
// separate simulate and listen
// configurable IoT Hub.
// create message manager
// readD2C should populate textarea
// add a delete device button in table
// make textarea a general Output box (put device ID and key there on create)
// add meta properties
// possible feature - if some prop is true, use style
// support consumer groups on read
// device twins
// methods on device
// simulate multiple devices, listen to multiple devices
require('./ConnectionManager');
require('./RegistryManager');
require('./CreateDeviceIdentity');
require('./DeleteDeviceIdentity');
require('./ReadDeviceList');

// Need to route channels through main process to manipulate 
// DOM due to document loading.
ipcMain.on('devices', (devices) => {
	mainWindow.webContents.send('devices', devices);
});

ipcMain.on('output-text', (data) => {
	mainWindow.webContents.send('output-text', data);
});

ipcMain.on('table-refresh', () => {
	mainWindow.webContents.send('table-refresh');
});

// HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=
