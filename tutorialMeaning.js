import React from "react";

export class TutorialMeaning extends React.Component {
  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", marginTop: "5%" }}>
          What do the numbers mean?
        </h2>
        <h4
          style={{
            textAlign: "center",
            marginTop: "5%",
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          The numbers inside the nodes represent the "cost" from the starting
          node.
        </h4>
        <h4
          style={{
            textAlign: "center",
            marginTop: "5%",
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          Click "Options" to toggle "weight" which will let you add weights, or
          "costs" to your edges.
        </h4>
        <h4
          style={{
            textAlign: "center",
            marginTop: "5%",
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          Also you will see "directed" in the options, which will control if you
          want the edges to be directed or not.
        </h4>
        <h5
          style={{
            textAlign: "center",
            marginTop: "5%",
            marginLeft: "5%",
            marginRight: "5%"
          }}
        >
          The "speed" is how fast the result of the calculation is shown. Don't
          worry about it for now.
        </h5>
      </div>
    );
  }
}
