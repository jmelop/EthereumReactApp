//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract JMToken is ERC20 {
    constructor() ERC20("Juan Melo Token", "JMT") {
        _mint(msg.sender, 100000 * (10**18));
    }
}

