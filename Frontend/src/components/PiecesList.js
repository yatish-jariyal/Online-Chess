import React from "react";
import { Row } from "react-bootstrap";
import { getPieceImage } from "../helpers/boardHelper";

function PiecesList({ pieces }) {
  return (
    <Row style={{ height: 20, marginBottom: 10}}>
      {pieces.map((piece, id) => (
        <img
            style={{height: 20}}
          src={getPieceImage(piece)}
          alt=""
          className="img-fluid col-auto"
          key={id}
        ></img>
      ))}
    </Row>
  );
}

export default PiecesList;
