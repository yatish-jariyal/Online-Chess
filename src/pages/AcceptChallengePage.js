import React, { useEffect } from "react";
import { Spinner, Row ,Container} from "react-bootstrap";
import { connect } from "react-redux";
import {
  acceptChallenge,
} from "../redux/actions/userActions";
import { useParams, Redirect } from "react-router-dom";

function AcceptChallengePage(props) {
  const { gameId } = useParams();
  const {status, acceptChallenge} = props

  useEffect(() => {
    acceptChallenge(gameId);
  }, [gameId, acceptChallenge]);

  console.log(gameId);
  return status ? (
    <Redirect to={`/game/${gameId}`} />
  ) : (
    <Container fluid style={{height: "100%"}} id="jumbotron">
    <Row className="justify-content-center py-5">
      <Spinner animation="border" role="status"></Spinner>
      <h3 style={{ color: "black" }}>Arranging pieces on board...</h3>
    </Row>
    </Container>
  );
}

const mapStateToProps = (storeState) => {
  return {
    status: storeState.chessState.status,
  };
};

export default connect(mapStateToProps, { acceptChallenge })(
  AcceptChallengePage
);
