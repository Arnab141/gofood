// import React from 'react'
// import './ExplorMenu.css'
// import { menu_list } from '../../assets/frontend_assets/assets'


// const ExplorMenu = ({category,setCategory}) => {
//   return (
//     <div className='explor-menu' id='explor-menu'>
//         <h1>Explore our menu</h1>
//         <p className="explore-menu-text">Chose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy our cravings and elevate your dining experience, one delicious meal at a time. </p>
//         <div className="explor-menu-list">
//            {menu_list.map((item,index)=>{
//             return (
//                 <div key={index} onClick={()=>{setCategory(category===item.menu_name?"All":item.menu_name)}} className="explor-menu-list-item">
//                     <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
//                     <p>{item.menu_name}</p>
//                 </div>
//             )
//            })} 
//         </div>
//         <hr />
//     </div>
//   )
// }

// export default ExplorMenu







import React, { useRef } from 'react';
import './ExplorMenu.css';
import { menu_list } from '../../assets/frontend_assets/assets';

const ExplorMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  const handleScroll = (direction) => {
    if (menuRef.current) {
      const scrollAmount = 200; // Adjust as needed
      menuRef.current.scrollLeft += direction === "left" ? -scrollAmount : scrollAmount;
    }
  };

  return (
    <div className='explor-menu' id='explor-menu'>
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
      </p>

      <div className="explor-menu-container">
        <button className="scroll-btn left" onClick={() => handleScroll("left")}>&lt;</button>
        <div className="explor-menu-list" ref={menuRef}>
          {menu_list.map((item, index) => (
            <div key={index} onClick={() => setCategory(category === item.menu_name ? "All" : item.menu_name)} className="explor-menu-list-item">
              <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
              <p>{item.menu_name}</p>
            </div>
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => handleScroll("right")}>&gt;</button>
      </div>

      <hr />
    </div>
  );
}

export default ExplorMenu;
