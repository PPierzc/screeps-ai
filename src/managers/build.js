module.exports = () => {
  const {
    rooms,
    constructionSites,
    structures,
    spawns
  } = Game
  const room = Object.values(rooms)[0]
  const spawn = Object.values(spawns)[0]

  const containersUnderConstruction = Object.values(constructionSites).filter(constructionSite => constructionSite.structureType === STRUCTURE_CONTAINER)
  const containers = Object.values(structures).filter(structure => structure.structureType === STRUCTURE_CONTAINER)

  if (!containersUnderConstruction.length && !containers.length) {
    room.createConstructionSite(spawn.pos.x, spawn.pos.y + 2, STRUCTURE_CONTAINER)
  }
}
