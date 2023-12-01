import { readFileSync } from 'fs'

const input = readFileSync('01/input.txt').toString().split('\n')

const p1 = input.reduce((total, line) => {
  const num = line.replace(/[^0-9]/g, '')
  const firstChar = num[0]
  const lastChar = num[num.length - 1]
  return total += Number(`${firstChar}${lastChar}`)
}, 0)

console.log('part one:', p1) // 55816

const wordToNumber = {
  'twone': '21',
  'sevenine': '79',
  'oneight': '18',
  'threeight': '38',
  'eightwo': '82',
  'eighthree': '83',
  'nineight': '98',
  'fiveight': '58',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
}
const regex = new RegExp(Object.keys(wordToNumber).join('|'), 'g');

const p2 = input.reduce((total, line) => {
  const resultString = line.replaceAll(regex, match => wordToNumber[match]);
  const num = resultString.replaceAll(/[a-z]/gi, '')

  const firstChar = num[0]
  const lastChar = num[num.length - 1]
  return total + Number(`${firstChar}${lastChar}`)
}, 0)

console.log('part two:', p2) // 54980