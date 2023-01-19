import { Link } from 'react-router-dom'
import { Fragment } from 'react'
import { ErrorMessage } from "@trussworks/react-uswds";

export default function NotFound() {
  return (
    <Fragment>
      <ErrorMessage>File not found</ErrorMessage>
      <Link to="/">Go to Home </Link>
    </Fragment>
  )
}
