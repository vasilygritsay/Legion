import React from 'react'
import packs from '../../../config/packs'
import IconList from '../../blocks/IconList'
import classNames from 'classnames'

const SectionsMintPacks = ({ className }) => (
  <section className={classNames(className, 'sections-mint-packs')}>
    <div className="sections-mint-packs__container">
      <div className="sections-mint-packs__title-wrapper">
        <div className="sections-mint-packs__title">
          <span className="sections-mint-packs__font sections-mint-packs__font--title">
            BONUS PACKS
          </span>
        </div>

        <div className="sections-mint-packs__text">
          <span className="sections-mint-packs__font sections-mint-packs__font--text">
            Qualify for the following Bonus Packs by purchasing the Bonus Pack
            number of Legion Universe Digital Trading Cards. A Bonus Pack gives
            you additional physical bonuses (items mailed to you) as well as
            potential opportunities to join with us in the physical production
            and premiers of the films.
          </span>
        </div>
      </div>

      <div className="sections-mint-packs__content">
        {packs.map((pack, index) => (
          <IconList
            key={index}
            className="sections-mint-packs__list"
            iconName={pack.iconName}
            title={pack.title}
            list={pack.list}
          />
        ))}
      </div>

      <div className="sections-mint-packs__interrupter">
        <img
          className="sections-mint-packs__interrupter-bg"
          src="/images/page-bg/interrupter.png"
          alt="bg"
        />

        <img
          className="sections-mint-packs__interrupter-bg sections-mint-packs__interrupter-bg--mobile"
          src="/images/page-bg/interrupter-mobile.jpg"
          alt="bg"
        />

        <div className="sections-mint-packs__interrupter-title">
          <span className="sections-mint-packs__font sections-mint-packs__font--interrupter-title">
            Buy 50 Digital Trading Cards
          </span>
        </div>

        <div className="sections-mint-packs__interrupter-text">
          <span className="sections-mint-packs__font sections-mint-packs__font--interrupter-text">
            You are guaranteed to receive an opportunity for a{' '}
            <span className="sections-mint-packs__interrupter-accent">
              CAMEO ROLE
            </span>{' '}
            in one of the <br />
            films as well as an invitation to one of the{' '}
            <span className="sections-mint-packs__interrupter-accent">
              RED CARPET SCREENINGS!
            </span>
          </span>
        </div>

        <div className="sections-mint-packs__interrupter-text">
          <span className="sections-mint-packs__font sections-mint-packs__font--interrupter-text">
            <span className="sections-mint-packs__interrupter-accent">
              PLUS
            </span>{' '}
            an in person dinner with producers, directors, writers and VFX.{' '}
            <span className="sections-mint-packs__interrupter-accent">
              PLUS
            </span>{' '}
            with the investment <br />
            club, access to information, investments and funds thatare not
            available to the general public.
          </span>
        </div>
      </div>
    </div>
  </section>
)

export default SectionsMintPacks
