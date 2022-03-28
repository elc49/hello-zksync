// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Greeter {
    string private greetings;

    constructor(string memory _greeting) {
        greetings = _greeting;
    }

    function greet() public view returns (string memory) {
        return greetings;
    }

    function setGreetings(string memory _greeting) public {
        greetings = _greeting;
    }
}