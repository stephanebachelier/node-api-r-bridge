module.exports = string => {
  const letters = []
  for (let i in string) {
    letters.push(string[i])
  }

  return letters.sort().join()
}
