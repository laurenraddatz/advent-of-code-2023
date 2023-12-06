import { readFileSync } from 'fs'

const input = readFileSync('06/input.txt').toString().split('\n')
const example = readFileSync('06/example.txt').toString().split('\n')

const p1 = (lines) => {
  const times = (lines[0].split(':')[1]).split(' ').filter(n => n)
  const distances = (lines[1].split(':')[1]).split(' ').filter(n => n)

  return times.map((time, index) => {
    const recordDistance = Number(distances[index])
    const totalTime = Number(time)
    let winningDistances = []

    for (let i = 0; i <= totalTime; i++) {
      const timeHeld = i
      const rate = i
      const distanceTraveled = (totalTime - timeHeld) * rate
      if (distanceTraveled > recordDistance) {
        winningDistances.push(distanceTraveled)
      }
    }

    return winningDistances.length
  }).reduce((a, b) => a * b, 1)
}

console.log('part one:', p1(input)) // 74698

const p2 = (lines) => {
  const totalTime = Number((lines[0].split(':')[1]).split(' ').filter(n => n).join(''))
  const recordDistance = Number((lines[1].split(':')[1]).split(' ').filter(n => n).join(''))
  let count = 0

  for (let i = 0; i <= totalTime; i++) {
    const timeHeld = i
    const rate = i
    const distanceTraveled = (totalTime - timeHeld) * rate
    if (distanceTraveled > recordDistance) {
      count++
    }
  }

  return count
}

console.log('part two:', p2(input)) // 27563421