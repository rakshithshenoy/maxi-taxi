//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;







contract Factory {
    mapping(address => bool) public activeRides;
    
    Ride public newRide;
    
    // mapping(string=>driver) public activeDrivers;
    
    struct driver {
        // string hash;
        address payable driver; 
        string lat;
        string lon;
    }
    
    driver public activeDriver;
    address public rideAddress;
    
    
    function createRide(uint _amt, string memory _latDest, string memory _lonDest, string memory _latPick, string memory _lonPick ) public returns (address){
        newRide = new Ride(msg.sender, _amt, _latDest, _lonDest, _latPick, _lonPick);
        activeRides[address(newRide)] = true;
        rideAddress = address(newRide);
        return address(newRide);
    }

    function factoryAddress() public view returns (address) {
        return address(this);
    }
    
    
    
    
    
    
    function createDriver(string memory _lat, string memory _lon) public {
        activeDriver.lat= _lat;
        activeDriver.lon = _lon;
        activeDriver.driver = payable(msg.sender);
    }
    
    // function getActiveDrivers() public returns (driver memory){
    //     return activeDriver;
    // }
}



contract Ride {
    
    address public passenger;
    address payable public driver;
    
    struct RideDetails {
        uint amount;
        string latDest;
        string lonDest;
        string latPick;
        string lonPick;
        bool isApproved;
        bool arrivalConfirmationPassenger;
        bool arrivalConfirmationDriver;
        bool passFinished;
        bool driverFinished;
        bool paid;
    }
    
    RideDetails ride;
    
    constructor(address _passenger, uint _amt, string memory _latDest, string memory _lonDest, string memory _latPick, string memory _lonPick){
        passenger = _passenger;
        ride.amount = _amt;
        ride.latDest = _latDest;
        ride.lonDest = _lonDest;
        ride.lonPick = _latPick;
        ride.lonPick = _lonPick;
        ride.isApproved = false;
        ride.arrivalConfirmationDriver=false;
        ride.arrivalConfirmationDriver = false;
        ride.passFinished = false;
        ride.paid = false;
        
        
    }
    
    function approveRide() public {
        require(msg.sender!= passenger);
        driver = payable(msg.sender);
    }
    
    function driverArrivedDriver() public {
        require(msg.sender == driver);
        ride.arrivalConfirmationDriver = true;
    }
    
    function driverArrivedPassenger() public {
        require(msg.sender == passenger);
        ride.arrivalConfirmationPassenger = true;
    }
    
    function payContract() public payable {
        require(msg.sender == passenger);
        require(msg.value > ride.amount - 1000000 );
        
    }
    function passFinish() public{
        require(msg.sender == passenger);
        require(ride.paid);
        ride.passFinished = true;
        
    }
    function driverFinish() public{
        require(msg.sender == driver);
        ride.driverFinished = true;
        
    }
    
    function payDriver() public payable {
        require(msg.sender ==passenger);
        require(msg.value == ride.amount);
        driver.transfer(address(this).balance);
    }
    
    
}

