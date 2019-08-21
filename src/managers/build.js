module.exports = () => {
  const { rooms } = Game
  const room = Object.values(rooms)

  room.createConstructionSite(25, 30, STRUCTURE_CONTAINER)
}
