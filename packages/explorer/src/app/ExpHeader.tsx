import { Header, NavMenuButton, PrimaryNav, Title } from '@trussworks/react-uswds'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function ExpHeader (): JSX.Element {
  const navMenu = [
    <Link to='/' className='usa-nav__link'>
      <span>Summary</span>
    </Link>,
    <Link to='/files' className='usa-nav__link'>
      <span>Files</span>
    </Link>,
    <Link to='/graphs' className='usa-nav__link'>
      <span>Graphs</span>
    </Link>,
    <Link to='/about' className='usa-nav__link'>
      <span>About</span>
    </Link>,
  ]
  const [expanded, setExpanded] = useState(false)
  const onClick = (): void => setExpanded((prvExpanded) => !prvExpanded)

  return (
    <Header extended>
      <div className='usa-nav-container'>
        <div className='usa-navbar'>
          <Title><img src='./logo128.png' height={32} alt='logo'/><span>Feed Explorer</span></Title>
          <NavMenuButton onClick={onClick} label='Menu' />
        </div>
        <PrimaryNav
          items={navMenu}
          mobileExpanded={expanded}
          onToggleMobileNav={onClick}
        />
      </div>
    </Header>
  )
}
