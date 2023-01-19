import React from 'react'
import Meta from '../components/Meta'
import HeroSection2 from '../components/HeroSection2'

export default function CentralPage(props) {
  return (
    <>
      <Meta title='Central' />
      <HeroSection2
        bgColor='default'
        size='medium'
        bgImage=''
        bgImageOpacity={1}
        title='EpiCast Central'
        subtitle='Under construction'
      />
    </>
  )
}

