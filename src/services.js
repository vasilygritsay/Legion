import blocknativeLogo from './icons/discord-icon.svg'
import blocknativeIcon from './icons/discord-icon.svg'

import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import trezorModule from '@web3-onboard/trezor'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import portisModule from '@web3-onboard/portis'
import magicModule from '@web3-onboard/magic'
import fortmaticModule from '@web3-onboard/fortmatic'
import torusModule from '@web3-onboard/torus'
import keepkeyModule from '@web3-onboard/keepkey'
import gnosisModule from '@web3-onboard/gnosis'
import web3authModule from '@web3-onboard/web3auth'

// Replace with your DApp's Infura ID
const INFURA_ID = `${process.env.REACT_APP_INFURA_KEY}`;

const dappId = `${process.env.REACT_APP_DAPP_ID}`;

const injected = injectedModule()
const coinbase = coinbaseModule()
const walletConnect = walletConnectModule()

export const initWeb3Onboard = init({
  wallets: [
    injected,
    coinbase,
    walletConnect,
  ],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`
    },
  ],
  appMetadata: {
    name: 'Test dApp ETH',
    icon: blocknativeIcon,
    logo: blocknativeLogo,
    description: 'minting dApp test ETH',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ],

  },
  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: true,
      minimal: false
    }
  },
  // example customizing copy
  i18n: {
    en: {
     
     
    }
  },
  apiKey: dappId,
  notify: {
    enabled: true,
    position: 'bottomRight',
    transactionHandler: transaction => {
      console.log({ transaction })
      if (transaction.eventCode === 'txPool') {
        return {
          // autoDismiss set to zero will persist the notification until the user excuses it
          autoDismiss: 0,
          // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
          // or you could use onClick for when someone clicks on the notification itself
          onClick: () =>
            window.open(`https://rinkeby.etherscan.io/tx/${transaction.hash}`)
        }
      }
    }
  }
})
