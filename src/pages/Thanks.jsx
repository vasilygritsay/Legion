import { share } from '../tools/helpers'
import CButton from '../components/ui/CButton'
import React from 'react'

const Thanks = () => {
  const handleShare = () => {
    share(
      'tw',
      process.env.REACT_APP_APP_URL,
      {
        title: 'Already copped up my Legion NFT. Who else is getting one?',
        image: process.env.REACT_APP_APP_URL + '/images/share.jpg'
      },
      () => {}
    )
  }
  return (
    <div className="thanks-page">
      <div className="thanks-page__wrapper">
        <h1 className="thanks-page__title">
          <span className="thanks-page__font thanks-page__font--title">
            Thank you
          </span>
        </h1>
        <div className="thanks-page__text">
          <span className="thanks-page__font thanks-page__font--text">
            Congratulations on your purchase of a Legion NFT! You can now share
            this event with your friends on Twitter.
          </span>
        </div>
        <CButton
          className="thanks-page__button"
          theme="primary"
          with-lines
          onClick={handleShare}
        >
          <span className="thanks-page__font thanks-page__font--button">
            Share on twitter
          </span>
        </CButton>
      </div>
    </div>
  )
}
export default Thanks
