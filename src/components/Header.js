import React, { Component } from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <Navbar id="jumbotron">
        <Navbar.Brand>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "black",
              fontWeight: "bold",
            }}
          >
            <img
              alt=""
              src={require("../assets/images.png")}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Chess
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>
    );
  }
}

export default Header;
