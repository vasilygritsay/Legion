import React from 'react'

import { ReactComponent as ArrowIcon } from '../../assets/svg/input-arrow.svg'

const NumberInput = ({ value, setValue, onInput, children }) => {
  const setLimitedValue = action => {
    if (action === 'inc') {
      if (value < 150) {
        setValue(value + 1)
      }
    } else {
      if (value > 1) {
        setValue(value - 1)
      }
    }
  }
  return (
    <label className="number-input">
      <div className="number-input__input-wrapper">
        <input
          className="number-input__input"
          type="number"
          value={value}
          onInput={onInput}
        />

        <div className="number-input__arrows">
          <button
            className="number-input__arrow"
            onClick={() => setLimitedValue('inc')}
          >
            <ArrowIcon className="number-input__icon number-input__icon--top" />
          </button>

          <button
            className="number-input__arrow"
            onClick={() => setLimitedValue('dec')}
          >
            <ArrowIcon className="number-input__icon number-input__icon--bottom" />
          </button>
        </div>
      </div>

      <div className="number-input__text">
        <span className="number-input__font number-input__font--text">
          {children}
        </span>
      </div>
    </label>
  )
}

export default NumberInput
