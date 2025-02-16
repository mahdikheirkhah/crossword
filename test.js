const { runPuzzleSolver } = require('./crosswordSolver')

const tests = [
  {
    puzzle: '2001\n0..0\n1000\n0..0',
    words: ['casa', 'alan', 'ciao', 'anta'],
    expected: `casa
i..l
anta
o..n`
  },
  {
    puzzle: `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`,
    words: [
      'sun',
      'sunglasses',
      'suncream',
      'swimming',
      'bikini',
      'beach',
      'icecream',
      'tan',
      'deckchair',
      'sand',
      'seaside',
      'sandals',
    ],
    expected: `...s...........
..sunglasses...
...n....u......
.s......n...s..
.w....deckchair
bikini..r...n..
.m.....seaside.
.m.b....a.a....
.icecream.n....
.n.a......d....
.g.c.....tan...
...h......l....
..........s....`
  },
  {
    puzzle: `..1.1..1...
10000..1000
..0.0..0...
..1000000..
..0.0..0...
1000..10000
..0.1..0...
....0..0...
..100000...
....0..0...
....0......`,
  words: [
  'popcorn',
  'fruit',
  'flour',
  'chicken',
  'eggs',
  'vegetables',
  'pasta',
  'pork',
  'steak',
  'cheese',
],
    expected: `..p.f..v...
flour..eggs
..p.u..g...
..chicken..
..o.t..t...
pork..pasta
..n.s..b...
....t..l...
..cheese...
....a..s...
....k......`
  },
  {
    puzzle: `...1...........
..1000001000...
...0....0......
.1......0...1..
.0....100000000
100000..0...0..
.0.....1001000.
.0.1....0.0....
.10000000.0....
.0.0......0....
.0.0.....100...
...0......0....
..........0....`,
  words: [
  'sun',
  'sunglasses',
  'suncream',
  'swimming',
  'bikini',
  'beach',
  'icecream',
  'tan',
  'deckchair',
  'sand',
  'seaside',
  'sandals',
].reverse(),
    expected: `...s...........
..sunglasses...
...n....u......
.s......n...s..
.w....deckchair
bikini..r...n..
.m.....seaside.
.m.b....a.a....
.icecream.n....
.n.a......d....
.g.c.....tan...
...h......l....
..........s....`
  },
  {
    puzzle: '2001\n0..0\n2000\n0..0',
    words: ['casa', 'alan', 'ciao', 'anta'],
    expected: 'Error'
  },
  {
    puzzle: '0001\n0..0\n3000\n0..0',
    words: ['casa', 'alan', 'ciao', 'anta'],
    expected: 'Error'
  },
  {
    puzzle: '2001\n0..0\n1000\n0..0',
    words: ['casa', 'casa', 'ciao', 'anta'],
    expected: 'Error'
  },
  {
    puzzle: '',
    words: ['casa', 'alan', 'ciao', 'anta'],
    expected: 'Error'
  },
  {
    puzzle: 123,
    words: ['casa', 'alan', 'ciao', 'anta'],
    expected: 'Error'
  },
  {
    puzzle: '',
    words: 123,
    expected: 'Error'
  },
  {
    puzzle: '2000\n0...\n0...\n0...',
    words: ['abba', 'assa'],
    expected: 'Error'
  },
  {
    puzzle: '2001\n0..0\n1000\n0..0',
    words: ['aaab', 'aaac', 'aaad', 'aaae'],
    expected: 'Error'
  },
]

let i = 0
for (let t of tests) {
  let result = runPuzzleSolver(t.puzzle, t.words)
  if (result !== t.expected) {
    console.log(`
ERROR: test ${++i}:
  expected: ${t.expected}

  got: ${result}
  `)
  }
  else
    console.log(`Test ${++i} passed`)
}
