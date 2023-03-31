import React from 'react'

const CardsBenefit = ({ title, text, image, side = 'left', className }) => {
  return (
    <div
      className={`cards-benefit ${
        side ? `cards-benefit--side--${side}` : ''
      } ${className}`}
    >
      <div className="cards-benefit__content">
        <div className="cards-benefit__title">
          <span className="cards-benefit__font cards-benefit__font--title">
            {title}
          </span>
        </div>
        <div className="cards-benefit__text">
          <span className="cards-benefit__font cards-benefit__font--text">
            {text}
          </span>
        </div>
      </div>
      <img
        className="cards-benefit__image"
        src={`/images/benefits/${image}.jpg`}
        alt="image"
      />
    </div>
  )
}

export default CardsBenefit
