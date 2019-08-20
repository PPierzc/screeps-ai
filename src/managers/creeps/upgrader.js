/* global Game */

const UpgraderRole = require('../../roles/upgrader')

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
