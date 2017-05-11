/**
 * Created by Mike on 5/10/2017.
 */
const dgram = require('dgram');

function listener(port= 4000, ip='0.0.0.0') {
  const server = dgram.createSocket('udp4');

  server.on('message', (msg, rInfo) => {
    const packet = packetParser(msg, rInfo);
  });

  server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
  });

  server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
  });
  server.bind(port, ip);
  /**
   * Convert any -1 in an array into null
   * @param arr[] -  Array of numbers
   */
  const normalizeNull = arr => arr.map(item => item === -1 ? null : item);
}

function  packetParser(rawMsg, rawRInfo){
  const data = JSON.parse(rawMsg.toString());
  const connectionInfo = {clientIp: address, clientPort: clientPort, size} =  rawRInfo;
  const packet = Object.assign(connectionInfo, {data});
  console.log(packet);
  return packet;
}



module.exports = listener;
