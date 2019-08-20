/* global Game */
module.exports = () => {
  const { creeps } = Game

  const currHarvesters = Object.values(creeps).filter(creep => creep.memory.role === 'harvester').length
  const currUpdaters = Object.values(creeps).filter(creep => creep.memory.role === 'updater').length

  const harvesters = (currUpdaters + 1) * 3
  const updaters = Math.floor(currHarvesters / 3)

  return {
    harvesters,
    updaters
  }
}
