const CreepsManager = require('./managers/creeps')
const BuildManager = require('./managers/build')

module.exports.loop = function () {
  CreepsManager()
  BuildManager()
}
