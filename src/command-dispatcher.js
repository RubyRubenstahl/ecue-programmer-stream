/**
 * Created by miket on 5/15/2017.
 */
const Rx = require('rxjs');


function commandDispatcher(socket, commandStream=Rx.Observable.never(),options={address:'127.0.0.1', port:9001}){

    const {address, port}= options;


    commandStream.subscribe(command=>send(command));

    function send(command){

        sendPackedCommand(packCommand(command));
    }

    function sendPackedCommand(packedCommand){
        console.log(`Sending ${packedCommand} to ${address}:${port}`)
        socket.send(packedCommand, port, address, (err) => {
            if(err) console.log(err);
            console.log('sent');
        });
    }

    return {send, address, port}
}

function packCommand({command, params=[]}){
    return ([command].concat(params)).join('\t')+'\n';
}

module.exports = commandDispatcher;