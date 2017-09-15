'use strict';
const { ipcRenderer } = require('electron')

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

let connectionString;
let client;
let deviceId;
let deviceKey;

// Needs to allow for setting the iot hub name
exports.createConnection = (id, key) => {
    deviceId = id;
    deviceKey = key;
    connectionString = 'HostName=iot-practice-hub.azure-devices.net;DeviceId=' + id +';SharedAccessKey=' + key;
}

exports.getConnection = () => {
    return {id: deviceId, key, deviceKey}
}

exports.createClient = () => {
    client = clientFromConnectionString(connectionString);
}


function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        // if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

var sendInterval;

var connectCallback = function (client, err) {
    if (err) {
        console.log('Could not connect: ' + err);
    } else {
        console.log('Client connected');

        // Create a message and send it to the IoT Hub every second
        sendInterval = setInterval(function () {
            var temperature = 20 + (Math.random() * 15);
            var humidity = 60 + (Math.random() * 20);
            var data = JSON.stringify({ deviceId: deviceId, temperature: temperature, humidity: humidity });
            var message = new Message(data);
            message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
            ipcRenderer.send('simulate', "Sending message: " + message.getData());

            // this.client is undefined in this scope, nested I guess.
            client.sendEvent(message, printResultFor('send'));
        }, 1000);
    }
};

exports.open = () => {
    client.open(connectCallback(client));
}

exports.close = () => {
    console.log("closing client");
    client.removeAllListeners();
    client.close();
}