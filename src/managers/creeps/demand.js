module.exports = () => {
  const { creeps } = Game

  const currHarvesters = Object.values(creeps).filter(creep => creep.memory.role === 'harvester').length
  const currMiners = Object.values(creeps).filter(creep => creep.memory.role === 'miner').length

  const harvesters = 1
  const upgraders = Math.floor((currMiners) / 3)
  const miners = currHarvesters < 1 ? 0 : 3
  const haulers = currMiners

  return {
    harvesters,
    upgraders,
    miners,
    haulers
  }
}
