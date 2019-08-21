const MinerRole = require('../../roles/miner')

module.exports = {
  tick: function (demand) {
    const { creeps } = Game

    const miners = Object.values(creeps).filter(creep => creep.memory.role === 'miner')

    if (miners.length < demand) {
      MinerRole.spawn(miners.length)
    }

    miners.forEach(miner => {
      MinerRole.tick(miner)
    })
  }
}
