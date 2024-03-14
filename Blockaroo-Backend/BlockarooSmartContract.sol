// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockarooSmartContract {
    address public owner;
    uint256 public tokenId;

    mapping(address => uint256) public balanceOf;
    mapping(uint256 => address) public tokenOwners;
    mapping(uint256 => uint256) public tokenPrices;

    constructor() {
        owner = msg.sender;
        tokenId = 0; // Initialize token ID
    }

    // Modifier to check if the caller is the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can call this function");
        _;
    }

    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    // Function to get the owner of an NFT with a given token ID
    function getOwner(uint256 _tokenId) external view returns (address) {
        require(tokenOwners[_tokenId] != address(0), "Token with given ID does not exist");
        return tokenOwners[_tokenId];
    }

    // Function to get the price of an NFT with a given token ID
    function getPrice(uint256 _tokenId) external view returns (uint256) {
        require(tokenOwners[_tokenId] != address(0), "Token with given ID does not exist");
        return tokenPrices[_tokenId];
    }

    function updatePrice(uint256 _tokenId, uint256 _newPrice) external onlyOwner {
        require(tokenOwners[_tokenId] != address(0), "Token with given ID does not exist");
        tokenPrices[_tokenId] = _newPrice;
    }

    // Function to mint a new NFT with a given price
    function mint(address _to, uint256 _price) external onlyOwner {
        tokenId++; // Increment token ID
        tokenOwners[tokenId] = _to; // Assign ownership
        tokenPrices[tokenId] = _price; // Set the price for the token
        balanceOf[_to]++; // Increase balance of the recipient
    }

// Function to transfer ownership of an NFT with a price requirement
    function transfer(address _from, address _to, uint256 _tokenId) public {
        require(tokenOwners[_tokenId] == _from, "The specified from address does not own this token");

        _transfer(_from, _to, _tokenId);
    }


    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        require(_to != address(0), "Transfer to the zero address");
        require(_to != address(this), "Transfer to the contract itself");

        tokenOwners[_tokenId] = _to;
        balanceOf[_from]--;
        balanceOf[_to]++;

        emit Transfer(_from, _to, _tokenId);
    }
}
