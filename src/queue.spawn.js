/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('queue.spawn');
 * mod.thing == 'a thing'; // true
 */

Game.spawns['Spawn1'].memory.queue = []

module.exports = {
  add: (job) => {
    const {
      queue
    } = Game.spawns['Spawn1'].memory

    const duplicateJobs = queue.filter(_job => _job.key === job.key)

    if (!duplicateJobs.length) {
      queue.push(job)
    }
  },
  tick: () => {
    const spawn = Game.spawns['Spawn1']

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
};
