import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from "react-google-autocomplete";
import { Descriptions } from "antd";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

import factory from "./factory";
import web3 from "./web3";

Geocode.setApiKey("AIzaSyBbFwpFKFzIJc9t3IBQvyErwONVc-kY1qE");
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 100000,
      view: "map",
      loading: false,
      address: "",
      city: "",
      area: "",
      state: "",
      zoom: 15,
      height: 400,
      startPos: {
        lat: 0,
        lng: 0,
      },
      mapPosition: {
        lat: 0,
        lng: 0,
      },
      markerPosition: {
        lat: 0,
        lng: 0,
      },
    };
    // this.handleClick = this.handleClick.bind(this);
    this.click = this.click.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState(
          {
            startPos: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            mapPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            markerPosition: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          },
          () => {
            Geocode.fromLatLng(
              position.coords.latitude,
              position.coords.longitude
            ).then(
              (response) => {
                console.log(response);
                const address = response.results[0].formatted_address,
                  addressArray = response.results[0].address_components,
                  city = this.getCity(addressArray),
                  area = this.getArea(addressArray),
                  state = this.getState(addressArray);
                console.log("city", city, area, state);
                this.setState({
                  address: address ? address : "",
                  area: area ? area : "",
                  city: city ? city : "",
                  state: state ? state : "",
                });
              },
              (error) => {
                console.error(error);
              }
            );
          }
        );
      });
    } else {
      console.error("Geolocation is not supported by this browser!");
    }
  }

  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat();
    let newLng = event.latLng.lng();
    console.log(newLat, newLng);
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        console.log(response);
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
          markerPosition: {
            lat: newLat,
            lng: newLng,
          },
          mapPosition: {
            lat: newLat,
            lng: newLng,
          },
        });
      },
      (error) => {
        console.error(error);
      }
    );
  };

  onPlaceSelected = (place) => {
    console.log("plc", place);
    const address = place.formatted_address,
      addressArray = place.address_components,
      city = this.getCity(addressArray),
      area = this.getArea(addressArray),
      state = this.getState(addressArray),
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

    console.log("latvalue", latValue);
    console.log("lngValue", lngValue);
    this.setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });
  };

  handleClick(e) {
    e.preventDefault();
    this.props.getData(
      this.state.startPos.lat,
      this.state.startPos.lng,
      this.state.markerPosition.lat,
      this.state.markerPosition.lng
    );
  }
  async deployRide() {
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createRide(
          this.state.amount,
          this.state.startPos.lat,
          this.state.startPos.lng,
          this.state.markerPosition.lat,
          this.state.markerPosition.lng
        )
        .send({ from: accounts[0] });
    } catch (err) {
      console.log(err);
    }
  }
  haversine() {
    const R = 6371e3; // metres
    const lat1 = this.state.startPos.lat;
    const lon1 = this.state.startPos.lng;
    const lat2 = this.state.markerPosition.lat;
    const lon2 = this.state.markerPosition.lng;
    const φ1 = (this.state.startPos.lat * Math.PI) / 180; // φ, λ in radians
    const φ2 = (this.state.markerPosition.lat * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // in metres
    return d;
  }
  click() {
    // alert(
    //   `Your destination is: ${
    //     this.state.address
    //   }\nYour Total Fare: ${3123472} Wei\n Click Ok to confirm or exit `
    // );
    this.deployRide();
  }
  render() {
    const MapWithAMarker = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          defaultZoom={13}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          <Marker
            draggable={false}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.startPos.lat,
              lng: this.state.startPos.lng,
            }}
          >
            <InfoWindow>
              <div>Current Location</div>
            </InfoWindow>
          </Marker>
          <Marker
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          >
            {this.state.startPos.lat == this.state.mapPosition.lat ? (
              ""
            ) : (
              <InfoWindow>
                <div>{this.state.address}</div>
              </InfoWindow>
            )}
          </Marker>

          <Autocomplete
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "2rem",
            }}
            onPlaceSelected={this.onPlaceSelected}
            types={["(regions)"]}
          />
        </GoogleMap>
      ))
    );
    return (
      <div>
        {this.state.view === "map" ? (
          <div style={{ padding: "1rem", margin: "0 auto", maxWidth: 1000 }}>
            <Descriptions bordered>
              <Descriptions.Item label="City">
                {this.state.city}
              </Descriptions.Item>
              <Descriptions.Item label="Area">
                {this.state.area}
              </Descriptions.Item>
              <Descriptions.Item label="State">
                {this.state.state}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {this.state.address}
              </Descriptions.Item>
            </Descriptions>

            <MapWithAMarker
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBbFwpFKFzIJc9t3IBQvyErwONVc-kY1qE&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `400px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />

            <Button
              primary
              style={{ margin: "auto", marginTop: "50px" }}
              onClick={this.click}
            >
              Confirm Destination
            </Button>
          </div>
        ) : (
          <h3>Hey</h3>
        )}
      </div>
    );
  }
}

export default Map;
