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
        const res = spawn.createCreep(job.body, job.name, job.memory)
        if (!res) {
          spawn.memory.processing = true
        }
      }
    }
  }
}
