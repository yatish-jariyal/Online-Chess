import React, { Component } from "react";
import { Container, Row } from "react-bootstrap";

class Footer extends Component {
  render() {
    return (
      <Container
        fluid
        style={{
          marginBottom: -60,
          backgroundColor: "#343A40",
        }}
      >
        <Row className="justify-content-center py-4">
          <p style={{ color: "white", margin: "auto" }}>
            &copy; 2020 Online Chess
          </p>
        </Row>
      </Container>
    );
  }
}

export default Footer;
