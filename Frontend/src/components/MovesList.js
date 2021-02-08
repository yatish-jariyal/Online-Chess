import React from "react";
import { Row, Table, Col } from "react-bootstrap";
import { connect } from "react-redux";
import PiecesList from "./PiecesList";

function MovesList(props) {
  return (
    <Row>
      <Col>
        <Row>
          {props.user &&
            props.white &&
            (props.user.toLowerCase() !== props.white.toLowerCase() ? (
              <PiecesList pieces={props.piecesCapturedByWhite} />
            ) : (
              <PiecesList pieces={props.piecesCapturedByBlack} />
            ))}
        </Row>
        <h5>Opponent</h5>
        <div
          className="my-1"
          style={{
            overflowY: "scroll",
            height: 350,
            width: 400,
            border: "1px solid white",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Move</th>
              </tr>
            </thead>
            <tbody>
              {props.moves &&
                props.moves.map((move, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{id % 2 === 1 ? "Black" : "White"}</td>
                    <td>{move}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
        <h5>You</h5>
        <Row>
          {props.user &&
            props.white &&
            (props.user.toLowerCase() === props.white.toLowerCase() ? (
              <PiecesList pieces={props.piecesCapturedByWhite} />
            ) : (
              <PiecesList pieces={props.piecesCapturedByBlack} />
            ))}
        </Row>
      </Col>
    </Row>
  );
}

const mapStateToProps = (storeState) => {
  return {
    moves: storeState.chessState.gameBoardState,
    piecesCapturedByBlack: storeState.chessState.piecesCapturedByBlack,
    piecesCapturedByWhite: storeState.chessState.piecesCapturedByWhite,
    user: storeState.chessState.user,
    white: storeState.chessState.white,
  };
};

export default connect(mapStateToProps)(MovesList);
