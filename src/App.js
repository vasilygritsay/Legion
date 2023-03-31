import React from 'react'
import { Routes, Route, HashRouter as Router, Link } from 'react-router-dom'

import MintPage from './pages/MintPage'
import Resize from './components/layout/Resize'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

function App() {
  return (
    <Resize className="app">
      <Header className="app__header" />

      <MintPage className="app__page" />

      <Footer className="app__footer" />
    </Resize>
  )
}
export default App
