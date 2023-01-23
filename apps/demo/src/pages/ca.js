import React from 'react'
import { Container } from '@material-ui/core'
import Meta from '../components/Meta'
import HeroSection2 from '../components/HeroSection2'
import StateCasesTable from '../features/stateCases/StateCasesTable'
import StateCasesButtons from '../features/stateCases/StateCasesButtons'

export default function StatePage(props) {
  return (
    <>
      <Meta title='State' />
      <HeroSection2
        bgColor='default'
        size='medium'
        bgImage=''
        bgImageOpacity={1}
        title='California'
        subtitle=''
      >
        <Container align='center'>
          This is a simple state surveillance system. The table represents all the case of a particular disease in California.
        </Container>
        <StateCasesTable agency='cdph.ca.gov' />
        <StateCasesButtons agency='cdph.ca.gov' />
      </HeroSection2>
    </>
  )
}
