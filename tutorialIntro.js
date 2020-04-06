import React from "react";

export class TutorialIntro extends React.Component {
  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", marginTop: "5%" }}>
          What does this app do?
        </h2>
        <h3 style={{ textAlign: "center", marginTop: "5%" }}>
          You can draw a graph, and the app will show you the shortest path
          between two points.
        </h3>
        <h4
          style={{
            textAlign: "center",
            marginTop: "5%",
            marginRight: "5%",
            marginLeft: "5%"
          }}
        >
          There are many pathfinding visualizers on the web, but couldn't find
          one that would let you draw nodes and edges.
          <br />
          So I made one!
        </h4>
        <h4 style={{ textAlign: "center", marginTop: "5%" }}>
          It uses Dijkstra's algorithm to calculate.
        </h4>
      </div>
    );
  }
}
