const http = require('http');
const websocket = require('websocket');
const model = require('./model');

const webSocketServer = websocket.server;
const webSocketServerPort = 1337;
const clients = [];
const orgs = ["GOOG", "MSFT", "TSLA", "SPOT", "APPL", "NFLX", "HULU", "AAZN", "BLZD"];
const freshPrices = () => {
	return orgs.map(org => model.get(org));
}
const dataSet = freshPrices();

const httpServer = http.createServer(function(request, response) {});
httpServer.listen(webSocketServerPort, console.log(`${new Date()} Server is listening on port ${webSocketServerPort}`));
const wsServer = new webSocketServer({httpServer});
const broadcast = () => clients.forEach(client => client.sendUTF(JSON.stringify(freshPrices())));

wsServer.on('request', function(request) {
	console.log(`${new Date()} Connection from origin ${request.origin}`);
	
  let connection = request.accept(null, request.origin); 
	let index = clients.push(connection) - 1;

	console.log((new Date()) + ' Connection accepted.');
	console.log(JSON.stringify(dataSet.slice(dataSet.length-100)));
	connection.sendUTF(JSON.stringify(dataSet.slice(dataSet.length-100)));
  connection.on('close', connection => clients.splice(index, 1));
});

module.exports = {
	server: wsServer,
	broadcast,
	data: () => dataSet
};
