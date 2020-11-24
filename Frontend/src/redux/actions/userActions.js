import { user2, token1, user1, token2 } from "../../config";
import axios from "axios";
import {
  getGameState,
  streamBoardGameState,
  checkIfChallengeAccepted,
} from "./chessActions";
 
import { saveUser, saveGameId, saveGameStatus } from "./saveActions";

const proxyurl = "https://cors-anywhere.herokuapp.com/";

export const resignGame = (gameId, currentPlayer) => async (dispatch) => {
  axios
    .post(
      `${proxyurl}https://lichess.org/api/board/game/${gameId}/resign`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token2}`,
          "Access-Control-Allow-Origin": "http://localhost:3000",
          "Access-Control-Allow-Methods": "POST",
        },
      }
    )
    .then((res) => {
      dispatch(getGameState(gameId));
    })
    .catch((err) => console.log(err));
};

export const acceptChallenge = (gameId) => async (dispatch) => {
  axios.post('http://localhost:5001/challenge/accept', {gameId, token: token2})
  .then(res => {
    console.log("accept response", res)
    dispatch(saveUser(user2))
    dispatch(saveGameStatus("started"))
    //dispatch(streamBoardGameState(gameId));
  })
  .catch((err) => console.log(err));
};

export const handleDrawOffer = (gameId, playerReceiving, accept) => async (
  dispatch
) => {
  //accept has to be yes or no
  axios
    .post(`https://lichess.org/api/board/game/${gameId}/draw/${accept}`, {
      headers: {
        Authorization: `Bearer ${playerReceiving === 1 ? token1 : token2}`,
      },
    })
    .then((res) => {
      dispatch(getGameState(gameId));
    })
    .catch((err) => console.log(err));
};

export const createChallenge = () => async (dispatch) => {
  axios.post('http://localhost:5001/challenge/newGame', {opponent: user2, token: token1})
  .then(res => {
    console.log("response", res)
    dispatch(saveGameId(res.data.gameId))
    dispatch(saveUser(user1))
    dispatch(checkIfChallengeAccepted(res.data.gameId));
  })
  /*
  axios
    .post(`https://lichess.org/api/challenge/${user2}`, null, {
      headers: {
        Authorization: `Bearer ${token1}`,
        "content-type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      dispatch(saveGameId(res.data.challenge.id));
      dispatch(saveUser(user1));
      //check if challenge is accepted for 2 mins
      dispatch(checkIfChallengeAccepted(res.data.challenge.id));
    })
    .catch((err) => console.log(err));
    */
};
