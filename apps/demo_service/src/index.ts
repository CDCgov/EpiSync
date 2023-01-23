import { app } from './server/app'

// Startup the app for a demo
app
  .normalDemoStartup()
  .then(() => {
    // Start listening
    app.listen()
  })
  .catch(error => console.log(error))

// Handle the Ctrl-C to termininate the app
process.on('SIGINT', () => {
  console.info('SIGINT received.')
  app.closeAndStop().then(() => process.exit()).catch(() => {})
})
