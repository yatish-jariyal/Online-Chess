import { user1, user2, token1, token2 } from "../config";
import axios from "axios";

export const testMove = (gameId, start, end, user) => {
  const move = start + end;
  console.log("in test move frontend", move)
  return axios.post(
    `http://localhost:5001/game/move`,
    {gameId, token: user === user1 ? token1 : token2, move },
  );
};

export const getGameState = (gameId) => {
  return axios.get(`https://lichess.org/api/board/game/stream/${gameId}`, {
    headers: {
      Authorization: `Bearer ${token1}`,
    }
  })

}

export const setCurrentPlayer = () => {  
  return axios.get(`https://lichess.org/api/account/playing`, {
    headers: {
      Authorization: `Bearer ${token1}`,
    },
  })
}

export const createChallenge = () => {
  const data = {
    rated: false,
    days: 1,
    color: "white",
    variant: "standard",
    acceptByToken: token2,
  };

  return axios.post(
    `https://lichess.org/api/challenge/${user2}`,
    JSON.stringify(data),
    {
      headers: {
        Authorization: `Bearer ${token1}`,
      },
    }
  );
};
