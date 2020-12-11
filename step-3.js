const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const colors = ['B', 'W', 'O', 'G', 'Y', 'R'];

const cube = Array(6).fill()
  .map((arr, i) => Array(3).fill()
    .map(arr2 => Array(3).fill(colors[i])));

function printCube(input) {
  let map = Array(9).fill().map(arr => Array(12).fill(' '));

  input.forEach((plane, i) => {
    plane.forEach((line, j) => {
      if (i === 0) {
        line.forEach((point, k) => {
          map[j][k + 3] = point;
        })
      } else if (i === 5) {
        line.forEach((point, k) => {
          map[j + 6][k + 3] = point;
        })
      } else {
        line.forEach((point, k) => {
          map[j + 3][k + ((i - 1) * 3)] = point;
        })
      }
    })
  });

  map.forEach(m => {
    console.log(m.join(''));
  })
}

const commandFunctions = {
  "U": (arr) => {
    let tempFragment = arr[1].shift();
    arr[1].unshift(arr[2].shift());
    arr[2].unshift(arr[3].shift());
    arr[3].unshift(arr[4].shift());
    arr[4].unshift(tempFragment);
  },
  "U'": (arr) => {
    let tempFragment = arr[4].shift();
    arr[4].unshift(arr[3].shift());
    arr[3].unshift(arr[2].shift());
    arr[2].unshift(arr[1].shift());
    arr[1].unshift(tempFragment);
  },
  "F": (arr) => {
    // 0, 1, 3, 5
    let topFragment = arr[0].pop();
    arr[0].push([
      arr[1][2].pop(),
      arr[1][1].pop(),
      arr[1][0].pop()
    ]);

    let bottomFragment = arr[5].shift();
    arr[1][0].push(bottomFragment[0]);
    arr[1][1].push(bottomFragment[1]);
    arr[1][2].push(bottomFragment[2]);

    arr[5].unshift([
      arr[3][2].shift(),
      arr[3][1].shift(),
      arr[3][0].shift()
    ]);

    arr[3][0].unshift(topFragment[0]);
    arr[3][1].unshift(topFragment[1]);
    arr[3][2].unshift(topFragment[2]);
  },
  "F'": (arr) => {
    // 5, 3, 1, 0
    let bottomFragment = arr[5].shift();
    arr[5].unshift([
      arr[1][0].pop(),
      arr[1][1].pop(),
      arr[1][2].pop()
    ]);

    let topFragment = arr[0].pop();
    arr[1][0].push(topFragment[2]);
    arr[1][1].push(topFragment[1]);
    arr[1][2].push(topFragment[0]);

    arr[0].push([
      arr[3][0].shift(),
      arr[3][1].shift(),
      arr[3][2].shift()
    ]);

    arr[3][0].unshift(bottomFragment[2]);
    arr[3][1].unshift(bottomFragment[1]);
    arr[3][2].unshift(bottomFragment[0]);
  },
  "B'": (arr) => {
    // 0, 1, 3, 5
    let topFragment = arr[0].shift();
    arr[0].unshift([
      arr[1][2].shift(),
      arr[1][1].shift(),
      arr[1][0].shift()
    ]);

    let bottomFragment = arr[5].pop();
    arr[1][0].unshift(bottomFragment[0]);
    arr[1][1].unshift(bottomFragment[1]);
    arr[1][2].unshift(bottomFragment[2]);

    arr[5].push([
      arr[3][2].pop(),
      arr[3][1].pop(),
      arr[3][0].pop()
    ]);

    arr[3][0].push(topFragment[0]);
    arr[3][1].push(topFragment[1]);
    arr[3][2].push(topFragment[2]);
  },
  "B": (arr) => {
    // 5, 3, 1, 0
    let bottomFragment = arr[5].pop();
    arr[5].push([
      arr[1][0].shift(),
      arr[1][1].shift(),
      arr[1][2].shift()
    ]);

    let topFragment = arr[0].shift();
    arr[1][0].unshift(topFragment[2]);
    arr[1][1].unshift(topFragment[1]);
    arr[1][2].unshift(topFragment[0]);

    arr[0].unshift([
      arr[3][0].pop(),
      arr[3][1].pop(),
      arr[3][2].pop()
    ]);

    arr[3][0].unshift(bottomFragment[2]);
    arr[3][1].unshift(bottomFragment[1]);
    arr[3][2].unshift(bottomFragment[0]);
  },
  "D": (arr) => {
    let tempFragment = arr[4].pop();
    arr[4].push(arr[3].pop());
    arr[3].push(arr[2].pop());
    arr[2].push(arr[1].pop());
    arr[1].push(tempFragment);
  },
  "D'": (arr) => {
    let tempFragment = arr[1].pop();
    arr[1].push(arr[2].pop());
    arr[2].push(arr[3].pop());
    arr[3].push(arr[4].pop());
    arr[4].push(tempFragment);
  },
  "L": (arr) => {
    // 0 2 4 5
    let topFragment = [arr[0][0].shift(), arr[0][1].shift(), arr[0][2].shift()];
    arr[0][0].unshift(arr[4][2].pop());
    arr[0][1].unshift(arr[4][1].pop());
    arr[0][2].unshift(arr[4][0].pop());

    arr[4][0].push(arr[5][2].shift());
    arr[4][1].push(arr[5][1].shift());
    arr[4][2].push(arr[5][0].shift());

    arr[5][0].unshift(arr[2][0].shift());
    arr[5][1].unshift(arr[2][1].shift());
    arr[5][2].unshift(arr[2][2].shift());

    arr[2][0].unshift(topFragment[0]);
    arr[2][1].unshift(topFragment[1]);
    arr[2][2].unshift(topFragment[2]);
  },
  "L'": (arr) => {
    // 0 2 4 5
    let topFragment = [arr[0][0].shift(), arr[0][1].shift(), arr[0][2].shift()];
    arr[0][0].unshift(arr[2][0].shift());
    arr[0][1].unshift(arr[2][1].shift());
    arr[0][2].unshift(arr[2][2].shift());

    arr[2][0].unshift(arr[5][0].shift());
    arr[2][1].unshift(arr[5][1].shift());
    arr[2][2].unshift(arr[5][2].shift());

    arr[5][0].unshift(arr[4][2].pop());
    arr[5][1].unshift(arr[4][1].pop());
    arr[5][2].unshift(arr[4][0].pop());

    arr[4][0].push(topFragment[2]);
    arr[4][1].push(topFragment[1]);
    arr[4][2].push(topFragment[0]);
  },
  "R": (arr) => {
    // 0 2 4 5
    let topFragment = [arr[0][0].pop(), arr[0][1].pop(), arr[0][2].pop()];
    arr[0][0].push(arr[2][0].pop());
    arr[0][1].push(arr[2][1].pop());
    arr[0][2].push(arr[2][2].pop());

    arr[2][0].push(arr[5][0].pop());
    arr[2][1].push(arr[5][1].pop());
    arr[2][2].push(arr[5][2].pop());

    arr[5][0].push(arr[4][2].shift());
    arr[5][1].push(arr[4][1].shift());
    arr[5][2].push(arr[4][0].shift());

    arr[4][0].unshift(topFragment[2]);
    arr[4][1].unshift(topFragment[1]);
    arr[4][2].unshift(topFragment[0]);
  },
  "R'": (arr) => {
    let topFragment = [arr[0][0].pop(), arr[0][1].pop(), arr[0][2].pop()];
    arr[0][0].push(arr[4][2].shift());
    arr[0][1].push(arr[4][1].shift());
    arr[0][2].push(arr[4][0].shift());

    arr[4][0].unshift(arr[5][2].pop());
    arr[4][1].unshift(arr[5][1].pop());
    arr[4][2].unshift(arr[5][0].pop());

    arr[5][0].push(arr[2][0].pop());
    arr[5][1].push(arr[2][1].pop());
    arr[5][2].push(arr[2][2].pop());

    arr[2][0].push(topFragment[0]);
    arr[2][1].push(topFragment[1]);
    arr[2][2].push(topFragment[2]);
  },
}

// commandFunctions["U"](cube);
// commandFunctions["D"](cube);
// commandFunctions["F"](cube);
// commandFunctions["B"](cube);
// commandFunctions["L"](cube);
// commandFunctions["L"](cube);
// commandFunctions["R"](cube);

const start = new Date().getTime();
printCube(cube);

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

    if (!commandFunctions[command]) break;

    convertArrayToString(commandFunctions[command](newArray), command);
  }

  rl.setPrompt('CUBE> ');
  rl.prompt();
})
  .on('close', function () {
    const elapsed = new Date().getTime() - start;
    const second = parseInt(elapsed / 1000, 10);
    const minute = parseInt(second / 60, 10);

    console.log(
      `경과시간: ${minute > 9 ? minute : `0${minute}`}:${second > 9 ? second : `0${second}`}`
    );

    console.log('Bye~');
    process.exit();
  });