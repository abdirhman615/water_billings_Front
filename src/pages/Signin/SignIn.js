import React from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
 import { useHistory } from "react-router-dom";
import { withRouter, Link,  } from "react-router-dom"

import { ToastContainer, toast } from 'react-toastify';
// import { MDBSpinner } from 'mdb-react-ui-kit';
import { useEffect, useState } from "react";

// import SweetAlert from 'react-bootstrap-sweetalert';
// import { First } from "react-bootstrap/esm/PageItem";

// import {
//   Container,
//   Col,
//   Row,
//   Button,
//   MDBIcon,
//   MDBInput,
//   MDBCheckbox
// }
// from 'mdb-react-ui-kit';
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  
} from 'reactstrap';

function SignIn() {
  const [usernameVal, setusername] = useState("")
  const [passwordVal, setpasswordVal] = useState("")
  const [apiData, setapiData] = useState("")
     const history=useHistory ()
  let userToken=localStorage.getItem("token");
  if(!userToken){
     history.push("/")
     window.location.href = "/";
  }

  let endpoint = "http://localhost:0808/login"



  const {
    register,
     handleSubmit,
    formState: { errors },
  } = useForm();




 async function handleLogin(obj){
  try {
    
    

    const res = await axios.post(endpoint, obj)
    console.log(res.data)
    
    if (res.data.login==="successfull") {
     toast.success(res.data.message)
     toast.success("Login successfull")
     localStorage.setItem("token",res.data.token);
     setTimeout(()=>{
      history.push("/Dashboard")
     
      
     }
     
     ,3000);
     
    //  window.location.reload()


    } else {
        toast.error(res.data)
        
    }
    
} catch (error) {
    console.log(error.message)
}
  console.log("obj",obj);
}



  return (
    <Container>
      
      <ToastContainer />
    <Container fluid className="p-3 my-5">

      <Row>

        <Col col='10' md='6'>
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
        </Col>

        <Col col='4' md='6'>
        <form onSubmit={handleSubmit((data) =>handleLogin(data))} class="form-signin ">
        
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
       <input {...register('username', { required: true })} type="email"
        id="inputEmail"
        class="form-control"
        placeholder="Email address"
        value={usernameVal}
        onChange={(event) => {
          setusername(event.target.value)
      }}
          ></input>
       {errors.username && <p className='text-danger'>Enter you Email address </p>}
       <label for="inputPassword" class="sr-only">Password</label>
       <input {...register('Password',{required:true} )} 
       type="password"
        id="inputPassword"
         class="form-control"
          placeholder="Password"
          value={passwordVal}
          onChange={(event) => {
            setpasswordVal(event.target.value)
        }}
          
          ></input>
       {errors.Password && <p className='text-danger'>Enter you Password</p>}
       

       

          {/* <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
          <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/> */}


          <div className="d-flex justify-content-between mx-4 mb-4">
            {/* <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' /> */}
            <a href="!#">Forgot password?</a>
          </div>

          <button type="submit" className="mb-4 w-100 bg-primary fw-bold text-white border-primary p-1 fs-4 "style={{borderRadius:'10px',borderColor:null}} size="lg">Sign in</button>
 
          <div className="divider   my-2">
            <p className="text-center fw-bold align-center mb-3 mb-0 ">OR</p>
          </div>

          <button className="mb-4 w-100 fw-bold text-white  p-1 fs-4"style={{borderRadius:'10px',backgroundColor:"#3b5998",borderColor:"#3b5998"}} size="lg">
            {/* <MDBIcon fab icon="facebook-f" className="mx-2"/> */}

            Continue with facebook
          </button>

          <Button className="mb-4 w-100 fw-bold text-white border-primary p-1 fs-4"style={{borderRadius:'10px',backgroundColor:"#55acee",borderColor:"#55acee "}} size="lg">
            {/* <MDBIcon fab icon="twitter" className="mx-2"/> */}
            Continue with twitter
          </Button>
          </form>

        </Col>
       

      </Row>

    </Container>
    </Container>
  );
}


export default SignIn;









// import React from 'react';
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import { Col,Container, Row, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap"

// import { usehistory } from "react-router-dom";
// import { ToastContainer, toast } from 'react-toastify';
// // import { MDBSpinner } from 'mdb-react-ui-kit';
// import { useEffect, useState } from "react";

// // import SweetAlert from 'react-bootstrap-sweetalert';
// // import { First } from "react-bootstrap/esm/PageItem";

// // import {
// //   containar,
// //   Col,
// //   Row,
// //   button,
// //   i,
// //   MDBInput,
// //   checkbox
// // }
// // from 'mdb-react-ui-kit';
// // import { Container } from 'react-bootstrap';

// function SignIn() {
//   const [usernameVal, setusername] = useState("")
//   const [passwordVal, setpasswordVal] = useState("")
//   const [apiData, setapiData] = useState("")
//   // const navigate=useNavigate()
//   // let userToken=localStorage.getItem("token");
//   // if(!userToken){
//   //   navigate("/")
//   //   // window.location.href = "/";
//   // }

//   let endpoint = "http://localhost:0808/login"



//   // const {
//   //   register,
//   //    handleSubmit,
//   //   formState: { errors },
//   // } = SignIn();




//  async function handleLogin(obj){
//   try {
    
    

//     const res = await axios.post(endpoint, obj)
//     console.log(res.data)
    
//     if (res.data.login==="successfull") {
//      toast.success(res.data.message)
//      toast.success("Login successfull")
//      localStorage.setItem("token",res.data.token);
//      setTimeout(()=>{
//       navigate("/Dashboard")
     
      
//      }
     
//      ,5000);
     
//     //  window.location.reload()


//     } else {
//         toast.error(res.data)
        
//     }
    
// } catch (error) {
//     console.log(error.message)
// }
//   console.log("obj",obj);
// }



//   return (
//     <Container>
      
//       <ToastContainer />
//     <containar fluid className="p-3 my-5">

//       <Row>

//         <Col col='10' md='6'>
//           <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" class="img-fluid" alt="Phone image" />
//         </Col>

//         <Col col='4' md='6'>
//         <form  class="form-signin ">
        
//         <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
//       <label for="inputEmail" class="sr-only">Email address</label>
//        <input  type="email"
//         id="inputEmail"
//         class="form-control"
//         placeholder="Email address"
//         value={usernameVal}
//         onChange={(event) => {
//           setusername(event.target.value)
//       }}
//           ></input>
//        {errors.username && <p className='text-danger'>Enter you Email address </p>}
//        <label for="inputPassword" class="sr-only">Password</label>
//        <input {...register('Password',{required:true} )} 
//        type="password"
//         id="inputPassword"
//          class="form-control"
//           placeholder="Password"
//           value={passwordVal}
//           onChange={(event) => {
//             setpasswordVal(event.target.value)
//         }}
          
//           ></input>
//        {errors.Password && <p className='text-danger'>Enter you Password</p>}
       

       

//           {/* <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"/>
//           <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg"/> */}


//           <div className="d-flex justify-content-between mx-4 mb-4">
//             <checkbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
//             <a href="!#">Forgot password?</a>
//           </div>

//           <button type="submit" className="mb-4 w-100 bg-primary fw-bold text-white border-primary p-1 fs-4 "style={{borderRadius:'10px',borderColor:null}} size="lg">Sign in</button>
 
//           <div className="divider   my-2">
//             <p className="text-center fw-bold align-center mb-3 mb-0 ">OR</p>
//           </div>

//           <button className="mb-4 w-100 fw-bold text-white  p-1 fs-4"style={{borderRadius:'10px',backgroundColor:"#3b5998",borderColor:"#3b5998"}} size="lg">
//             <i fab icon="facebook-f" className="mx-2"/>
//             Continue with facebook
//           </button>

//           <button className="mb-4 w-100 fw-bold text-white border-primary p-1 fs-4"style={{borderRadius:'10px',backgroundColor:"#55acee",borderColor:"#55acee "}} size="lg">
//             <i fab icon="twitter" className="mx-2"/>
//             Continue with twitter
//           </button>
//           </form>

//         </Col>
       

//       </Row>

//     </containar>
//     </Container>
//   );
// }


// export default SignIn;
