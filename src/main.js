const CreepsManager = require('./managers/creeps')
const SourcesManager = require('./managers/sources')

module.exports.loop = function () {
  CreepsManager()
  SourcesManager()
}
