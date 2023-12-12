const NDSM = require('./NDSM');

const ndsm = new NDSM({
  alphabet: ['a', 'b'],
  states: ['s0', 's1', 's2', 's3'],
  startState: 's0',
  finiteStates: ['s3'],
  transitions: {
    's0': {
      a: ['s0'],
      b: ['s0','s1'],
    },
    's1': {
      a: ['s2'],
      b: ['s2'],
    },
    's2': {
      a: ['s3'],
      b: ['s3'],
    },
    's3': {
    },
  }
})

// 3 с конца символ должен быть "b" (потому что описаны три перехода
console.log('baa: ', ndsm.run('baa')); //true
console.log('bbbbbb: ', ndsm.run('bbbbbb')); //true
console.log('bbbabb: ', ndsm.run('bbbabb')); // false

