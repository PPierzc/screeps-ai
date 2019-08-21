module.exports = () => {
  const {
    rooms,
    constructionSites,
    structures
  } = Game
  const room = Object.values(rooms)[0]

  const containersUnderConstruction = Object.values(constructionSites).filter(constructionSite => constructionSite.structureType === STRUCTURE_CONTAINER)
  const containers = Object.values(structures).filter(structure => structure.structureType === STRUCTURE_CONTAINER)

  if (!containersUnderConstruction.length && !containers.length) {
    const res = room.createConstructionSite(25, 30, STRUCTURE_CONTAINER)
    console.log(res)
  }
}
