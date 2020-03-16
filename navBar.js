import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import LOGO from "./logo.svg";

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear(e) {
    this.props.clear();
  }

  render() {
    return (
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <img src={LOGO} width="30" height="30" alt="React Bootstrap logo" />
            Shortest Path Algorithms
          </Navbar.Brand>
          <Button variant="outline-success" className="nav-button">
            Go!
          </Button>
          <Button
            variant="outline-danger"
            className="nav-button"
            onClick={this.handleClear}
          >
            Clear
          </Button>
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
