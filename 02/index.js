import { readFileSync } from 'fs'

const input = readFileSync('02/input.txt').toString().split('\n')

const red = 12
const green = 13
const blue = 14

const p1 = input.reduce((total, line) => {
  const [game, sets] = line.split(': ')
  const subset = sets.split('; ').map((item) => item.split(', '))

  let redPass = true
  let greenPass = true
  let bluePass = true
  const passCount = subset.reduce((tot, element) => {
    element.map((item) => {
      const [value, color] = item.split(' ')
      if (color === 'red') {
        if (Number(value) > red) {
          redPass = false
        }
      }
      if (color === 'green') {
        if (Number(value) > green) {
          greenPass = false
        }
      }
      if (color === 'blue') {
        if (Number(value) > blue) {
          bluePass = false
        }
      }
    })

    if (redPass && greenPass && bluePass) {
      return tot + 1
    } else {
      return tot
    }
  }, 0)

  if (passCount === subset.length) {
    return total + Number(game.split(' ')[1])
  } else {
    return total
  }
}, 0)

console.log('part one:', p1) // 2256

const p2 = input.map((line) => {
  const [_, sets] = line.split(': ')
  const subset = sets.split('; ').map((item) => item.split(', '))

  let redMin, greenMin, blueMin

  const findMins = subset.map((element) => {
    element.map((item) => {
      const [value, color] = item.split(' ')
      if (color === 'red') {
        if (!redMin || Number(value) > redMin) {
          redMin = Number(value)
        }
      }
      if (color === 'green') {
        if (!greenMin || Number(value) > greenMin) {
          greenMin = Number(value)
        }
      }
      if (color === 'blue') {
        if (!blueMin || Number(value) > blueMin) {
          blueMin = Number(value)
        }
      }
    })
  })

  return redMin * greenMin * blueMin
}).reduce((total, item) => total + item, 0)

console.log('part two:', p2) // 74229
