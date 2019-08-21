const SpawnQueue = require('../queues/spawn')

const harvestJob = (creep) => {
  const sources = creep.room.find(FIND_SOURCES)
  const targetSource = sources[0]

  const harvestRes = creep.harvest(targetSource)

  if (harvestRes === ERR_NOT_IN_RANGE) {
    creep.moveTo(targetSource)
  }
}

const transferJob = (creep) => {
  const target = Game.spawns.Spawn1

  const transferRes = creep.transfer(target, RESOURCE_ENERGY)

  if (transferRes === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const tick = (creep) => {
  if (creep.carry.energy < creep.carryCapacity) {
    return harvestJob(creep)
  }

  return transferJob(creep)
}

const spawn = (numberOfHarvesters) => {
  SpawnQueue.add({
    key: `harvester-${numberOfHarvesters}`,
    name: `harvester-${numberOfHarvesters}`,
    body: [MOVE, WORK, CARRY],
    memory: { role: 'harvester' },
    priority: 1
  })
}

module.exports = {
  spawn,
  tick
}
