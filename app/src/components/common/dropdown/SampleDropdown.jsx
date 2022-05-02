import React, {useState, useRef, useEffect} from 'react'
import "./sampleDropdown.css"
import { useDetectOutsideClick } from './useDetectOutsideClick';


function SampleDropdown() {
    const dropdownRef = useRef(null);
    // const [isActive, setIsActive] = useState(false);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);

    const onClick = () => setIsActive(!isActive);
  
    // useEffect(() => {
    //     const pageClickEvent = (e) => {
    //         // If the active element exists and is clicked outside of
    //         if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
    //             setIsActive(!isActive);
    //         }
    //     };
      
    //     // If the item is active (ie open) then listen for clicks
    //     if (isActive) {
    //       window.addEventListener('click', pageClickEvent);
    //     }
      
    //     return () => {
    //       window.removeEventListener('click', pageClickEvent);
    //     }
      
    // }, [isActive]);


    return (
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>User</span>
          <img src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg" alt="User avatar" />
        </button>
        <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
          <ul>
            <li><a href="/messages">Messages</a></li>
            <li><a href="/trips">Trips</a></li>
            <li><a href="/saved">Saved</a></li>
          </ul>
        </nav>
      </div>
    );
}

export default SampleDropdown
