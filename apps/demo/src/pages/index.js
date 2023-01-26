import React from 'react'
import Meta from './../components/Meta'
import DemoHeroSection from './../components/DemoHeroSection'

function IndexPage (props) {
  return (
    <>
      <Meta />
      <DemoHeroSection
        bgColor='default'
        size='medium'
        bgImage=''
        bgImageOpacity={1}
        title='Demonstration Overview'
        subtitle='EpiSync is new way from states to transmit case data to the CDC. This demostration site shows EpiSync in action with a simple case surviellance system and a single case feed.'
        buttonText='Reset Demo'
        buttonColor='primary'
        buttonPath='/reset'
      />
    </>
  )
}

export default IndexPage
