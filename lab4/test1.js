const DPA = require('./DPA')
const dpa = new DPA({
  alphabet: ['(', ')', '{', '}', '[', ']'],
  states: [0, 1],
  startState: 0,
  finiteStates: [1],
  transitions: {
    0: {
      rule: (symbol, memory , tree) => {
        if (['(', '[', '{'].includes(symbol)) {
          memory.push(symbol)
          return { state: 1, memory, tree };
        }
        else
          return { state: 0, memory, tree };
      }
    },
    1: {
      rule: (symbol, memory, tree) => {
        if (['(', '[', '{'].includes(symbol)) {
          memory.push(symbol);
          return { state: 1, memory, tree };
        }
        else if (memory.length) {
          const top = memory.slice(-1)[0];
          if (top === '{' && symbol === '}') {
            memory.pop();
            tree.push('{}');
            return { state: 1, memory, tree };
          }
          else if (top === '(' && symbol === ')') {
            memory.pop();
            tree.push('()');
            return { state: 1, memory, tree };
          }
          else if (top === '[' && symbol === ']') {
            memory.pop();
            tree.push('[]');
            return { state: 1, memory, tree };
          }
          else
            return { state: 1, memory, tree };
        }
        else if ([')','}',']'].includes(symbol))
          return { state: 0, memory, tree };
      }
    },
  }
});

console.log('({[}): ', dpa.run('({[})')); // false
console.log('({[]}): ', dpa.run('({[]})')); // true
console.log('({}): ', dpa.run('({})')); // true
console.log('({[()]}): ', dpa.run('({[()]})')); // true
