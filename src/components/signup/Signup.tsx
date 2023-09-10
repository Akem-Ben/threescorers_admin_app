import React, { useState } from 'react';
import './Signup.css'; 
import score from '../../assets/3Score.png';
import axios from "../../api/httpService";
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/ReactToastify.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface SignupState {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  repeat_password: string;
}

const Signup: React.FC = () => {
  const [signupData, setSignupData] = useState<SignupState>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    repeat_password: '',

  });
const navigate = useNavigate()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setshowRepeatPassword] = useState(false)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRepeatPasswordVisibility = () => {
    setshowRepeatPassword(!showRepeatPassword);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await axios.post('/sign-up/?adminId=1', signupData);
      toast.success(response.data.success);
      navigate('/login'); // Redirect to the login page upon successful signup
    } catch (error:any) {
      if (error.response) {
        toast.error(error.response.data.data);
      } else if (error.request) {
        toast.error('Network Error');
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <>
    <div id="signup-container">
      <div className="background-section">
      <div id="img-container">
    <img src={score}></img>
    </div>
        <span id="title">Create an Account</span>
        <p id="join">Join the community and have fun <br /> predicting!</p>
      </div>
      <div id="login-section">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label className="label" htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            className='input'
            name="firstName"
            placeholder="Enter your first name"
            value={signupData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className='input'
            placeholder="Enter your last name"
            value={signupData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className='input'
            placeholder="Choose a username"
            value={signupData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className='input'
            placeholder="Enter your email"
            value={signupData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-container">
  <label htmlFor="password">Password</label>
  <div className="password-input">
    <input
      type={showPassword ? 'text' : 'password'}
      id="password"
      name="password"
      className="input"
      placeholder="Enter your password"
      value={signupData.password}
      onChange={handleInputChange}
      required
    />
    <div className="eye-icon-container">
      {showPassword ? (
        <FaEyeSlash onClick={togglePasswordVisibility} className="eye-icon" />
      ) : (
        <FaEye onClick={togglePasswordVisibility} className="eye-icon" />
      )}
    </div>
  </div>
</div>

        <div className="input-container">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className='password-input'>
          <input
            type={showRepeatPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="repeat_password"
            className='input'
            placeholder="Confirm your password"
            value={signupData.repeat_password}
            onChange={handleInputChange}
            required
          />
          <div className="eye-icon-container">
      {showRepeatPassword ? (
        <FaEyeSlash onClick={toggleRepeatPasswordVisibility} className="eye-icon" />
      ) : (
        <FaEye onClick={toggleRepeatPasswordVisibility} className="eye-icon" />
      )}
    </div>
  </div>
        </div>
        <div id="btn">
        <button id="button">Sign Up</button>
        </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Signup;
