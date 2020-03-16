import React from "react";

export class ShowGraph extends React.Component {
  constructor(props) {
    super(props);
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }
  handleNodeClick(e) {
    console.log(e);
  }
  render() {
    let nodes = this.props.node.map(nodes => {
      return {
        position: "absolute",
        top: nodes.y - 30,
        left: nodes.x - 30,
        padding: 0,
        border: 0,
        height: 0,
        width: 0
      };
    });
    return (
      <div>
        {nodes.map((node, index) => (
          <button style={node}>
            <img
              id="node"
              onClick={this.handleNodeClick}
              src={`${process.env.PUBLIC_URL}/node.png`}
              height="60px"
              width="60px"
            />
          </button>
        ))}
      </div>
    );
  }
}
