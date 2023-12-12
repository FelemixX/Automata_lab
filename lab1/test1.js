const DSM = require('./DSM');

const dsm = new DSM({
  alphabet: ['a', 'b'],
  states: ['s0', 's1', 's2', 's3'],
  startState: 's0',
  finiteStates: ['s3'],
  transitions: {
    's0': {
      a: 's1',
      b: 's1',
    },
    's1': {
      a: 's2',
      b: 's2',
    },
    's2': {
      a: 's1',
      b: 's3',
    },
    's3': {
      a: 's1',
      b: 's3',
    }
  }
})

// Каждый 3 символ должен быть b (при условии, если кол-во симвлов кратно 3)
console.log('bbabba: ', dsm.run('bbabba')); // false
console.log('aabaab: ', dsm.run('aabaab')); // true
console.log('bbbaaa: ', dsm.run('bbbaaa')); // false
console.log('aabaabaab: ', dsm.run('aabaabaab')); // true
// console.log('abdcejfjh: ', dsm.run('abdcejfjh')); // exception
console.log('babbababaabb: ', dsm.run('babaa')); // exception
