const HarvesterManager = require('./managers/harvester')
const UpgraderManager = require('./managers/upgrader')
const DemandManager = require('./managers/demand')
const SpawnQueue = require('./queues/spawn')

module.exports.loop = function () {
  const {
    harvesters,
    upgraders
  } = DemandManager()

  console.log('demand', harvesters, upgraders)

  SpawnQueue.tick()

  HarvesterManager.tick(harvesters)
  UpgraderManager.tick(upgraders)
}
