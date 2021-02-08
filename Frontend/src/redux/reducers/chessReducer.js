const initialState = {
  status: null,
  gameId: null,
  currentPlayer: 1,
  piecePositions: null,
  gameBoardState: null,
  challenger: null,
  receiver: null,
  black: null,
  white: null,
  user: null,
  piecesCapturedByBlack: [],
  piecesCapturedByWhite: [],
};

const chessReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "RESET_PIECES_CAPTURED":
      return {
        ...state,
        piecesCapturedByBlack: [],
        piecesCapturedByWhite: [],
      };
    case "ADD_PIECE_CAPTURED_BY_BLACK":
      return {
        ...state,
        piecesCapturedByBlack: [...state.piecesCapturedByBlack, payload],
      };
    case "ADD_PIECE_CAPTURED_BY_WHITE":
      return {
        ...state,
        piecesCapturedByWhite: [...state.piecesCapturedByWhite, payload],
      };
    case "SAVE_WHITE":
      return {
        ...state,
        white: payload,
      };
    case "SAVE_BLACK":
      return {
        ...state,
        black: payload
      }
    case "SAVE_USER":
      return {
        ...state,
        user: payload,
      };
    case "SAVE_CHALLENGER":
      return {
        ...state,
        challenger: payload,
      };
    case "SAVE_RECEIVER":
      return {
        ...state,
        receiver: payload,
      };
    case "SAVE_GAME_BOARD_STATE":
      return {
        ...state,
        gameBoardState: payload,
      };
    case "SAVE_CURRENT_PLAYER":
      return {
        ...state,
        currentPlayer: payload,
      };
    case "SAVE_WINNER":
      return {
        ...state,
        winner: payload,
      };
    case "SAVE_GAME_STATUS":
      return {
        ...state,
        status: payload,
      };
    case "SAVE_GAME_ID":
      return {
        ...state,
        gameId: payload,
      };
    case "UPDATE_PIECE_POSITIONS":
      return {
        ...state,
        piecePositions: [...payload],
      };
    default:
      return state;
  }
};

export default chessReducer;
