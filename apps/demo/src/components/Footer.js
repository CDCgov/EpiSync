import React from 'react'
import Container from '@material-ui/core/Container'
import LinkMui from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Section from './Section'
import { Link } from './../util/router'

const useStyles = makeStyles((theme) => ({
  sticky: {
    marginTop: 'auto'
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  item: {
    display: 'flex',
    flex: 'none',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 24,
    [theme.breakpoints.up('sm')]: {
      flex: '50%'
    }
  },
  brand: {
    display: 'block',
    height: 32
  },
  social: {
    alignItems: 'flex-end'
  },
  link: {
    color: 'inherit',
    lineHeight: 1,
    '&:not(:last-of-type)': {
      marginRight: '1.2rem'
    }
  },
  left: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-start'
    }
  },
  right: {
    [theme.breakpoints.up('sm')]: {
      justifyContent: 'flex-end'
    }
  },
  // Move links to end (bottom right)
  // Swaps position with social
  smallLinks: {
    [theme.breakpoints.up('sm')]: {
      order: 1
    }
  },
  legal: {
    opacity: 0.6,
    fontSize: '0.875rem',
    '& a': {
      color: 'inherit',
      marginLeft: '0.8rem'
    }
  }
}))

function Footer (props) {
  const classes = useStyles()

  return (
    <Section
      bgColor={props.bgColor}
      size={props.size}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      className={props.sticky && classes.sticky}
    >
      <Container>
        <div className={classes.wrapper}>
          <span className={`${classes.item} ${classes.legal} ${classes.left}`}>
            {props.copyright}
            <LinkMui component={Link} to='/legal/terms-of-service'>
              Terms
            </LinkMui>
            <LinkMui component={Link} to='/legal/privacy-policy'>
              Privacy
            </LinkMui>
          </span>
        </div>
      </Container>
    </Section>
  )
}

export default Footer
