module.exports = () => {
  const { creeps } = Game

  const currWorkers = Object.values(creeps).filter(creep => creep.memory.role === 'worker').length
  const currMiners = Object.values(creeps).filter(creep => creep.memory.role === 'miner').length

  const workers = Object.values(creeps).length < 3 ? 1 : Object.values(creeps).length / 3
  const upgraders = currMiners
  const miners = currWorkers < 1 ? 0 : 3
  const haulers = currMiners * 2

  return {
    workers,
    upgraders,
    miners,
    haulers
  }
}
