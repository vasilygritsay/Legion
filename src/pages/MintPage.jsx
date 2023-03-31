import React from 'react'
import SectionsMintMain from '../components/sections/mint/SectionsMintMain'
import SectionsMintPacks from '../components/sections/mint/SectionsMintPacks'
import SectionsMintBenefits from '../components/sections/mint/SectionsMintBenefits'
import classNames from 'classnames'

function MintPage({ className }) {
  return (
    <main className={classNames(className)}>
      <SectionsMintMain className="pages-mint__section pages-mint__section--main" />
      <SectionsMintPacks className="pages-mint__section pages-mint__section--packs" />
      <SectionsMintBenefits className="pages-mint__section pages-mint__section--benefits" />
    </main>
  )
}

export default MintPage
