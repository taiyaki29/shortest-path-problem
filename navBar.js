import React from "react";
import { Navbar, Button, Dropdown, ButtonGroup } from "react-bootstrap";

export class NavBar extends React.Component {
  render() {
    return (
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          style={{ zIndex: 3 }}
        >
          <Navbar.Brand href="#home">Shortest Path Visualizer</Navbar.Brand>
          <Button
            style={{ width: "110px", margin: "auto" }}
            variant="outline-success"
            className="nav-button"
            onClick={() => {
              this.props.clickGo();
            }}
          >
            Go!
          </Button>
          <div>
            <Button
              style={{ width: "110px", margin: "auto" }}
              variant="outline-info"
              className="nav-button"
              onClick={() => {
                this.props.clickStart();
              }}
            >
              Start Node
            </Button>
          </div>
          <Dropdown as={ButtonGroup} style={{ width: "110px", margin: "auto" }}>
            <Dropdown.Toggle variant="outline-warning">Create</Dropdown.Toggle>
            <Dropdown.Menu style={{ backgroundColor: "white" }}>
              <button
                id="createNodeButton"
                className="chosenAlgorithm"
                onClick={() => {
                  this.props.node();
                }}
              >
                Node
              </button>
              <button
                id="createEdgeButton"
                className="notChosen"
                onClick={() => {
                  this.props.edge();
                }}
              >
                Edge
              </button>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown as={ButtonGroup} style={{ width: "110px", margin: "auto" }}>
            <Dropdown.Toggle variant="outline-light">Options</Dropdown.Toggle>
            <Dropdown.Menu style={{ backgroundColor: "white" }}>
              <button
                onClick={this.props.weighted}
                id="weighted"
                className="notChosen"
              >
                Weighted OFF
              </button>
              <button
                onClick={this.props.directed}
                id="directed"
                className="notChosen"
              >
                Directed OFF
              </button>
              <button
                onClick={this.props.speed}
                id="speed"
                className="notChosen"
              >
                Speed Normal
              </button>
              <button
                onClick={this.props.random}
                id="speed"
                className="notChosen"
              >
                Random Graph
              </button>
            </Dropdown.Menu>
          </Dropdown>
          <Button
            style={{ width: "110px", margin: "auto" }}
            variant="outline-danger"
            className="nav-button"
            onClick={() => {
              this.props.clearEdge();
            }}
          >
            Clear Edges
          </Button>
          <Button
            style={{ width: "110px", margin: "auto" }}
            variant="outline-danger"
            className="nav-button"
            onClick={() => {
              this.props.clear();
            }}
          >
            Clear All
          </Button>
          <Button
            style={{ width: "110px", margin: "auto" }}
            variant="outline-secondary"
            className="nav-button"
            onClick={() => {
              this.props.help();
            }}
          >
            Help
          </Button>
        </Navbar>
      </div>
    );
  }
}
