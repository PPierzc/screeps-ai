const HarvesterManager = require('./harvester')
const UpgraderManager = require('./upgrader')
const MinerManager = require('./miner')
const HaulerManager = require('./hauler')
const DemandManager = require('./demand')
const SpawnQueue = require('../../queues/spawn')

module.exports = () => {
  const {
    harvesters,
    upgraders,
    miners,
    haulers
  } = DemandManager()

  SpawnQueue.tick()

  HarvesterManager.tick(harvesters)
  UpgraderManager.tick(upgraders)
  MinerManager.tick(miners)
  HaulerManager.tick(haulers)
}
