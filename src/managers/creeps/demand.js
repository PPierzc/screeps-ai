module.exports = () => {
  const { creeps } = Game

  const currWorkers = Object.values(creeps).filter(creep => creep.memory.role === 'worker').length
  const currMiners = Object.values(creeps).filter(creep => creep.memory.role === 'miner').length

  const workers = Object.values(creeps).length < 5 ? 1 : Math.ceil(Object.values(creeps).length / 3)
  const upgraders = Object.values(creeps).length < 5 ? 0 : Math.floor(currMiners / 2)
  const miners = currWorkers < 1 ? 0 : currMiners < 3 ? currMiners + 1 : 3
  const haulers = currMiners * 2

  return {
    workers,
    upgraders,
    miners,
    haulers
  }
}
