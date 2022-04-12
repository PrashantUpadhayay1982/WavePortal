const main = async() => {
    const [deployer] = await hre.ethers.getSigners();
    const AccountBalance = await deployer.getBalance();

    console.log("Deploying Contract with Account: ", deployer.address);
    console.log("Account Balance: ", AccountBalance);

    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1"),
    });
    await waveContract.deployed();

    console.log("WavePortal address: ", waveContract.address);
};

const runMain = async() => {
    try{
        await main();
        process.exit(0);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
};

runMain();