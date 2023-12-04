import { readFileSync } from 'fs'

const input = readFileSync('04/input.txt').toString().split('\n')
const example = readFileSync('04/example.txt').toString().split('\n')

const getWins = (line) => {
  const [winningNums, cardNums] = line.split(' | ')
  const w =  winningNums.split(' ').filter(n => n)
  const c = cardNums.split(' ').filter(n => n)
  return (w.filter((num) => c.includes(num))).length
}

const p1 = (cards) => {
  return cards.reduce((total, card) => {
    const [_, vals] = card.split(': ')
    const wins = getWins(vals)
    let inc = 1
    for (let i = 1; i < wins; i++) {
      inc = inc * 2
    }
    return wins > 0 ? total + inc : total
  }, 0)
}

console.log('part one:', p1(input)) // 32609

const p2 = (cards) => {
  const cardMap = {}
  cards.map((card) => {
    const [name, _] = card.split(': ')
    const [__, nameNum] = name.split(' ').filter(n => n)
    cardMap[`${Number(nameNum)}`] = 1
  })

  cards.map((card) => {
    const [name, vals] = card.split(': ')
    const [_, nameNum] = name.split(' ').filter(n => n)
    const wins = getWins(vals)
    const copies = cardMap[`${Number(nameNum)}`]
    for (let i = 0; i < wins; i++) {
      cardMap[`${Number(nameNum) + i + 1}`] += copies
    }
  })
  return Object.values(cardMap).reduce((a, b) => a + b, 0);
}

console.log('part two:', p2(input)) // 14624680