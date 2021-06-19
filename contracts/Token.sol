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

    function generateRandomNumber() public view returns (uint256) {
        uint256 randomNumber =
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.timestamp +
                            block.difficulty +
                            ((
                                uint256(
                                    keccak256(abi.encodePacked(block.gaslimit))
                                )
                            ) / (block.timestamp)) +
                            block.gaslimit +
                            ((
                                uint256(keccak256(abi.encodePacked(msg.sender)))
                            ) / (block.timestamp)) +
                            block.number
                    )
                )
            );

        return (randomNumber - ((randomNumber / 1000) * 1000));
    }

    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function calculateMathProblem(address to, uint256 solution) external {
        uint256 randomNumber = generateRandomNumber();
        require(solution == randomNumber, "Solucion incorrecta!");
        balances[msg.sender] -= 20;
        balances[to] += 20;
        console.log("nice");
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
