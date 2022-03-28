import { utils, Wallet } from "zksync-web3"
import * as ethers from "ethers"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { Deployer } from "@matterlabs/hardhat-zksync-deploy"

// This deploy script will deploy and call hello-world contract
export default async function (hre: HardhatRuntimeEnvironment) {
    console.log("......")

    // Setup wallet
    const wallet = new Wallet("secret-key")

    // Setup deployer object and artifacts of the hello-world contract
    const deployer = new Deployer(hre, wallet)
    const artifact = await deployer.loadArtifact("Greeter")

    // Deposit some eth to perform L2 txs
    const testEth = ethers.utils.parseEther("0.001")
    const depositHandle = await deployer.zkWallet.deposit({
        to: deployer.zkWallet.address,
        token: utils.ETH_ADDRESS,
        amount: testEth,
    })
    depositHandle.wait()

    // Deploy hello-world
    const greeting = "Hello, world on the blockchain!"
    const greeterContract = await deployer.deploy(artifact, [greeting])

    // Contract info
    const contractAddress = greeterContract.address
    console.log(`${artifact.contractName} deployed to ${contractAddress}`)
}