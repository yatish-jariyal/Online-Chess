import React, { Component } from "react";
import { Button, Jumbotron, Container, Table, Col, Row } from "react-bootstrap";
import CreateGame from "../components/CreateGame";

class HomePage extends Component {
  state = {
    show: false,
  };
  handleClose = () => {
    this.setState((prevState) => ({
      ...prevState,
      show: false,
    }));
  };
  handleShow = () => {
    this.setState((prevState) => ({
      prevState,
      show: true,
    }));
  };

  handleClick = () => {
    console.log("clicked");
    this.setState((prevState) => ({
      ...prevState,
      show: true,
    }));
  };
  render() {
    return (
      <div className="App pb-5" id="jumbotron">
        <Jumbotron fluid id="jumbotron">
          <Container>
            <Row>
              <Col lg={6}>
                <h1>Online Chess</h1>
                <p>Play chess with your friends.</p>
                <p>
                  Chess is a two-player strategy board game played on a
                  checkered board with 64 squares arranged in an 8×8 square
                  grid. Played by millions of people worldwide, chess is
                  believed to be derived from the Indian game chaturanga
                  sometime before the 7th century. Chaturanga is also the likely
                  ancestor of the East Asian strategy games xiangqi (Chinese
                  chess), janggi (Korean chess), and shogi (Japanese chess).
                  Chess reached Europe via Persia and Arabia by the 9th century,
                  due to the Umayyad conquest of Hispania. The pieces assumed
                  their current properties in Spain in the late 15th century,
                  and the modern rules were standardized in the 19th century.
                </p>
                <Button onClick={this.handleClick}>Play Now</Button>
              </Col>
              <Col lg={1} />
              <Col lg={5}>
                <img
                  src={require("../assets/chessanimated.gif")}
                  style={{ height: 450, width: 450 }}
                  alt="dd"
                />
              </Col>
            </Row>
          </Container>
        </Jumbotron>
        <hr />
        <Container>
          <Row className="justify-content-center">
            <h3 className="mt-5 mb-5">Top FIDE Players</h3>
            <Table striped bordered hover style={{ backgroundColor: "white" }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Country</th>
                  <th>Title</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Carlsen, Magnus</td>
                  <td>Norway</td>
                  <td>GM</td>
                  <td>2863</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Caruana, Fabiano</td>
                  <td>USA</td>
                  <td>GM</td>
                  <td>2835</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Ding, Liren</td>
                  <td>China</td>
                  <td>GM</td>
                  <td>2791</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Nepomniachtchi, Ian</td>
                  <td>Russia</td>
                  <td>GM</td>
                  <td>2784</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Vachier-Lagrave, Maxime</td>
                  <td>France</td>
                  <td>GM</td>
                  <td>2778</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>Grischuk, Alexander</td>
                  <td>Russia</td>
                  <td>GM</td>
                  <td>2777</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Aronian, Levon</td>
                  <td>Armeia</td>
                  <td>GM</td>
                  <td>2773</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>So, Wesley</td>
                  <td>USA</td>
                  <td>GM</td>
                  <td>2770</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td>Radjabov, Teimour</td>
                  <td>Azerbaijan</td>
                  <td>GM</td>
                  <td>2765</td>
                </tr>
                <tr>
                  <td>10</td>
                  <td>Anish Giri</td>
                  <td>Netherlands</td>
                  <td>GM</td>
                  <td>2764</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </Container>
        <CreateGame show={this.state.show} handleClose={this.handleClose} />
      </div>
    );
  }
}

export default HomePage;
