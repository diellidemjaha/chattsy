import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate('');
 const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
});
    
 
const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
};

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:8000/api/register', user);

        if (response.status === 201) {
            console.log('Registration successful');

            // navigate('/login');
            window.location.href="/login"

        }
    } catch (error) {
        console.error('Login error:', error);
        console.log('Error response data:', error.response?.data); }
};
 
 
 
    return (
    <section className="vh-100 bg-secondary">
      <div className="container h-100 bg-light">
        <div className="row d-flex align-items-center justify-content-center h-100 m-5">
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
                <h1>Sign up to Chattsy</h1>
                <p>Already a user? <a href="/login">Sign in here</a></p>
              </div>
              {/* Name input */}
              <div className="form-outline mb-4">
                <input
                  type="text"
                  name="name"
                  id="form1Example13"
                  onChange={(e) => { handleChange(e) }}
                  className="form-control form-control-lg"
                />
                <label className="form-label" htmlFor="form1Example13">
                  Name and Lastname
                </label>
              </div>
              {/* Email input */}
              <div className="form-outline mb-4">
                <input
                  type="email"
                  name="email"
                  onChange={(e) => { handleChange(e) }}
                  id="form1Example13"
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
                  id="form1Example23"
                  onChange={(e) => { handleChange(e) }}
                  className="form-control form-control-lg"
                />
                <label className="form-label" htmlFor="form1Example23">
                  Password
                </label>
              </div>
              <div className="d-flex justify-content-around align-items-center mb-4">
                {/* Additional options */}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
