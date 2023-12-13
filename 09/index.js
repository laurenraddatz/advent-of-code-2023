import { readFileSync } from 'fs'

const input = readFileSync('09/input.txt').toString().split('\n')
const example = readFileSync('09/example.txt').toString().split('\n')

const lagrange = (x, xValues, yValues) => {
  let result = 0
  for (let i = 0; i < xValues.length; i++) {
    let term = 1
    for (let j = 0; j < xValues.length; j++) {
      if (j !== i) {
        term *= (x - xValues[j]) / (xValues[i] - xValues[j])
      }
    }
    result += term * yValues[i]
  }
  return Math.round(result)
}

const p1 = (lines) => {
  return lines.map((line) => {
    const yValues = line.split(' ').map(Number)
    const xValues = [...Array(yValues.length).keys()]
    return lagrange(xValues.length, xValues, yValues)
  }).reduce((acc, n) => acc + n, 0)
}

console.log('part one:', p1(input)) // 1974232246

const p2 = (lines) => {
  return lines.map((line) => {
    const yValues = line.split(' ').map(Number)
    const xValues = [...Array(yValues.length).keys()]
    return lagrange(-1, xValues, yValues)
  }).reduce((acc, n) => acc + n, 0)
}

console.log('part two:', p2(input)) //