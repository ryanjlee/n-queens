/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = [];
  var round = 0;

  var board = new Board({n: n});

  var placeRook = function(round){
    if (round === n){
      return solution;
    }
    for(var i=0; i < n; i++){
      board.get(round)[i] = 1;
      if (board.hasColConflictAt(i)){
        board.get(round)[i] = 0;
      } else {
        solution.push(board.get(round));
        return placeRook(round + 1);
      }
      board.get(round)[i] = 0;
    }
  };

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return placeRook(0);
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var countSolutions = function(row) {
    for (var i = 0; i < n; i++){
      board.get(row)[i] = 1;
      if (board.hasColConflictAt(i)){
        board.get(row)[i] = 0;
      } else {
        if (row + 1 === n){
          solutionCount++;
        } else {
          countSolutions(row + 1);
        }
      }
      board.get(row)[i] = 0;
    }
  };

 countSolutions(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  var board = new Board({n: n});
  var queens = n;

  var checkSolution = function(row) {
    if (row === n) {
      console.log(board.get(row - 1));
      return board;
    }
    for (var column = 0; column < n; column++) {
      board.get(row)[column] = 1;
      if (!board.hasAnyQueenConflictsOn(row, column)) {
        queens--;
        board = checkSolution(row + 1);
        if (!queens) {
          return board;
        }
        queens++;
      }
      board.get(row)[column] = 0;
    }
    return board;
  };

  checkSolution(0);

  for (var i = 0; i < n; i++) {
    solution.push(board.get(i));
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
