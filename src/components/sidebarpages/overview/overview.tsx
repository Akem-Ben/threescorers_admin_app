import './overview.css'
import React, { useEffect, useState } from 'react';
import Sidebar from '../../sidebar/sidebar'
import Navbar from '../../navbar/navbar';
import users from '../../../assets/users-icon.png';
import admin from '../../../assets/admin-icon.png';
import man from '../../../assets/man.jpeg'
import axios from "../../../api/httpService";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Overview: React.FC = () => {
  const [userz, setUserz] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredAdmins, setFilteredAdmin] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/get-users");
        const userData = response.data.data
        setUserz(userData)
        return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error:any) {
        if (error.response) {
          navigate('/login')
          localStorage.clear()
          toast.error(error.response.data.data);
        } else if (error.request) {
          navigate('/login')
          localStorage.clear()
          toast.error('Network Error');
        } else {
          navigate('/login')
          localStorage.clear()
          toast.error(error.message);
        }
      }
    };
    getUsers();
  }, []);
  useEffect(() => {
    const filteredAdmins = userz.filter((user:any) => {
      return user.role === 'admin';
    });
    setFilteredAdmin(filteredAdmins);
  }, [userz]);
  useEffect(() => {
    const filteredUsers = userz.filter((user:any) => {
      return user.role === 'user';
    });
    setFilteredUsers(filteredUsers);
  }, [userz]);
  return( <>
  <div className='page-style'>
   <Sidebar />
   <div className='page-contents'>
   <Navbar />
   <section className='main-contents'>
    <div className='card'>
      <div className='card-contents'>
        <div className='left-contents'>
          <p className='total'>TOTAL NUMBER OF USERS</p>
          <p className='number'>{filteredUsers.length}</p>
        </div>
        <div className='right-contents'>
        <img src={users} />
        </div>
      </div>
    </div>
    <div className='card2'>
      <div className='card-contents'>
        <div className='left-contents'>
          <p className='total'>TOTAL NUMBER OF ADMINS</p>
          <p className='number'>{filteredAdmins.length}</p>
        </div>
        <div className='right-contents'>
        <img src={admin}></img>
        </div>
      </div>
    </div>
    </section>
    <div id='listing'>
    <section className='check1'>
      <div className='lists1'>
      <p className='user-title'>
        List of Users
      </p>
      <div className='list-holder'>
        {filteredUsers.map((users:any) => (
        <div className='list-container'>
        <><div className='details'>
            <img className='user-image' src={man}></img>
            <p className='user-name'>{users.firstName} {users.lastName}</p>
          </div><div className='view'>View Details</div></>
        </div>
        ))}
      </div>
      </div>
    </section>
    <section className='check2'>
      <div className='lists2'>
      <p className='user-title'>
        List of Admins
      </p>
      <div className='list-holder'>
      {filteredAdmins.map((admins:any) => (
        <div className='list-container'>
        <><div className='details'>
        <img className='user-image' src={man}></img>
        <p className='user-name'>{admins.firstName} {admins.lastName}</p>
        </div>
        <div className='view'>View Details</div></>
        </div>
        ))}
      </div>
      </div>
    </section>
    </div>
    </div>
    </div>
    </>
  );
};

export default Overview;