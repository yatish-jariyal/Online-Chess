import React, { Component } from "react";
import { Row, Button } from "react-bootstrap";
import MovesList from "../components/MovesList";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { resignGame } from "../redux/actions/userActions";
import Board from "../components/Board";

class GamePage extends Component {
  render() {
    const gameId = this.props.match.params.gameId;
    console.log("flip board", this.props.flipBoard);
    return (
      <Row
        className="justify-content-center align-items-center py-5"
        id="jumbotron"
      >
        <div
          className={
            this.props.flipBoard
              ? "col-auto d-flex flex-column-reverse"
              : "col-auto"
          }
        >
          <Board />
        </div>

        <div className="col-auto ml-5">
          <MovesList />
          <Row>
            <Button
              onClick={() =>
                this.props.resignGame(gameId, this.props.currentPlayer)
              }
            >
              Resign
            </Button>
          </Row>
        </div>
      </Row>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    gameId: storeState.chessState.gameId,
    currenPlayer: storeState.chessState.currenPlayer,
    flipBoard:
      storeState.chessState.user !== null &&
      storeState.chessState.black !== null &&
      storeState.chessState.black.toLowerCase() ===
        storeState.chessState.user.toLowerCase(),
  };
};
export default connect(mapStateToProps, { resignGame })(withRouter(GamePage));
