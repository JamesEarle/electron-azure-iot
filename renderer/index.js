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
    }));
});

document.getElementById('list-button').addEventListener("click", () => {
    ipcRenderer.send('list-request', 'true');
});

document.getElementById('add-connection').addEventListener('click', () => {
    const BrowserWindow = remote.BrowserWindow;
    var win = new BrowserWindow({ width: 400, height: 200 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, '../connect.html'),
        protocol: 'file:',
        slashes: true
    }));
});

ipcRenderer.on('devices', (event, arg) => {
    let table = document.getElementById("device-table");
    for(let i=0;i<arg.length;i++) {
        let row = table.insertRow(i+1);

        let id = row.insertCell(0);
        let key = row.insertCell(1);
        let c2dCount = row.insertCell(2);
        let connectionState = row.insertCell(3);

        id.innerHTML = arg[i].deviceId;
        key.innerHTML = arg[i].authentication.symmetricKey.primaryKey;
        c2dCount.innerHTML = arg[i].cloudToDeviceMessageCount;
        connectionState.innerHTML = arg[i].connectionState;
    }
});