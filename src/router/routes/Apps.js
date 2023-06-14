// ** React Imports
import { lazy } from 'react'



const Profile =lazy(() => import('../../Views/UserProfile/index'))
const Home =lazy(() => import('../../Views/pages/authentication/AfterSignin'))
const PostSection =lazy(() => import('../../Views/UserProfile/PostSection'))
const AboutSection =lazy(() => import('../../Views/UserProfile/About/AboutSection'))
const Friends =lazy(() => import('../../Views/UserProfile/Friends/Friends'))
const Photos =lazy(() => import('../../Views/UserProfile/Photos'))
const Videos =lazy(() => import('../../Views/UserProfile/Videos'))



const AppRoutes = [
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/profile/posts',
    element: <PostSection/>
  },
  {
    element: <AboutSection/>,
    path: '/profile/about'
  },
  {
    element: <Friends/>,
    path: '/profile/friends'
  },
  {
    element: <Photos/>,
    path: '/profile/photos'
  },
  {
    element: <Videos/>,
    path: '/profile/videos'
  },
  {
    element: <Home />,
    path: '/Home'
  }
  
]

export default AppRoutes
