/* global Game */

const UpdaterRole = require('role.updater')

module.exports = {
  tick: function (demand) {
    const { creeps } = Game

    const updaters = Object.values(creeps).filter(creep => creep.memory.role === 'updater')

    if (updaters.length < demand && Object.values(creeps).length) {
      UpdaterRole.spawn(updaters.length)
    }

    updaters.forEach(updater => {
      UpdaterRole.tick(updater)
    })
  }
}
