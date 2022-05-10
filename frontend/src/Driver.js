import React, { Component } from "react";
import Layout from "./Layout";
import web3 from "./web3";
import factory from "./factory";
import Factory from "./contracts/Factory.json";
        

import { Button, Card, Image } from 'semantic-ui-react'
        


class Driver extends Component {

  // async componentDidMount(){
  //   try {
  //     const accounts = await web3.eth.getAccounts();
  //     const address = await factory.methods.rideAddress().call()

  //     const ride = new web3.eth.Contract(
  //       Factory.abi,
  //       address
  //     );
  //     await 
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  render() {
    return (
      <div>


  <Card.Group>
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          
        />
        <Card.Header>Steve Sanders</Card.Header>
        <Card.Meta>Driver of Maxi-Taxi</Card.Meta>
        <Card.Description>
          Steve : Do you want to accept the ride?
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green'>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
    
   
  </Card.Group>
)
      </div>
    );
  }
}

export default Driver;
