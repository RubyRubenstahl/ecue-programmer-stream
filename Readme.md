#### Basic Usage

```js

const ecuePogrammerStream = require('../src/ecue-programmer-stream')

// Create a socket that we will talk through. 
const dgram = require('dgram');
const socket = dgram.createSocket('udp4', {address: '192.168.123.19'});
socket.bind(4000);

// Set an rxjs stream of state changes coming from Programmer
const stateStream = ecuePogrammerStream.StateStream(socket);

stateStream.all.subscribe(
    packet=>console.log(packet)
);

// Create a command dispatcher to send commands to Programmer. We can use the same socket we
// used for the input stream, although you don't have to.
// There is an optional 3rd argument that takes an rxjs stream to pipe commands from a websocket
// or any other source. 
const commandDispatcher = ecuePogrammerStream.CommandDispatcher(socket, {address:'192.168.123.11'});

// Send a CUELIST_PLAY command to the server. 
setInterval(()=>{
    console.log(commandDispatcher);
    commandDispatcher.send({command: 'CUELIST_PLAY', params:[1,3]});
},2000);

```
