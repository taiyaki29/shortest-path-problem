import React from "react";
import hi from "./img/hello.png";

export class TutorialWelcome extends React.Component {
  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center", marginTop: "5%" }}>Welcome</h2>
        <h3 style={{ textAlign: "center" }}>
          We will walk through all the features this app has to offer!
        </h3>
        <h3 style={{ textAlign: "center" }}>
          Feel free to skip the tutorial and have some fun!
        </h3>
        <h4 style={{ textAlign: "center", marginTop: "5%" }}>
          You can open this tutorial anytime by clicking "Help"
        </h4>
        <div style={{ textAlign: "center" }}>
          <img width="50%" src={hi} />
        </div>
      </div>
    );
  }
}
