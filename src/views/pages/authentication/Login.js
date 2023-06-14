import { Link } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import {  Coffee, X } from 'react-feather'
import InputPasswordToggle from '@components/input-password-toggle'

import { Row, Col, Form, Input, Label,  Button, CardText, CardTitle, Spinner } from 'reactstrap'

import loginImg from '../../../assets/images/pages/login.png'
import Google from '../../../assets/images/pages/Google.svg'
import Facebook from '../../../assets/images/pages/Vector.svg'
import axios from 'axios'
import { httpSignin } from '../../../utility/api/services/authConstants'
import AfterSignin from './AfterSignin'
import { useState } from 'react'


// const Routes = [
//   ...ManageRoutes
// ]
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import { useEffect } from 'react'

const Login = () => {
  const navigate = useNavigate()
  // ** Hooks
//   const { skin } = useSkin()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const ability = useContext(AbilityContext)

const SignupSchema = yup.object().shape({
        
  
  // loginEmail: yup.string().min(3,' City Name must be at least 3 characters').max(20, 'City Name must be at most 3 chaaracters').required(),
  loginEmail: yup.string().email().required("Please enter your email"),
  password: yup.string().required('Please enter your password'),
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
      const obj = {
        email: data.loginEmail, password: data.password 
      }
      console.log('OBJJJ', obj)
      setLoading(true)
        // if(obj.email == '' || obj.password == ''){
          // toast.error('Fill in the fields to procceed')
        // }else if(obj.email == ''){
          // toast.error('Enter email to procceed')
        // }else if(obj.password == ''){
          // toast.error('enter password to procceed')
        // }else{
            axios.post(httpSignin,(obj))
            .then(async res => {
              const data=res
              console.log('LOGIN-DATA::', data)

              if(data.data.status!=0){
                localStorage.setItem('userData',JSON.stringify(data.data.data))
              }

              if(data.data.status == 1){
                
                localStorage.setItem('baseURL','http://13.50.151.52/chrip')
                // console.log("Logged in Successfully")
                // toast.success(data.data.message.message);

                setLoading(false)
                navigate(`/home`)
                setView(true)
              }else if(data.data.status == 0){
                // console.log("Email or Password is Wrong")
                
                toast.error(data.data.message);
                setLoading(false)
                // setView(false)
              }
              else{
                // console.log("CALLED not")
                // toast.warn(data.data.message);
                setLoading(false)
                setView(false)
              }
              
              }
              
            ).catch(err => {
              console.log(err)
              setLoading(false)
              setView(false)
              // toast.error("Invalid Email/Password");
            })
        // }
       
    } 
  }

  useEffect(()=>{

    localStorage.setItem('baseURL','http://13.50.151.52/chrip')

  },[])

  return (
    <>
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
            <CardTitle tag='h2' className='fw-bold mb-1' style={{textAlign:'center' , fontSize:'2.5rem', color:'#6A0C0D'}}>
              Welcome Back!
            </CardTitle>
            <div  style={{padding:'1.1rem', paddingRight:'2rem', paddingLeft:'2rem'}}>
                <h4 className='mb-2'>Login to your account</h4>
            
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
                    <div className='d-flex justify-content-between' style={{marginTop:'1rem'}}>
                        <Label className='form-label' for='login-password'>
                        Password
                        </Label>
                        <Link to='/forgot-password' style={{textDecoration:'none', color:'#6E0C0D'}}>
                        <small><b>Forgot?</b></small>
                        </Link>
                    </div>
                    <Controller
                        id='password'
                        name='password'
                        control={control}
                        render={({ field }) => (
                          <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                        )}
                    />
                    </div>

                    <Button type='submit' color='primary'  block style={{borderRadius:'7px',marginTop:'1.5rem'}}>
                    {
                      loading?
                      <Spinner size="sm"/>:
                        <div>
                        Login now
                    </div>
                    }
                    </Button>
                   <div className='buttons1' >
                      <Button type='submit' color="secondary"  block style={{borderRadius:'7px',marginTop:'1.5rem'}}>
                            <img src={Google} style={{marginBottom:'0.2rem'}}/> &nbsp;
                            <span className='hideee' style={{marginLeft:'0.3rem'}}>Continue with Google</span>
                        </Button>
                        <Button type='submit' color='primary' block style={{marginTop:'1.5rem', borderRadius:'7px' }}>
                          <img src={Facebook} style={{marginBottom:'0.1rem'}}/> &nbsp;
                          <span className='hideee' style={{marginLeft:'0.3rem'}}>Continue with Facebook</span>     
                        </Button>
                   </div>
                    <p style={{ marginTop:'1rem', color:'grey', textAlign:'center'}}>Don't have an Account? <Link to='/signup' style={{textDecoration:'none', color:'#6E0C0D'}}>Sign Up</Link></p>
                </Form>
            </div>

          </Col>
        </Col>
      </Row>
      {view ? <AfterSignin/> : ''}
    </div>
   
    </>
  )
}

export default Login
