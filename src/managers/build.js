module.exports = () => {
  const { rooms } = Game
  const room = Object.values(rooms)

  const constructRes = room.createConstructionSite(25, 30, STRUCTURE_CONTAINER)

  console.log(constructRes)
}
