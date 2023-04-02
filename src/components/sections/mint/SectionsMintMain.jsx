import React, { useEffect, useState } from 'react'
import { ReactComponent as LeafIcon } from '../../../assets/svg/leaf.svg'
import CButton from '../../ui/CButton'
import {
  useConnectWallet,
  useNotifications,
  useSetChain,
  useWallets
} from '@web3-onboard/react'
import classNames from 'classnames'
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui'
import NumberInput from '../../ui/NumberInput'
import Box from '@mui/material/Box'
import LinearProgressWithLabel from '../../common/LinearProgressWithLabel'
import { initWeb3Onboard } from '../../../services'
import addressesWL from '../../../whitelist.json'
import { isAddress, keccak256 } from 'ethers/lib/utils'
import { MerkleTree } from 'merkletreejs'
import { ethers } from 'ethers'
import contractabi from '../../../contracts/artifacts/contractabi.json'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
const NFTcontractAddress = '0x7247248F8684c142dbb96C7a78aD6e3Ba875E46E'
function SectionsMintMain({ className }) {
  const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] =
    useConnectWallet()
  const [notifications, customNotification, updateNotify] = useNotifications()
  const connectedWallets = useWallets()
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [web3Onboard, setWeb3Onboard] = useState(null)
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain()
  const [error, setError] = useState('')
  const [errCode, setErrCode] = useState(0)
  const [data, setData] = useState({})
  const [WL, setWL] = useState(false)
  const [WLb, setWLb] = useState(false)
  const [addresswl, setAddresswl] = useState('')
  const [checkedWL, setCheckedWL] = useState(false)
  const [validWL, setValidWL] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [creditquantity, setCreditQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const [accountCenterPosition, setAccountCenterPosition] = useState('topRight')
  const [notifyPosition, setNotifyPosition] = useState('bottomRight')
  const [locale, setLocale] = useState('en')
  const [accountCenterSize, setAccountCenterSize] = useState('normal')
  const [accountCenterExpanded, setAccountCenterExpanded] = useState(false)
  const navigate = useNavigate()

  const [progress, setProgress] = React.useState(10)

  useEffect(() => {
    setWeb3Onboard(initWeb3Onboard)
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
    if (connectedWallets.length != 0) {
      fetchData()
      checkWL()
    }
  }, [connectedWallets])

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem('connectedWallets')
    )

    if (previouslyConnectedWallets?.length) {
      async function setWalletFromLocalStorage() {
        await connect({
          autoSelect: previouslyConnectedWallets[0],
          disableModals: true
        })
      }
      setWalletFromLocalStorage()
    }
  }, [web3Onboard, connect])

  async function checkWL() {
    const { MerkleTree } = require('merkletreejs')
    const leaves = addressesWL.map(x => keccak256(x))
    const tree = new MerkleTree(leaves, keccak256, { sort: true })
    const root = tree.getHexRoot()
    const leaf = keccak256(connectedWallets[0]['accounts'][0]['address'])
    const proof = tree.getHexProof(leaf)
    try {
      if (tree.verify(proof, leaf, root)) setWL(true)
      else setWL(false)
    } catch (err) {
      setError(err.message)
    }
  }

  async function checkWLbutton() {
    setValidWL(false)
    console.log(web3Onboard)
    if (isAddress(addresswl)) {
      const { MerkleTree } = require('merkletreejs')
      const leaves = addressesWL.map(x => keccak256(x))
      const tree = new MerkleTree(leaves, keccak256, { sort: true })
      const root = tree.getHexRoot()
      const leaf = keccak256(addresswl)
      const proof = tree.getHexProof(leaf)
      try {
        if (tree.verify(proof, leaf, root)) setWLb(true)
        else setWLb(false)

        setCheckedWL(true)
        setValidWL(true)
      } catch (err) {
        console.log('Invalid address')
      }
    } else {
      setCheckedWL(true)
      console.log('Invalid address')
    }
  }

  async function fetchData() {
    const provider = new ethers.providers.Web3Provider(
      connectedWallets[0].provider,
      'any'
    )
    const contract = new ethers.Contract(
      NFTcontractAddress,
      contractabi.abi,
      provider
    )

    try {
      let cost

      const totalSupply = await contract.totalSupply()
      const step = await contract.sellingStep()

      if (step == 1) {
        cost = await contract.wlSalePrice()
      }
      if (step == 2) {
        cost = await contract.publicSalePrice()
      }
      const object = {
        cost: String(cost),
        totalSupply: String(totalSupply),
        step: String(step)
      }
      console.log(object)
      setData(object)
      setLoading(false)
      navigate('/thanks')
    } catch (err) {
      setError(err)
    }
  }
  async function whitelistmint() {
    const provider = new ethers.providers.Web3Provider(
      connectedWallets[0].provider,
      'any'
    )
    const signer = provider.getSigner()
    const { MerkleTree } = require('merkletreejs')
    const contract = new ethers.Contract(
      NFTcontractAddress,
      contractabi.abi,
      signer
    )
    const leaves = addressesWL.map(x => keccak256(x))
    const tree = new MerkleTree(leaves, keccak256, { sort: true })
    const root = tree.getHexRoot()
    const leaf = keccak256(connectedWallets[0]['accounts'][0]['address'])
    const proof = tree.getHexProof(leaf)

    try {
      let overrides = {
        from: connectedWallets[0]['accounts'][0]['address'],
        value: String(data.cost * quantity)
      }
      const transaction = await contract.whitelistMint(
        connectedWallets[0]['accounts'][0]['address'],
        quantity,
        proof,
        overrides
      )
      await transaction.wait()
      fetchData()
    } catch (err) {
      setError(err)
      handleError(err)
    }
  }

  const handleConnect = async () => {
    connect()
      .then(console.log(connectedWallets))
      .catch(e => console.Console.log(e))
  }
  async function mint() {
    const provider = new ethers.providers.Web3Provider(
      connectedWallets[0].provider,
      'any'
    )
    const signer = provider.getSigner()
    const contract = new ethers.Contract(
      NFTcontractAddress,
      contractabi.abi,
      signer
    )
    try {
      let overrides = {
        from: connectedWallets[0]['accounts'][0]['address'],
        value: String(data.cost * quantity)
      }
      const transaction = await contract.publicSaleMint(
        connectedWallets[0]['accounts'][0]['address'],
        quantity,
        overrides
      )
      await transaction.wait()
      fetchData()
    } catch (err) {
      setError(err)
      handleError(err)
    }
  }

  async function handleError(err) {
    if (
      err.message?.includes('Max per wallet') ||
      err.data?.message?.includes('Max per wallet')
    ) {
      console.log('You are trying to mint more than the allowed amount.')
      setErrCode(2)
      handleShow()
    }
    if (
      err.message?.includes('user rejected transaction') ||
      err.data?.message?.includes('user rejected transaction')
    ) {
      console.log('User denied the transaction signature.')
      setErrCode(1)
      handleShow()
    }
    if (
      err.message?.includes('insufficient funds') ||
      err.data?.message?.includes('insufficient funds')
    ) {
      console.log('Insufficient funds')
      setErrCode(3)
      handleShow()
    }
  }

  function valueUpWL() {
    if (quantity < 150) {
      setQuantity(quantity + 1)
    }
  }
  function valueUp() {
    if (quantity < 150) {
      setQuantity(quantity + 1)
    }
  }
  function valueDown() {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const switchNetworkPOLYGON = async () => {
    await setChain({ chainId: '0x89' })
  }

  return (
    <section className={classNames(className, 'sections-mint-main')}>
      <div className="sections-mint-main__content">
        <div className="sections-mint-main__container">
          <div className="sections-mint-main__title">
            <span className="sections-mint-main__font sections-mint-main__font--title">
              Legion Universe
            </span>
          </div>
          <div className="sections-mint-main__buttons">
            {!wallet && (
              <CButton
                className="sections-mint-main__button sections-mint-main__button--connect"
                theme="primary"
                withLines
                onClick={handleConnect}
              >
                <span className="sections-mint-main__font sections-mint-main__font--connect">
                  Connect Wallet
                </span>
              </CButton>
            )}
            {wallet && connectedChain.id == '0x89' && loading && (
              <div className="sections-mint-main__loading">
                <span className="sections-mint-main__font sections-mint-main__font--loading">
                  Loading...
                </span>
              </div>
            )}
            {wallet && connectedChain.id !== '0x89' && (
              <CButton
                className="sections-mint-main__button sections-mint-main__button--polygon"
                theme="bordered"
                onClick={switchNetworkPOLYGON}
                iconLeft={
                  <img
                    src="/assets/polygon.svg"
                    className="sections-mint-main__icon sections-mint-main__icon--polygon"
                    alt=""
                  />
                }
              >
                <div className="sections-mint-main__text">
                  <span className="sections-mint-main__font sections-mint-main__font--text">
                    Switch to Polygon Network
                  </span>
                </div>
              </CButton>
            )}

            {!loading && wallet && connectedChain.id == '0x89' && (
              <div className="minting">
                {data.step != 0 && data.step != null ? (
                  <>
                    <div className="cost">
                      <div className="sections-mint-main__price">
                        <span className="sections-mint-main__font sections-mint-main__font--accent">
                          Price:
                        </span>
                      </div>
                      <div className="sections-mint-main__price-amount">
                        <span className="sections-mint-main__font sections-mint-main__font--loading">
                          {data.cost / 10 ** 18} MATIC
                        </span>
                      </div>
                    </div>

                    <div className="progress">
                      <div className="sections-mint-main__minted">
                        <span className="sections-mint-main__font sections-mint-main__font--accent">
                          Total minted &nbsp;({data.totalSupply} / 10000) -{' '}
                          {Math.round((data.totalSupply * 100) / 10000) + '%'}
                        </span>
                      </div>
                      <LinearProgressWithLabel
                        value={(data.totalSupply * 100) / 10000}
                      />
                    </div>
                  </>
                ) : (
                  <div className="sections-mint-main__text">
                    <span className="sections-mint-main__font sections-mint-main__font--accent">
                      Sale has not started yet.
                    </span>
                  </div>
                )}

                {data.step == 1 && WL ? (
                  <div>
                    <NumberInput
                      className="sections-mint-main__input"
                      value={quantity}
                      setValue={setQuantity}
                    >
                      <span className="sections-mint-main__font sections-mint-main__font--text">
                        Quantity
                      </span>
                    </NumberInput>
                    <CButton
                      className="sections-mint-main__button sections-mint-main__button--mint"
                      theme="primary"
                      withLines
                      onClick={whitelistmint}
                    >
                      <span className="sections-mint-main__font sections-mint-main__font--connect">
                        MINT
                      </span>
                    </CButton>
                  </div>
                ) : (
                  <div></div>
                )}
                {data.step == 1 && !WL ? (
                  <div className="sections-mint-main__text">
                    <span className="sections-mint-main__font sections-mint-main__font--accent">
                      You are not whitelisted.
                    </span>
                  </div>
                ) : (
                  <div></div>
                )}
                {data.step == 2 && (
                  <div>
                    <NumberInput
                      className="sections-mint-main__input"
                      value={quantity}
                      setValue={setQuantity}
                    >
                      <span className="sections-mint-main__font sections-mint-main__font--text">
                        Quantity
                      </span>
                    </NumberInput>
                    <CButton
                      className="sections-mint-main__button sections-mint-main__button--mint"
                      theme="primary"
                      withLines
                      onClick={mint}
                    >
                      <span className="sections-mint-main__font sections-mint-main__font--connect">
                        MINT
                      </span>
                    </CButton>
                  </div>
                )}
              </div>
            )}

            <CrossmintPayButton
              className="sections-mint-main__button sections-mint-main__button--buy"
              clientId="0e39997d-cea7-46e8-9703-e0f34d879fb6"
              mintConfig={{
                type: 'erc-721',
                totalPrice: String(80 * creditquantity),
                _quantity: creditquantity
              }}
            />
            <NumberInput
              className="sections-mint-main__input"
              value={creditquantity}
              setValue={setCreditQuantity}
            >
              <span className="sections-mint-main__font sections-mint-main__font--text">
                Credit card quantity
              </span>
            </NumberInput>

            {errCode == 1 && (
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  You rejected the transaction. Try minting again.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
            {errCode == 2 && (
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  You are trying to mint more than the allocated amount for your
                  wallet during this sale.
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
            {errCode == 3 && (
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>Not enough funds.</Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        </div>
      </div>
      <img
        className="sections-mint-main__card"
        src="/images/cards/main.jpg"
        alt="card"
      />
    </section>
  )
}
export default SectionsMintMain
