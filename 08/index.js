import { readFileSync } from 'fs'

const input = readFileSync('08/input.txt').toString().split('\n')
const example1 = readFileSync('08/example1.txt').toString().split('\n')
const example2 = readFileSync('08/example2.txt').toString().split('\n')

const createMap = (network) => {
  const map = new Map()

  network.forEach(line => {
    const [name, value] = line.split(' = ')
    const instruction = value.replace('(', '').replace(')', '').split(', ')
    map.set(name, { 'L': instruction[0], 'R': instruction[1]} )
  })

  return map
}

const p1 = (lines) => {
  const [order, ...network] = lines.filter(n => n)
  const map = createMap(network)

  let node = 'AAA'
  let i = 0

  while (node !== 'ZZZ') {
    const direction = order[i % order.length]
    node = map.get(node)[direction]
    i++
  }

  return i
}

const gcd = (a, b) => {
  return b === 0 ? a : gcd(b, a % b)
}

const lcm = (arr) => {
  return arr.reduce((acc, n) => acc * n / gcd(acc, n))
}

const p2 = (lines) => {
  const [order, ...network] = lines.filter(n => n)
  const map = createMap(network)

  let nodes = [...map.keys()].filter(([, , endLetter]) => endLetter === 'A')

  const cycles = nodes.map(startingNode => {
    let node = startingNode
    let i = 0
    while(!(node[2] === 'Z')) {
      const direction = order[i % order.length]
      node = map.get(node)[direction]
      i++
    }
    return i
  })

  return lcm(cycles)
}

console.log('part one:', p1(input)) // 16343
console.log('part two:', p2(input)) // 15299095336639