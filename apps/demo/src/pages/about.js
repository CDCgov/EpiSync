import React from 'react'
import Meta from './../components/Meta'
import HeroSection2 from './../components/HeroSection2'

function AboutPage (props) {
  return (
    <>
      <Meta title='About' description='Learn about our company and team' />
      <HeroSection2
        bgColor='default'
        size='medium'
        bgImage=''
        bgImageOpacity={1}
        title='About EpiCast'
        subtitle='Lots to learn.'
      />
    </>
  )
}

export default AboutPage
