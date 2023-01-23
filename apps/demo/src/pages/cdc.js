import React from 'react'
import Meta from './../components/Meta'
import HeroSection2 from './../components/HeroSection2'
import CDCCasesTable from '../features/cdcCases/CDCCasesTable'
import CDCCasesButtons from '../features/cdcCases/CDCCasesButtons'
import { Container } from '@material-ui/core'

export default function CdcPage(props) {
  return (
    <>
      <Meta title='Cdc' />
      <HeroSection2
        bgColor='default'
        size='medium'
        bgImage=''
        bgImageOpacity={1}
        title='CDC'
      >
        <Container align='center'>
          This is the data that CDC receives when the state publishes a feed. The table is directly synchronized to the feed's storage in the cloud.
        </Container>
        <CDCCasesTable />
        <CDCCasesButtons />
      </HeroSection2>
    </>
  )
}
