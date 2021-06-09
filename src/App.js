import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import Token from './artifacts/contracts/Token.sol/Token.json';
import './index.css';
import logo from '../src/assets/giphy.gif'



const tokenAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function App() {

  const [userAccount, setUserAccount] = useState('');
  const [amount, setAmount] = useState(0);

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }


  async function getBalance() {
    if (typeof window.ethereum !== 'undefined') {
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);
      console.log("Balance: ", balance.toString());

    }
  }

  function checkState(){
    const state = window.ethereum.isConnected();

    console.log(state);
  }

  async function sendCoins() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.transfer(userAccount, amount);
      await transaction.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  }


  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} alt="loading..." class="w-40 mb-8"/>
        <div class="flex">
          <div class="p-20 flex flex-col container bg-gray-100 items-center m-2 rounded-lg">
            <input class="rounded m-1 text-gray-700" onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
            <input type="number" class="rounded text-gray-700	" 
              onChange={e => setAmount(e.target.value)} placeholder="Amount" />
                          <button class="bg-white text-gray-700 m-2 rounded-lg p-1.5 mt-8" onClick={getBalance}>Get Balance</button>
            <button class="bg-white text-gray-700 m-2 rounded-lg p-1.5" onClick={sendCoins}>Send Coins</button>
            <button class="bg-white text-gray-700 m-2 rounded-lg p-1.5" onClick={getOperation}>Test</button>
          </div>
        </div>

      </header>


    </div>
  );
}

export default App;
