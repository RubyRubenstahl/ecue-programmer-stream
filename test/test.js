/**
 * Created by Mike on 5/12/2017.
 */
const programmerStreamGenerator = require('../src/ecue-programmer-stream');
const listener = require('../src/listener');
const programmer = programmerStreamGenerator(listener());

programmer.all.subscribe(packet=>console.log(packet))