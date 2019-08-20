/* global Game, ERR_NOT_IN_RANGE, RESOURCE_ENERGY, MOVE, WORK, CARRY */
const SpawnQueue = require('queue.spawn')

const upgrade = (creep) => {
  const controller = creep.room.controller

  if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    creep.moveTo(controller)
  }
}

const Updater = {
  spawn: function (numberOfUpdaters) {
    SpawnQueue.add({
      key: `updater-${numberOfUpdaters}`,
      name: `updater-${numberOfUpdaters}`,
      body: [MOVE, WORK, CARRY],
      memory: { role: 'updater' },
      priority: 2
    })
  },
  tick: function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      const spawn = Game.spawns.Spawn1
      const withdraw = creep.withdraw(spawn, RESOURCE_ENERGY)

      if (withdraw === ERR_NOT_IN_RANGE) {
        if (creep.carry.energy) {
          upgrade(creep)
        } else {
          creep.moveTo(spawn)
        }
      }
    } else {
      upgrade(creep)
    }
  }
}

module.exports = Updater
