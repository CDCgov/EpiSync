import React from 'react'
import Meta from './../components/Meta'
import HeroSection2 from './../components/HeroSection2'
import FeedBrowser from '../components/FeedBrowser'

function FeedPage (props) {
  return (
    <>
      <Meta title='Feed' />
      <HeroSection2
        bgColor='default'
        size='medium'
        bgImage=''
        bgImageOpacity={1}
        title='Feed'
        subtitle='A file explorer view into the S3 bucket that hosts the feed.'
      >
        <FeedBrowser/>
      </HeroSection2>
    </>
  )
}

export default FeedPage
