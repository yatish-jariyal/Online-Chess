import React, { useState, useEffect } from "react";
import Square from "./Square";
import { Row } from "react-bootstrap";
import piecePositions from "../constants/piecePositions";
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
  getGameBoardState,
  streamBoardGameState,
  streamIncomingEvents,
  updatePiecePositions,
  exportAllStudyChapters,
  checkIfPlayerHasMoved,
} from "../redux/actions/chessActions";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { testMove } from "../helpers/lichessApiHelper";
import WinnerModal from "./WinnerModal";

function Board(props) {
  const { gameId } = useParams();
  const [start, setStart] = useState(null);
  const [numClicks, setNumClicks] = useState(0);
  const [activePiece, setActivePiece] = useState(null);

  const notify = () => toast("Wait for your turn!");
  const {
    getGameBoardState,
    gameBoardState,
    updatePiecePositions,
    resetPiecesCaptureByWhiteAndBlack,
    checkIfPlayerHasMoved,
  } = props;
  useEffect(() => {
    //console.log("calling stream event", gameId);
    //props.streamIncomingEvents();
    getGameBoardState(gameId);
    updatePiecePositions(piecePositions);
    console.log("calling get game board state, setting black and white");
  }, [getGameBoardState, updatePiecePositions, gameId]);

  useEffect(() => {
    checkIfPlayerHasMoved(gameId);
    //props.streamBoardGameState(gameId);
    if (gameBoardState) {
      console.log("fetched game board state", gameBoardState);
      const moves = gameBoardState.split(" ");
      let updated = piecePositions;

      //make pieces captured by black and white as empty array
      resetPiecesCaptureByWhiteAndBlack();

      moves.forEach((move) => {
        console.log("move", move);
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
      });

      updatePiecePositions(updated);
    }
  }, [
    gameBoardState,
    updatePiecePositions,
    checkIfPlayerHasMoved,
    resetPiecesCaptureByWhiteAndBlack,
    gameId,
  ]);

  const handleClick = (id, piece) => {
    if (numClicks === 0) {
      setNumClicks(numClicks + 1);
      setStart(id);
      setActivePiece(
        props.piecePositions[rows.indexOf(id.charAt(1))][
          columns.indexOf(id.charAt(0))
        ].piece
      );
    } else if (numClicks === 1) {
      setNumClicks(numClicks + 1);

      console.log("current player set here", props.currentPlayer);
      if (props.currentPlayer && props.white && props.black && props.user) {
        if (
          props.currentPlayer === 1 &&
          props.user.toLowerCase() === props.white.toLowerCase()
        ) {
          movePiece(start, id);
        } else if (
          props.currentPlayer === 2 &&
          props.user.toLowerCase() === props.black.toLowerCase()
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

  const movePiece = async (start, end) => {
    console.log("start", start, end);
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
      testMove(gameId, start, end, props.user)
        .then((res) => {
          //console.log("moving", startRow, startCol);
          console.log("test move")
          const updated = movePieceOnBoard(
            startRow,
            startCol,
            endRow,
            endCol,
            props.piecePositions,
            activePiece
          );

          props.saveCurrentPlayer(props.currentPlayer === 1 ? 2 : 1);
          setStart(null);
          setNumClicks(0);

          props.updatePiecePositions(updated);
          //storeGameInLocalStorage(gameId, updated);

          props.getGameState(gameId);
          if (props.status === "mate") {
            alert(`Checkmate: winner ${props.winner}`);
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
    await props.streamBoardGameState(gameId);
  };

  let startColor = "lightblue";
  let color;

  return (
    <>
      <ToastContainer />
      <WinnerModal />
      {props.piecePositions &&
        props.piecePositions.map((row, rowIndex) => {
          startColor = flipColor(startColor);
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
                      props.piecePositions
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
}

const mapStateToProps = (storeState) => {
  return {
    currentPlayer: storeState.chessState.currentPlayer,
    winner: storeState.chessState.winner,
    status: storeState.chessState.status,
    piecePositions: storeState.chessState.piecePositions,
    gameBoardState: storeState.chessState.gameBoardState,
    user: storeState.chessState.user,
    black: storeState.chessState.black,
    white: storeState.chessState.white,
  };
};
export default connect(mapStateToProps, {
  getGameState,
  getGameBoardState,
  saveCurrentPlayer,
  updatePiecePositions,
  streamIncomingEvents,
  streamBoardGameState,
  exportAllStudyChapters,
  checkIfPlayerHasMoved,
  resetPiecesCaptureByWhiteAndBlack,
})(Board);
