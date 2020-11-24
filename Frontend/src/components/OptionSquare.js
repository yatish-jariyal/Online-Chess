import React, { Component } from "react";
import Piece from "./Piece";

class OptionSquare extends Component {
  render() {
    const { piece, color, isActive } = this.props;
    return (
      <div
        className="d-flex justify-content-center align-items-center"
       
        style={{
          width: 60,
          height: 60,
          backgroundColor: isActive ? "red" : color,
        }}
      >
        {this.props.piece && <Piece piece={piece} />}
      </div>
    );
  }
}

export default OptionSquare;
