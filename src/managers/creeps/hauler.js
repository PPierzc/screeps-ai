const HaulerRole = require('../../roles/hauler')

module.exports = {
  tick: function (demand) {
    const { creeps } = Game

    const haulers = Object.values(creeps).filter(creep => creep.memory.role === 'hauler')

    if (haulers.length < demand) {
      HaulerRole.spawn(haulers.length)
    }

    haulers.forEach(worker => {
      HaulerRole.tick(worker)
    })
  }
}
