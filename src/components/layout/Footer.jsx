import React from 'react'
import { Link } from 'react-router-dom'
import routes from '../../constants/routes'
import navigation from '../../config/navigation'
import CButton from '../ui/CButton'
import classNames from 'classnames'

function Footer({ className }) {
  return (
    <footer className={classNames(className, 'footer')}>
      <a className="footer__logo-wrapper" href={routes.MAIN}>
        <img className="footer__logo" src="/images/logo.png" alt="logo" />
      </a>
      <nav className="footer__nav">
        {navigation.footer.map((item, index) => (
          <CButton
            key={index}
            className="footer__button"
            href={item.to}
            target="_blank"
          >
            <span className="footer__font footer__font--button">
              {item.text}
            </span>
          </CButton>
        ))}
      </nav>
    </footer>
  )
}

export default Footer
