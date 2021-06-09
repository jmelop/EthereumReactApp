//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

// @ts-ignore
import "hardhat/console.sol";

contract Token {
    string public name = "Juan Melo Token";
    string public symbol = "JMT";
    uint256 public totalSupply = 1000000;
    address public owner;
    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
