import React, { Component } from "react";
import Layout from "./Layout";
import Map from "./Map";
import Confirm from "./Confirm";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class Passenger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "map",
      currLat: 0,
      currLng: 0,
      destLat: 0,
      destLng: 0,
    };
  }

  render() {
    return (
      <div>
        <Map />
      </div>
    );
  }
}

export default Passenger;
