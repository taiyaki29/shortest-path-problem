import React from "react";

export class ShowGraph extends React.Component {
  constructor(props) {
    super(props);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
  }
  handleNodeClick(e) {
    this.props.handleNodeClick(e);
  }
  handleChange(index) {
    this.props.handleChange(
      index,
      document.getElementById(`box-${index}`).value
    );
  }
  handleMouseOver(index) {
    if (this.props.showResult) {
      this.props.showResultPath(index);
    }
  }
  render() {
    return (
      <div>
        {this.props.node.map((node, index) => (
          <button style={node} className={"node-" + index} key={index}>
            {this.props.beforeNode !== index ? (
              <div style={{ width: 60, height: 60 }}>
                <img
                  key={`node-${index}`}
                  id={`node-${index}`}
                  onClick={() => {
                    this.handleNodeClick(index);
                  }}
                  onMouseOver={() => {
                    this.handleMouseOver(index);
                  }}
                  src={`${process.env.PUBLIC_URL}/node.png`}
                  height="60px"
                  width="60px"
                />
                <div
                  id={`resultNumber-${index}`}
                  key={`num-${index}`}
                  style={{
                    top: -50,
                    position: "relative",
                    textAlign: "center",
                    zIndex: 0,
                    fontSize: 22,
                    color: "blue",
                    pointerEvents: "none"
                  }}
                >
                  ∞
                </div>
              </div>
            ) : (
              <div style={{ width: 60, height: 60 }}>
                <img
                  key={`show-${index}`}
                  style={{
                    boxShadow: "0 0 3px 3px rgba(255, 255, 0, 0.7)",
                    borderRadius: "50%"
                  }}
                  id="node"
                  onClick={() => {
                    this.handleNodeClick(index);
                  }}
                  src={`${process.env.PUBLIC_URL}/node.png`}
                  height="60px"
                  width="60px"
                />
                <div
                  id={`resultNumber-${index}`}
                  key={`weight-${index}`}
                  style={{
                    top: -50,
                    position: "relative",
                    textAlign: "center",
                    zIndex: 10,
                    fontSize: 22,
                    color: "blue",
                    pointerEvents: "none"
                  }}
                >
                  ∞
                </div>
              </div>
            )}
          </button>
        ))}
        {this.props.lines.map((line, index) => (
          <div key={index}>
            <input
              type="number"
              id={`box-${index}`}
              onChange={() => this.handleChange(index)}
              value={line.weight}
              style={{
                position: "absolute",
                top: line.y,
                left: line.x + 20,
                color: "red",
                zIndex: 3,
                fontWeight: 500,
                fontSize: 15,
                width: "30px",
                height: "30px",
                resize: "none",
                overflow: "hidden",
                textAlign: "center"
              }}
            />
            <img
              key={`line-${index}`}
              src={`${process.env.PUBLIC_URL}/5x5.png`}
              height="2px"
              width={line.length}
              style={{
                position: "absolute",
                top: line.y + 30,
                left: line.x - line.length / 2 + 30,
                transform: `rotate(${line.angle}deg)`
              }}
            />
            <img
              key={`directed-${index}`}
              id={`directed-${index}`}
              src={`${process.env.PUBLIC_URL}/bigarrow.png`}
              width="50px"
              height="20px"
              style={{
                position: "absolute",
                top: line.arrowTop + 21.2,
                left: line.arrowLeft - 19.5,
                transform: `rotate(${line.angle}deg)`,
                zIndex: 1,
                transformOrigin: "right",
                visibility: line.visibility
              }}
            />
          </div>
        ))}
        {this.props.resultPath.map((line, index) => (
          <>
            <img
              key={`lineg-${index}`}
              src={`${process.env.PUBLIC_URL}/green5x5.png`}
              height="2px"
              width={line.length}
              style={{
                position: "absolute",
                top: line.y + 30,
                left: line.x - line.length / 2 + 30,
                transform: `rotate(${line.angle}deg)`
              }}
            />
            <img
              key={`directedg-${index}`}
              id={`directed-${index}`}
              src={`${process.env.PUBLIC_URL}/greenbigarrow.png`}
              width="50px"
              height="20px"
              style={{
                position: "absolute",
                top: line.arrowTop + 21.2,
                left: line.arrowLeft - 19.5,
                transform: `rotate(${line.angle}deg)`,
                zIndex: 1,
                transformOrigin: "right",
                visibility: line.visibility
              }}
            />
          </>
        ))}
      </div>
    );
  }
}
