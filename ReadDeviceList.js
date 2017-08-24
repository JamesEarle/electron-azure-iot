'use strict';
//refactor into two different modules, registry functionality moved into its own module
const { ipcMain } = require('electron');

// var iothub = require('azure-iothub');

var registry;

ipcMain.on('list-request', (event, arg) => {
    event.sender.send('registry-request', '');
    // event.sender.send('get-registry', '')
    console.log('send reg request');
    // what is the order of operations? will 'get-registry' operate here?
});

ipcMain.on('make-reg', (event, args) => {
    console.log('this is whacky.'); // shouldn't have to do this, find workaround
});


ipcMain.on('registry', (event, arg) => {
    arg.list((err, result) => {
        event.sender.send('devices', result);
    });
});












// exports.createRegistry = (conn) => {
//     if(conn !== "") {
//         console.log("registry created");
//         this.registry = iothub.Registry.fromConnectionString(conn);
//     }
// }

// // store in an array in this class?
// exports.getDeviceAt = (i) => {
//     return this.registry.list((err, result) => {
//         if(i < result.length) {
//             console.log(result[i]);
//         } else {
//             console.log("Device request out of bounds.");
//         }
//     });
// }

// // unused
// exports.registryList = () => {
//     return this.registry.list((err, result) => {
//         // console.log(result);
//     });
// }
