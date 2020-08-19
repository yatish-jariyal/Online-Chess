import { token1, token2 } from "../../config";
import axios from "axios";
import store from "../reducers/store";
import {
  saveGameBoardState,
  saveGameStatus,
  saveCurrentPlayer,
  saveWinner,
  saveWhiteAndBlack,
} from "./saveActions";
//sec-fetch-site: same-origin

export const checkIfPlayerHasMoved = (gameId) => async (dispatch) => {
  //check every 10 seconds
  const myInterval = setInterval(async () => {
    await dispatch(streamBoardGameState(gameId));
    const status = store.getState().chessState.status;
    const gameBoardState = store.getState().chessState.gameBoardState;
    const numMoves = gameBoardState ? gameBoardState.split(" ").length : 0;
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

export const exportAllStudyChapters = () => async (dispatch) => {
  const studyId = "36cRQa9R";
  axios
    .get(`https://lichess.org/study/${studyId}.pgn`)
    .then((res) => {
      console.log("study", res);
    })
    .catch((err) => console.log("study", err));
};

export const streamBoardGameState = (gameId) => async (dispatch) => {
  axios
    .get(`https://lichess.org/api/board/game/stream/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    })
    .then((res) => {
      if (res.data.state) {
        dispatch(saveGameStatus(res.data.state.status));
        dispatch(saveGameBoardState(res.data.state.moves));
        if(res.data.state.winner) {
          dispatch(saveWinner(res.data.state.winner))
        }
      }
    })
    .catch((err) => console.log(err));
};

export const getGameBoardState = (gameId) => async (dispatch) => {
  axios
    .get(`https://lichess.org/api/board/game/stream/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    })
    .then((res) => {
      dispatch(saveWhiteAndBlack(res.data.white.id, res.data.black.id));
    })
    .catch((err) => console.log("game board state", err));
};

export const checkIfChallengeAccepted = (gameId) => async (dispatch) => {
  let time = 0;
  const myInteval = setInterval(() => {
    dispatch(streamBoardGameState(gameId));
    if (store.getState().chessState.status === "started") {
      clearInterval(myInteval);
    }
    time++;
    if (time === 12) {
      clearInterval(myInteval);
    }
  }, 10000);
  console.log("interval cleared");
};

export const getGameState = (gameId) => async (dispatch) => {
  axios
    .get(`https://lichess.org/api/board/game/stream/${gameId}`, {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    })
    .then((res) => {
      if (res.data.state && res.data.state.status === "mate") {
        dispatch(saveGameStatus(res.data.state.status));
        dispatch(saveWinner(res.data.state.winner));
      } else if (res.data.state && res.data.state.status) {
        dispatch(saveGameStatus(res.data.state.status));
        dispatch(saveWinner(res.data.state.winner));
      }
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
