const listener = require('./listener');
const router = require('./packetRouter');
const Rx = require('rxjs');
const _ = require('underscore');


function programmerStream(port, ip) {
  const server = listener(port, ip);
  const errors = server.errors;

  const currentCues = server.messages
      .filter(packet => packet.data.action === 'CURRENT_CUES_UPDATE');

  const vmLevels = server.messages
      .filter(packet => packet.data.action === 'VM_LEVELS_UPDATE');

  const cuelistSubLevels = server.messages
      .filter(packet => packet.data.action === 'QL_SUB_UPDATE');

  const groupList = server.messages
      .filter(packet => packet.data.action === 'GROUP_LIST_UPDATE')
      .distinctUntilChanged(null, packet => packet.data.groups.join(','));

  const cuelists = server.messages
      .filter(packet => packet.data.action === 'CUELIST_UPDATE')
      .groupBy(packet => packet.data.cuelist.cuelistNumber)
      .mergeMap(groupObsv =>
          groupObsv.distinctUntilChanged((p1, p2) => _.isEqual(p1, p2))
      );

  const all = Rx.Observable.merge(
      currentCues,
      vmLevels,
      cuelistSubLevels,
      groupList,
      cuelists,
      errors
  );

  return {
    currentCues,
    vmLevels,
    cuelistSubLevels,
    groupList,
    cuelists,
    errors,
    all
  }
}

const ps = programmerStream();


ps.all.subscribe(packet=>console.log(packet));