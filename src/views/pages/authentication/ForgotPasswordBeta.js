// ** React Imports
// import { useContext, useEffect } from 'react'
// , useNavigate
import { Link } from 'react-router-dom'

// ** Custom Hooks
// import { useSkin } from '@hooks/useSkin'
// import useJwt from '@src/auth/jwt/useJwt'

// // ** Third Party Components
import toast from 'react-hot-toast'
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
// import { useState } from 'react'
// import { getHeaders } from '../../../auth/utils'
// import Logo from '@src/assets/images/logo/logo.png'
// import { userRoles } from '../../../constants/snippets/snippets'
// import { getNavigation } from '../../../navigation/vertical'
// import ManageRoutes from "../../../navigation/vertical/apps"
// import { SocketHandler } from '../../components/Sockets/SocketHandler'
// import { viewPasswordModal } from '../../../redux/authentication'

import loginImg from '../../../assets/images/pages/login.png'
// import Google from '../../../assets/images/pages/Google.svg'
// import Facebook from '../../../assets/images/pages/Vector.svg'
import axios from 'axios'
import { httpForgetPassword, httpSignin } from '../../../utility/api/services/authConstants'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
// const Routes = [
//   ...ManageRoutes
// ]


const ForgotPassword = () => {
  // ** Hooks
//   const { skin } = useSkin()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const ability = useContext(AbilityContext)

const SignupSchema = yup.object().shape({
        
  // loginEmail: yup.string().min(3,' City Name must be at least 3 characters').max(20, 'City Name must be at most 3 chaaracters').required(),
  loginEmail: yup.string().email().required("Please enter your email"),
  // password: yup.string().required('Please enter your password'),
  // cityurdu: yup.string().required(),
  // province: yup.object().required(),
  // password: yup.number().typeError('Input number').required('Enter Code'),
  // status: yup.object().required()

})

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ mode:onchange, resolver:yupResolver(SignupSchema)})
//   const illustration = skin === 'dark' ? 'login-v2.svg' : 'login-v2.svg',
//     source = require(`@src/assets/images/pages/${illustration}`).default

//   const abilityData = [{ action: "manage", subject: "all" }]
  const [loading,setLoading]=useState(false)
  const [view,setView]=useState(false)

//   const [testLogin,setTestLogin]=useState(false)

  const onSubmit = data => {
    console.log('DATA::', data)
    if (Object.values(data).every(field => field.length > 0)) {

      setLoading(true)
        axios.post(httpForgetPassword,{ email: data.loginEmail })
        .then(async res => {
          const data=res
          console.log('LOGIN-DATA::', data)
          
          if(res.status!=200)
          {return toast.error("Please try again")}
          else{
            if(res.status==200 && data.data.status == 0){
              // your account does not exist
                toast.error(data.data.message)
                setLoading(false)
                setView(false)
              }else if(res.status==200 && data.data.status == 1){
                // Password Reset Link Has been generated and sent to your registered account
                toast.success(data.data.message)
                setLoading(false)
                setView(true)
              }
            // else{


            //     toast.success('Email sent Successfully')
            //     setLoading(false)
            //     setView(false)
            // }
          }
          }
          
        ).catch(err => {
          console.log(err)
          setLoading(false)
          setView(false)
          return toast.error("Invalid Email/Password")
        })
    } 
  }

  return (

    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Col  lg='6' sm='12' style={{backgroundColor:'#6E0C0D', height:'100vh'}}  className='d-none d-lg-flex align-items-center p-5' >

          <div className='w-100  '>
            {/* align-items-center justify-content-center px-5 d-lg-flex*/}
            <Row>
                <h2 style={{color:'white', padding:'2rem', marginLeft:'1rem'}}><b>CHIRP</b></h2>
            </Row>
            <Row>
                <img className='img-fluid' src={loginImg} style={{height:'50%', width:'50%', display:'block', marginLeft:'auto', marginRight:'auto'} } alt='Login Cover' />
            </Row>
            <Row>
                <p style={{lineHeight:'40px',font:'Poppins',color:'white', fontWeight:'500', fontSize:'40px', width:'70%', marginLeft:'6rem'}}>Stay Connected with friends and loved ones</p>
            </Row>
            {/* src={source} */}
          </div>
        </Col>
        {/* p-lg-5 */}
        {/*  style={{padding:'1.1rem'}} */}
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='6' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12' style={{width:'75%'}}>
            <CardTitle tag='h2' className='fw-bold mb-1' style={{textAlign:'center' ,fontWeight:'700',textAlign:'left',marginLeft:'2rem',   fontSize:'3rem', color:'#6A0C0D'}}>
              Reset your Password
            </CardTitle>
            <br/>
            <br/>
            <div  style={{padding:'1.1rem', paddingRight:'2rem', paddingLeft:'2rem'}}>
                <h4 className='mb-2'>Enter your email.</h4>

                <p style={{color:'#6A0C0D'}}>
                <small>
                    we will send a link on your email to reset your password
                </small></p>

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
                    

                    <Button type='submit'  block style={{height:'2.5rem', borderRadius:'7px',marginTop:'1.5rem', backgroundColor:'#6E0C0D', borderColor:'#6E0C0D'}}>
                    {
                      loading?
                      <Spinner size="sm"/>:
                        <div>
                        Send
                    </div>
                    }
                    </Button>
                    
                   </Form>
            </div>

          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ForgotPassword
