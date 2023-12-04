import { readFileSync } from 'fs'

const input = readFileSync('03/input.txt').toString().split('\n')

const p1 = (schematic) => {
  let symbols = {}
  let numbers = []
  schematic.map((line, i) => {
    let number = {
      digits: [],
      row: i,
      col: []
    }
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      if (char >= '0' && char <= '9') {
        number.digits.push(char)
        number.col.push(j)
      } else {
        if (number.digits.length > 0) {
          numbers.push(number)
          number = {
            digits: [],
            row: i,
            col: []
          }
        }
        if (char !== '.') {
          symbols[`${i},${j}`] = char
        }
      }
    }
    if (number.digits.length > 0) {
      numbers.push(number)
    }
  })

  return numbers.filter((n) => {
    for (let j of n.col) {
      for (let rd of [-1, 0, 1]) {
        for (let cd of [-1, 0, 1]) {
          if (`${n.row + rd},${j + cd}` in symbols) {
            return true
          }
        }
      }
    }
    return false
  })
  .map((n) => Number(n.digits.join('')))
  .reduce((a, b) => a + b, 0)
}

console.log('part one:', p1(input)) // 553079

const p2 = (schematic) => {
  let symbols = {}
  let numbers = []
  schematic.map((line, i) => {
    let number = {
      digits: [],
      row: i,
      col: []
    }
    for (let j = 0; j < line.length; j++) {
      const char = line[j]
      if (char >= '0' && char <= '9') {
        number.digits.push(char)
        number.col.push(j)
      } else {
        if (number.digits.length > 0) {
          numbers.push(number)
          number = {
            digits: [],
            row: i,
            col: []
          }
        }
        if (char !== '.') {
          symbols[`${i},${j}`] = {
            symbol: char,
            row: []
          }
        }
      }
    }
    if (number.digits.length > 0) {
      numbers.push(number)
    }
  })

  numbers.map((n) => {
    for (let j of n.col) {
      for (let rd of [-1, 0, 1]) {
        for (let cd of [-1, 0, 1]) {
          const s = symbols[`${n.row + rd},${j + cd}`]
          if (s && s.symbol === '*') {
            s.row.push(Number(n.digits.join('')))
            return
          }
        }
      }
    }
  })

  return Object.values(symbols)
    .filter((s) => s.row.length === 2)
    .map((s) => s.row[0] * s.row[1])
    .reduce((a, b) => a + b, 0)
}

console.log('part two:', p2(input)) // 84363105
