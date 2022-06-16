exports.GRID_2 = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "4",
    inputs: "rescaled",
    outputs: ["a", "b", "c", "d"],
  },
  "[a][b]hstack=inputs=2[first]",
  "[c][d]hstack=inputs=2[second]",
  "[first][second]vstack=inputs=2",
];

exports.GRID_3 = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "9",
    inputs: "rescaled",
    outputs: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
  },
  "[a][b][c]hstack=inputs=3[first]",
  "[d][e][f]hstack=inputs=3[second]",
  "[g][h][i]hstack=inputs=3[third]",
  "[first][second][third]vstack=inputs=3",
];

exports.GRID_4 = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "16",
    inputs: "rescaled",
    outputs: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
    ],
  },
  "[a][b][c][d]hstack=inputs=4[first]",
  "[e][f][g][h]hstack=inputs=4[second]",
  "[i][j][k][l]hstack=inputs=4[third]",
  "[m][n][o][p]hstack=inputs=4[fourth]",
  "[first][second][third][fourth]vstack=inputs=4",
];

exports.SEPIA = [
  "scale=240:360[rescaled]",
  "[rescaled]colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",
];

exports.GRAYSCALE = ["scale=240:360[rescaled]", "[rescaled]hue=s=0"];

exports.REVERSAL = [
  "scale=240:360[rescaled]",
  "[rescaled]edgedetect=enable='gt(mod(t,60),57)', negate",
];

exports.GRID_2_SEPIA = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "4",
    inputs: "rescaled",
    outputs: ["a", "b", "c", "d"],
  },
  "[a][b]hstack=inputs=2[first]",
  "[c][d]hstack=inputs=2[second]",
  "[first][second]vstack=inputs=2[grid]",
  "[grid]colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",
];

exports.GRID_2_GRAYSCALE = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "4",
    inputs: "rescaled",
    outputs: ["a", "b", "c", "d"],
  },
  "[a][b]hstack=inputs=2[first]",
  "[c][d]hstack=inputs=2[second]",
  "[first][second]vstack=inputs=2[grid]",
  "[grid]hue=s=0",
];

exports.GRID_2_REVERSAL = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "4",
    inputs: "rescaled",
    outputs: ["a", "b", "c", "d"],
  },
  "[a][b]hstack=inputs=2[first]",
  "[c][d]hstack=inputs=2[second]",
  "[first][second]vstack=inputs=2[grid]",
  "[grid]edgedetect=enable='gt(mod(t,60),57)', negate",
];

exports.GRID_3_SEPIA = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "9",
    inputs: "rescaled",
    outputs: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
  },
  "[a][b][c]hstack=inputs=3[first]",
  "[d][e][f]hstack=inputs=3[second]",
  "[g][h][i]hstack=inputs=3[third]",
  "[first][second][third]vstack=inputs=3[grid]",
  "[grid]colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",
];

exports.GRID_3_GRAYSCALE = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "9",
    inputs: "rescaled",
    outputs: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
  },
  "[a][b][c]hstack=inputs=3[first]",
  "[d][e][f]hstack=inputs=3[second]",
  "[g][h][i]hstack=inputs=3[third]",
  "[first][second][third]vstack=inputs=3[grid]",
  "[grid]hue=s=0",
];

exports.GRID_3_REVERSAL = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "9",
    inputs: "rescaled",
    outputs: ["a", "b", "c", "d", "e", "f", "g", "h", "i"],
  },
  "[a][b][c]hstack=inputs=3[first]",
  "[d][e][f]hstack=inputs=3[second]",
  "[g][h][i]hstack=inputs=3[third]",
  "[first][second][third]vstack=inputs=3[grid]",
  "[grid]edgedetect=enable='gt(mod(t,60),57)', negate",
];

exports.GRID_4_SEPIA = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "16",
    inputs: "rescaled",
    outputs: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
    ],
  },
  "[a][b][c][d]hstack=inputs=4[first]",
  "[e][f][g][h]hstack=inputs=4[second]",
  "[i][j][k][l]hstack=inputs=4[third]",
  "[m][n][o][p]hstack=inputs=4[fourth]",
  "[first][second][third][fourth]vstack=inputs=4[grid]",
  "[grid]colorchannelmixer=.393:.769:.189:0:.349:.686:.168:0:.272:.534:.131",
];

exports.GRID_4_GRAYSCALE = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "16",
    inputs: "rescaled",
    outputs: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
    ],
  },
  "[a][b][c][d]hstack=inputs=4[first]",
  "[e][f][g][h]hstack=inputs=4[second]",
  "[i][j][k][l]hstack=inputs=4[third]",
  "[m][n][o][p]hstack=inputs=4[fourth]",
  "[first][second][third][fourth]vstack=inputs=4[grid]",
  "[grid]hue=s=0",
];

exports.GRID_4_REVERSAL = [
  "scale=90:160[rescaled]",
  {
    filter: "split",
    options: "16",
    inputs: "rescaled",
    outputs: [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
    ],
  },
  "[a][b][c][d]hstack=inputs=4[first]",
  "[e][f][g][h]hstack=inputs=4[second]",
  "[i][j][k][l]hstack=inputs=4[third]",
  "[m][n][o][p]hstack=inputs=4[fourth]",
  "[first][second][third][fourth]vstack=inputs=4[grid]",
  "[grid]edgedetect=enable='gt(mod(t,60),57)', negate",
];
