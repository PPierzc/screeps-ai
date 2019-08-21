module.exports = () => {
  const { rooms } = Game
  const room = Object.values(rooms)[0]

  const constructRes = room.createConstructionSite(25, 30, STRUCTURE_CONTAINER)

  console.log(constructRes)
}
