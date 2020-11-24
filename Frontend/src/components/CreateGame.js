import React, { useEffect } from "react";
import { Modal, Spinner, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { createChallenge } from "../redux/actions/userActions";
import { Redirect } from "react-router-dom";

const herokuUrl = "https://guarded-bastion-85239.herokuapp.com";
const baseUrl = "https://localhost:3000";

function CreateGame(props) {
  return props.status === "started" ? (
    <Redirect to={`/game/${props.gameId}`} />
  ) : (
    <Modal
      show={props.show}
      backdrop="static"
      keyboard={false}
    >
      <>
        {props.gameId && (
          <Modal.Header className="d-flex justify-content-center">
            <Modal.Title className="text-center">
              Share challenge link
            </Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body className="text-center">
          {props.gameId && (
            <h6 className="text-center">
              <a
                href={`${baseUrl}/game/${props.gameId}/accept`}
              >{`${baseUrl}/game/${props.gameId}/accept`}</a>
            </h6>
          )}
          <div className="d-flex flex-row justify-content-center">
            <Spinner className="align-self-center" animation="grow" />
            <h5>
              {props.gameId
                ? "Waiting for player to accept the challenge..."
                : "Creating challenge link..."}
            </h5>
          </div>
        </Modal.Body>
      </>

      <Modal.Footer className="d-flex justify-content-center">
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (storeState) => {
  return {
    status: storeState.chessState.status,
    gameId: storeState.chessState.gameId,
  };
};

export default connect(mapStateToProps, { createChallenge })(CreateGame);
