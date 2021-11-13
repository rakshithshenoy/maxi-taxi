import "./App.css";
import React from "react";
import Map from "./Map";
import Layout from "./Layout";
import { Route, Routes, Switch } from "react-router";
import Passenger from "./Passenger";
import Driver from "./Driver";
import { Menu } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "passenger",
    };
    this.handleDriverClick = this.handleDriverClick.bind(this);
    this.handleDriverClick = this.handlePassengerClick.bind(this);
  }

  handlePassengerClick(e) {
    e.preventDefault();
    this.setState({ view: "passenger" });
  }
  handleDriverClick(e) {
    e.preventDefault();
    this.setState({ view: "driver" });
  }
  render() {
    return (
      <div>
        <Menu>
          <Menu.Item name="maxi" content="maxi-taxi" />

          <Menu.Item
            name="passenger"
            active={this.state.view == "passenger"}
            content="passenger"
            onClick={this.handlePassengerClick}
          />
          <Menu.Item
            name="driver"
            active={this.state.view == "driver"}
            content="driver"
            onClick={this.handleDriverClick}
          />
        </Menu>
        {this.state.view === "passenger" ? <Passenger /> : <Driver />}
      </div>
    );
  }
}

export default App;
