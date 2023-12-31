import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [gasUsed, setGas] = useState();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    async function getGasUsed() {
      const response = (await alchemy.core.getBlock(blockNumber)).gasUsed._hex;
      setGas(parseInt(response));
    }

    async function getTransactions() {
      const tx = ((await alchemy.core.getBlock(blockNumber)).transactions);
      setTransactions(tx);
    }

    getBlockNumber();
    getGasUsed();
    getTransactions();
  });

  return <div className="App">
    <p>Block Number: {blockNumber}</p>
    <p>Gas used : {gasUsed}</p>
    <p>Transaction Count : {transactions.length}</p>
    <ul>
      <li>
        {transactions.map((item) => {
          return item + "\n";
        })}
      </li>
    </ul>
  </div>;
}

export default App;
