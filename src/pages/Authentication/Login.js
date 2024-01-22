import PropTypes from 'prop-types'
import MetaTags from 'react-meta-tags';
import React from "react"
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";


import { Row, Col, CardBody, Card, Alert, Container } from "reactstrap"
import { useEffect, useState } from "react";

// Redux
import { connect } from "react-redux"
import { withRouter, Link,useHistory } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// actions
import { loginUser, apiError } from "../../store/actions"

// import images
import logoSm from "../../assets/images/logo-sm.png";

function Login() {
  const [usernameVal, setusername] = useState("")
  const [passwordVal, setpasswordVal] = useState("")
  const [apiData, setapiData] = useState("")
  const [logindata, setlogindata] = useState({
    username:"",
    Password:""
  })
     const history=useHistory ()
  let userToken=localStorage.getItem("token");
  if(!userToken){
    //  history.push("/")
      // window.location.href = "/";
  }

  let endpoint = "http://localhost:0808/login"



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();




 async function handleLogin(obj){
  try {
    
    

    const res = await axios.post("http://localhost:0808/login",obj)
    console.log(res.data)
    
    if (res.data.login==="successfull") {
     toast.success(res.data.message)
     toast.success("Login successfull")
     localStorage.setItem("token",res.data.token);
     setTimeout(()=>{
      history.push("/dashboard")
     
      
     }
     
     ,3000);
     
    //  window.location.reload()


    } else {
        toast.error(res.data)
        
    }
    
} catch (error) {
    console.log(error.message)
}
 
}

  return (
    <React.Fragment>
      <ToastContainer />
      <MetaTags>
        <title>Login </title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
        <form onSubmit={handleSubmit((data) =>handleLogin(data))} class="form-signin ">
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={4}>
              <Card className="overflow-hidden">
                <div className="bg-primary">
                  <div className="text-primary text-center p-4">
                    <h5 className="text-white font-size-20">
                      Welcome Back !
                        </h5>
                    <p className="text-white-50">
                      Sign in to continue to Veltrix.
                        </p>
                    <Link to="/" className="logo logo-admin">
                      <img src={logoSm} height="24" alt="logo" />
                    </Link>
                  </div>
                </div>

                <CardBody className="p-4">
                  <div className="p-3">
                   
                      
                      <label for="inputEmail" class="sr-only">Email address</label>
       <input {...register('username', { required: true })} type="email"
        id="inputEmail"
        class="form-control mt-3"
        placeholder="Email address"
        value={usernameVal}
        onChange={(event) => {
          setusername(event.target.value)
      }}
          ></input>
       {/* {errors.username && <p className='text-danger'>Enter you Email address </p>} */}
       <label for="inputPassword" class="sr-only">Password</label>
       <input {...register('Password',{required:true} )} 
       type="password"
        id="inputPassword"
         class="form-control mt-3"
          placeholder="Password"
          value={passwordVal}
          onChange={(event) => {
            setpasswordVal(event.target.value)
        }}
          
          ></input>
       {/* {errors.Password && <p className='text-danger'>Enter you Password</p>} */}

                      {/* <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          value={usernameVal}
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          value={passwordVal}
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div> */}

                      <Row className="mb-3">
                        <Col sm={6}>
                          <div className="form-check mt-3">
                            <input type="checkbox" className="form-check-input" id="customControlInline" />
                            <label className="form-check-label" htmlFor="customControlInline">Remember me</label>
                          </div>
                        </Col>
                        <Col sm={6} className="text-end mt-3">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Log In
                              </button>
                        </Col>
                      </Row>
                      <Row className="mt-2 mb-0 row">
                        <div className="col-12 mt-4">
                          <Link to="/forgot-password">
                            <i className="mdi mdi-lock"></i> Forgot your
                                password?
                              </Link>
                        </div>
                      </Row>
                      
                    
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&#39;t have an account ?{" "}
                  <Link
                    to="register"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Veltrix. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
          </form>
        </Container>
      </div>
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  const { error } = state.Login
  return { error }
}

export default withRouter(
  connect(mapStateToProps, { loginUser, apiError })(Login)
)

// Login.propTypes = {
//   error: PropTypes.any,
//   history: PropTypes.object,
//   loginUser: PropTypes.func,
// }