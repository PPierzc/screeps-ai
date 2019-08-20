const SpawnQueue = require('queue.spawn')

const Harvester = {
  spawn: function (numberOfHarvesters) {
    SpawnQueue.add({key: `harvester-${numberOfHarvesters}`, name: `harvester-${numberOfHarvesters}`, body: [MOVE, WORK, CARRY], memory: {role: 'harvester'}, priority: 1})
    // return Game.spawns['Spawn1'].createCreep([MOVE, WORK, CARRY], undefined, {role: 'harvester'})
  },
  tick: function(creep) {
    if(creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES);
      if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0]);
      }
    }
    else {
      if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns['Spawn1']);
      }
    }
  }
}

module.exports = Harvester;
