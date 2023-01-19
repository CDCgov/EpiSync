import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ExpFooter from './ExpFooter'
import ExpHeader from './ExpHeader'
import NotFound from './NotFound'
import About from '../pages/About'
import Root from '../pages/Root'
import Files from '../pages/Files'
import Graphs from '../pages/Graphs'
import { GridContainer, Grid } from '@trussworks/react-uswds'

// Pulls all the pieces together
function App (): JSX.Element {
  return (
    <div className="app">
      <BrowserRouter>
        <ExpHeader />
        <GridContainer>
          <Grid row>
            <AllRoutes/>
          </Grid>
        </GridContainer>
        <ExpFooter />
      </BrowserRouter>
    </div>
  )
}

// Just the routes
function AllRoutes(): JSX.Element {
  return (
  <Routes>
    <Route path='/' element={<Root />} />
    <Route path='/about' element={<About />} />
    <Route path='/files' element={<Files />} />
    <Route path='/graphs' element={<Graphs />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
  )
}

export default App
