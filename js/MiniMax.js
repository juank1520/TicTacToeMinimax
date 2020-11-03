import Moves from './Moves.js';

class MiniMax{

  static nextAvaible(board){
    for(let i=0; i<board.length; i++){    // Barre las filas
      for(let j=0; j<board[i].length; j++){   // Barre las Columnas
        if(board[i][j] === ''){
          return {x:j, y:i}
        }
      }
    }
    return false;
  }

  static bestMove(board, machine){
    let bestScore = -Infinity;
    let move;

    for(let i=0; i< board.length; i++){
      for(let j=0; j<board[i].length;j++){
        if(board[i][j] === ''){
          board[i][j] = machine;
          let score = this.miniMax(board, machine, 0, false);
          board[i][j] = '';
          if(score > bestScore){
            bestScore = score;
            move = {x:j, y:i};
          }
        }
      }
    }


    return move

  }


  static miniMax(board, machine ,depth, isMaximizing){
    
    const result = Moves.haveWinner(board);
    if( Moves.gameFinished(board) || (result !== false ) ){ // Condicion de parada
      if(result === machine){
        return 1;
      }else if (result === (machine+1)%2 ){
        return -1;
      }else{
        return 0;
      }
    }

    if(isMaximizing){
      let bestScore = -Infinity;
      for(let i=0; i< board.length; i++){
        for(let j=0; j<board[i].length;j++){
          if(board[i][j] === ''){
            board[i][j] = machine;
            let score = this.miniMax(board, machine ,depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    }else{
      let bestScore = Infinity;
      for(let i=0; i< board.length; i++){
        for(let j=0; j<board[i].length;j++){
          if(board[i][j] === ''){
            board[i][j] = (machine+1)%2;
            let score = this.miniMax(board, machine ,depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }

  }
    

}

export default MiniMax;