const WorkerManager = require('./worker')
const UpgraderManager = require('./upgrader')
const MinerManager = require('./miner')
const HaulerManager = require('./hauler')
const DemandManager = require('./demand')
const SpawnQueue = require('../../queues/spawn')

module.exports = () => {
  const {
    workers,
    upgraders,
    miners,
    haulers
  } = DemandManager()

  SpawnQueue.tick()

  WorkerManager.tick(workers)
  UpgraderManager.tick(upgraders)
  MinerManager.tick(miners)
  HaulerManager.tick(haulers)
}
