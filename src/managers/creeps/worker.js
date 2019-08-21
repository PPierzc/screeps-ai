const WorkerRole = require('../../roles/worker')

module.exports = {
  tick: function (demand) {
    const { creeps } = Game

    const workers = Object.values(creeps).filter(creep => creep.memory.role === 'worker')
    const miners = Object.values(creeps).filter(creep => creep.memory.role === 'miner')

    if (workers.length < demand) {
      WorkerRole.spawn(workers.length)
    }

    workers.forEach(worker => {
      if (miners.length) {
        worker.memory.task = 'haul'
      } else {
        worker.memory.task = 'mine'
      }

      WorkerRole.tick(worker)
    })
  }
}
