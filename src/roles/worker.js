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

const withdrawJob = (creep) => {
  let target = Game.spawns.Spawn1

  const containers = creep.pos.findInRange(FIND_STRUCTURES, 20, {
    filter: {
      structureType: STRUCTURE_CONTAINER
    }
  })

  if (containers.length && containers[0].store.energy) {
    target = containers[0]
  }

  const withdraw = creep.withdraw(target, RESOURCE_ENERGY)

  if (withdraw === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const buildJob = (creep) => {
  const constructionSites = creep.room.find(FIND_MY_CONSTRUCTION_SITES)
  const target = constructionSites[0]

  const buildRes = creep.build(target)

  if (buildRes === ERR_NOT_IN_RANGE) {
    creep.moveTo(target)
  }
}

const upgradeJob = (creep) => {
  const controller = creep.room.controller

  if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    creep.moveTo(controller)
  }
}

const tick = (creep) => {
  if (!creep.carry.energy) {
    creep.memory.needRefil = true
  }

  if (creep.carry.energy === creep.carryCapacity) {
    creep.memory.needRefil = false
  }

  if (creep.carry.energy < creep.carryCapacity) {
    switch (creep.memory.task) {
      case 'haul':
        return pickupJob(creep)
      case 'mine':
        return mineJob(creep)
      case 'build':
        if (creep.memory.needRefil) {
          return withdrawJob(creep)
        }
        return buildJob(creep)
      case 'upgrade':
        if (creep.memory.needRefil) {
          return withdrawJob(creep)
        }
        return upgradeJob(creep)
      default:
        return null
    }
  }

  switch (creep.memory.task) {
    case 'build':
      return buildJob(creep)
    case 'upgrade':
      return upgradeJob(creep)
    default:
      return transferJob(creep)
  }
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
