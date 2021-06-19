var ERC721MintableComplete = artifacts.require('ERC721MintableComplete');

contract('TestERC721Mintable', accounts => {

    const account1 = accounts[0];
    const account2 = accounts[1];
    const account3 = accounts[2];


    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new('Naol Token','NTK',{from: account1});

            await this.contract.mint(account1, 10, { from: account1 });
			await this.contract.mint(account2, 20, { from: account1 });
			await this.contract.mint(account3, 60, { from: account1 });
			await this.contract.mint(account3, 50, { from: account1 });

            // TODO: mint multiple tokens

        })

        it('should return total supply', async function () { 
            const total = await this.contract.totalSupply.call();
			assert.equal(parseInt(total), 4, "Total supply in not correct");
        })

        it('should get token balance', async function () { 
            const balance1 = await this.contract.balanceOf(account1);
			assert.equal(balance1, 1, "Balance is not correct");
			const balance2 = await this.contract.balanceOf(account2);
			assert.equal(balance2, 1, "Balance is not correct");
			const balance3 = await this.contract.balanceOf(account3);
			assert.equal(balance3, 2, "Balance is not correct");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let val = await this.contract.getTokenURI(50);
            assert(
				(val) ==
				"https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/50"
				, "TokenURI is incorrect");
        })

        it('should transfer token from one owner to another', async function () { 
            const tokenId = 20;
			const before = await this.contract.ownerOf(tokenId);

			await this.contract.transferFrom(account2, account3, tokenId, { from: account2 });
			const after = await this.contract.ownerOf(tokenId);

			assert(before == account2);
			assert(after == account3);
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721MintableComplete.new('Naol Token','NTK',{from: account1});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let c_error = false; 
			try {
				await this.contract.mint(account_two, 1, { from: account_two });
			} catch (error) {
                c_error = true;
            }
            assert.equal(c_error,true,"Minter isnt contract owner")
        })

        it('should return contract owner', async function () { 
            this.contract = await ERC721MintableComplete.new("Ribas Token", "RTK", { from: account1 });
			const owner = await this.contract.owner();

			assert(owner == account1, "Owner is not correct");
        })

    });
})