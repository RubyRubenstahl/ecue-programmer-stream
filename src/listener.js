/**
 * Created by Mike on 5/10/2017.
 */
const dgram = require('dgram');
const Rx = require('rxjs');


function listener(port= 4000, ip='0.0.0.0') {
  const server = dgram.createSocket('udp4');
  const messages = Rx.Observable.fromEvent(server, 'message', (msg, rInfo)=>parsePacket(msg,rInfo));
  const errors = Rx.Observable.fromEvent(server, 'error');
  server.bind(port, ip);
  return {messages, errors, port, ip};
}

function  parsePacket(rawMsg, rawRInfo){
  const data =  JSON.parse(rawMsg.toString());
  const {address, size, port} = rawRInfo;
   const connectionInfo = {address, size, port};
  const packet = Object.assign({}, connectionInfo, {data});
   //console.log(rawRInfo);
  return packet;
}



//noinspection JSUnresolvedVariable
module.exports = listener;
