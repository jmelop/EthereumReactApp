import { Component, useState } from 'react';
import { ethers, providers } from 'ethers';
import './App.css';
import Token from './artifacts/contracts/Token.sol/Token.json';
import './index.css';
import logo from '../src/assets/giphy.gif'
import Web3 from 'web3'

const tokenAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

function App() {

  const [userAccount, setUserAccount] = useState('');
  const [amount, setAmount] = useState(0);
  var wallet = '';
/*   var success = false;
  var error = false; */
  getTypeWallet();


  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  function getTypeWallet() {
    if (typeof window.web3 === 'undefined') {
      console.log('Error, please install MetaMask, Trust or Coinbase wallet');
    } else if (window.web3.currentProvider.isMetaMask) {
      wallet = 'MetaMask';
      console.log('MetaMask');
    } else if (window.web3.currentProvider.isTrust) {
      wallet = 'Trust;'
      console.log('Trust');
    } else if (window.web3.currentProvider.isToshi) {
      wallet = 'CoinBase';
      console.log('CoinBase');
    }
  }

  async function getWalletInfo() {
    if (wallet) {
      try {
        const account = await window.ethereum.request({ method: 'eth_accounts' });
        if (account.length === 0) {
          console.log('Error, not able to get accounts')
        } else {
          console.log(account);
        }
      } catch (error) {
        console.error(error)
      }
    }
  }


  async function getBalance() {
    if (wallet) {
      const web3 = new Web3(window.ethereum);
      const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider)
      const balance = await contract.balanceOf(account);

      web3.eth.getBalance(account).then(balance => {
        let balanceFormatted = balance.toString();
        balanceFormatted = balanceFormatted.slice(0, -12);
        console.log('Balance ETH: ' + balanceFormatted.toString());
        alert('Balance ETH: ' + balanceFormatted.toString());
      });

      console.log("Balance: JMT" + balance.toString());
      alert("Balance JMT: " + balance.toString());
    }
  }


  async function findRandomNumber() {
    if (wallet) {
      const secretAddress = process.env.REACT_APP_CLUB_ADDRESS;
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transaction = await contract.guessNumber(secretAddress, 23);

      await transaction.wait().then(data => {
        if (typeof data !== 'undefined') {
          console.log(data);
          console.log('Su número elegido fue: '+convertHexToDec(data.events[0].args.solution._hex));
          console.log('Su número aleatorio fue: '+convertHexToDec(data.events[0].args.randomNumber._hex));
          console.log('El costo de la operación fue : '+convertHexToDec(data.events[0].args.solution._hex) + ' JMT');
          console.log('La prueba fue superada : '+data.events[0].args.state);
          console.log(`Operacion realizada correctamente a la cuenta ${secretAddress}`);
        }
      }).catch((err) => (console.log(err)))
    }
  }

  function convertHexToDec(hexNumber){
    let decNumber = 0;
    decNumber = parseInt(hexNumber, 16);

    return decNumber;
  }

  async function sendCoins() {
    if (wallet) {
      await requestAccount();
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
        <img src={logo} alt="loading..." class="w-40 mb-8" />
        <p>Type of wallet: {wallet}</p>
{/*         { error ? <p class="text-gray-800" >No acerto!</p> : null }
        { success ? <p class="text-gray-800">Si acerto!</p> : null } */}
        <div class="flex">
          <div class="p-20 flex flex-col container bg-gray-100 items-center m-2 rounded-lg">
            <input class="rounded m-1 text-gray-700" onChange={e => setUserAccount(e.target.value)} placeholder="Account ID" />
            <input type="number" class="rounded text-gray-700	"
              onChange={e => setAmount(e.target.value)} placeholder="Amount" />
            <button class="bg-white text-gray-700 m-2 rounded-lg p-1.5 mt-8" onClick={getBalance}>Get Balance</button>
            <button class="bg-white text-gray-700 m-2 rounded-lg p-1.5" onClick={sendCoins}>Send Coins</button>
            <button class="bg-white text-gray-700 m-2 rounded-lg p-1.5" onClick={getWalletInfo}>Get Wallet Info</button>
            <button class="bg-white text-gray-700 m-2 rounded-lg p-1.5" onClick={findRandomNumber}>Math Problem</button>
          </div>
        </div>

      </header>


    </div>
  );
}




export default App;
