'use strict';

let { ipcRenderer } = require('electron');
var EventHubClient = require('azure-event-hubs').Client;
const settings = require('electron-settings');

const connectionString = settings.get('connection-string');
let client = EventHubClient.fromConnectionString(connectionString);

exports.open = createReceiver;

var printError = function (err) {
	console.log(err.message);
};

var printMessage = function (message) {
	console.log('Message received: ');
	console.log(JSON.stringify(message.body));
	console.log('');
};

function createReceiver() {
	console.log('create receiver');

	client.open()
		.then(client.getPartitionIds.bind(client))
		.then(function (partitionIds) {
			return partitionIds.map(function (partitionId) {
				// TODO consumer groups
				return client.createReceiver('$Default', partitionId, { 'startAfterTime': Date.now() }).then(function (receiver) {
					console.log('Created partition receiver: ' + partitionId)
					receiver.on('errorReceived', printError);
					receiver.on('message', printMessage);
				});
			});
		})
		.catch(printError);
}