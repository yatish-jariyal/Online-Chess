import React from "react";
import { Row } from "react-bootstrap";
import OptionSquare from "./OptionSquare";

function PawnPromotionOptions({show}) {
  const optionStyles = {
    position: "absolute",
    zIndex: 10,
    right: 50,
  };


  return show ? (
    <div style={optionStyles}>
      <Row>
        <OptionSquare color="gray" isActive={false} piece="Q" />
      </Row>
      <Row>
        <OptionSquare color="gray" isActive={false} piece="Q" />
      </Row>
      <Row>
        <OptionSquare color="gray" isActive={false} piece="Q" />
      </Row>
      <Row>
        <OptionSquare color="gray" isActive={false} piece="Q" />
      </Row>
    </div>
  ) : <></>;
}

export default PawnPromotionOptions;
