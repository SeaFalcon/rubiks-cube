const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const input = `R R W
G C W
G B B`.split('\n').map(v => v.split(' '));

function convertArrayToString(arr, command) {
  let resultString = '';
  
  if(command){
    resultString = command + '\n';
  }
  arr.forEach(v => {
    resultString += v.join(' ') + '\n';
  });
  console.log(resultString);
}

function cloneArray(arr) {
  return Array(arr.length).fill().map((_, i) => [...arr[i]]);
}

var commandFunctions = {
  'U': (arr) => {
    arr[0].push(arr[0].shift());
    return arr;
  },
  "U'": (arr) => {
    arr[0].unshift(arr[0].pop());
    return arr;
  },
  'R': (arr) => {
    const tempValue = arr[0].pop();
    arr[0].push(arr[1].pop());
    arr[1].push(arr[2].pop());
    arr[2].push(tempValue);
    return arr;
  },
  "R'": (arr) => {
    const tempValue = arr[2].pop();
    arr[2].push(arr[1].pop());
    arr[1].push(arr[0].pop());
    arr[0].push(tempValue);
    return arr;
  },
  'B': (arr) => {
    arr[2].unshift(arr[2].pop());
    return arr;
  },
  "B'": (arr) => {
    arr[2].push(arr[2].shift());
    return arr;
  },
  'L': (arr) => {
    const tempValue = arr[2].shift();
    arr[2].unshift(arr[1].shift());
    arr[1].unshift(arr[0].shift());
    arr[0].unshift(tempValue);
    return arr;
  },
  "L'": (arr) => {
    const tempValue = arr[0].shift();
    arr[0].unshift(arr[1].shift());
    arr[1].unshift(arr[2].shift());
    arr[2].unshift(tempValue);
    return arr;
  },
}

const newArray = cloneArray(input);

convertArrayToString(newArray);
rl.setPrompt('CUBE> ');
rl.prompt();
rl.on('line', function (line) {
  const commands = line.split("").map((el) => el);

  while (commands.length) {
    let command = commands.shift();
    if (command === 'Q') rl.close();

    if (commands[0] === "'") {
      command += commands.shift();
    }

    if(!commandFunctions[command]) break;

    convertArrayToString(commandFunctions[command](newArray), command);
  }

  rl.setPrompt('CUBE> ');
  rl.prompt();
})
  .on('close', function () {
    console.log('Bye~');
    process.exit();
  });