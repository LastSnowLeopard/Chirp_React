// ** Router imports
import { lazy } from 'react'

// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'

// ** Layouts
import BlankLayout from '@layouts/BlankLayout'

// ** Hooks Imports
import { useLayout } from '@hooks/useLayout'

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '../utility/Utils'
import Signup from "../Views/pages/authentication/Signup"
// ** GetRoutes
import { DefaultRoute, getRoutes } from './routes'

// ** Components
const Error = lazy(() => import('../Views/pages/misc/Error'))
const Login = lazy(() => import('../Views/pages/authentication/Login'))
const NotAuthorized = lazy(() => import('../Views/pages/misc/NotAuthorized'))

const Router = () => {
  // ** Hooks
  const { layout } = useLayout()
  

  const allRoutes = getRoutes(layout)
  const getHomeRoute = () => {
    const user = getUserData()
    
    if (user?.Token) {
      // return getHomeRouteForLoggedInUser(user.Token)
      return DefaultRoute
    } else {
      return '/login'
    }
  }

  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    {
      path: '/login',
      element: <BlankLayout />,
      children: [{ path: '/login', element: <Login /> }]
    },
    {
      path: '/signup',
      element: <BlankLayout />,
      children: [{ path: '/signup', element: <Signup /> }]
    },
    {
      path: '/auth/not-auth',
      element: <BlankLayout />,
      children: [{ path: '/auth/not-auth', element: <NotAuthorized /> }]
    },
    {
      path: '*',
      element: <BlankLayout />,
      children: [{ path: '*', element: <Error /> }]
    },
    ...allRoutes
  ])

  return routes
}

export default Router
