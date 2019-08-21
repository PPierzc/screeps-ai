const SpawnQueue = require('../queues/spawn')

const upgradeJob = (creep) => {
  const controller = creep.room.controller

  if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    creep.moveTo(controller)
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

const tick = (creep) => {
  if (!creep.carry.energy) {
    creep.memory.task = 'withdraw'
  }

  if (creep.carry.energy < creep.carryCapacity) {
    if (creep.memory.task === 'withdraw') {
      withdrawJob(creep)
    }

    if (creep.memory.task === 'upgrade') {
      upgradeJob(creep)
    }
  } else {
    creep.memory.task = 'upgrade'
    upgradeJob(creep)
  }
}

const spawn = (numberOfUpgraders) => {
  SpawnQueue.add({
    key: `upgrader-${numberOfUpgraders}`,
    name: `upgrader-${numberOfUpgraders}`,
    body: [MOVE, WORK, CARRY],
    memory: { role: 'upgrader' },
    priority: 3
  })
}

module.exports = {
  spawn,
  tick
}
