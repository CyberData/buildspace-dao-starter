import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0xb06795f56C2499A4D0C9d4424104b1bad3d3062b",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "CoderDAO NFT",
        description: "This NFT will give you access to CoderDAO!",
        image: readFileSync("scripts/assets/NFT.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()
