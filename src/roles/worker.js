const SpawnQueue = require('../queues/spawn')

const pickupJob = (creep) => {
  const resources = creep.room.find(FIND_DROPPED_RESOURCES)
  const target = resources[0]

  const pickupRes = creep.pickup(target)

  if (pickupRes === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const mineJob = (creep) => {
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
    if (creep.memory.task === 'mine') {
      return mineJob(creep)
    }
    if (creep.memory.task === 'haul') {
      return pickupJob(creep)
    }
  }

  return transferJob(creep)
}

const spawn = (numberOfWorkers) => {
  SpawnQueue.add({
    key: `worker-${numberOfWorkers}`,
    name: `worker-${numberOfWorkers}`,
    body: [MOVE, WORK, CARRY],
    memory: { role: 'worker', task: 'mine' },
    priority: 1
  })
}

module.exports = {
  spawn,
  tick
}
