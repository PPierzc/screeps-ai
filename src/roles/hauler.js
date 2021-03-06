const SpawnQueue = require('../queues/spawn')

const pickupJob = (creep) => {
  const resources = creep.room.find(FIND_DROPPED_RESOURCES)
  const target = resources[0]

  const pickupRes = creep.pickup(target)

  if (pickupRes === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const transferJob = (creep) => {
  const containers = creep.pos.findInRange(FIND_STRUCTURES, 20, {
    filter: {
      structureType: STRUCTURE_CONTAINER
    }
  })

  let target = Game.spawns.Spawn1
  if (containers.length && target.energy > target.energyCapacity - 50) {
    target = containers[0]
  }

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

const spawn = (numberOfWorkers) => {
  SpawnQueue.add({
    key: `hauler-${numberOfWorkers}`,
    name: `hauler-${numberOfWorkers}`,
    body: [MOVE, CARRY, CARRY],
    memory: { role: 'hauler' },
    priority: 2
  })
}

module.exports = {
  spawn,
  tick
}
