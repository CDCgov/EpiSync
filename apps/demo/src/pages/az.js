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
        title='Arizona'
        subtitle=''
      >
        <Container align='center'>
          This is a simple state surveillance system. The table represents all the case of a particular disease in Arizona.
        </Container>
        <StateCasesTable agency='azphs.gov' />
        <StateCasesButtons agency='azphs.gov' />
      </HeroSection2>
    </>
  )
}
