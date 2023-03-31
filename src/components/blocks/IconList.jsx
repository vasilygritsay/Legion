import React from 'react'
import classNames from 'classnames'

const IconList = ({ iconName, title, list, className }) => {
  const listNumber = number => {
    return number < 9 ? '0' + (number + 1) : number + 1
  }

  return (
    <div className={classNames(className, 'icon-list')}>
      <div className="icon-list__icon-wrapper">
        <img
          className="icon-list__icon"
          src={`/images/icons/packs/${iconName}.png`}
          alt="icon"
        />
      </div>

      <div className="icon-list__list-wrapper">
        <div className="icon-list__title">
          <span className="icon-list__font icon-list__font--title">
            {title}
          </span>
        </div>

        <ul className="icon-list__items">
          {list &&
            list.map((item, index) => (
              <li key={index} className="icon-list__item">
                <span className="icon-list__font icon-list__font--number">
                  {listNumber(index)}
                </span>
                <div className="icon-list__text-wrapper">
                  <span className="icon-list__font icon-list__font--item">
                    {item}
                  </span>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default IconList
