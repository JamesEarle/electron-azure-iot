'use strict';

var EventHubClient = require('azure-event-hubs').Client;

// var connectionString = '';
var connectionString;
// = "HostName=iot-practice-hub.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey=hFhSOVBFLfuELG20j6XjhQ5wZTshXETGvb5sWDvACok=";

exports.createConnection = (conn) => {
    console.log('also connecting from redd2c');
    this.connectionString = conn;
}

var printError = function (err) {
  console.log(err.message);
};

var printMessage = function (message) {
  console.log('Message received: ');
  console.log(JSON.stringify(message.body));
  console.log('');
};

exports.createReceiver = () => {
    console.log('create receiver');
    // var client = EventHubClient.fromConnectionString(this.connectionString);

    // client.open()
    //     .then(client.getPartitionIds.bind(client))
    //     .then(function (partitionIds) {
    //         return partitionIds.map(function (partitionId) {
    //             return client.createReceiver('$Default', partitionId, { 'startAfterTime' : Date.now()}).then(function(receiver) {
    //                 console.log('Created partition receiver: ' + partitionId)
    //                 receiver.on('errorReceived', printError);
    //                 receiver.on('message', printMessage);
    //             });
    //         });
    //     })
    //     .catch(printError);
}