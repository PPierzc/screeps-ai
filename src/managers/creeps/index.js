const HarvesterManager = require('./harvester')
const UpgraderManager = require('./upgrader')
const DemandManager = require('./demand')
const SpawnQueue = require('../../queues/spawn')

module.exports = () => {
  const {
    harvesters,
    upgraders
  } = DemandManager()

  SpawnQueue.tick()

  HarvesterManager.tick(harvesters)
  UpgraderManager.tick(upgraders)
}
