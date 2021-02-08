import React from "react";
import Piece from "./Piece";

const Square = ({id, piece, color, isActive, handleClick}) => {
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
        {piece && <Piece piece={piece} />}
      </div>
    );
}

export default Square;
