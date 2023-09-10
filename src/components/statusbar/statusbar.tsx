// import './statusbar.css'
// import SearchIcon from '@mui/icons-material/Search';
// import React, { useEffect, useState } from 'react'

// const Statusbar: React.FC = () => {
//     return( <>
//     <div className='main-container'>
//         <div className='search-bar'>
//             <SearchIcon className='search-icon' />
//         <input
//             type="text"
//             name="search"
//             placeholder="Search for User"
//             // onChange={handleInputChange}
//             className='search-input'
//           />
//         </div>
//     </div>
//     </>
//     )
// }

// export default Statusbar
import './statusbar.css';
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from 'react';

const Statusbar: React.FC = () => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('All');
    const options = ['All', 'Active', 'Inactive'];
  
    const handleOptionChange = (option: string) => {
        setSelectedOption(option);
        setDropdownOpen(false);
    }
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
      };

  return (
    <>
      <div className='main-container'>
        <div className='search-bar'>
          <div className='search-icon-container'>
            <SearchIcon className='search-icon' />
          </div>
          <input
            type='text'
            name='search'
            placeholder='Search for User'
            // onChange={handleInputChange}
            className='search-input'
          />
        </div>
        <div className='dropdown'>
            <div className='dropdown-contents'>
          <button className='dropdown-button' onClick={toggleDropdown}>
            {selectedOption} {isDropdownOpen ? '▲' : '▼'}
          </button>
          {isDropdownOpen && (
            <div className='dropdown-content'>
              {options.map((option) => (
                <div
                  key={option}
                  className={`dropdown-item ${
                    selectedOption === option ? 'selected' : ''
                  }`}
                  onClick={() => handleOptionChange(option)}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Statusbar;
