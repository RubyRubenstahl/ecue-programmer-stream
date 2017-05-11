const listener = require('./listener');
const router = require('./packetRouter');

// const packetHandler = packet => {
//   console.log(packet.size);
// }
const server  = listener(router);

