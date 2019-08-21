module.exports = () => {
  const { rooms } = Game

  const sources = Object.values(rooms)[0].find(FIND_SOURCES)

  console.log(sources)
}
