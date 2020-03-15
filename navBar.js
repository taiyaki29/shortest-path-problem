import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import LOGO from "./logo.svg";

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img src={LOGO} width="30" height="30" alt="React Bootstrap logo" />
            Shortest Path Algorithms
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#Bellman-Ford">Bellman-Ford</Nav.Link>
              <Nav.Link href="#Dijkstra">Dijkstra</Nav.Link>
              <Nav.Link href="#Warshall-Floyd">Warshall-Floyd</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}
