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
// readD2C should populate textarea
// add meta properties
// possible feature - if some prop is true, use style
// support consumer groups on read
// device twins
// methods on device
// simulate multiple devices, listen to multiple devices
require('./ConnectionManager');
require('./RegistryManager');

// When other main process modules have completed their tasks, they broadcast
// the results, then the main window is responsible for listening and passing 
// along to the renderer process.
require('./ReadDeviceList');
ipcMain.on('devices', (devices) => {
	mainWindow.webContents.send('devices', devices);
});

// HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=
