const ContractKit = require('@celo/contractkit');
const Web3 = require('web3');

async function deployContract() {
  // Connect to the Celo network
  const web3 = new Web3('<CELO_NETWORK_URL>');
  const kit = ContractKit.newKitFromWeb3(web3);

  // Set the account to deploy the contract
  const privateKey = '<PRIVATE_KEY>';
  const account = web3.eth.accounts.privateKeyToAccount(privateKey);
  kit.connection.addAccount(account.privateKey);

  try {
    // Deploy the contract
    const SimpleDappContract = require('<PATH_TO_COMPILED_CONTRACT_JSON>');
    const contract = new web3.eth.Contract(SimpleDappContract.abi);

    const contractDeploy = contract.deploy({
      data: SimpleDappContract.bytecode,
    });

    const gas = await contractDeploy.estimateGas();
    const transaction = contractDeploy.send({ from: account.address, gas });

    const deployedContract = await transaction;
    console.log('Contract deployed:', deployedContract.options.address);
  } catch (error) {
    console.error('Contract deployment failed:', error);
  }
}

deployContract();
