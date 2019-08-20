const HarvesterRole = require('role.harvester')

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
};
