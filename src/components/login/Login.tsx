import React, { useState } from 'react';
import './Login.css';
import score from '../../assets/3Score.png';
import axios from "../../api/httpService";
import {toast, ToastContainer} from "react-toastify"
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

interface LoginState {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [signupData, setSignupData] = useState<LoginState>({
    email: '',
    password: '',
  });
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
   };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('/login', signupData);
      console.log('login res', response.data.data)
      toast.success("login successful");
      localStorage.setItem('token', response.data.accessToken)
      localStorage.setItem('user', JSON.stringify(response.data.data))
      localStorage.setItem('page_name', 'Overview')
      navigate('/overview');
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
    <div className="log-container">
    <div id="img-container">
    <img src={score}></img>
    </div>
      <div className="log-section">
        <div className='input-section'>
          <form onSubmit={handleSubmit}>
        <div className="inpt-container">
          <label className='label' htmlFor="email">Email Address</label>
          <input
            type="email"
            id="log-email"
            name="email"
            placeholder="email"
            value={signupData.email}
            onChange={handleInputChange}
            className='common-input'
            required
          />
        </div>
        <div className="input-container">
  <label className='label' htmlFor="password">Password</label>
  <div className="password-input">
    <input
      type={showPassword ? 'text' : 'password'}
      id="password"
      name="password"
      className="common-input"
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
        <div id="log-btn">
        <button id='button'>Login</button>
        </div>
        </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
