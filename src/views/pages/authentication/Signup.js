// ** React Imports
// import { useContext, useEffect } from 'react'
// , useNavigate
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// ** Custom Hooks
// import { useSkin } from '@hooks/useSkin'
// import useJwt from '@src/auth/jwt/useJwt'

// // ** Third Party Components
// import toast from 'react-hot-toast'
// import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
// import { Facebook, Twitter, Mail, GitHub, HelpCircle, Coffee, X } from 'react-feather'

// // ** Actions
// import { handleLogin } from '@store/authentication'

// // ** Context
// import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
// import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// // ** Utils
// import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
// Alert, UncontrolledTooltip, 
import { Row, Col, Form, Input, Label,  Button, CardText, CardTitle, Spinner, Alert } from 'reactstrap'

// ** Styles
// import '@styles/react/pages/page-authentication.scss'
import { useState } from 'react'
// import { getHeaders } from '../../../auth/utils'
// import Logo from '@src/assets/images/logo/logo.png'
// import { userRoles } from '../../../constants/snippets/snippets'
// import { getNavigation } from '../../../navigation/vertical'
// import ManageRoutes from "../../../navigation/vertical/apps"
// import { SocketHandler } from '../../components/Sockets/SocketHandler'
// import { viewPasswordModal } from '../../../redux/authentication'

import loginImg from '../../../assets/images/pages/login.png'
import Google from '../../../assets/images/pages/Google.svg'
import Facebook from '../../../assets/images/pages/Vector.svg'

import AfterSignup from './AfterSignup'


import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {toast} from 'react-hot-toast'
import { httpSignup } from '../../../utility/api/services/authConstants'

// const Routes = [
//   ...ManageRoutes
// ]


const Signup = () => {
  // ** Hooks
//   const { skin } = useSkin()
//   const dispatch = useDispatch()
//   const ability = useContext(AbilityContext)
const navigate = useNavigate()


const SignupSchema = yup.object().shape({
        
  // loginEmail: yup.string().min(3,' City Name must be at least 3 characters').max(20, 'City Name must be at most 3 chaaracters').required(),
  fullName: yup.string().required("Please enter your email"),
  loginEmail: yup.string().email().required("Please enter your email"),
  password: yup.string().required('Please enter your password'),
  // cityurdu: yup.string().required(),
  // province: yup.object().required(),
  // password: yup.number().typeError('Input number').required('Enter Code'),
  // status: yup.object().required()

})


  const {
    control,
    // setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode:onchange, resolver:yupResolver(SignupSchema)})

//   const illustration = skin === 'dark' ? 'login-v2.svg' : 'login-v2.svg',
//     source = require(`@src/assets/images/pages/${illustration}`).default

//   const abilityData = [{ action: "manage", subject: "all" }]
  const [loading,setLoading]=useState(false)
  const [view,setView]=useState(false)

//   const [testLogin,setTestLogin]=useState(false)
 
const [createMsg, setCreateMsg] = useState(false)
const [existMsg, setExistMsg] = useState(false)
  
  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {

      setLoading(true)
//       useJwt
//         .login
        axios.post(httpSignup,{full_name:data.fullName, email: data.loginEmail, password: data.password })
        .then(async res => {
          const data=res
          console.log('SIGNUP-DATA::', data)
          if(res.status!=200)
          {
            toast.error("Please try again")}
          else{
            if(res.status==200 && data.data.respond.status == 1){
              toast.success(data.data.respond.message)
              setLoading(false)
              navigate(`/login`)
            setView(true)
            }else if(res.status==200 && data.data.respond.status == 0){
              toast.error(data.data.respond.message)
              setLoading(false)
              setView(false)
            }
            else{
              toast.warn(data.data.message)
              setLoading(false)
              setView(false)
            }
          }

          }
          
        ).catch(err => {
          console.log(err)
          setLoading(false)
          setView(false)
          setExistMsg(false)
          setCreateMsg(false)
          return toast.error("Invalid Email/Password")
        })
    } 
  }

  return (
    <>
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Col  lg='6' sm='12'style={{backgroundColor:'#6E0C0D' , height:'100vh'}}  className='d-none d-lg-flex align-items-center p-5'>

          <div className='w-100  '>
            {/* align-items-center justify-content-center px-5 d-lg-flex*/}
            <Row>
                <h2 style={{color:'white', padding:'2rem', marginLeft:'1rem'}}><b>CHIRP</b></h2>
            </Row>
            <Row>
                <img className='img-fluid' src={loginImg} style={{height:'50%', width:'50%', display:'block', marginLeft:'auto', marginRight:'auto'} } alt='Login Cover' />
            </Row>
            <Row>
                <p style={{ lineHeight:'40px',font:'Poppins',color:'white', fontWeight:'500', fontSize:'40px', width:'70%', marginLeft:'6rem'}}>Stay Connected with friends and loved ones</p>
            </Row>
            {/* src={source} */}
          </div>
        </Col>
        {/* p-lg-5 */}
        {/*  style={{padding:'1.1rem'}} */}
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-4' lg='6' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12' style={{width:'75%'}}>
            <CardTitle tag='h2' className='fw-bold mb-1' style={{textAlign:'left' , fontSize:'2.5rem', color:'#6A0C0D',marginLeft:'2rem'}}>
              Welcome!
            </CardTitle>
            <div  style={{padding:'1.4rem', paddingRight:'2rem', paddingLeft:'2rem'}}>
                <h4 className='mb-2'>Create an account</h4>
            
                <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-1'>
                    <Label className='form-label' for='login-email'>
                        Email
                    </Label>
                    <Controller
                        id='loginEmail'
                        name='loginEmail'
                        control={control}
                        render={({ field }) => (
                        <Input
                            autoFocus
                            placeholder='Enter your email'
                            invalid={errors.loginEmail && true}
                            {...field}
                        />
                        )}
                    />
                    </div>
                    <div className='mb-1'>
                    <Label className='form-label' for='login-email'>
                        Full Name
                    </Label>
                    <Controller
                        id='fullName'
                        name='fullName'
                        control={control}
                        render={({ field }) => (
                        <Input
                            autoFocus
                            placeholder='Enter your Full Name'
                            invalid={errors.fullName && true}
                            {...field}
                        />
                        )}
                    />
                    </div>
                    <div className='mb-1'>
                    <div className='d-flex justify-content-between'>
                        <Label className='form-label' for='login-password'>
                        Password
                        </Label>
                        {/* <Link to='/medaskapp/forgot-password' style={{textDecoration:'none', color:'#6E0C0D'}}>
                        <small><b>Forgot?</b></small>
                        </Link> */}
                    </div>
                    <Controller
                        id='password'
                        name='password'
                        control={control}
                        render={({ field }) => (
                        // <Input
                        // autoFocus
                        // placeholder='Enter your password'
                        // invalid={errors.loginEmail && true}
                        // {...field}
                        // />
                        <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                        )}
                    />
                    </div>

                    <Button type='submit'  block color='primary'>
                    {
                      loading?
                      <Spinner size="sm"/>:
                        <div>
                        Create an account
                    </div>
                    }
                    </Button>
                    
                    <Button type='submit' className='mt-1'  block color='primary'>
                    {
                        <div>
                            <img src={Google} style={{marginRight:'0.3rem', marginBottom:'0.1rem'}}/> &nbsp;
                        <b>Continue with Google</b>
                    </div>
                    }
                    </Button>
                    <Button type='submit' color='primary' block style={{ marginTop:'1rem', borderRadius:'7px' }}>
                    {
                        <div>
                            <img src={Facebook} style={{marginRight:'0.3rem', marginBottom:'0.1rem'}}/> &nbsp;
                        <span className='hideee'>Continue with Facebook</span>
                    </div>
                    }
                    </Button>
                    <p style={{ marginTop:'1rem', color:'grey', textAlign:'center'}}>Already have an Account? <Link to='/signin' style={{textDecoration:'none', color:'#6E0C0D'}}>Log In</Link></p>
                </Form>
            </div>

          </Col>
        </Col>
      </Row>
    </div>
    {
      view ? <AfterSignup/> : ""
    }
    </>
  )
}

export default Signup
