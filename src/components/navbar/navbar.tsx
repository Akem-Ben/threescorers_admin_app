import React, { useState } from 'react';
import { Link, useHref, useNavigate } from 'react-router-dom';
import score from '../../assets/3Score.png';
import admins from '../../assets/admins.png';
import logout from '../../assets/Logout.png';
import overview from '../../assets/overview.png';
import users from '../../assets/users.png';
import './navbar.css'
const Navbar: React.FC = () => {
    const [activeItem, setActiveItem] = useState('page1');
    const navigate = useNavigate()
    const page_name = localStorage.getItem('page_name')
    let user:any = localStorage.getItem('user')
    user = JSON.parse(user)
  return (
    <>
    <div className="navbar-container">
        <div className='navbar-contents'>
        <p id="overview">{page_name}</p>
        <p className='name'>{user.firstName} {user.lastName} <br /><span id='role'>{user.role}</span></p>
        </div>
    </div>
    </>
  )
}

export default Navbar