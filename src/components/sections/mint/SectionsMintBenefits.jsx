import React from 'react'
import benefits from '../../../config/benefits'
import CardsBenefit from '../../cards/CardsBenefit'
import classNames from 'classnames'

const SectionsMintBenefits = ({ className }) => {
  const cards = benefits

  return (
    <section className={classNames(className, 'sections-mint-benefits')}>
      <div className="sections-mint-benefits__container">
        <div className="sections-mint-benefits__title sections-mint-benefits__title--top">
          <span className="sections-mint-benefits__font sections-mint-benefits__font--title">
            LEGION UNIVERSE
          </span>
        </div>

        <div className="sections-mint-benefits__title sections-mint-benefits__title--bottom">
          <span className="sections-mint-benefits__font sections-mint-benefits__font--title">
            DTC BENEFITS
          </span>
        </div>

        <div className="sections-mint-benefits__cards">
          {cards.map((card, index) => (
            <CardsBenefit
              key={index}
              className="sections-mint-benefits__card"
              title={card.title}
              text={card.text}
              image={card.image}
              side={index % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SectionsMintBenefits
