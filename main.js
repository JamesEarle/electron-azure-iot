'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const url = require('url');

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
// readD2C should populate textarea
// add meta properties
// possible feature - if some prop is true, use style
// support consumer groups on read
// device twins
// methods on device
// simulate multiple devices, listen to multiple devices
require('./ConnectionManager');
require('./RegistryManager');

require('./ReadDeviceList');

// ipcMain.on('registry-request', (event, arg) => {
//     console.log('starting registry creation1');
// });


// require('./CreateDeviceIdentity');

// HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=
