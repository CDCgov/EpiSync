import { AppState } from '@/server/AppState'

// See for this idea: https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript/58788706#58788706
declare global {
  declare namespace Express {
    interface Request {
      state: AppState
    }
  }
}
