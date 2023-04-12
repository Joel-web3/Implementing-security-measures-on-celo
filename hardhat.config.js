const { MnemonicUtils } = require("@celo/wallet-base");

// Generate a new mnemonic phrase

const mnemonic = MnemonicUtils.generateMnemonic();

// Derive a private key from the mnemonic phrase

const privateKey = MnemonicUtils.mnemonicToSeedSync(mnemonic).slice(0, 32);

// Create a new wallet instance using the private key

const wallet = new Wallet(privateKey);

// Use the wallet to sign a transaction

const tx = await wallet.sendTransaction({

  to: "&lt;recipient-address>",

  value: "1000000000000000000",

});

console.log(`Transaction sent: ${tx.hash}`);