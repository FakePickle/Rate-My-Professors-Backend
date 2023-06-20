import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom'
import axios from 'axios'; 



const Signup = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event) => {
    event.preventDefault();

    // Perform input validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Make an API request to your backend server's authentication endpoint
      const response = await axios.post('/api/signup', {
        name,
        email,
        password,
      });

      // Handle the response from the server
      // If the signup was successful, redirect the user or automatically log them in
      if (response.status === 200) {
        // Redirect the user to the login page
        // You can replace '/login' with the appropriate route for your application
        window.location.href = '/login';
      } else {
        setError('Signup failed'); // Display a generic error message
      }
    } catch (error) {
      // Handle any errors that occur during the API request
      setError('Signup failed'); // Display a generic error message
      console.error(error);
    }
  };





  return (
    <>  
    <br />
    
      <section className="vh-100"  >
        {/* <div style={{background-color: #eee;}}></div> */}
    <div className="container h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" >
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p className="text-center h1 fw-bold mb-1 mx-1 mx-md-4 mt-4">Sign up</p>

                <form onSubmit={handleSignup}>
          

       
          <div className="form-outline mb-1">
          <i className="zmdi zmdi-account"></i>
            <input type="text" id="form3Example3" className="form-control form-control-lg"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              
              />
            
            
          </div>

          <div className="form-outline mb-1">
          <i className="zmdi zmdi-email"></i>
            <input type="email" id="form3Example3" className="form-control form-control-lg"
              placeholder="Your Email"
              value={email}
             onChange={(e) => setEmail(e.target.value)}
              
              />
             
            
          </div>

      
          <div className="form-outline mb-1">
          <i className="zmdi zmdi-lock"></i>
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Enter password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            
          </div>

          <div className="form-outline mb-1">
          <i className="zmdi zmdi-lock"></i>
            <input type="password" id="form3Example4" className="form-control form-control-lg"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              
              />
            
          </div>


        

          <div className="text-center text-lg-start mt-4 pt-2">
            <button type="button" className="btn btn-primary btn-lg"
              >Sign Up</button>
            <p className="small fw-bold mt-2 pt-1 mb-0"><NavLink to="/login"
                className="link-danger">Already Have an Account</NavLink></p>
          </div>

          {error && (
             <div className="alert alert-danger mt-3" role="alert">
              {error}
             </div>
         )}
          

        </form>

              </div>
              <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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

export default Signup
