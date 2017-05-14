/**
 * Created by Mike on 5/14/2017.
 */
const Rx = require('rxjs');
const Buffer = require('buffer');

const dgram = require('dgram');
const dispatcher = new Rx.Subject();

  dispatcher
      .map(command=>packCommand(command))
      .do(packedCommand=>sendCommand(packedCommand))
      .subscribe(command=>console.log(command));

  function packCommand({command, params=[]}){
    return ([command].concat(params)).join('\t')+'\n';
  }

  function sendCommand(packedCommand){

    const socket = dgram.createSocket('udp4');

    socket.send(packedCommand, 9001, 'localhost', (err) => {
      socket.close();
    });
  }

dispatcher.next({command:'CUE_PLAY', params:[3, 4]});
dispatcher.next({command:'VM_SET_LEVEL', params:[1, 1024]});

