// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const zora = "0x6953190AAfD8f8995e8f47e8F014d0dB83E92300"; //mumbai

async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    const TestUSDC = await hre.ethers.getContractFactory("TestUSDC");
    const usdc = await TestUSDC.deploy(usdc);
    await usdc.deployed();
    console.log("tUSDC address : ", usdc.address);

    const Tycoons = await hre.ethers.getContractFactory("ToddlerTycoons");
    const tycoons = await Tycoons.deploy(usdc.address, zora);
    await tycoons.deployed();

    console.log("Tycoons address : ", tycoons.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
