const HarvesterManager = require('manager.harvester')
const UpdaterManager = require('manager.updater')
const DemandManager = require('manager.demand')
const SpawnQueue = require('queue.spawn')

module.exports.loop = function () {
  const {
    harvesters,
    updaters
  } = DemandManager()

  console.log('demand', harvesters, updaters)

  SpawnQueue.tick()

  HarvesterManager.tick(harvesters)
  UpdaterManager.tick(updaters)
}
