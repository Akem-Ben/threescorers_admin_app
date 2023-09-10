import './admin.css'
import React, { useEffect, useState } from 'react';
import Sidebar from '../../sidebar/sidebar';
import Navbar from '../../navbar/navbar';
import Statusbar from '../../statusbar/statusbar';
import userImg from '../../../assets/userImg.png'
import axios from "../../../api/httpService";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Admins: React.FC = () => {
  const [admin, setAdmin] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("/get-users");
        const userData = response.data.data
        setAdmin(userData)
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
    const filteredUsers = admin.filter((user:any) => {
      return user.role === 'admin';
    });
    setFilteredUsers(filteredUsers);
  }, [admin]);
  return <>
  <div className='page-style'>
   <Sidebar />
   <div className='page-contents'>
   <Navbar />
   <div className='content-holder'>
   <div className='page-items'>
   <Statusbar />
   <section className='users-section'>
    <div className='heading'>Admins' Names</div>
    <section className='scroll-section'>
    {filteredUsers.map((admin:any) => (
    <div className='can'>
      <div className='holder'>
        <div className='profile-container'>
        <img className='userImg' src={userImg}></img>
        <div className='userName'>{admin.firstName} {admin.lastName}</div>
        </div>
        <div className='viewDetails'>View Details</div>
        </div>
      </div>
        ))}
      </section>
   </section>
    </div>
    </div>
    </div>
    </div>
    </>;
};

export default Admins;