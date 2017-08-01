const { ipcRenderer } = require('electron')
const remote = require('electron').remote;
const path = require('path')
const url = require('url')

document.getElementById('submit').addEventListener("click", () => {
    let win = remote.getCurrentWindow();
    let key = document.getElementById('key');
    ipcRenderer.send('click-confirm', key.value);
    win.close();
});
