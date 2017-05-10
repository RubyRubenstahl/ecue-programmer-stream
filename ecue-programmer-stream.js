const Rx = require('rxjs');
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('listening', () => {
  var address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

/**
 * Convert any -1 in an array into null
 * @param arr[] -  Array of numbers
 */
const normalizeNull = arr => arr.map(item => item === -1 ? null : item);


server.on('message', (msg, rInfo)=>{

    new messageHandler(msg, rInfo)
        .logMessage()
        // .logMessageSize()
        .logConnectionInfo()
        .parseJson();
});


function  messageHandler(rawMsg, rawRInfo){
  return({
    msg: rawMsg.toString(),
    packet: null,

    logConnectionInfo: function(){
      console.log(rawRInfo);
      return this;
    },

    logMessage: function(){
      console.log(this.msg);
      return this;
    },

    logMessageSize: function(){
      console.log(this.msg.length);
      return this;
    },

    parseJson: function(){
      this.packet = JSON.parse(this.msg);
      return this;
    }
  })
}

server.bind(4000);


 //
 // UDP.subscribe(updateShowState);



// server listening 0.0.0.0:41234