// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import datatablesSlice from "../Views/tables/data-tables/store/index"
import email from "../Views/apps/email/store/index"
import NewsFeedReducer from  './Reducers/NewsFeed'
import profileReducer from "./Reducers/Profile/index"


const rootReducer = {
  auth,
  navbar,
  layout,
  profileReducer,
  NewsFeedReducer,
  dataTables:datatablesSlice,
  email,


}

export default rootReducer
