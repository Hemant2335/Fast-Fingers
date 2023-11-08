import React from 'react'
import Logo from '../assets/Creative.png'
import {useNavigate} from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();

  return (
    <div className='flex justify-between h-[12vh] items-center'>

        {/* LOGO */}
        <div>
            <img src={Logo} alt="Logo" className='h-[20vh]'/>
        </div>

        {/* LIST */}
        <div>
            <ul className='flex gap-[4vh]'>
                <li className=' font-poppins font-medium cursor-pointer hover:text-[#E97451] transition-transform' onClick={()=>{navigate("/")}}>Home</li>
                <li className=' font-poppins font-medium cursor-pointer  hover:text-[#E97451] transition-transform' onClick={()=>{navigate("/typing")}}>Typing</li>
                <li className=' font-poppins font-medium cursor-pointer  hover:text-[#E97451] transition-transform'>Contact</li>
            </ul>
        </div>

        {/* LOGIN */}
        <div>
            <button className='bg-[#E97451] px-[4vh] py-[1.2vh] rounded-md font-poppins font-medium'>Login</button>
        </div>
    </div>
  )
}

export default Navbar