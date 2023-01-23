import { Breadcrumb, BreadcrumbBar } from "@trussworks/react-uswds"
import { Link } from 'react-router-dom'

// Experimental. Not used. 
export default function ExpBreadcrumbBar (): JSX.Element {
  return (
    <BreadcrumbBar>
      <Breadcrumb>
        <Link className='usa-nav__link' to='/'>
          Home
        </Link>
      </Breadcrumb>
      <Breadcrumb current>Test</Breadcrumb>
    </BreadcrumbBar>
  )
}
