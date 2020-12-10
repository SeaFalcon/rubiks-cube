var colors = ['B', 'W', 'O', 'G', 'Y', 'R'];

var cube2 = Array(6).fill()
  .map((arr, i) => Array(3).fill()
    .map(arr2 => Array(3).fill(colors[i])));