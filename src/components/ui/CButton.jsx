import React from 'react'
import classNames from 'classnames'
const themes = ['primary', 'transparent', 'bordered']
const CButton = ({
  href,
  target,
  theme = 'transparent',
  withLines = false,
  children,
  iconLeft,
  iconRight,
  className,
  onClick
}) => {
  if (!themes.includes(theme)) {
    throw new Error(`Invalid theme: ${theme}`)
  }
  const buttonClassName = classNames('c-button', className, {
    [`c-button--theme--${theme}`]: theme,
    'c-button--withLines': withLines
  })
  const ElementType = href ? 'a' : 'button'
  console.log(href, ElementType)
  const buttonProps = {
    ...(href ? { href } : {}),
    ...(target ? { target } : {}),
    className: buttonClassName,
    onClick
  }
  return (
    <ElementType {...buttonProps}>
      <div className="c-button__background" />
      <div className="c-button__icon-wrapper c-button__icon-wrapper--left">
        {iconLeft}
      </div>
      <div className="c-button__text">{children}</div>
      <div className="c-button__icon-wrapper c-button__icon-wrapper--right">
        {iconRight}
      </div>
    </ElementType>
  )
}
export default CButton
