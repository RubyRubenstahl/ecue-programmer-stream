/**
 * Created by miket on 5/15/2017.
 */
const Rx = require('rxjs');
const _ = require('underscore');

function stateStream(socket) {

    const packets = Rx.Observable
        .fromEvent(socket, 'message', (msg, rInfo)=>parsePacket(msg,rInfo));


    const currentCues = packets
        .filter(packet => packet.data.action === 'CURRENT_CUES_UPDATE');

    const vmLevels = packets
        .filter(packet => packet.data.action === 'VM_LEVELS_UPDATE');

    const cuelistSubLevels = packets
        .filter(packet => packet.data.action === 'QL_SUB_UPDATE');

    const groupList = packets
        .filter(packet => packet.data.action === 'GROUP_LIST_UPDATE')
        .distinctUntilChanged(null, packet => packet.data.groups.join(','));

    const cuelists = packets
        .filter(packet => packet.data.action === 'CUELIST_UPDATE')
        .groupBy(packet => packet.data.cuelist.cuelistNumber)
        .mergeMap(cuelist =>
            cuelist.distinctUntilChanged((p1, p2) => _.isEqual(p1, p2))
        );

    const all = Rx.Observable.merge(
        currentCues,
        vmLevels,
        cuelistSubLevels,
        groupList,
        cuelists
    );

    return {
        currentCues,
        vmLevels,
        cuelistSubLevels,
        groupList,
        cuelists,
        all
    }
}

function  parsePacket(rawMsg, rawRInfo){
    const data =  JSON.parse(rawMsg.toString());
    const {address, size, port} = rawRInfo;
    const connectionInfo = {address, size, port};
    const packet = Object.assign({}, connectionInfo, {data});
    //console.log(rawRInfo);
    return packet;
}


module.exports = stateStream;