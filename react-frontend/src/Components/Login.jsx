import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {

    const navigate = useNavigate('');
    const [user, setUser] = useState({ email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const headers = {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        };
    
        try {
          const response = await axios.post('http://localhost:8000/api/login', user, { headers });
    
          if (response.status === 200) {
            console.log('Login successful');
    
    
            const token = response.data.token;
            const userId = response.data.user_id;
    
    
            localStorage.setItem('token', token);
            localStorage.setItem('user_id', userId);
    
            window.location.href="/chat"
    
          }
        } catch (error) {
          console.error('Login error:', error);
          console.log('Error response data:', error.response?.data);
      }};

  return (
    <section className="vh-100 bg-secondary">
      <div className="container h-100 bg-light">
        <div className="row d-flex align-items-center justify-content-center h-100 p-5 m-5">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <form onSubmit={handleSubmit} method="POST">
              <div className="container mb-4">
                <h1>Sign in to Chattsy</h1>
                <p>Not a user? <a href="/register">Sign up here</a></p>
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  // id="form1Example13"
                  className="form-control form-control-lg"
                />
                <label className="form-label" htmlFor="form1Example13">
                  Email address
                </label>
              </div>
              {/* Password input */}
              <div className="form-outline mb-4">
                <input
                  type="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  // id="form1Example23"
                  className="form-control form-control-lg"
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign in
              </button>
              {/* Forgot password link */}
              {/* Uncomment the following line if you want to include a "Forgot password?" link */}
              {/* <a href="#!">Forgot password?</a> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
