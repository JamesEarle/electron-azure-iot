const { ipcRenderer } = require('electron')
const remote = require('electron').remote;
const path = require('path')
const url = require('url')

document.getElementById('prompt-button').addEventListener("click", () => {
    const BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({ width: 400, height: 200 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../prompt.html'),
        protocol: 'file:',
        slashes: true
    }))
});

document.getElementById('list-button').addEventListener("click", () => {
    ipcRenderer.send('list-request', 'true');
});