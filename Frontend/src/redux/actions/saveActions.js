export const saveUser = (user) => {
  return {
    type: "SAVE_USER",
    payload: user,
  };
};

export const resetPiecesCaptureByWhiteAndBlack = () => {
  return {
    type: "RESET_PIECES_CAPTURED"
  }
}

export const addPieceCapturedByBlack = (piece) => {
  return {
    type: "ADD_PIECE_CAPTURED_BY_BLACK",
    payload: piece,
  };
};

export const addPieceCapturedByWhite = (piece) => {
  return {
    type: "ADD_PIECE_CAPTURED_BY_WHITE",
    payload: piece,
  };
};

export const saveGameId = (gameId) => {
  return {
    type: "SAVE_GAME_ID",
    payload: gameId,
  };
};

export const saveWinner = (winner) => {
  return {
    type: "SAVE_WINNER",
    payload: winner,
  };
};

export const saveGameStatus = (status) => {
  return {
    type: "SAVE_GAME_STATUS",
    payload: status,
  };
};

export const saveCurrentPlayer = (player) => {
  return {
    type: "SAVE_CURRENT_PLAYER",
    payload: player,
  };
};

export const saveGameBoardState = (gameBoardState) => {
  return {
    type: "SAVE_GAME_BOARD_STATE",
    payload: gameBoardState,
  };
};

export const saveWhite = (white) => ({
  type: "SAVE_WHITE",
  payload: white
})

export const saveBlack = (black) => ({
  type: "SAVE_BLACK",
  payload: black
})

