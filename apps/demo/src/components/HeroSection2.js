import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Section from './Section'
import SectionHeader from './SectionHeader'

function HeroSection2 (props) {
  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
    >
      <Container>
        <Box textAlign='center'>
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            size={4}
          />
        </Box>
        {props.children}
      </Container>
    </Section>
  )
}

export default HeroSection2
