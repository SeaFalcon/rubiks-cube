var colors = ['B', 'W', 'O', 'G', 'Y', 'R'];

var cube = Array(6).fill()
  .map((arr, i) => Array(3).fill()
    .map(arr2 => Array(3).fill(colors[i])));

Array(9).fill().map(arr => Array(12).fill(''))

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

var commandFunctions = {
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
  "B": (arr) => {
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
  "B'": (arr) => {
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
}

// commandFunctions['U'](cube);
// commandFunctions['D'](cube);
// commandFunctions["F'"](cube);

printCube(cube);