//import * as serviceWorker from "./serviceWorker";
//serviceWorker.unregister();
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { NavBar } from "./navBar";
import { MouseTracker } from "./mouseTracker";
import { ShowGraph } from "./showGraph";

class MainController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodePosition: []
    };
    this.makeNode = this.makeNode.bind(this);
    this.clearNodes = this.clearNodes.bind(this);
  }

  makeNode(x, y) {
    let nodePosition = this.state.nodePosition;
    this.setState({
      nodePosition: nodePosition.concat({
        x: x,
        y: y
      })
    });
    console.log(this.state.nodePosition);
  }

  clearNodes() {
    this.setState({
      nodePosition: []
    });
  }

  render() {
    return (
      <div>
        <NavBar clear={this.clearNodes} />
        <MouseTracker makeNode={this.makeNode} />
        <ShowGraph node={this.state.nodePosition} />
      </div>
    );
  }
}

ReactDOM.render(<MainController />, document.getElementById("root"));
