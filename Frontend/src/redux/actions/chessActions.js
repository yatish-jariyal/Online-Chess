import keys from "../../config";
import axios from "axios";
import store from "../reducers/store";
import {
  saveGameBoardState,
  saveGameStatus,
  saveCurrentPlayer,
  saveWinner,
} from "./saveActions";
//sec-fetch-site: same-origin
const { token1, token2 } = keys

export const checkIfPlayerHasMoved = (gameId) => async (dispatch, getState) => {
  //check every 10 seconds
  console.log("in check if player has moved")
  const myInterval = setInterval(async () => {
    await dispatch(streamBoardGameState(gameId));
    const status = getState().chessState.status;
    const gameBoardState = getState().chessState.gameBoardState;
    const numMoves = gameBoardState ? gameBoardState.length : 0;
    if (numMoves % 2 === 0) {
      //next turn is white
      dispatch(saveCurrentPlayer(1));
    } else {
      //next turn is black
      dispatch(saveCurrentPlayer(2));
    }
    if (status !== "started") {
      clearInterval(myInterval);
    }
  }, 10000);
};

export const streamIncomingEvents = () => async (dispatch) => {
  axios
    .get(`https://lichess.org/api/stream/event`, {
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    })
    .then((res) => {
      console.log("incoming event", res);
    })
    .catch((err) => console.log("stream incoming" + err));
};

export const updatePiecePositions = (piecePositions) => {
  return {
    type: "UPDATE_PIECE_POSITIONS",
    payload: piecePositions,
  };
};

export const streamBoardGameState = (gameId) => async (dispatch) => {
  axios.post('http://localhost:5001/game/getGameState', {gameId, token: token2})
  .then(res => {
    console.log("res", res.data)
    if(res.data.moves) {
      dispatch(saveGameBoardState(res.data.moves))
    }
  })
  .catch(err => console.log(err))
};

export const checkGameStatus = (gameId) => dispatch => {
  axios.post('http://localhost:5001/game/status', {gameId})
  .then(res => {
    if(res.data.status === "started") {
      dispatch(saveGameStatus("started"))
    }
  })
  .catch((err) => console.log(err));
}

export const checkIfChallengeAccepted = (gameId) => async (dispatch) => {
  let time = 0;
  const myInteval = setInterval(() => {
    dispatch(checkGameStatus(gameId));
    if (store.getState().chessState.status === "started") {
      clearInterval(myInteval);
    }
    time++;
    if (time === 12) {
      clearInterval(myInteval);
    }
  }, 10000);
};

export const getGameState = (gameId) => async (dispatch) => {
  axios
    .get(`http://localhost:5001/${gameId}`)
    .then((res) => {
      dispatch(saveGameStatus(res.data.status));
      dispatch(saveWinner(res.data.winner));
    })
    .catch((err) => console.log(err));
};

export const getAllStudyChapters = () => {
  const studyId = "A4EBp7Ds";
  axios
    .get(`https://lichess.org/study/${studyId}.pgn`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
