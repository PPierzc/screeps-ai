module.exports = () => {
  const {
    rooms,
    constructionSites,
    spawns
  } = Game
  const room = Object.values(rooms)[0]
  const spawn = Object.values(spawns)[0]

  const containersUnderConstruction = Object.values(constructionSites).filter(constructionSite => constructionSite.structureType === STRUCTURE_CONTAINER)
  const structures = room.find(FIND_STRUCTURES)
  const containers = Object.values(structures).filter(structure => structure.structureType === STRUCTURE_CONTAINER)

  const containersFilled = containers.filter(container => container.store.energy === container.storeCapacity)

  if (!containersUnderConstruction.length && !containers.length) {
    return room.createConstructionSite(spawn.pos.x, spawn.pos.y + 10, STRUCTURE_CONTAINER)
  }

  if (containers.length === containersFilled.length) {
    return room.createConstructionSite(spawn.pos.x - containers.length, spawn.pos.y + 10, STRUCTURE_CONTAINER)
  }
}
