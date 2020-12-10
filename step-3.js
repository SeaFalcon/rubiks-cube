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

printCube(cube);