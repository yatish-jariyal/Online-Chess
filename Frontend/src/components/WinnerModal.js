import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function WinnerModal(props) {
  const [close, setClose] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (props.status && props.status !== "started") {
      if (props.status === "resign" || props.status === "mate") {
        if (props.winner) setShow(true);
      } else {
        setShow(true);
      }
    }

    console.log("showing");
  }, [props.status, props.winner]);

  const handleClose = () => {
    setClose(true);
    setShow(false);
  };

  console.log("status", props.status);
  return close ? (
    <Redirect to="/" />
  ) : (
    <Modal
      show={show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title className="text-center">
          {props.status === "mate" || props.status === "resign"
            ? `${props.winner} wins`
            : props.status && props.status !== "started" && "It's a draw!"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

const mapStateToProps = (storeState) => {
  return {
    winner: storeState.chessState.winner,
    status: storeState.chessState.status,
  };
};

export default connect(mapStateToProps)(WinnerModal);
