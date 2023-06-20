import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Login= () => {

  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Perform login logic here
    // For demonstration purposes, let's assume the user is authenticated if the email and password are not empty
    if (email !== '' && password !== '') {
      // Simulating a successful login
      // You can replace this with your actual login logic
      // If the login is successful, redirect to home page
      history.push('/home');
    } else {
      setError('Invalid email or password');
    }
  };
  




  return (
    <>
  
<br />
<section className="vh-100"  >
      
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" >
            <div className="card-body p-md-5 ">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-1">Sign In</p>

                <form className="mx-1 mx-md-4 ">

                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-2">Sign in with</p>
                    <button type="button" className="btn btn-light btn-floating mx-1">
                    <i className="zmdi zmdi-google"></i>
                    </button>
                    <button type="button" className="btn btn-light btn-floating mx-1">
                    <i className="zmdi zmdi-linkedin"></i>
                    </button>
                    <button type="button" className="btn btn-light btn-floating mx-1">
                    <i className="zmdi zmdi-github"></i>
                    </button>
                  </div>
                  
                    <br />
                  
          <div className="form-outline mb-4">
          <i className="zmdi zmdi-account"></i>
            <input type="email" id="form3Example3" className="form-control form-control-lg"
              placeholder="Email address" autoComplete='off'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            {/* <label className="form-label" htmlfor="form3Example3"></label> */}
          </div>

          <div className="form-outline mb-3">
          <i className="zmdi zmdi-lock"></i>
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            {/* <label className="form-label" htmlhtmlfor="form3Example4"></label> */}
          </div>

                 

                  <div className="d-flex justify-content-between align-items-center">
            
            <div className="form-check mb-0">
              <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label className="form-check-label" htmlfor="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" className="text-body">Forgot password?</a>
          </div>


          {error && <p className="text-danger">{error}</p>}
          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg"
               onClick={handleLogin} >Login</button>

            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <NavLink to="/signup"
                className="link-danger">Register</NavLink></p>
          </div>

                  
                </form>


              </div>

              
              <div className="col-md-10 col-lg-5 col-xl-5 d-flex align-items-center order-1 order-lg-2">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"/>
              

              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



      
        




      
    </>
  )
}

export default Login
