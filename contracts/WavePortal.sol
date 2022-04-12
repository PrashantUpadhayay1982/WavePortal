// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal{

    uint256 totalWaves;
    uint256 private seed;
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave{
        address waver;
        string message;
        uint256 timestamp;
    }

    Wave[] waves;

    //This mapping is for associating adress to a number i.e., storing the address 
    //with the last time the user waved at us.
    mapping(address => uint) public lastWavedAt;

    constructor() payable {
        console.log("I am contract. POG.");
        //Set the Initial seed
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {

        //Checking if current timestamp is 15 seconds bigger than the last timestamp we stored.
        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp, 
        "Wait 30 seconds.");
        //Updated with the current timestamp for the user.
        lastWavedAt[msg.sender] = block.timestamp;
        console.log("message sender new timestamp", lastWavedAt[msg.sender]);

        totalWaves += 1;
        console.log("%s waved w/ message %s." , msg.sender, _message);

        waves.push(Wave(msg.sender, _message, block.timestamp));

        //Generate new seed for the next user that sends wave.
        seed = (block.difficulty + block.timestamp + seed) % 100;
        console.log("Random # generated: %d", seed);

        //Give 50% change that user wins the prize.
        if(seed <= 50){
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance, "Trying to withdraw more money than contract has.");

            (bool success,) = (msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to withdraw money from contract.");
        }

        emit NewWave(msg.sender, block.timestamp, _message);
    }

    function getAllWaves() public view returns(Wave[] memory){
        return waves;
    }

    function getTotalWaves() public view returns(uint256){
        console.log("We have total %d waves", totalWaves);
        return totalWaves;
    }

    
}