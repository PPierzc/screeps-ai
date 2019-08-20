(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const HarvesterManager = require('./managers/harvester')
const UpgraderManager = require('./managers/upgrader')
const DemandManager = require('./managers/demand')
const SpawnQueue = require('./queues/spawn')

module.exports.loop = function () {
  const {
    harvesters,
    upgraders
  } = DemandManager()

  console.log('demand', harvesters, upgraders)

  SpawnQueue.tick()

  HarvesterManager.tick(harvesters)
  UpgraderManager.tick(upgraders)
}

},{"./managers/demand":2,"./managers/harvester":3,"./managers/upgrader":4,"./queues/spawn":5}],2:[function(require,module,exports){
/* global Game */
module.exports = () => {
  const { creeps } = Game

  const currHarvesters = Object.values(creeps).filter(creep => creep.memory.role === 'harvester').length
  const currUpgraders = Object.values(creeps).filter(creep => creep.memory.role === 'upgrader').length

  const harvesters = (currUpgraders + 1) * 3
  const upgraders = Math.floor(currHarvesters / 3)

  return {
    harvesters,
    upgraders
  }
}

},{}],3:[function(require,module,exports){
/* global Game */

const HarvesterRole = require('../roles/harvester')

module.exports = {
  tick: function (demand) {
    const { creeps } = Game

    const harvesters = Object.values(creeps).filter(creep => creep.memory.role === 'harvester')

    if (harvesters.length < demand) {
      HarvesterRole.spawn(harvesters.length)
    }

    harvesters.forEach(harvester => {
      HarvesterRole.tick(harvester)
    })
  }
}

},{"../roles/harvester":6}],4:[function(require,module,exports){
/* global Game */

const UpgraderRole = require('../roles/upgrader')

module.exports = {
  tick: function (demand) {
    const { creeps } = Game

    const upgraders = Object.values(creeps).filter(creep => creep.memory.role === 'upgrader')

    if (upgraders.length < demand && Object.values(creeps).length) {
      UpgraderRole.spawn(upgraders.length)
    }

    upgraders.forEach(upgrader => {
      UpgraderRole.tick(upgrader)
    })
  }
}

},{"../roles/upgrader":7}],5:[function(require,module,exports){
/* global Game */

Game.spawns.Spawn1.memory.queue = []

module.exports = {
  add: (job) => {
    const {
      queue
    } = Game.spawns.Spawn1.memory

    const duplicateJobs = queue.filter(_job => _job.key === job.key)

    if (!duplicateJobs.length) {
      queue.push(job)
    }
  },
  tick: () => {
    const spawn = Game.spawns.Spawn1

    if (!spawn.spawning) {
      if (spawn.memory.processing) {
        spawn.memory.queue.shift()
        spawn.memory.processing = false
      }

      const job = spawn.memory.queue.sort((a, b) => a - b)[0]

      if (job) {
        spawn.createCreep(job.body, job.name, job.memory)
        spawn.memory.processing = true
      }
    }
  }
}

},{}],6:[function(require,module,exports){
/* global Game, FIND_SOURCES, ERR_NOT_IN_RANGE, RESOURCE_ENERGY, MOVE, WORK, CARRY */

const SpawnQueue = require('../queues/spawn')

module.exports = {
  spawn: function (numberOfHarvesters) {
    SpawnQueue.add({
      key: `harvester-${numberOfHarvesters}`,
      name: `harvester-${numberOfHarvesters}`,
      body: [MOVE, WORK, CARRY],
      memory: { role: 'harvester' },
      priority: 1
    })
  },
  tick: function (creep) {
    if (creep.carry.energy < creep.carryCapacity) {
      var sources = creep.room.find(FIND_SOURCES)
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0])
      }
    } else {
      if (creep.transfer(Game.spawns.Spawn1, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.spawns.Spawn1)
      }
    }
  }
}

},{"../queues/spawn":5}],7:[function(require,module,exports){
/* global Game, ERR_NOT_IN_RANGE, RESOURCE_ENERGY, MOVE, WORK, CARRY */

const SpawnQueue = require('../queues/spawn')

const upgrade = (creep) => {
  const controller = creep.room.controller

  if (creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    creep.moveTo(controller)
  }
}

module.exports = {
  spawn: function (numberOfUpgraders) {
    SpawnQueue.add({
      key: `upgrader-${numberOfUpgraders}`,
      name: `upgrader-${numberOfUpgraders}`,
      body: [MOVE, WORK, CARRY],
      memory: { role: 'upgrader' },
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

},{"../queues/spawn":5}]},{},[1]);
