module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(31);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 31:
/***/ (function(module, __unusedexports, __webpack_require__) {

const HarvesterManager = __webpack_require__(483)
const UpgraderManager = __webpack_require__(542)
const DemandManager = __webpack_require__(925)
const SpawnQueue = __webpack_require__(638)

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


/***/ }),

/***/ 294:
/***/ (function(module, __unusedexports, __webpack_require__) {

/* global Game, FIND_SOURCES, ERR_NOT_IN_RANGE, RESOURCE_ENERGY, MOVE, WORK, CARRY */

const SpawnQueue = __webpack_require__(638)

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


/***/ }),

/***/ 394:
/***/ (function(module, __unusedexports, __webpack_require__) {

/* global Game, ERR_NOT_IN_RANGE, RESOURCE_ENERGY, MOVE, WORK, CARRY */

const SpawnQueue = __webpack_require__(638)

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


/***/ }),

/***/ 483:
/***/ (function(module, __unusedexports, __webpack_require__) {

/* global Game */

const HarvesterRole = __webpack_require__(294)

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


/***/ }),

/***/ 542:
/***/ (function(module, __unusedexports, __webpack_require__) {

/* global Game */

const UpgraderRole = __webpack_require__(394)

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


/***/ }),

/***/ 638:
/***/ (function(module) {

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


/***/ }),

/***/ 925:
/***/ (function(module) {

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


/***/ })

/******/ });
