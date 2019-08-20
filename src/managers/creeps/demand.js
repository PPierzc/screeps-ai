/* global Game */
module.exports = () => {
  const { creeps } = Game

  const currHarvesters = Object.values(creeps).filter(creep => creep.memory.role === 'harvester').length
  const currUpgraders = Object.values(creeps).filter(creep => creep.memory.role === 'upgrader').length

  const harvesters = (currUpgraders + 1) * 3
  const upgraders = Math.floor(currHarvesters / 3)

  return {
    harvesters,
    upgraders
  }
}
