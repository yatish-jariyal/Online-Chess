import keys from "../../config";
import axios from "axios";
import {
  getGameState,
  streamBoardGameState,
  checkIfChallengeAccepted,
} from "./chessActions";
 
import { saveUser, saveGameId, saveGameStatus, saveBlack, saveWhite } from "./saveActions";
const { user2, token1, user1, token2 } = keys

const proxyurl = "https://cors-anywhere.herokuapp.com/";

/** TODO: change this */
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
    dispatch(saveUser(user2))
    dispatch(saveWhite(user1))
    dispatch(saveBlack(user2))
    dispatch(saveGameStatus("started"))
  })
  .catch((err) => console.log(err));
};

export const createChallenge = () => async (dispatch) => {
  axios.post('http://localhost:5001/challenge/newGame', {opponent: user2, token: token1})
  .then(res => {
    dispatch(saveGameId(res.data.gameId))
    dispatch(saveUser(user1))
    dispatch(saveWhite(user1))
    dispatch(saveBlack(user2))
    dispatch(checkIfChallengeAccepted(res.data.gameId));
  })
};
