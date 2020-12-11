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
          map[j + 6][k + 6] = point;
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

printCube(cube);