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
      passenger: true,
      driver: false,
      driverAccept: false,
      arrivalConfirm: false,
      destination: false,
      payment: false,
    };
    this.handleDriverClick = this.handleDriverClick.bind(this);
    this.handlePassengerClick = this.handlePassengerClick.bind(this);
  }

  handlePassengerClick(e) {
    e.preventDefault();
    this.setState({
      passenger: true,
      driver: false,
      driverAccept: false,
      arrivalConfirl: false,
      destination: false,
      payment: false,
    });
  }
  handleDriverClick(e) {
    e.preventDefault();
    this.setState({
      passenger: false,
      driver: true,
      driverAccept: false,
      arrivalConfirl: false,
      destination: false,
      payment: false,
    });
  }
  render() {
    return (
      <div>
        <Menu>
          <Menu.Item name="maxi" content="maxi-taxi" />

          <Menu.Item
            name="passenger"
            active={this.state.passenger}
            content="passenger"
            onClick={this.handlePassengerClick}
          />
          <Menu.Item
            name="driver"
            active={this.state.driver}
            content="driver"
            onClick={this.handleDriverClick}
          />

          
        </Menu>
        {this.state.passenger ? <Passenger /> : <div></div>}
        {this.state.driver ? <Driver /> : <div></div>}
      </div>
    );
  }
}

export default App;
