import React from 'react'
import Navbar from './../components/Navbar'
import IndexPage from './index'
import AboutPage from './about'
import FaqPage from './faq'
import ResetPage from './reset'
import CAStatePage from './ca'
import AZStatePage from './az'
import FeedPage from './feed'
import CdcPage from './cdc'
import { Switch, Route, Router } from './../util/router'
import NotFoundPage from './404'
import Footer from './../components/Footer'
import { ThemeProvider } from './../util/theme'
import CentralPage from './central'
import VocabPage from './vocab'

function App(props) {
  return (
    <ThemeProvider>
      <Router>
        <>
          <Navbar
            color='default'
            logo='transmitter.svg'
            logoInverted='transmitter.svg'
          />

          <Switch>
            <Route exact path='/' component={IndexPage} />

            <Route exact path='/about' component={AboutPage} />

            <Route exact path='/faq' component={FaqPage} />

            <Route exact path='/reset' component={ResetPage} />

            <Route exact path='/ca' component={CAStatePage} />

            <Route exact path='/az' component={AZStatePage} />

            <Route exact path='/feed' component={FeedPage} />

            <Route exact path='/cdc' component={CdcPage} />

            <Route exact path='/central' component={CentralPage} />

            <Route exact path='/vocab' component={VocabPage} />

            <Route component={NotFoundPage} />
          </Switch>

          <Footer
            bgColor='default'
            size='medium'
            bgImage=''
            bgImageOpacity={1}
            copyright={`© ${new Date().getFullYear()} Rick Hawes`}
            sticky
          />
        </>
      </Router>
    </ThemeProvider>
  )
}

export default App
