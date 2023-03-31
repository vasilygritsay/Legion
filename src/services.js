import blocknativeLogo from './icons/logo192.png'
import blocknativeIcon from './icons/logo192.png'

import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import walletConnectModule from '@web3-onboard/walletconnect'


// Replace with your DApp's Infura ID
const ALCHEMY_ID = `${process.env.REACT_APP_ALCHEMY_KEY}`;

const injected = injectedModule()
const walletConnect = walletConnectModule()

export const initWeb3Onboard = init({
  wallets: [
    injected,
    walletConnect
  ],
  chains: [
    {
      id: '0x89',
      token: 'MATIC',
      label: 'Polygon',
      rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${ALCHEMY_ID}`
    }
  ],
  appMetadata: {
    name: 'Legion Universe',
    icon: blocknativeIcon,
    logo: blocknativeLogo,
    description: 'Legion Universe - Mint your NFT',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ],

  },
  accountCenter: {
    desktop: {
      position: 'bottomRight',
      enabled: true,
      minimal: true
    }
  },
  // example customizing copy
  i18n: {
    en: {
     
     
    }
  }
})
