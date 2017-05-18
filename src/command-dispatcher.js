/**
 * Created by miket on 5/15/2017.
 */
const Rx = require('rxjs');

/**
 * @function commandDispatcher
 * @param socket {Object} socket - An initialized dgram socket.
 * @param options {Object} [options] - port and/or address. Defaults: {address: 'localhost', 9001}
 * @param commandStream -
 * @returns {{send: send, address: string, port: number}}
 */
function commandDispatcher(socket, options, commandStream=Rx.Observable.never()){
    const address = options.address || 'localhost';
    const port = options.port || 9001;
    commandStream.subscribe(command=>send(command));

    function send(command){
        const packedCommand = packCommand(command);
            console.log(`Sending ${packedCommand} to ${address}:${port}`)
        socket.send(packedCommand, port, address, (err) => {
            if(err) console.log(err);
        });
    }

    return {send, address, port}
}

/* Takes in a command object of the shape {command: "MY_COMMAND", params[1, "SOME STRING"]...}}
   and transforms it into an a tab-separated string starting with the command followed by each
   of the parameters in order. Each command is ended with a newline.

 */
function packCommand({command, params=[]}){
    return ([command].concat(params)).join('\t')+'\n';
}



module.exports = commandDispatcher;