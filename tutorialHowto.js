import React from "react";

export class TutorialHowTo extends React.Component {
  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", marginTop: "5%" }}>
          How do I use this app?
        </h2>
        <h4 style={{ marginLeft: "2%", marginTop: "5%" }}>
          ・First make some nodes by clicking on the screen.
        </h4>
        <h4 style={{ marginLeft: "2%", marginTop: "5%" }}>
          ・Then click "Create" and choose "Edge" to connect the nodes you just
          made.
        </h4>
        <h4 style={{ marginLeft: "2%", marginTop: "5%" }}>
          ・Choose a starting node by clicking "Start Node".
          <br />
          If the number changes to 0 your doing a great job.
        </h4>
        <h4 style={{ marginLeft: "2%", marginTop: "5%" }}>
          ・Finally click "Go!" and hover over the nodes to see the shortest
          path!
        </h4>
      </div>
    );
  }
}
