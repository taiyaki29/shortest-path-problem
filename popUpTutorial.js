import React from "react";
import { Button } from "react-bootstrap";
import { TutorialWelcome } from "./tutorialWelcome";
import { TutorialIntro } from "./tutorialIntro";
import { TutorialHowTo } from "./tutorialHowto";
import { TutorialMeaning } from "./tutorialMeaning";
import { TutorialExample } from "./tutorialExample";

export class PopUpTutorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
    this.handleClickRight = this.handleClickRight.bind(this);
    this.handleClickLeft = this.handleClickLeft.bind(this);
  }
  handleClickRight() {
    if (this.state.page < 4) {
      this.setState({
        page: this.state.page + 1
      });
    } else if (this.state.page === 4) {
      this.setState({
        page: 0
      });
      this.props.tutorialEnd();
    }
  }
  handleClickLeft() {
    if (this.state.page > 0) {
      this.setState({
        page: this.state.page - 1
      });
    }
  }
  render() {
    let currentPage = <TutorialWelcome />;
    if (this.state.page === 0) {
      currentPage = <TutorialWelcome />;
    } else if (this.state.page === 1) {
      currentPage = <TutorialIntro />;
    } else if (this.state.page === 2) {
      currentPage = <TutorialHowTo />;
    } else if (this.state.page === 3) {
      currentPage = <TutorialMeaning />;
    } else if (this.state.page === 4) {
      currentPage = <TutorialExample />;
    }
    const left = "<";
    const right = ">";
    return (
      <div className="popup">
        <div className="popup_inner">
          <Button
            style={{
              position: "absolute",
              left: "15%",
              right: "25%",
              top: "84%",
              bottom: "9%"
            }}
            onClick={this.handleClickLeft}
          >
            {left}
          </Button>
          <Button
            style={{
              position: "absolute",
              left: "43%",
              right: "25%",
              top: "84%",
              bottom: "9%"
            }}
            onClick={() => this.props.tutorialEnd()}
          >
            {" "}
            End tutorial{" "}
          </Button>
          <Button
            style={{
              position: "absolute",
              left: "80%",
              right: "25%",
              top: "84%",
              bottom: "9%"
            }}
            onClick={this.handleClickRight}
          >
            {right}
          </Button>
          <p
            style={{
              position: "absolute",
              left: "48%",
              right: "25%",
              top: "93%",
              bottom: "5%"
            }}
          >
            {this.state.page + 1}/5
          </p>
          {currentPage}
        </div>
      </div>
    );
  }
}
