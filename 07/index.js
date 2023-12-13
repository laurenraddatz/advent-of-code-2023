import { readFileSync } from 'fs'

const input = readFileSync('07/input.txt').toString().split('\n')
const example = readFileSync('07/example.txt').toString().split('\n')
const example2 = readFileSync('07/example2.txt').toString().split('\n')

const handTypes = ['fiveOfAKind', 'fourOfAKind', 'fullHouse', 'threeOfAKind', 'twoPair', 'onePair', 'highCard']

const p1 = (lines) => {
  console.log('lines', lines)
  const cards = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']
  const getCardStrength = (card) => cards.indexOf(card)

  const getHandStrength = (hand) => {
    const [cards, ] = hand.split(' ')
    const counts = cards.split('').reduce((map, card) => {
      map[card] = map[card] ? map[card] + 1 : 1
      return map
    }, {})

    if (Object.values(counts).includes(5)) return 'fiveOfAKind'
    if (Object.values(counts).includes(4)) return 'fourOfAKind'
    if (Object.values(counts).includes(3) && Object.values(counts).includes(2)) return 'fullHouse'
    if (Object.values(counts).includes(3)) return 'threeOfAKind'
    if (Object.values(counts).filter(n => n === 2).length === 2) return 'twoPair'
    if (Object.values(counts).includes(2)) return 'onePair'
    return 'highCard'
  }

  const evaluatedHands = lines.map((line) => {
    const [hand, bid] = line.split(' ')
    const handStrength = getHandStrength(hand)
    return {
      hand,
      bid,
      handStrength,
    }
  })

  const sorted = evaluatedHands.sort((a, b) => {
    if (a.handStrength !== b.handStrength) {
      return handTypes.indexOf(a.handStrength) < handTypes.indexOf(b.handStrength) ? -1 : 1
    }
    for (let i = 0; i < a.hand.length; i++) {
      const aStrength = getCardStrength(a.hand[i])
      const bStrength = getCardStrength(b.hand[i])
      if (aStrength !== bStrength) {
        return aStrength < bStrength ? -1 : 1
      }
    }
    return 0
  })
  console.log('sorted', sorted)

  return sorted.reduce((acc, hand, i) => {
    return acc + Number(hand.bid) * (sorted.length - i)
  }, 0)
}

console.log('part one:', p1(input)) // 250453939

const p2 = (lines) => {
  const cards = ['A', 'K', 'Q', 'T', '9', '8', '7', '6', '5', '4', '3', '2', 'J']
  const getCardStrength = (card) => cards.indexOf(card)

  const getHandStrength = (hand) => {
    const [cards, ] = hand.split(' ')
    const counts = cards.split('').reduce((map, card) => {
      map[card] = map[card] ? map[card] + 1 : 1
      return map
    }, {})
    const jokerCount = counts['J'] || 0

    const jokerlessHand = Object.keys(counts)
      .filter(card => card !== 'J')
      .reduce((obj, key) => {
        obj[key] = counts[key]
        return obj
      }, {})

    const maxCardCount = Math.max(...Object.values(jokerlessHand))

    if (Object.values(counts).includes(5) || jokerCount === 4 || (maxCardCount + jokerCount === 5)) return 'fiveOfAKind'

    if (Object.values(counts).includes(4) || (maxCardCount + jokerCount === 4)) return 'fourOfAKind'

    if (Object.keys(counts).length === 2) return 'fullHouse'

    const numOfPairs = [...Object.values(counts)].reduce(
      (numOfPairs, count) => (count === 2 ? numOfPairs + 1 : numOfPairs),
      0
    );

    if (Object.values(counts).includes(3)) return 'threeOfAKind'

    if ([...Object.values(counts)].includes(2)) {
      if (numOfPairs > 1) {
        if (jokerCount === 1) return 'fullHouse'
        if (jokerCount === 2) return 'fourOfAKind'
        return 'twoPair'
      }
      if (jokerCount) return 'threeOfAKind'
      return 'onePair'
    }


    if (Object.values(counts).includes(2) || (maxCardCount + jokerCount === 2)) return 'onePair'
    return 'highCard'
  }

  const evaluatedHands = lines.map((line) => {
    const [hand, bid] = line.split(' ')
    const handStrength = getHandStrength(hand)
    return {
      hand,
      bid,
      handStrength,
    }
  })

  const sorted = evaluatedHands.sort((a, b) => {
    if (a.handStrength !== b.handStrength) {
      return handTypes.indexOf(a.handStrength) < handTypes.indexOf(b.handStrength) ? -1 : 1
    }
    for (let i = 0; i < a.hand.length; i++) {
      const aStrength = getCardStrength(a.hand[i])
      const bStrength = getCardStrength(b.hand[i])
      if (aStrength !== bStrength) {
        return aStrength < bStrength ? -1 : 1
      }
    }
    return 0
  })
  console.log('sorted', sorted)

  return sorted.reduce((acc, hand, i) => {
    return acc + Number(hand.bid) * (sorted.length - i)
  }, 0)
}

console.log('part two:', p2(input)) // 248652697