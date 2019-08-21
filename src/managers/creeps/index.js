const HarvesterManager = require('./harvester')
const UpgraderManager = require('./upgrader')
const MinerManager = require('./miner')
const DemandManager = require('./demand')
const SpawnQueue = require('../../queues/spawn')

module.exports = () => {
  const {
    harvesters,
    upgraders,
    miners
  } = DemandManager()

  SpawnQueue.tick()

  HarvesterManager.tick(harvesters)
  UpgraderManager.tick(upgraders)
  MinerManager.tick(miners)
}
