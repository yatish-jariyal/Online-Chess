import React, { Component } from "react";
import Piece from "./Piece";
class Square extends Component {
  render() {
    const { id, piece, color, isActive, handleClick } = this.props;
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        onClick={() => {
          handleClick(id, piece);
        }}
        style={{
          width: 60,
          height: 60,
          backgroundColor: isActive ? "yellow" : color,
        }}
      >
        {this.props.piece && <Piece piece={piece} />}
      </div>
    );
  }
}

export default Square;
