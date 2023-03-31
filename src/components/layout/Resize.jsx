import React, { useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import useGlobal from '../../stores/useGlobal'
import useEventListener from '../../hooks/useEventListener'

const defaultFont = 16

const desktopConfig = {
  defaultWidth: 1440,
  minWidth: 768,
  defaultHeight: 0,
  minHeight: 0
}

const mobileConfig = {
  defaultWidth: 375,
  minWidth: 280,
  defaultHeight: 0,
  minHeight: 200
}

function Resize({ children, className }) {
  const { setIsMobile, isMobile: isMobileGlobal } = useGlobal()
  const [viewPort, setViewPort] = useState({
    width: 0,
    height: 0
  })

  const onResize = () => {
    const { innerWidth, innerHeight } = window

    setViewPort({
      width: innerWidth,
      height: innerHeight
    })

    const vh = innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }

  useEventListener('resize', onResize)

  const isMobile = useMemo(
    () => viewPort.width < desktopConfig.minWidth,
    [viewPort.width]
  )

  useEffect(() => {
    if (isMobile !== isMobileGlobal) setIsMobile(isMobile)
  }, [isMobile])

  const fontSize = (() => {
    const config = isMobile ? mobileConfig : desktopConfig

    const horizontalRatio =
      Math.max(config.minWidth, viewPort.width) / config.defaultWidth
    const verticalRatio =
      Math.max(config.minHeight, viewPort.height) / config.defaultHeight
    const minRatio = Math.min(horizontalRatio, verticalRatio)

    return defaultFont * minRatio
  })()

  return (
    <div
      style={{ fontSize: fontSize + 'px' }}
      className={classNames(className, {
        'is-mobile': isMobile,
        'is-desktop': !isMobile
      })}
    >
      {children}
    </div>
  )
}

Resize.propTypes = {
  children: PropTypes.node
}

export default Resize
