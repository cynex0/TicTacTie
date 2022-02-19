let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

const players = ['x', 'o'];
let result = null;
let turns = 0;
let btn;
let resultP;
const human = 'x';
const ai = 'o';

function setup() {
  createCanvas(600, 600);
  stroke(0);

  w = width / 3;
  h = height / 3;

  btn = createButton('Reset');
  btn.position(20, height + 20);
  btn.mousePressed(reset);

  resultP = createP('');
  resultP.style('font-size', '32pt');
  resultP.style('color', '#A6A6A6');
}

function reset() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  result = null;
  resultP.html('');
}

function drawLines() {
  strokeWeight(5);

  for (let i = 1; i < 3; i++) {
    line(w * i, 0, w * i, height);
    line(0, h * i, width, h * i);
  }
}

function drawFig(x, y, fig) {
  strokeWeight(4);

  let Xoffset_l = 20;
  let Xoffset_r = 25;
  let Yoffset = 20;

  if (fig == 'x') {
    line((x * w) + Xoffset_l, (y * h) + Yoffset, (x * w) + w - Xoffset_r, (y * h) + h - Yoffset);
    line((x * w) + Xoffset_l, (y * h) + h - Yoffset, (x * w) + w - Xoffset_r, (y * h) + Yoffset);
  } else {
    circle((x * w) + w / 2, (y * h) + h / 2, w - Xoffset_r - 20);
  }
}

function drawBoard() {
  drawLines();

  for (let j = 0; j < board.length; j++) {
    for (let i = 0; i < board[j].length; i++) {
      let fig = board[i][j];
      if (fig != '') {
        drawFig(j, i, fig);
      }
    }
  }
}

function draw() {
  background(255);
  drawBoard();

}

function equals3(a, b, c) {
  return (a == b && b == c && a != '');
}

function checkWin() {
  let winner = null;
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }
  
  let spots = 0;
  for (let j = 0; j < 3; j++){
   for(let i = 0; i < 3; i++){
     if (board[i][j] == ''){
       spots++;
     }
   }
  }
  
  if (!winner && spots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function isLegal(i, j) {
  return board[i][j] == '';
}

function mouseClicked() {
  // player = players[turns % 2];
  if (mouseX <= width && mouseY <= height && !result) {
    let i = floor(mouseY / h);
    let j = floor(mouseX / w);
    if (isLegal(i, j)) {
      board[i][j] = human;
      result = checkWin();  
      if (!result){
        aiMove();
        result = checkWin(); 
      }
    }
  }


  if (result != null) {
    if (result == 'tie') {
      resultP.html('Tie!');
    } else {
      resultP.html(`${result.toUpperCase()} wins!`);
    }
  }
  // console.log(board);
}