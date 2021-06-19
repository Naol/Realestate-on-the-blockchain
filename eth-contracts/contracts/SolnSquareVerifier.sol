pragma solidity >=0.4.21 <0.6.0;

// // TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
import "./Verifier.sol";
import "./ERC721Mintable.sol";


// // TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
// // TODO define a solutions struct that can hold an index & an address
// // TODO define an array of the above struct
// // TODO define a mapping to store unique solutions submitted
// // TODO Create an event to emit when a solution is added
// // TODO Create a function to add the solutions to the array and emit the event
// // TODO Create a function to mint new NFT only after the solution has been verified
// //  - make sure the solution is unique (has not been used before)
// //  - make sure you handle metadata as well as tokenSuplly

contract SolnSquareVerifier is ERC721MintableComplete {
    struct Solution {
        uint256 index;
        address wallet;
    }
    Verifier verifier;
    constructor(string memory name, string memory symbol)
        public
        ERC721MintableComplete(name, symbol)
    {
        verifier = new Verifier();
    }

    Solution[] solutions;

    mapping(bytes32 => Solution) private uniqueSolutions;

    event SolutionAdded(uint256 index, address wallet);
    event TokenMinted(uint256 index, address wallet);

    modifier solutionNotExists(uint256 index, address wallet) {
        bytes32 key = keccak256(abi.encodePacked(index, wallet));
        require(uniqueSolutions[key].wallet == address(0), "Solution already exists");
        _;
    }

    function addSolution(uint256 index, address wallet)
        external
        solutionNotExists(index, wallet)
    {
        Solution memory solution = Solution({index: index, wallet: wallet});
        bytes32 key = keccak256(abi.encodePacked(index, wallet));
        uniqueSolutions[key] = solution;
        solutions.push(solution);
        emit SolutionAdded(index, wallet);
    }

    // Create a function to mint new NFT only after the solution has been verified
    function mintNFT(
        uint256[2] calldata a,
        uint256[2][2] calldata b,
        uint256[2] calldata c,
        uint256[2] calldata inputs,
        uint256 index,
        address wallet
    ) external solutionNotExists(index, wallet) {
        //  - make sure the solution is unique (has not been used before)
        require(
            verifier.verifyTx(a, b, c, inputs),
            "Solution is not verified"
        );
        this.addSolution(index, wallet);
        //  - make sure you handle metadata as well as tokenSuplly
        super._mint(wallet, index);
        emit TokenMinted(index, wallet);

    }
}


























