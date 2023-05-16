// Import Web3 library and initialize the contract
const web3 = new Web3(new Web3.providers.HttpProvider('https://your-celo-node-url'));
const contractAddress = '0x...'; // Replace with your smart contract address
const contractABI = [/* Replace with your contract's ABI */];
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to send a message to the smart contract
async function sendMessage() {
  const message = document.getElementById('inputText').value;

  // Send the message to the smart contract
  await contract.methods.sendMessage(message).send({ from: web3.eth.defaultAccount });

  // Clear the input field
  document.getElementById('inputText').value = '';
 
  // Refresh the messages
  fetchMessages();
}

// Function to fetch and display the messages from the smart contract
async function fetchMessages() {
  const messagesDiv = document.getElementById('messages');

  // Clear existing messages
  messagesDiv.innerHTML = '';

  // Get the number of messages stored in the smart contract
  const messageCount = await contract.methods.getMessageCount().call();

  // Fetch each message and display it
  for (let i = 0; i < messageCount; i++) {
    const message = await contract.methods.messages(i).call();
    messagesDiv.innerHTML += `<p>${message}</p>`;
  }
}

// Set the default account for transactions
web3.eth.getAccounts().then(accounts => {
  web3.eth.defaultAccount = accounts[0];
});

// Fetch messages when the page loads
fetchMessages();
