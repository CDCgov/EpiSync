import React, { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import Toolbar from '@material-ui/core/Toolbar'
import Hidden from '@material-ui/core/Hidden'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Section from './Section'
// import { Link } from "./../util/router";
import { useDarkMode } from './../util/theme'
import { Link as RouterLink, Route } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  logo: {
    height: 28,
    marginRight: theme.spacing(2)
  },
  drawerList: {
    width: 250
  },
  spacer: {
    flexGrow: 1
  }
}))

function SimpleBreadcrumbs () {
  return (
    <Route>
      {({ location }) => {
        const pathnames = location.pathname.split('/').filter(x => x)
        const typographyVariant = 'h5'
        return (
          <Breadcrumbs aria-label='Breadcrumb'>
            {
              pathnames.length === 0
                ? (
                  <Typography variant={typographyVariant}>
                    EpiSync
                  </Typography>
                  )
                : (
                  <RouterLink to='/' key='/' className='MuiTypography-root MuiLink-root MuiLink-underlineHover'>
                    <Typography variant={typographyVariant}>
                      EpiSync
                    </Typography>
                  </RouterLink>
                  )
            }
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1
              const to = `/${pathnames.slice(0, index + 1).join('/')}`

              return last
                ? (
                  <Typography key={to} variant={typographyVariant}>
                    {value}
                  </Typography>
                  )
                : (
                  <RouterLink to={to} key={to} className='MuiTypography-root MuiLink-root MuiLink-underlineHover'>
                    <Typography key={to} variant={typographyVariant}>
                      {value}
                    </Typography>
                  </RouterLink>
                  )
            })}
          </Breadcrumbs>
        )
      }}
    </Route>
  )
}

function Navbar (props) {
  const classes = useStyles()

  const darkMode = useDarkMode()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Use inverted logo if specified
  // and we are in dark mode
  const logo = props.logoInverted && darkMode.value ? props.logoInverted : props.logo

  return (
    <Section bgColor={props.color} size='auto'>
      <AppBar position='static' color='transparent' elevation={0}>
        <Container disableGutters>
          <Toolbar>
            <Link to='/'>
              <img src={process.env.PUBLIC_URL + '/' + logo} alt='Logo' className={classes.logo} />
            </Link>
            <SimpleBreadcrumbs />
            <div className={classes.spacer} />
            <Hidden mdUp implementation='css'>
              <IconButton
                onClick={() => {
                  setDrawerOpen(true)
                }}
                color='inherit'
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Hidden smDown implementation='css'>
              <Button component={Link} to='/about' color='inherit'>
                About
              </Button>
              <Button component={Link} to='/faq' color='inherit'>
                FAQ
              </Button>
            </Hidden>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List
          className={classes.drawerList}
          onClick={() => setDrawerOpen(false)}
        >
          <ListItem component={Link} to='/about' button>
            <ListItemText>About</ListItemText>
          </ListItem>
          <ListItem component={Link} to='/faq' button>
            <ListItemText>FAQ</ListItemText>
          </ListItem>
        </List>
      </Drawer>
    </Section>
  )
}

export default Navbar
