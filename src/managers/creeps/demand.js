module.exports = () => {
  const { creeps } = Game

  const currHarvesters = Object.values(creeps).filter(creep => creep.memory.role === 'harvester').length
  const currMiners = Object.values(creeps).filter(creep => creep.memory.role === 'miner').length

  const harvesters = 3
  const upgraders = Math.floor((currHarvesters + currMiners) / 3)
  const miners = currHarvesters < 3 ? 0 : 3

  return {
    harvesters,
    upgraders,
    miners
  }
}
