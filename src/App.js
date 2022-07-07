import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { keccak256 } from 'ethers/lib/utils';
import NFTERC721A from './contracts/artifacts/NFTERC721A.json';
import VConsole from 'vconsole'
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import styled from "styled-components";
import { initWeb3Onboard } from './services'
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import {
  useAccountCenter,
  useConnectWallet,
  useNotifications,
  useSetChain,
  useWallets,
  useSetLocale
} from '@web3-onboard/react'
import './App.css'


if (window.innerWidth < 700) {
  new VConsole()
}

let provider

const NFTcontractAddress = "0x47214c4BE373bFE7c24F30B3ae64bb2EA0262b74";

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress sx={{ height: '15px', borderRadius: "30px", background: "#0073ff3b" }} variant="determinate" {...props} />
      </Box>
      <Box sx={{
        minWidth: 35, position: 'absolute', right: `${94 - Math.round(
          props.value,
        )}%`
      }} className="percentage">

        <Typography variant="body2" color="text.secondary" className="perctext">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};



const App = () => {
  const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] =
    useConnectWallet()
  const [notifications, customNotification, updateNotify] = useNotifications()
  const connectedWallets = useWallets()
  const { authenticate, isAuthenticated, isAuthenticating, user, account, logout, Moralis } = useMoralis();
  const serverUrl = "https://hlfkcc6tn1jq.usemoralis.com:2053/server";
  const appId = "3OXf17wq3rxjMGH3Qp9aQgmzQAEew74ro8tNM7Ks";
  Moralis.start({ serverUrl, appId });


  const [web3Onboard, setWeb3Onboard] = useState(null)

  const [error, setError] = useState('');
  const [data, setData] = useState({});
  const [WL, setWL] = useState(0);
  const [quantity, setQuantity] = useState('1');
  const [accountCenterPosition, setAccountCenterPosition] = useState('topRight')
  const [notifyPosition, setNotifyPosition] = useState('bottomRight')
  const [locale, setLocale] = useState('en')
  const [accountCenterSize, setAccountCenterSize] = useState('normal')
  const [accountCenterExpanded, setAccountCenterExpanded] = useState(false)

  const [progress, setProgress] = React.useState(10);
  const Web3Api = useMoralisWeb3Api()


  const fetchNFTsForContract = async () => {
    const options = {
      chain: "eth",
      address: "0x8FD23a46A0a9D5fC16Ea982176CEbfa92dD99C20",
      token_address: "0x47214c4BE373bFE7c24F30B3ae64bb2EA0262b74",
    };
    const ethNFTs = await Web3Api.account.getNFTsForContract(options);
    console.log(ethNFTs.total);
  };

  useEffect(() => {
      fetchNFTsForContract()
  });


  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard);
    Moralis.authenticate({signingMessage:"My custom message"})
  }, [])

  useEffect(() => {
    console.log(notifications)
  }, [notifications])

  useEffect(() => {
    if (!connectedWallets.length) return

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    )
    window.localStorage.setItem(
      'connectedWallets',
      JSON.stringify(connectedWalletsLabelArray)
    )


  }, [connectedWallets, wallet])



  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    )

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({ autoSelect: previouslyConnectedWallets[0] })
      }
      setWalletFromLocalStorage()
    }
  }, [web3Onboard, connect])


  useEffect(() => {
    checkWL();
    fetchData();
  }, []);






  async function checkWL() {
    if (typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const { MerkleTree } = require('merkletreejs');
      const addresses = ["0xDdC6B9f02D6d64Bb92be3b7aE33a0d1ecE830DC0", "0x8FD23a46A0a9D5fC16Ea982176CEbfa92dD99C20"];
      const leaves = addresses.map(x => keccak256(x));
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const root = tree.getHexRoot();
      const leaf = keccak256(accounts[0]);
      const proof = tree.getHexProof(leaf);

      try {
        if (tree.verify(proof, leaf, root))
          setWL(1);
        else setWL(0);
      }
      catch (err) {
        setError(err.message);
      }
    }

  }
  async function fetchData() {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(NFTcontractAddress, NFTERC721A.abi, provider);

      try {
        let cost;

        const totalSupply = await contract.totalSupply();
        const step = await contract.sellingStep();
        if (step == 1)
          cost = await contract.wlSalePrice();
        if (step == 2)
          cost = await contract.publicSalePrice();
        const object = { "cost": String(cost), "totalSupply": String(totalSupply), "step": String(step) }
        setData(object);
      }
      catch (err) {
        setError(err.message);
      }
    }
  }
  async function whitelistmint() {
    if (typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const { MerkleTree } = require('merkletreejs');
      const contract = new ethers.Contract(NFTcontractAddress, NFTERC721A.abi, signer);
      const addresses = ["0xDdC6B9f02D6d64Bb92be3b7aE33a0d1ecE830DC0", "0x8FD23a46A0a9D5fC16Ea982176CEbfa92dD99C20"];
      const leaves = addresses.map(x => keccak256(x));
      const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
      const leaf = keccak256(accounts[0]);

      const proof = tree.getHexProof(leaf);

      try {
        let overrides = {
          from: accounts[0],
          value: data.cost
        }
        const transaction = await contract.whitelistMint(accounts[0], 1, proof, overrides);
        await transaction.wait();
        fetchData();
      }
      catch (err) {
        setError(err.message);
      }
    }
  }
  async function mint() {
    if (typeof window.ethereum !== 'undefined') {
      let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(NFTcontractAddress, NFTERC721A.abi, signer);
      try {
        let overrides = {
          from: accounts[0],
          value: data.cost,
        }
        const transaction = await contract.publicSaleMint(accounts[0], parseInt(quantity), overrides);
        await transaction.wait();
        fetchData();
      }
      catch (err) {
        setError(err.message);
      }
    }
  }
  const handleChange = event => {
    setQuantity(event.target.value);
  };
  function valueUp() {
    let oldValue = parseInt(document.getElementById("quantity").value);
    if (oldValue < 10) {
      document.getElementById("quantity").value = oldValue + 1;
    }
  }
  function valueDown() {
    let oldValue = parseInt(document.getElementById("quantity").value);
    if (oldValue > 1) {
      document.getElementById("quantity").value = oldValue - 1;
    }
  }
  return (
    <main>

      <section className="main">
        <div className="main-content">
          <div className="imageleft">

          </div>
          <div className="container onboard">
            <h2>ETH minting dApp </h2>
            {wallet && (
              <div className="network-select">

              </div>
            )}

            <div>
              {!wallet && (
                <button
                  className="mintbutton"
                  onClick={() => {
                    connect()
                  }}
                >
                  CONNECT
                </button>
              )}
              {wallet && (
                <div className="minting">
                  {error == "MetaMask Tx Signature: User denied transaction signature." && <p>AAA</p>}
                  {error && error.match(/(\d+)/g)[1] == 32603 && <p>Insufficient funds</p>}

                  {error && <p> <br></br>{error}</p>}
                  <div className="cost">
                    <h2>Price</h2>
                    <h3>{data.cost / 10 ** 18} <span>ETH</span></h3>
                  </div>

                  <div className='progress'>
                    <h3 className="minted">Total minted &nbsp;({data.totalSupply} / 30)</h3>
                    <Box sx={{ width: '100%', height: '60px' }}>
                      <LinearProgressWithLabel value={(data.totalSupply * 100 / 30)} />
                    </Box>
                  </div>

                  <br></br>
                  <br></br>


                  {data.step == 1 && WL == 1 ?
                    <div><button className="mintbutton" onClick={whitelistmint}>WL MINT</button></div>
                    : <div></div>
                  }
                  {data.step == 1 && WL == 0 ?
                    <div>
                      <p className="count">You are not whitelisted</p>
                    </div> : <div></div>
                  }
                  {data.step == 2 && <div>
                    <div className='quantitymint'>
                      <h2>Quantity (MAX 10 per Transaction)</h2>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        max="10"
                        step="1"
                        value="1"
                        onChange={handleChange}
                      />
                      <div className="quantitybuttons">
                        <button className="arrowup" onClick={valueUp}>+</button>
                        <button className="arrowdown" onClick={valueDown}>-</button>
                      </div>
                    </div>
                    <button className="mintbutton" onClick={mint}>MINT</button>
                  </div>}
                </div>
              )}
            </div>


          </div>

        </div>

      </section>

    </main>
  )
}

export default App
