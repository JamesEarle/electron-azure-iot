'use strict';
const { ipcRenderer } = require('electron')

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;

// temp, make work first then get dynamic conn strings
// var connectionString = 'HostName=iot-practice-hub.azure-devices.net;DeviceId=MyFavouriteDevice;SharedAccessKey=lwkqyASM1KcY6p8sprk6MDW2DlZeFkB5ftjpWq7J05I=';

let connectionString;
let client;

// Needs to allow for setting the iot hub name
exports.createConnection = (id, key) => {
    this.connectionString = 'HostName=iot-practice-hub.azure-devices.net;DeviceId=' + id +';SharedAccessKey=' + key;
}

exports.createClient = () => {
    this.client = clientFromConnectionString(this.connectionString);
    // console.log(this.connectionString);
}


function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ' status: ' + res.constructor.name);
    };
}

var connectCallback = function (client, err) {
    if (err) {
        console.log('Could not connect: ' + err);
    } else {
        console.log('Client connected');

        // Create a message and send it to the IoT Hub every second
        setInterval(function () {
            var temperature = 20 + (Math.random() * 15);
            var humidity = 60 + (Math.random() * 20);
            var data = JSON.stringify({ deviceId: 'MyFavouriteDevice', temperature: temperature, humidity: humidity });
            var message = new Message(data);
            message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
            // console.log("Sending message: " + message.getData());
            ipcRenderer.send('simulate', "Sending message: " + message.getData());

            // this.client is undefined in this scope, nested I guess.
            client.sendEvent(message, printResultFor('send'));
        }, 1000);
    }
};

exports.open = () => {
    this.client.open(connectCallback(this.client));
}