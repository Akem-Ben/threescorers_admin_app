import React, { useState } from 'react';
import { Link, useHref, useNavigate } from 'react-router-dom';
import score from '../../assets/3Score.png';
import admins from '../../assets/admins.png';
import logout from '../../assets/Logout.png';
import overview from '../../assets/overview.png';
import users from '../../assets/users.png';
import './sidebar.css'
const Sidebar: React.FC = () => {
    const [activeItem, setActiveItem] = useState('Overview');
    const navigate = useNavigate()
    const handleItemClick = (itemName:any) => {
     itemName === 'logout' ? (navigate('/login'), localStorage.clear()) : navigate(`/${itemName}`);
     localStorage.setItem('page_name', itemName)
      setActiveItem(itemName);
    };
  return (
    <div className="sidebar-container">
        
<div id="img-container">
    <img src={score}></img>
    </div>
    <div id='line'></div>
      <ul className='unordered' style={{ listStyle: 'none' }}>
        <li className='list-items' onClick={() => handleItemClick('Overview')}>
        {/* //   className={activeItem === 'page1' ? 'active-list-item' : ''}> */}
        <img src={overview}></img>
        Overview
        </li>
        <li className='list-items' onClick={() => handleItemClick('Users')}>
        {/* //   className={activeItem === 'page2' ? 'active-list-item' : ''} id='lists'> */}
        <img src={users}></img>
        Users
        </li>
        <li className='list-items' onClick={() => handleItemClick('Admins')}>
        {/* //   className={activeItem === 'page3' ? 'active-list-item' : ''} id='lists'> */}
        <img src={admins}></img>
        Admins
        </li>
        <li className='list-items' onClick={() => handleItemClick('logout')}>
        {/* //   className={activeItem === 'page4' ? 'active-list-item' : ''} id='lists'> */}
        <img src={logout}></img>
        Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
