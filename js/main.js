import Board from './Board.js';
import Moves from './Moves.js';
import MiniMax from './MiniMax.js';

const players = ['0', 'X'];

let canvas;
let board;
let moves;
let matrix; 
let actualPlayer;

const initButton = document.getElementById('js-initGame');
const messageBox = document.getElementById('js-messages').getElementsByTagName('p')[0];
const machine = 0;

initButton.addEventListener('click', init);

function init() {
  initButton.removeEventListener('click', init)
  cleanBoard();
  
  canvas = document.getElementById('canvas');
  board = new Board(canvas);
  moves = new Moves(canvas);
  
  board.drowMoves(matrix)
  canvas.addEventListener('click', gameCycle);
  actualPlayer = 1;
  messageBox.innerText = 'Es turno de ' + players[actualPlayer];  
}

function cleanBoard(){
   matrix = [
    ['','',''],
    ['','',''],
    ['','','']
  ];

}


function gameCycle(e){

  let thisMove;
  thisMove = moves.getPosition(e);

  if( Moves.gameFinished(matrix) || (Moves.haveWinner(matrix) !== false ) ){
    canvas.removeEventListener('click', gameCycle);
    initButton.addEventListener('click', init);
    messageBox.innerText = 'El ganador es ' + players[Moves.haveWinner(matrix)];
  }else{
    if( actualPlayer !== machine){
      if( Moves.validMoves(matrix, thisMove) ){
        matrix[thisMove.y][thisMove.x] = actualPlayer;
        board.drowMoves(matrix);
        actualPlayer = (actualPlayer+1)%2;
        gameCycle(e)
      }
    }else{
      thisMove = nextMove();
      matrix[thisMove.y][thisMove.x] = actualPlayer;
      board.drowMoves(matrix);
      actualPlayer = (actualPlayer+1)%2;
      gameCycle(e)
    }
  }
  
}

function nextMove() {
  let score = MiniMax.bestMove(matrix, machine);
  console.log(score);
  return score;
}






