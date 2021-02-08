import React, { useState, useEffect } from "react";
import Square from "./Square";
import { Row } from "react-bootstrap";
import initialPiecePositions from "../constants/piecePositions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  columns,
  rows,
  getPiece,
  flipColor,
  movePieceOnBoard,
} from "../helpers/boardHelper";
import {
  saveCurrentPlayer,
  resetPiecesCaptureByWhiteAndBlack,
} from "../redux/actions/saveActions";
import {
  getGameState,
  streamBoardGameState,
  streamIncomingEvents,
  updatePiecePositions,
  checkIfPlayerHasMoved,
} from "../redux/actions/chessActions";
import { useParams } from "react-router-dom";
import { testMove } from "../helpers/lichessApiHelper";
import WinnerModal from "./WinnerModal";
import {useSelector, useDispatch} from 'react-redux'

const Board = () => {
  const {gameId} = useParams();
  const dispatch = useDispatch()
  const {winner, gameBoardState, status, currentPlayer, white, black, user, piecePositions} = useSelector((state) => state.chessState)
  const [start, setStart] = useState(null);
  const [numClicks, setNumClicks] = useState(0);
  const [activePiece, setActivePiece] = useState(null);
  let startColor = "lightblue";
  let color;

  useEffect(() => {
    dispatch(updatePiecePositions(initialPiecePositions))
  }, [gameId]);

  const notify = () => toast("Wait for your turn!");

  const handleClick = (id, piece) => {
    if (numClicks === 0) {
      setNumClicks(numClicks + 1);
      setStart(id);
      setActivePiece(
        piecePositions[rows.indexOf(id.charAt(1))][
          columns.indexOf(id.charAt(0))
        ].piece
      );
    } else if (numClicks === 1) {
      setNumClicks(numClicks + 1);

      if (currentPlayer && white && black && user) {
        if (
          currentPlayer === 1 &&
          user.toLowerCase() === white.toLowerCase()
        ) {
          movePiece(start, id);
        } else if (
          currentPlayer === 2 &&
          user.toLowerCase() === black.toLowerCase()
        ) {
          movePiece(start, id);
        } else {
          notify();
          setActivePiece(null);
          setStart(null);
          setNumClicks(0);
        }
      } else {
        notify();
        setActivePiece(null);
        setStart(null);
        setNumClicks(0);
      }
    }
  };

  useEffect(() => {
    checkIfPlayerHasMoved(gameId);
    if (gameBoardState) {
      const moves = gameBoardState
      let updated = initialPiecePositions;

      //make pieces captured by black and white as empty array
      dispatch(resetPiecesCaptureByWhiteAndBlack())

      moves.forEach((move) => {
        const startCol = move.charAt(0);
        const startRow = move.charAt(1);
        const endCol = move.charAt(2);
        const endRow = move.charAt(3);
        updated = movePieceOnBoard(
          startRow,
          startCol,
          endRow,
          endCol,
          updated,
          null
        );
        console.log("updated 1", updated)
      });

      dispatch(updatePiecePositions(updated))
    }
  }, [
    gameBoardState,
    gameId,
  ]);

  useEffect(() => {
    dispatch(checkIfPlayerHasMoved(gameId))
  }, [gameBoardState])


  const movePiece = async (start, end) => {
    if (start === end && start !== null) {
      setStart(null);
      setActivePiece(null);
      setNumClicks(0);
    } else {
      const startCol = start.charAt(0);
      const endCol = end.charAt(0);
      const startRow = start.charAt(1);
      const endRow = end.charAt(1);
      //check if valid move -> if true then move
      testMove(gameId, start, end, user)
        .then((res) => {
          //console.log("moving", startRow, startCol);
          const updated = movePieceOnBoard(
            startRow,
            startCol,
            endRow,
            endCol,
            piecePositions,
            activePiece
          );
          console.log("updated 2" , updated)

          dispatch(saveCurrentPlayer(currentPlayer === 1 ? 2 : 1))
          setStart(null);
          setNumClicks(0);

          dispatch(updatePiecePositions(updated))
          //storeGameInLocalStorage(gameId, updated);

          dispatch(getGameState(gameId))
          if (status === "mate") {
            alert(`Checkmate: winner ${winner}`);
          }
          //play move sound
          const moveSound = new Audio(require("../assets/sounds/Move.ogg"));
          moveSound.play();
        })
        .catch((err) => {
          console.log("error", err);
          console.log("Invalid move");
          setStart(null);
          setActivePiece(null);
          setNumClicks(0);
        });
    }
    dispatch(streamBoardGameState(gameId))
  };

  return (
    <>
      <ToastContainer />
      <WinnerModal />
      {piecePositions &&
        piecePositions.map((row, rowIndex) => {
          startColor = flipColor(startColor);
          //console.log("row", rowIndex, row)
          return (
            <Row key={rowIndex}>
              <p className="align-self-center mr-2" style={{ color: "white" }}>
                {rows[rowIndex]}
              </p>
              {row.map((col, colIndex) => {
                color = colIndex === 0 ? startColor : flipColor(color);
                return (
                  <Square
                    isActive={start === columns[colIndex] + "" + rows[rowIndex]}
                    handleClick={handleClick}
                    key={colIndex}
                    id={columns[colIndex] + "" + rows[rowIndex]}
                    color={color}
                    piece={getPiece(
                      columns[colIndex] + "" + rows[rowIndex],
                      piecePositions
                    )}
                  />
                );
              })}
            </Row>
          );
        })}
      <Row style={{ marginLeft: 0 }}>
        {columns.map((col) => (
          <p
            style={{
              width: 60,
              textAlign: "center",
              color: "white",
            }}
            key={col}
          >
            {col}
          </p>
        ))}
      </Row>
    </>
  );
};

export default Board;