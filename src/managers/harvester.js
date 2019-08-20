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
