const { ipcRenderer } = require('electron')
const remote = require('electron').remote;
const path = require('path')
const url = require('url')

document.getElementById('submit').addEventListener("click", () => {
    let win = remote.getCurrentWindow();
    let conn = document.getElementById('conn');
    ipcRenderer.send('connection-request', conn.value);
    win.close();
});
