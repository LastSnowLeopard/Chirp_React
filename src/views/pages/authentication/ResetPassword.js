// ** React Imports
// import { useContext, useEffect } from 'react'
// , useNavigate
import { Link, useParams } from 'react-router-dom'

// ** Custom Hooks
// import { useSkin } from '@hooks/useSkin'
// import useJwt from '@src/auth/jwt/useJwt'

// // ** Third Party Components
// import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { Twitter, Mail, GitHub, HelpCircle, Coffee, X } from 'react-feather'

// // ** Actions
// import { handleLogin } from '@store/authentication'

// // ** Context
// import { AbilityContext } from '@src/utility/context/Can'

// ** Custom Components
// import Avatar from '@components/avatar'
import toast from 'react-hot-toast'
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
import Google from '../../../assets/images/pages/Google.svg'
import Facebook from '../../../assets/images/pages/Vector.svg'
import axios from 'axios'

import { useState, useEffect } from 'react'
// const Routes = [
//   ...ManageRoutes
// ]


import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { httpResetPassword, httpSignin, httpVerifyPassword } from '../../../utility/api/services/authConstants'


const ResetPassword = () => {
  // ** Hooks
//   const { skin } = useSkin()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const ability = useContext(AbilityContext)

const SignupSchema = yup.object().shape({
        
  // loginEmail: yup.string().min(3,' City Name must be at least 3 characters').max(20, 'City Name must be at most 3 chaaracters').required(),
  // loginEmail: yup.string().email().required("Please enter your email"),
  password: yup.string().required(),
  confirmpassword: yup.string().required(),
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
  } = useForm({mode:onchange, resolver:yupResolver(SignupSchema)})
//   const illustration = skin === 'dark' ? 'login-v2.svg' : 'login-v2.svg',
//     source = require(`@src/assets/images/pages/${illustration}`).default

//   const abilityData = [{ action: "manage", subject: "all" }]
  const [loading,setLoading]=useState(false)
  const [view,setView]=useState(false)

//   const [testLogin,setTestLogin]=useState(false)

const[goodMsg, setGoodMsg] = useState(false)
const[badMsg, setBadMsg] = useState(false)

let {id} = useParams()
console.log("IDDD:;;;", id)

useEffect(() => {

    axios.post(httpVerifyPassword,{user_id:id})
    .then(async res =>{
        const data = res
        console.log('DATA::', data)
        
        if(res.status!=200){
            toast.error('Please Try Again')
        }else{
            if(res.status==200 && data.data.data.validated==0 && data.data.status == 0){
             toast.warn(data.data.message)
                console.log("EXPP")
                setBadMsg(true)
                setGoodMsg(false)
            }else{
                setBadMsg(false)
                setGoodMsg(true)
                console.log("VVVV")
                
            }
        }
    })

}, [])

  
  const onSubmit = data => {
    console.log('DATA::', data)
    if (Object.values(data).every(field => field.length > 0)) {
        setLoading(true)
        let pass = data.password
        let confirmpass = data.confirmpassword
        if(pass === confirmpass){
        axios.post(httpResetPassword,{ user_id: id, password: data.password  })
        .then(async res => {
          const data=res
          console.log('LOGIN-DATA::', data)


          if(res.status==200){
            if(res.status==200 && data.data.status==1){
             
                console.log('REHRERH')
                toast.success(data.data.message)
                setLoading(false)
                // setView(true)
            }else{

            setLoading(false)
            }
          }
          }
          
        ).catch(err => {
          console.log('ERR',err)
          setLoading(false)
          setView(false)
          //  toast.error("Invalid Email/Password")
            })
        }
        else{
            toast.error('Password did not match')
            setLoading(false)
        }

      
        
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
            { badMsg  ?
            (
                <Alert color='danger' style={{marginTop:'0.5rem'}}>
                      <div className='alert-body'>
                        <span className='fw-bold'></span>
                        <span> Link Expired</span>
                      </div>
                </Alert>
            )
            : ''
            }
            {
                goodMsg ? 
                ( 
                    <>
                    {/* <Alert color='success' style={{marginTop:'0.5rem'}}>
                          <div className='alert-body'>
                            <span className='fw-bold'></span>
                            <span> Account verified successfully</span>
                          </div>
                    </Alert> */}
                <div  style={{padding:'1.1rem', paddingRight:'2rem', paddingLeft:'2rem'}}>
                <h4 className='mb-2'>Enter your New password</h4>
    
                <p style={{color:'#6A0C0D'}}>
                <small>
                    to change password enter your new password
                </small></p>
    
                <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-1'>
                    <div className='d-flex justify-content-between' style={{marginTop:'1rem'}}>
                        <Label className='form-label' for='login-password'>
                        Password
                        </Label>
                        {/* <Link to='/forgotPassword' style={{textDecoration:'none', color:'#6E0C0D'}}>
                        <small><b>Forgot?</b></small>
                        </Link> */}
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
                <div className='mb-1'>
                    <div className='d-flex justify-content-between' style={{marginTop:'1rem'}}>
                        <Label className='form-label' for='login-password'>
                        Confirm Password
                        </Label>
                        {/* <Link to='/forgotPassword' style={{textDecoration:'none', color:'#6E0C0D'}}>
                        <small><b>Forgot?</b></small>
                        </Link> */}
                    </div>
                    <Controller
                        id='confirmpassword'
                        name='confirmpassword'
                        control={control}
                        render={({ field }) => (
                        <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                        )}
                    />
                    </div>
    
                    <Button type='submit'  block style={{height:'2.5rem', borderRadius:'7px',marginTop:'1.5rem', backgroundColor:'#6E0C0D', borderColor:'#6E0C0D'}}>
                    {
                      loading?
                      <Spinner size="sm"/>:
                        <div>
                        Change Password
                    </div>
                    }
                    </Button>
                    
                   </Form>
                </div>
                    </>
                    )
                    : ''
            }
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default ResetPassword
