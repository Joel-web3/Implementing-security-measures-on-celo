//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MyContract {

    address private owner;

    uint256 private value;

    constructor(uint256 _value) {

        owner = msg.sender;

        value = _value;

    }

    modifier onlyOwner() {

        require(msg.sender == owner, "Only the owner can perform this action.");

        _;

    }

    function setValue(uint256 _value) public onlyOwner {

        value = _value;

    }

    function getValue() public view returns (uint256) {

        return value;

    }

    function withdraw() public onlyOwner {

        uint256 balance = address(this).balance;

        payable(owner).transfer(balance);

    }

    fallback() external payable {

        revert("Invalid function call.");

    }

    receive() external payable {

        revert("Invalid function call.");

    }

}