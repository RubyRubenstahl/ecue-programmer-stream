/**
 * Created by Mike on 5/12/2017.
 */

const dgram = require('dgram');
const socket = dgram.createSocket('udp4');
socket.bind(4000);

const ecuePogrammerStream = require('../src/ecue-programmer-stream')
const stateStream = ecuePogrammerStream.StateStream(socket);
const commandDispatcher = ecuePogrammerStream.CommandDispatcher(socket);

stateStream.all.subscribe(
    packet=>console.log(packet)
)

setInterval(()=>{
    console.log(commandDispatcher)
    commandDispatcher.send({command: 'CUELIST_PLAY', params:[1,3]});
},2000)

