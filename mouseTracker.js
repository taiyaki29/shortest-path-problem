import React from "react";

export class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.state = { currentX: 0, currentY: 0, clickedPosition: [] };
  }

  handleMouseMove(event) {
    this.setState({
      currentX: event.clientX,
      currentY: event.clientY
    });
  }

  handleMouseDown(event) {
    let x = event.clientX;
    let y = event.clientY;
    this.props.makeNode(x, y);
  }

  render() {
    return (
      <div>
        <div
          id="workspace"
          onMouseMove={this.handleMouseMove}
          onMouseDown={this.handleMouseDown}
        >
          <p>
            (x={this.state.currentX}, y={this.state.currentY})
          </p>
          <img
            src={`${process.env.PUBLIC_URL}/node.png`}
            height="60px"
            width="60px"
            //opacity="0.5"
            position="absolute"
            top={this.state.currentY}
            left={this.state.currentX}
            //height={this.state.currentX}
          />
        </div>
      </div>
    );
  }
}
