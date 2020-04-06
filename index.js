//import * as serviceWorker from "./serviceWorker";
//serviceWorker.unregister();
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import React from "react";
import ReactDOM from "react-dom";
import { NavBar } from "./navBar";
import { MouseTracker } from "./mouseTracker";
import { ShowGraph } from "./showGraph";
import { PopUpTutorial } from "./popUpTutorial";
import TinyQueue from "tinyqueue";

class MainController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nodePosition: [],
      lines: [],
      result: [],
      Graph: [],
      Distance: [],
      shortestPaths: [],
      resultPath: [],
      que: null,
      beforeNode: null,
      startingNode: null,
      goalNode: null,
      resultPathForShowGraph: [],
      algorithm: "Dijkstra",
      directed: false,
      weighted: false,
      speed: 10,

      createNode: true,
      createEdge: false,
      chooseStart: false,
      chooseGoal: false,
      showResult: false,
      startRandom: false,
      tutorialPopup: true,
      animating: false
    };
    this.animateResult = this.animateResult.bind(this);
  }

  makeNode(x, y) {
    if (!this.state.animating) {
      let nodePosition = this.state.nodePosition;
      this.setState({
        nodePosition: nodePosition.concat({
          left: x,
          top: y,
          position: "absolute",
          padding: 0,
          border: 0,
          height: 0,
          width: 0,
          zIndex: 2,
          outline: "none"
        })
      });
    }
  }

  handleNodeClick(e) {
    if (this.state.createEdge && !this.state.animating) {
      if (this.state.beforeNode !== null) {
        let make = true;
        this.state.lines.forEach(line => {
          if (
            (line.connectingNodes.from === this.state.beforeNode &&
              line.connectingNodes.to === e) ||
            (line.connectingNodes.to === this.state.beforeNode &&
              line.connectingNodes.from === e)
          ) {
            this.setState({
              beforeNode: null
            });
            make = false;
          }
        });
        if (make) {
          if (
            this.state.beforeNode === this.state.startingNode ||
            e === this.state.startingNode
          ) {
            this.setState({ connected: true });
          }
          let x1 = this.state.nodePosition[this.state.beforeNode].left;
          let y1 = this.state.nodePosition[this.state.beforeNode].top;
          let x2 = this.state.nodePosition[e].left;
          let y2 = this.state.nodePosition[e].top;
          let lineLength = Math.sqrt(
            Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
          );
          let linePositionX = (x1 + x2) / 2;
          let linePositionY = (y1 + y2) / 2;
          let lineAngle = Math.atan2(y2 - y1, x2 - x1);
          let degree = (lineAngle * 180) / Math.PI;
          let visibility = this.state.directed ? "visible" : "hidden";
          this.setState({
            lines: this.state.lines.concat({
              length: lineLength,
              x: linePositionX,
              y: linePositionY,
              angle: degree,
              connectingNodes: { from: this.state.beforeNode, to: e },
              weight: 1,
              directed: this.state.directed,
              visibility: visibility,
              arrowTop: this.state.nodePosition[e].top,
              arrowLeft: this.state.nodePosition[e].left
            }),
            beforeNode: null
          });
        }
      } else {
        this.setState({
          beforeNode: e
        });
      }
    } else if (this.state.chooseStart) {
      document.getElementById(`resultNumber-${e}`).innerText = 0;
      document.getElementById(`resultNumber-${e}`).innerText = 0;
      if (this.state.startingNode !== null) {
        document.getElementById(
          `resultNumber-${this.state.startingNode}`
        ).innerText = "∞";
      }
      this.setState({
        startingNode: e,
        chooseStart: false
      });
    } else if (this.state.chooseGoal) {
      this.setState({
        goalNode: e,
        chooseGoal: false
      });
    }
  }

  handleChange(index, value) {
    if (!this.state.animating) {
      //weight
      let lines = this.state.lines;
      lines[index].weight = parseInt(value);
      this.setState({
        lines: lines
      });
    }
  }

  clickGo() {
    if (document.getElementById("createNodeButton")) {
      document.getElementById("createNodeButton").className = "notChosen";
    }
    this.setState({
      chooseGoal: false,
      chooseStart: false,
      createNode: false,
      createEdge: false
    });
    if (this.state.nodePosition.length === 0)
      alert("Can't find any nodes. Click on Node and make some.");
    else if (this.state.startingNode === null)
      alert("Starting node not chosen. Click Start and choose a node.");
    else if (this.state.lines === null)
      alert("No edges have been made. Click on Edge and connect some nodes");
    else if (this.state.algorithm === "Dijkstra") {
      this.setState({
        Graph: [],
        Distance: [],
        shortestPaths: [],
        resultPath: [],
        resultPathForShowGraph: [],
        result: [],
        animating: true
      });
      for (let i = 0; i < this.state.nodePosition.length; i++) {
        if (i !== this.state.startingNode) {
          document.getElementById(`resultNumber-${i}`).innerText = "∞";
        } else {
          document.getElementById(`resultNumber-${i}`).innerText = 0;
        }
      }

      let Graph = [];
      let Distance = [];
      let parentNode = [];
      let shortestPaths = [];
      const INF = 100000000;
      let graphNumber = this.state.lines.length;
      if (this.state.nodePosition.length > graphNumber)
        graphNumber = this.state.nodePosition.length;
      for (let i = 0; i <= graphNumber; i++) {
        Graph[i] = [];
        Distance.push(INF);
        parentNode.push(-1);
        shortestPaths[i] = [];
      }
      this.state.lines.map(line => {
        Graph[line.connectingNodes.from].push({
          to: line.connectingNodes.to,
          weight: line.weight
        });
        if (!line.directed) {
          Graph[line.connectingNodes.to].push({
            to: line.connectingNodes.from,
            weight: line.weight
          });
        }
      });
      Distance[this.state.startingNode] = 0;
      const que = new TinyQueue();
      que.push({ first: 0, second: this.state.startingNode });
      let history = [];
      while (que.length > 0) {
        let top = que.pop();
        if (Distance[top.second] < top.first) continue;
        for (let i = 0; i < Graph[top.second].length; i++) {
          let edge = Graph[top.second][i];
          if (Distance[edge.to] > Distance[top.second] + edge.weight) {
            Distance[edge.to] = Distance[top.second] + edge.weight;
            history.push({
              dist: Distance.slice(0, this.state.nodePosition.length),
              from: top.second
            });
            parentNode[edge.to] = top.second;
            que.push({ first: Distance[edge.to], second: edge.to });
          }
        }
      }
      this.setState({
        result: history
      });
      if (history.length !== 0) {
        for (let i = 0; i < this.state.nodePosition.length; i++) {
          let node = i;
          if (history[history.length - 1].dist[i] !== 100000000) {
            while (node !== this.state.startingNode) {
              shortestPaths[i].push(node);
              node = parentNode[node];
              if (parentNode[node] === -1) break;
            }
            shortestPaths[i].push(this.state.startingNode);
            shortestPaths[i].reverse().slice(0, this.state.nodePosition.length);
          }
        }
        this.setState({
          showResult: true
        });
        const resultPath = [];
        for (let j = 0; j < this.state.nodePosition.length; j++) {
          resultPath[j] = [];
          if (shortestPaths[j] !== [] && shortestPaths[j].length > 1) {
            for (let i = 1; i < shortestPaths[j].length; i++) {
              this.state.lines.forEach(line => {
                if (
                  (line.connectingNodes.from === shortestPaths[j][i] &&
                    line.connectingNodes.to === shortestPaths[j][i - 1]) ||
                  (line.connectingNodes.from === shortestPaths[j][i - 1] &&
                    line.connectingNodes.to === shortestPaths[j][i])
                ) {
                  resultPath[j].push(line);
                }
              });
            }
          }
        }
        this.setState({
          resultPath: resultPath
        });
        setTimeout(() => {
          this.animateResult();
        }, 200);
      }
    }
  }

  animateResult() {
    let distLength = this.state.result[0].dist.length;
    for (let i = 0; i < this.state.result.length; i++) {
      for (let j = 0; j < distLength; j++) {
        if (i === 0 && this.state.result[i].dist[j] !== 100000000) {
          setTimeout(() => {
            document.getElementById(
              `resultNumber-${j}`
            ).innerText = this.state.result[i].dist[j];
            if (this.state.result[i].dist[j] !== 0) {
              document.getElementById(`node-${j}`).className = "chaseResult";
            }
          }, 50 * this.state.speed * (i + 1));
          setTimeout(() => {
            document.getElementById(`node-${j}`).className = "";
          }, 50 * this.state.speed * (i + 1) + 50 * this.state.speed);
        } else if (
          i !== 0 &&
          this.state.result[i - 1].dist[j] !== this.state.result[i].dist[j] &&
          this.state.result[i].dist[j] !== 100000000
        ) {
          setTimeout(() => {
            document.getElementById(
              `resultNumber-${j}`
            ).innerText = this.state.result[i].dist[j];
            document.getElementById(`node-${j}`).className = "chaseResult";
          }, 50 * this.state.speed * (i + 1));
          setTimeout(() => {
            document.getElementById(`node-${j}`).className = "";
          }, 50 * this.state.speed * (i + 1) + 50 * this.state.speed);
        }
      }
    }
    setTimeout(() => {
      this.setState({ animating: false });
    }, 50 * this.state.speed * (this.state.result.length + 10));
  }

  showResultPath(index) {
    if (this.state.showResult) {
      this.setState({
        resultPathForShowGraph: this.state.resultPath[index]
      });
    }
  }

  speed() {
    if (!this.state.animating) {
      if (this.state.speed === 20) {
        this.setState({
          speed: 10
        });
        document.getElementById("speed").innerText = "Speed Normal";
      } else if (this.state.speed === 2) {
        this.setState({
          speed: 20
        });
        document.getElementById("speed").innerText = "Speed Slow";
      } else if (this.state.speed === 10) {
        this.setState({
          speed: 2
        });
        document.getElementById("speed").innerText = "Speed Fast";
      }
    }
  }

  clickStart() {
    if (!this.state.animating) {
      if (document.getElementById("createNodeButton")) {
        document.getElementById("createNodeButton").className = "notChosen";
      }
      this.setState({
        chooseStart: true,
        createNode: false,
        createEdge: false,
        chooseGoal: false,
        showResult: false
      });
    }
  }

  weighted() {
    if (!this.state.animating) {
      if (this.state.weighted) {
        this.setState({
          weighted: false
        });
        document.getElementById("weighted").innerText = "Weighted OFF";
        document.getElementById("weighted").className = "notChosen";
        for (let i = 0; i < this.state.lines.length; i++) {
          document.getElementById(`box-${i}`).style.visibility = "hidden";
        }
      } else {
        this.setState({
          weighted: true
        });
        document.getElementById("weighted").innerText = "Weighted ON";
        document.getElementById("weighted").className = "chosenAlgorithm";
        for (let i = 0; i < this.state.lines.length; i++) {
          document.getElementById(`box-${i}`).style.visibility = "visible";
        }
      }
    }
  }
  directed() {
    if (!this.state.animating) {
      if (this.state.directed) {
        this.setState({
          directed: false
        });
        document.getElementById("directed").innerText = "Directed OFF";
        document.getElementById("directed").className = "notChosen";
      } else {
        this.setState({
          directed: true
        });
        document.getElementById("directed").innerText = "Directed ON";
        document.getElementById("directed").className = "chosenAlgorithm";
      }
    }
  }

  createNode() {
    if (!this.state.animating) {
      this.setState({
        createNode: true,
        createEdge: false,
        chooseStart: false,
        chooseGoal: false,
        showResult: false
      });
      if (!this.state.createNode) {
        document.getElementById("createNodeButton").className =
          "chosenAlgorithm";
        document.getElementById("createEdgeButton").className = "notChosen";
      }
    }
  }

  createEdge() {
    if (!this.state.animating) {
      this.setState({
        createNode: false,
        createEdge: true,
        chooseStart: false,
        chooseGoal: false,
        showResult: false
      });
      if (!this.state.createEdge) {
        document.getElementById("createEdgeButton").className =
          "chosenAlgorithm";
        document.getElementById("createNodeButton").className = "notChosen";
      }
    }
  }
  clearEdge() {
    if (!this.state.animating) {
      if (!this.state.startRandom) {
        this.setState({
          lines: [],
          result: [],
          showResult: false,
          Graph: [],
          Distance: [],
          shortestPaths: [],
          resultPath: [],
          resultPathForShowGraph: []
        });
      }
    }
  }

  clearAllNodes() {
    if (!this.state.animating) {
      this.setState({
        nodePosition: [],
        lines: [],
        startingNode: null,
        goalNode: null,
        result: [],
        showResult: false,
        Graph: [],
        Distance: [],
        shortestPaths: [],
        resultPath: [],
        resultPathForShowGraph: []
      });
    }
  }

  random() {
    if (!this.state.animating) {
      if (!this.state.startRandom) {
        if (this.showTimer) {
          clearTimeout(this.showTimer);
        }
        if (document.getElementById("createNodeButton")) {
          document.getElementById("createNodeButton").className = "notChosen";
        }
        this.setState({
          nodePosition: [],
          lines: [],
          startingNode: null,
          goalNode: null,
          result: [],
          showResult: false,
          Graph: [],
          Distance: [],
          shortestPaths: [],
          resultPath: [],
          resultPathForShowGraph: [],
          startRandom: true,
          createNode: false
        });
        for (let i = 1; i <= 23; i++) {
          let x =
            Math.floor(
              Math.random() * ((window.innerWidth - 100) / 24) +
                (i % 8) * ((window.innerWidth - 100) / 8)
            ) + 50;
          let y =
            Math.floor(
              Math.random() * ((window.innerHeight - 100) / 12) +
                Math.floor(i / 8) * ((window.innerHeight - 100) / 3)
            ) +
            window.innerHeight / 4.5;
          setTimeout(() => {
            this.setState({
              nodePosition: this.state.nodePosition.concat({
                left: x,
                top: y,
                position: "absolute",
                padding: 0,
                border: 0,
                height: 0,
                width: 0,
                zIndex: 2,
                outline: "none"
              })
            });
          }, 10 * i);
        }
        for (let i = 1; i <= 180; i++) {
          let from = Math.floor(Math.random() * 23);
          let choser = Math.floor(Math.random() * 5);
          let to = 0;
          if (from === 0 || from === 7) {
            if (choser === 0) {
              to = from + 1;
            } else if (choser === 1) {
              to = from + 8;
            } else {
              to = from + 9;
            }
          } else if (from === 6 || from === 14) {
            if (choser === 0) {
              to = from - 1;
            } else if (choser === 1) {
              to = from + 7;
            } else {
              to = from + 8;
            }
          } else if (from === 15 || from === 22) {
            to = from - 8;
          } else if (from < 15) {
            if (choser === 0) {
              to = from - 1;
            } else if (choser === 1) {
              to = from + 1;
            } else if (choser === 2) {
              to = from + 7;
            } else if (choser === 3) {
              to = from + 8;
            } else if (choser === 4) {
              to = from + 9;
            }
          } else {
            if (choser === 0) {
              to = from + 1;
            } else if (choser === 1) {
              to = from - 7;
            } else if (choser === 2) {
              to = from - 8;
            } else {
              to = from - 9;
            }
          }
          if (from === to) {
            from = 3;
            to = 2;
          }
          let directed = Math.floor(Math.random() * 4);
          let weight = Math.floor(Math.random() * 100) + 1;
          this.showTimer = setTimeout(() => {
            let make = true;
            this.state.lines.forEach(line => {
              if (
                (line.connectingNodes.from === from &&
                  line.connectingNodes.to === to) ||
                (line.connectingNodes.to === from &&
                  line.connectingNodes.from === to)
              )
                make = false;
            });
            if (make) {
              let x1 = this.state.nodePosition[from].left;
              let y1 = this.state.nodePosition[from].top;
              let x2 = this.state.nodePosition[to].left;
              let y2 = this.state.nodePosition[to].top;
              let lineLength = Math.sqrt(
                Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)
              );
              let linePositionX = (x1 + x2) / 2;
              let linePositionY = (y1 + y2) / 2;
              let lineAngle = Math.atan2(y2 - y1, x2 - x1);
              let degree = (lineAngle * 180) / Math.PI;
              let visibility = directed === 0 ? "visible" : "hidden";
              let directedState = directed === 0 ? true : false;
              this.setState({
                lines: this.state.lines.concat({
                  length: lineLength,
                  x: linePositionX,
                  y: linePositionY,
                  angle: degree,
                  connectingNodes: { from: from, to: to },
                  weight: weight,
                  directed: directedState,
                  visibility: visibility,
                  arrowTop: this.state.nodePosition[to].top,
                  arrowLeft: this.state.nodePosition[to].left
                })
              });
            }
          }, 10 * i + 500);
        }
        setTimeout(() => {
          this.setState({
            startRandom: false
          });
        }, 3000);
      }
    }
  }
  help() {
    if (!this.state.animating) {
      this.setState({
        tutorialPopup: true
      });
    }
  }
  tutorialEnd() {
    if (!this.state.animating) {
      this.setState({
        tutorialPopup: false
      });
    }
  }

  componentDidUpdate() {
    if (!this.state.weighted && this.state.lines.length > 0) {
      document.getElementById(
        `box-${this.state.lines.length - 1}`
      ).style.visibility = "hidden";
    }
    if (!this.state.createNode && document.getElementById("createNodeButton")) {
      document.getElementById("createNodeButton").className = "notChosen";
    }
  }

  render() {
    return (
      <div>
        {this.state.tutorialPopup ? (
          <PopUpTutorial tutorialEnd={this.tutorialEnd.bind(this)} />
        ) : null}
        <NavBar
          clear={this.clearAllNodes.bind(this)}
          clearEdge={this.clearEdge.bind(this)}
          node={this.createNode.bind(this)}
          edge={this.createEdge.bind(this)}
          clickGo={this.clickGo.bind(this)}
          algorithm={this.state.algorithm}
          weighted={this.weighted.bind(this)}
          directed={this.directed.bind(this)}
          clickStart={this.clickStart.bind(this)}
          speed={this.speed.bind(this)}
          random={this.random.bind(this)}
          help={this.help.bind(this)}
        />
        <MouseTracker
          makeNode={this.makeNode.bind(this)}
          createNode={this.state.createNode}
        />
        <ShowGraph
          node={this.state.nodePosition}
          lines={this.state.lines}
          handleNodeClick={this.handleNodeClick.bind(this)}
          beforeNode={this.state.beforeNode}
          handleChange={this.handleChange.bind(this)}
          startingNode={this.state.startingNode}
          goalNode={this.state.goalNode}
          showResult={this.state.showResult}
          showResultPath={this.showResultPath.bind(this)}
          resultPath={this.state.resultPathForShowGraph}
        />
      </div>
    );
  }
}

ReactDOM.render(<MainController />, document.getElementById("root"));
