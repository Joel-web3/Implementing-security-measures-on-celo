// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleDapp {
    string[] private messages;

    event MessageAdded(string message);

    function sendMessage(string memory message) public {
        messages.push(message);
        emit MessageAdded(message);
    }

    function getMessageCount() public view returns (uint256) {
        return messages.length;
    }

    function getMessage(uint256 index) public view returns (string memory) {
        require(index < messages.length, "Invalid index");
        return messages[index];
    }
}
