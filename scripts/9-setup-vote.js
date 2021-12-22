import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is our governance contract.Insert vote module address
const voteModule = sdk.getVoteModule(
  "0x90013F6833A31989585679f0b19C77E87b639bB1",
);

// This is our ERC-20 contract.Insert token module address
const tokenModule = sdk.getTokenModule(
  "0xA4A241655BFcBB27955E6a3D4Ee30A1e7b583c79",
);

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 40% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent40 = ownedAmount.div(100).mul(40);

    // Transfer 40% of the supply to our voting contract.
    await tokenModule.transfer(
      voteModule.address,
      percent40
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();
