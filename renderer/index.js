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
    let table = document.getElementById("device-table");
    // console.log(table.rows.length);
    for (let i = 1; i < table.rows.length; i++) {
        table.deleteRow(1);
        console.log(i);
    }
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
    let table = document.getElementById("device-table");
    for (let i = 0; i < arg.length; i++) {
        let row = table.insertRow(i + 1);

        let id = row.insertCell(0);
        let key = row.insertCell(1);
        let c2dCount = row.insertCell(2);
        let connectionState = row.insertCell(3);
        let d2c = row.insertCell(4);

        id.innerHTML = arg[i].deviceId;
        key.innerHTML = arg[i].authentication.symmetricKey.primaryKey;
        c2dCount.innerHTML = arg[i].cloudToDeviceMessageCount;
        connectionState.innerHTML = arg[i].connectionState;
        d2c.innerHTML = "<a id='simulate-" + (i + 1) + "' href='#'>Simulate " + (i + 1) + "</a>";
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
            // console.log(arg[i].deviceId);
            // console.log(arg[i].authentication.symmetricKey.primaryKey);
        });
    }

});