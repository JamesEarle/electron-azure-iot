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
    ipcRenderer.send('list-request', '');
});

document.getElementById('reset-button').addEventListener('click', () => {
    clearDeviceTable();
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

// Create the table
ipcRenderer.on('devices', (event, arg) => {
    let table = document.getElementById("device-table-body");

    // Table is already populated, clear and refresh
    if (table.rows.length > 0) {
        clearDeviceTable();    
        ipcRenderer.send('list-request');
    } else {
        for (let i = 0; i < arg.length; i++) {
            let row = table.insertRow(i);

            let id = row.insertCell(0);
            let key = row.insertCell(1);
            let c2dCount = row.insertCell(2);
            let connectionState = row.insertCell(3);
            let d2c = row.insertCell(4);
            let deleteButton = row.insertCell(5);

            id.innerHTML = arg[i].deviceId;
            key.innerHTML = arg[i].authentication.symmetricKey.primaryKey;
            c2dCount.innerHTML = arg[i].cloudToDeviceMessageCount;
            connectionState.innerHTML = arg[i].connectionState;
            d2c.innerHTML = "<a id='simulate-" + (i + 1) + "' href='#'>Simulate " + (i + 1) + "</a>";
            deleteButton.innerHTML = "<a id='delete-" + (i + 1) + "' href='#'>Delete</a>"
        }

        for (let i = 0; i < arg.length; i++) {
            // Add event listeners for new a elements
            document.getElementById('simulate-' + (i + 1)).addEventListener('click', () => {
                // function that takes any given ID and listens on that device
                var d2cListener = require('../ReadD2CMessages');
                var simulateDevice = require('../SimulatedDevice');
                d2cListener.createConnection();
                simulateDevice.createConnection(arg[i].deviceId, arg[i].authentication.symmetricKey.primaryKey);
                simulateDevice.createClient();
                simulateDevice.open();
            });

            document.getElementById('delete-' + (i + 1)).addEventListener('click', () => {
                ipcRenderer.send('delete-device', arg[i].deviceId);
            });
        }
    }
});

// message gets received but isn't working right...
ipcRenderer.on('table-refresh', (event, arg) => {
    clearDeviceTable();
});
// ipcRenderer.send('list-request');

ipcRenderer.on('output-text', (event, data) => {
    let textarea = document.getElementById('output');
    textarea.textContent = data + "\n" + textarea.textContent;
});

function clearDeviceTable() {
    let table = document.getElementById("device-table");

    if (table) {
        let oldBody = document.getElementById('device-table-body');
        let newBody = document.createElement('tbody');
        newBody.id = "device-table-body";
    
        table.replaceChild(newBody, oldBody);
    }
}