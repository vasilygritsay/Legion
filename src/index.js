import React from 'react'
import ReactDOM from 'react-dom'
import './assets/scss/app.scss'
import Header from './components/layout/Header'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Resize from './components/layout/Resize'
import MintPage from './pages/MintPage'
import Thanks from './pages/Thanks'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MintPage />
  },

  {
    path: '/thanks',
    element: <Thanks />
  }
])

ReactDOM.render(
  <React.StrictMode>
    <Resize className="app">
      <Header className="app__header" />

      <RouterProvider router={router} />

      <Footer className="app__footer" />
    </Resize>
  </React.StrictMode>,
  document.getElementById('root')
)
