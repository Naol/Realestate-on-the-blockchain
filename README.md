# Decentralized housing product. 


# How to test code

1. To test the ERC721 mintable contract please run - truffle test ./test/TestERC721Mintable.js
 - This files tests and achieves if the contract return total supply
 -  get token balance
 -  return token uri
 -  transfer token from one owner to another
 -  fail when minting when address is not contract owner and 
 -  return contract owner
2. To test the Zokrates generated verifier contract please run - truffle test ./test/TestSquareVerifier.js
 - This files tests and achieves if the verifier successfully verifys correct proof and rejects if incorrect proof is submitted
3. Finally, to test the contract that combines the functionalities of the above two contracts, please run - truffle test ./test/TestSolnSquareVerifier.js


# Deployed contract details

1. Contract Addresses ()
2. Contract Abi for SolnSquareVerifier contract = 



# Project Resources

* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin ](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)
