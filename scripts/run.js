
const main = async() => {
    const[owner, randomPerson] = await hre.ethers.getSigners();
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");

    const waveContract = await waveContractFactory.deploy({
        value: hre.ethers.utils.parseEther("0.1")
    });
    await waveContract.deployed();
    console.log("Contract deployed to waveContract address:", waveContract.address);
    console.log("Contract deployed by:", owner.address);

    //Get Balance
    let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Balance: ", hre.ethers.utils.formatEther(contractBalance));

    //Lets try to wave now.
    let waveCounts;
    waveCounts = await waveContract.getTotalWaves();
    console.log("Total wwaves: ",waveCounts.toNumber());
    
    const waveTxn = await waveContract.wave("A Message");
    await waveTxn.wait();
    
    const waveTxn2 = await waveContract.wave("Another Message");
    await waveTxn2.wait();

    waveCounts = await waveContract.getTotalWaves();
    console.log("Total waves now:",waveCounts.toNumber());

    //Now check balance.
    contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
    console.log("Contract Balance: ", await hre.ethers.utils.formatEther(contractBalance));

    let allWaves = await waveContract.getAllWaves();
    console.log(allWaves);
};

const runMain = async() => {
    try{
        await main();
        process.exit(0); //exit Node process without error.
    }catch(err){
        console.log(err);
        process.exit(1); //exit Node process while indicating 'Uncaught fatal exception' error
    }
};

runMain();