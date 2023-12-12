const DSM = require('./DSM');

const dsm = new DSM({
  alphabet: ['a', 'b'],
  states: ['s0', 's1', 's2'],
  startState: 's0',
  finiteStates: ['s2'],
  transitions: {
    's0': {
      a: 's1',
      b: 's0',
    },
    's1': {
      a: 's1',
      b: 's2',
    },
    's2': {
    },
  }
})

// Нахождение строк, которые содержат в себе ab
console.log('ab: ', dsm.run('ab')); // true
console.log('bbb: ', dsm.run('bbb')); // false потому что не все символы алфавита использованы
console.log('aaaaaaaaaaab: ', dsm.run('aaaaaaaaaaab')); // true
console.log('baaaaa: ', dsm.run('baaaaa')); // false потому что не соблюдена последовательность символов. Переходы неверны
console.log('baaaaaaaaaaa: ', dsm.run('baaaaaaaaaaa')); // false потому что переход осуществить не получилось. При этом если добавить после буквы a еще букву b то будет true, потому что переход осуществлен ???
