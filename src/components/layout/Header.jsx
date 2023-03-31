import React from 'react'
import { Link } from 'react-router-dom'
import CButton from '../ui/CButton'
import routes from '../../constants/routes'
import navigation from '../../config/navigation'
import classNames from 'classnames'

const Header = ({ className }) => {
  return (
    <header className={classNames(className, 'header')}>
      <a className="header__logo-wrapper" href={routes.MAIN}>
        <img className="header__logo" src="/images/logo.png" alt="logo" />
      </a>
      <div className="header__buttons">
        <nav className="header__nav">
          {navigation.header.map((item, index) => (
            <CButton className="header__nav-button" to={item.to} key={index}>
              <span className="header__font header__font--button">
                {item.text}
              </span>
            </CButton>
          ))}
        </nav>
        <CButton
          className="header__connect-button"
          theme="primary"
          href={routes.MINT}
        >
          <span className="header__font header__font--button">
            Connect Wallet
          </span>
        </CButton>
      </div>
      <button className="header__menu-button">
        <div className="header__line header__line--top" />
        <div className="header__line header__line--middle" />
        <div className="header__line header__line--bottom" />
      </button>
    </header>
  )
}
export default Header
