const WorkerRole = require('../../roles/worker')

module.exports = {
  tick: function (demand) {
    const { creeps } = Game

    const workers = Object.values(creeps).filter(creep => creep.memory.role === 'worker')

    if (workers.length < demand) {
      WorkerRole.spawn(workers.length)
    }

    workers.forEach(worker => {
      WorkerRole.tick(worker)
    })
  }
}
