const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const commandFunctions = {
  'R': (word, count) => {
    if (count < 0) return commandFunctions['L'](word, -count);

    for (let i = 0; i < count; i++) {
      word.unshift(word.pop());
    }
    return word.join('');
  },
  'L': (word, count) => {
    if (count < 0) return commandFunctions['R'](word, -count);

    for (let i = 0; i < count; i++) {
      word.push(word.shift());
    }
    return word.join('');
  }
}

rl.setPrompt('> ');
rl.prompt();
rl.on('line', function (line) {
  let [word, count, command] = line.split(' ');

  word = word.split('');
  count = +count;
  if (command) {
    command = command.toUpperCase();
  }

  if (!commandFunctions[command]) return;

  const result = commandFunctions[command](word, count);

  console.log(result);

  rl.setPrompt('> ');
  rl.prompt();
})
  .on('close', function () {
    process.exit();
  });