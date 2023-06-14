// ** React Imports
import { lazy } from 'react'
import ResetPassword from '../../Views/pages/authentication/ResetPassword'

const Login = lazy(() => import('../../Views/pages/authentication/Login'))

const ForgotPassword = lazy(() => import('../../Views/pages/authentication/ForgotPasswordBeta'))

const AuthenticationRoutes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    layout: 'BlankLayout',
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  },
  {
    path: '/reset-password/:id',
    element: <ResetPassword />,
    layout: 'BlankLayout',
    meta: {
      layout: 'blank',
      publicRoute: true
    }
  }
  ]

export default AuthenticationRoutes
