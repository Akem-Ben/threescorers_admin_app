import './users.css'
import React, { useEffect, useState } from 'react';
import Sidebar from '../../sidebar/sidebar';
import Navbar from '../../navbar/navbar';
import Statusbar from '../../statusbar/statusbar';
import userImg from '../../../assets/userImg.png'
import axios from "../../../api/httpService";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Page2: React.FC = () => {
  const [userz, setUserz] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
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
    const filteredUsers = userz.filter((user:any) => {
      return user.role === 'user';
    });
    setFilteredUsers(filteredUsers);
  }, [userz]);
  return <>
  <div className='page-style'>
   <Sidebar />
   <div className='page-contents'>
   <Navbar />
   <div className='content-holder'>
   <div className='page-items'>
   <Statusbar />
   <section className='users-section'>
    <div className='heading'>Users' Names</div>
    <section className='scroll-section'>
    {filteredUsers.map((users:any) => (
    <div className='can'>
      <div className='holder'>
        <div className='profile-container'>
        <img className='userImg' src={userImg}></img>
        <div className='userName'>{users.firstName} {users.lastName}</div>
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

export default Page2;