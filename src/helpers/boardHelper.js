import pieces from "../constants/pieces";
import smallPieces from "../constants/smallPieces";
import store from "../redux/reducers/store";
import {
  addPieceCapturedByBlack,
  addPieceCapturedByWhite,
} from "../redux/actions/saveActions";

const { dispatch } = store;

export const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];

export const fetchGameFromLocalStorage = (gameId) => {
  const localGameId = localStorage.getItem("gameId");
  if (localGameId === gameId) {
    const localPiecePositions = localStorage.getItem("piecePositions");
    return JSON.parse(localPiecePositions);
  } else {
    return null;
  }
};
/*
const isPawnCheck = (row, col, piecePositions, activePiece) => {
  let checkPiece;

  //pawn
  //check if king is there
  const checkRow = activePiece === "WP" ? row + 1 : row - 1;
  let checkCol = col - 1;
  if (checkRow >= 0 && checkRow < 8 && checkCol >= 0 && checkCol < 8) {
    checkPiece = piecePositions[checkRow][checkCol].piece;
    if (
      (checkPiece === "K" && activePiece === "WP") ||
      (checkPiece === "WK" && activePiece === "P")
    ) {
      return columns[checkCol] + "" + rows[checkRow];
    }
  } else {
    checkCol = col + 1;
    if (checkRow >= 0 && checkRow < 8 && checkCol >= 0 && checkCol < 8) {
      checkPiece = piecePositions[checkRow][checkCol].piece;
      if (
        (checkPiece === "K" && activePiece === "WP") ||
        (checkPiece === "WK" && activePiece === "P")
      ) {
        return columns[checkCol] + "" + rows[checkRow];
      } else return false;
    }
  }
  return false;
};

const isKnightCheck = (row, col, piecePositions, activePiece) => {
  let checkPiece;

  let checkRow, checkCol;
  let flag = false;
  // +2 col +1 row -1 row
  if (col + 2 < 8) {
    checkCol = col + 2;
    if (row + 1 < 8) {
      checkRow = row + 1;
      flag = true;
    } else if (row - 1 >= 0) {
      checkRow = row - 1;
      flag = true;
    }
  }
  // -2 col +1 row -1 row
  else if (col - 2 >= 0) {
    checkCol = col - 2;
    if (row + 1 < 8) {
      checkRow = row + 1;
      flag = true;
    } else if (row - 1 >= 0) {
      checkRow = row - 1;
      flag = true;
    }
  }
  // +2 row +1 col -1 col
  else if (row + 2 < 8) {
    checkRow = row + 2;
    if (col + 1 < 8) {
      checkCol = col + 1;
      flag = true;
    } else if (col - 1 >= 0) {
      checkCol = col - 1;
      flag = true;
    }
  }
  // -2 row +1 col -1 col
  else if (row - 2 < 8) {
    checkRow = row - 2;
    if (col + 1 < 8) {
      checkCol = col + 1;
      flag = true;
    } else if (col - 1 >= 0) {
      checkCol = col - 1;
      flag = true;
    }
  } else return false;
  if (flag) {
    checkPiece = piecePositions[checkRow][checkCol].piece;
    if (
      (checkPiece === "K" && activePiece === "WN") ||
      (checkPiece === "WK" && activePiece === "N")
    ) {
      return columns[checkCol] + "" + rows[checkRow];
    }
  } else return false;
};

const isRookCheck = (row, col, piecePositions, activePiece) => {
  //up down left right
  let checkPiece;

  let kingRow, kingCol;
  let kingFound = false;
  for (let i = 0; i < row; i++) {
    checkPiece = piecePositions[i][col].piece;
    if (kingFound) {
      if (checkPiece) return false;
    } else if (
      (checkPiece === "K" && (activePiece === "WR" || activePiece === "WQ")) ||
      (checkPiece === "WK" && (activePiece === "R" || activePiece === "Q"))
    ) {
      kingRow = i;
      kingCol = col;
      kingFound = true;
    }
  }
  if (kingFound) {
    return columns[kingCol] + "" + rows[kingRow];
  }

  for (let i = row; i < 8; i++) {
    checkPiece = piecePositions[i][col].piece;
    if (kingFound) {
      if (checkPiece) return false;
    } else if (
      (checkPiece === "K" && (activePiece === "WR" || activePiece === "WQ")) ||
      (checkPiece === "WK" && (activePiece === "R" || activePiece === "Q"))
    ) {
      kingRow = i;
      kingCol = col;
      kingFound = true;
    }
  }
  if (kingFound) {
    return columns[kingCol] + "" + rows[kingRow];
  }

  for (let i = 0; i < col; i++) {
    checkPiece = piecePositions[row][i].piece;
    if (kingFound) {
      if (checkPiece) return false;
    } else if (
      (checkPiece === "K" && (activePiece === "WR" || activePiece === "WQ")) ||
      (checkPiece === "WK" && (activePiece === "R" || activePiece === "Q"))
    ) {
      kingRow = row;
      kingCol = i;
      kingFound = true;
    }
  }
  if (kingFound) {
    return columns[kingCol] + "" + rows[kingRow];
  }

  for (let i = col; i < 8; i++) {
    checkPiece = piecePositions[row][i].piece;
    if (kingFound) {
      if (checkPiece) return false;
    } else if (
      (checkPiece === "K" && (activePiece === "WR" || activePiece === "WQ")) ||
      (checkPiece === "WK" && (activePiece === "R" || activePiece === "Q"))
    ) {
      kingRow = row;
      kingCol = i;
      kingFound = true;
    }
  }
  if (kingFound) {
    return columns[kingCol] + "" + rows[kingRow];
  }

  return false;
};

const isBishopCheck = (row, col, piecePositions, activePiece) => {
  let checkPiece;

  let kingRow, kingCol;
  let kingFound = false;

  let i = row;
  let j = col;
  //row - col -
  while (i - 1 >= 0 && j - 1 >= 0) {
    checkPiece = piecePositions[i][j].piece;
    if (checkPiece === "K" && (activePiece === "WQ" || activePiece === "B")) {
      kingRow = i;
      kingCol = j;
      kingFound = true;
      break;
    } else if (
      checkPiece === "K" &&
      (activePiece === "WQ" || activePiece === "B")
    ) {
      kingRow = i;
      kingCol = j;
      kingFound = true;
      break;
    } else if (checkPiece !== null) {
      break;
    }
    row--;
    col--;
  }
  //row + col +
  while (i + 1 < 8 && j + 1 < 8) {
    checkPiece = piecePositions[i][j].piece;
    if (checkPiece === "K" && (activePiece === "WQ" || activePiece === "B")) {
      kingRow = i;
      kingCol = j;
      kingFound = true;
      break;
    } else if (
      checkPiece === "K" &&
      (activePiece === "WQ" || activePiece === "B")
    ) {
      kingRow = i;
      kingCol = j;
      kingFound = true;
      break;
    } else if (checkPiece !== null) {
      break;
    }
    row++;
    col++;
  }
  //row + col -
  while (i + 1 < 8 && j - 1 >= 0) {
    checkPiece = piecePositions[i][j].piece;
    if (checkPiece === "K" && (activePiece === "WQ" || activePiece === "B")) {
      kingRow = i;
      kingCol = j;
      kingFound = true;
      break;
    } else if (
      checkPiece === "K" &&
      (activePiece === "WQ" || activePiece === "B")
    ) {
      kingRow = i;
      kingCol = j;
      kingFound = true;
      break;
    } else if (checkPiece !== null) {
      break;
    }
    row++;
    col--;
  }
  //row - col +
  while (i - 1 >= 0 && j + 1 < 8) {
    checkPiece = piecePositions[i][j].piece;
    if (checkPiece === "K" && (activePiece === "WQ" || activePiece === "B")) {
      kingRow = i;
      kingCol = j;
      kingFound = true;
      break;
    } else if (
      checkPiece === "K" &&
      (activePiece === "WQ" || activePiece === "B")
    ) {
      kingRow = i;
      kingCol = j;
      kingFound = true;
      break;
    } else if (checkPiece !== null) {
      break;
    }
    row--;
    col++;
  }
  if (kingFound) {
    return columns[kingCol] + "" + rows[kingRow];
  }
  return false;
};


export const detectIfCheck = (endRow, endCol, piecePositions, activePiece) => {
  let row = rows.indexOf(endRow);
  let col = columns.indexOf(endCol);
  //pawn, bishop, rook, knight, queen
  if (activePiece === "WP" || activePiece === "P") {
    const pawn = isPawnCheck(row, col, piecePositions, activePiece);
    console.log("checked by pawn", pawn);
    if (pawn) return pawn;
  }
  //check if knight is active
  else if (activePiece === "WN" || activePiece === "N") {
    const knight = isKnightCheck(row, col, piecePositions, activePiece);
    console.log("checked by knight", knight);
    if (knight) {
      return knight;
    }
  }
  //check if rook is active
  else if (
    activePiece === "WR" ||
    activePiece === "R" ||
    activePiece === "WQ" ||
    activePiece === "Q"
  ) {
    const rook = isRookCheck(row, col, piecePositions, activePiece);
    console.log("checked by rook or queen", rook);
    if (rook) return rook;
  }
  //check if bishop
 /* else if (
    activePiece === "WB" ||
    activePiece === "B" ||
    activePiece === "WQ" ||
    activePiece === "Q"
  ) {
    const bishop = isBishopCheck(row, col, piecePositions, activePiece);
    console.log("checked by bishop or queen", bishop);
    if (bishop) return bishop;
  }
  
  return false;
};
*/

export const movePiece = (
  startRow,
  startCol,
  endRow,
  endCol,
  piecePositions,
  currentPiece
) => {
  let activePiece = currentPiece;
  if (
    checkIfPawnPromotion(
      startRow,
      startCol,
      endRow,
      endCol,
      piecePositions,
      currentPiece
    )
  ) {
    if (currentPiece === "P") {
      activePiece = "Q";
    } else if (currentPiece === "WP") {
      activePiece = "WQ";
    }
  }
  return piecePositions.map((row, i) => {
    console.log(rows[i], startRow, endRow);
    if (rows[i] === startRow || rows[i] === endRow) {
      if (rows[i] === startRow && rows[i] === endRow) {
        const updatedRow = row.map((col, j) => {
          if (columns[j] === startCol) {
            console.log("removing", startRow, startCol);
            //remove
            return { ...col, piece: null };
          } else if (columns[j] === endCol) {
            console.log("placing");
            //check if any piece is captured
            //if yes then store it in redux
            const pieceCaptured =
              piecePositions[rows.indexOf(endRow)][columns.indexOf(endCol)]
                .piece;
            console.log("piece captured", pieceCaptured);
            if (pieceCaptured) {
              //store it in redux
              if (pieceCaptured.length === 2) {
                dispatch(addPieceCapturedByBlack(pieceCaptured));
                console.log("calling piece Captured BY black");
              } else {
                dispatch(addPieceCapturedByWhite(pieceCaptured));
                console.log("calling piece Captured BY white");
              }
            }
            return { ...col, piece: activePiece };
          }
          return col;
        });
        return updatedRow;
      } else if (rows[i] === startRow) {
        const updatedRow = row.map((col, j) => {
          if (columns[j] === startCol) {
            console.log("removing", startRow, startCol);
            //remove
            return { ...col, piece: null };
          }
          return col;
        });
        return updatedRow;
      } else if (rows[i] === endRow) {
        console.log("matched endRow");
        const updatedRow = row.map((col, j) => {
          if (columns[j] === endCol) {
            console.log("placing", endRow, endCol);
            //put the piece
            //check if any piece is captured
            //if yes then store it in redux
            const pieceCaptured =
              piecePositions[rows.indexOf(endRow)][columns.indexOf(endCol)]
                .piece;
            console.log("piece captured", pieceCaptured);
            if (pieceCaptured) {
              //store it in redux
              if (pieceCaptured.length === 2) {
                dispatch(addPieceCapturedByBlack(pieceCaptured));
                console.log("calling piece Captured BY black");
              } else {
                dispatch(addPieceCapturedByWhite(pieceCaptured));
                console.log("calling piece Captured BY white");
              }
            }
            return { ...col, piece: activePiece };
          }
          return col;
        });
        return updatedRow;
      }
    } else return row;
    return null;
  });
};

export const movePieceOnBoard = (
  startRow,
  startCol,
  endRow,
  endCol,
  piecePositions,
  currentPiece
) => {
  let activePiece = currentPiece;
  if (!currentPiece) {
    //find piece at start row and start col
    activePiece =
      piecePositions[rows.indexOf(startRow)][columns.indexOf(startCol)].piece;
  }

  const castle = checkIfCastle(
    startRow,
    startCol,
    endRow,
    endCol,
    piecePositions,
    activePiece
  );
  if (castle) {
    return castle;
  } else
    return movePiece(
      startRow,
      startCol,
      endRow,
      endCol,
      piecePositions,
      activePiece
    );
};

export const checkIfCastle = (
  startRow,
  startCol,
  endRow,
  endCol,
  piecePositions,
  activePiece
) => {
  console.log("here", startRow, startCol, endRow, endCol);
  console.log("active piece", activePiece);
  if (activePiece === "WK" || activePiece === "K") {
    if (startRow === "1") {
      if (startCol === "e") {
        if (endCol === "c") {
          //long castle white king

          //king will move from e1 to c1
          console.log("moving white king");
          let updated = movePiece(
            "1",
            "e",
            "1",
            "c",
            piecePositions,
            activePiece
          );

          console.log("moving white rook");
          //rook will move from a1 to d1
          return movePiece("1", "a", "1", "d", updated, "WR");
        } else if (endCol === "g") {
          //short castle white king

          //king will move from e1 to g1
          console.log("moving white king");
          let updated = movePiece(
            "1",
            "e",
            "1",
            "g",
            piecePositions,
            activePiece
          );

          console.log("moving white rook");
          //rook will move from h1 to f1
          return movePiece("1", "h", "1", "f", updated, "WR");
        } else return false;
      } else return false;
    } else if (startRow === "8") {
      if (startCol === "e") {
        if (endCol === "c") {
          //long castle white king

          //king will move from e8 to c8
          console.log("moving black king");
          let updated = movePiece(
            "8",
            "e",
            "8",
            "c",
            piecePositions,
            activePiece
          );

          console.log("moving black rook");
          //rook will move from a8 to d8
          return movePiece("8", "a", "8", "d", updated, "R");
        } else if (endCol === "g") {
          //short castle white king

          //king will move from e8 to g8
          console.log("moving black king");
          let updated = movePiece(
            "8",
            "e",
            "8",
            "g",
            piecePositions,
            activePiece
          );

          console.log("moving black rook");
          //rook will move from h8 to f8
          return movePiece("8", "h", "8", "f", updated, "R");
        } else return false;
      } else return false;
    }
  } else {
    return false;
  }
};

export const checkIfPawnPromotion = (
  startRow,
  startCol,
  endRow,
  endCol,
  piecePositions,
  activePiece
) => {
  if (activePiece === "WP" && endRow === "8") {
    return true;
  } else if (activePiece === "P" && endRow === "1") {
    return true;
  } else return false;
};

export const storeGameInLocalStorage = (gameId, piecePositions) => {
  localStorage.setItem("gameId", gameId);
  localStorage.setItem("piecePositions", JSON.stringify(piecePositions));
};

export const getUIC = (id, piece) => {
  return id;
};

export const flipColor = (color) => {
  if (color === "#CB8745") {
    return "#F8C89A";
  } else {
    return "#CB8745";
  }
};

export const getPieceImage = (piece) => {
  switch (piece) {
    case "R":
      return smallPieces.rook;
    case "N":
      return smallPieces.knight;
    case "K":
      return smallPieces.king;
    case "Q":
      return smallPieces.queen;
    case "P":
      return smallPieces.pawn;
    case "B":
      return smallPieces.bishop;
    case "WR":
      return smallPieces.whiteRook;
    case "WN":
      return smallPieces.whiteKnight;
    case "WK":
      return smallPieces.whiteKing;
    case "WQ":
      return smallPieces.whiteQueen;
    case "WP":
      return smallPieces.whitePawn;
    case "WB":
      return smallPieces.whiteBishop;
    default:
      return null;
  }
};

export const getPiece = (id, piecePositions) => {
  let piece;
  piece =
    piecePositions[rows.indexOf(id.charAt(1))][columns.indexOf(id.charAt(0))]
      .piece;

  switch (piece) {
    case "R":
      return pieces.rook;
    case "N":
      return pieces.knight;
    case "K":
      return pieces.king;
    case "Q":
      return pieces.queen;
    case "P":
      return pieces.pawn;
    case "B":
      return pieces.bishop;
    case "WR":
      return pieces.whiteRook;
    case "WN":
      return pieces.whiteKnight;
    case "WK":
      return pieces.whiteKing;
    case "WQ":
      return pieces.whiteQueen;
    case "WP":
      return pieces.whitePawn;
    case "WB":
      return pieces.whiteBishop;
    default:
      return null;
  }
};
