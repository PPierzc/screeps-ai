const SpawnQueue = require('../queues/spawn')

const pickupJob = (creep) => {
  const target = creep.room.find(FIND_DROPPED_ENERGY)
  console.log(target)
  const pickupRes = creep.pickup(target)

  if (pickupRes === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
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
    return pickupJob(creep)
  }

  return transferJob(creep)
}

const spawn = (numberOfHarvesters) => {
  SpawnQueue.add({
    key: `hauler-${numberOfHarvesters}`,
    name: `hauler-${numberOfHarvesters}`,
    body: [MOVE, CARRY, CARRY],
    memory: { role: 'hauler' },
    priority: 2
  })
}

module.exports = {
  spawn,
  tick
}
