const SpawnQueue = require('../queues/spawn')

const harvestJob = (creep) => {
  const sources = creep.room.find(FIND_SOURCES)
  const targetSource = sources[0]

  const harvestRes = creep.harvest(targetSource)

  if (harvestRes === ERR_NOT_IN_RANGE) {
    creep.moveTo(targetSource)
  }
}

const tick = (creep) => {
  harvestJob(creep)
}

const spawn = (numberOfMiners) => {
  SpawnQueue.add({
    key: `miner-${numberOfMiners}`,
    name: `miner-${numberOfMiners}`,
    body: [MOVE, WORK, WORK],
    memory: { role: 'miner' },
    priority: 2
  })
}

module.exports = {
  spawn,
  tick
}
