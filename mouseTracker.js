import React from "react";

export class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.state = {
      currentX: 0,
      currentY: 0
    };
  }

  handleMouseMove(event) {
    if (event.clientY < 100) return;
    this.setState({
      currentX: event.clientX - 30,
      currentY: event.clientY - 30
    });
  }

  handleMouseDown(event) {
    if (this.props.createNode) {
      let x = event.clientX - 30;
      let y = event.clientY - 30;
      this.props.makeNode(x, y);
    }
  }

  render() {
    return (
      <div>
        <div
          id="workspace"
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
        >
          {this.props.createNode ? (
            <img
              src={`${process.env.PUBLIC_URL}/node.png`}
              height="60px"
              width="60px"
              style={{
                top: this.state.currentY,
                left: this.state.currentX,
                position: "absolute",
                opacity: "0.2"
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
