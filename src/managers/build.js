module.exports = () => {
  const { rooms } = Game
  const room = Object.values(rooms)[0]

  room.createConstructionSite(25, 30, STRUCTURE_CONTAINER)
}
