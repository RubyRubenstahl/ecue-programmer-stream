#### Basic Usage

```js

const ecuePogrammerStream = require('ecue-programmer-stream')
const dgram = require('dgram');

const socket = dgram.createSocket('udp4');
socket.bind(4000);

const stateStream = ecuePogrammerStream.StateStream(socket);
const commandDispatcher = ecuePogrammerStream.CommandDispatcher(socket);

// Log all Programmer State Changes
stateStream.all.subscribe(
    packet=>console.log(packet)
)

//Play cuelist 1, cue 3
commandDispatcher.send({command: 'CUELIST_PLAY', params:[1,3]});
```
