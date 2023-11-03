import React from 'react'

const Homepage = () => {
  return (
    <div>
        <div className='h-[80vh] flex-col flex justify-center items-center'>
            <h1 className=' font-poppins font-bold text-[10vh]'>Where Fast Fingers Find Their Home</h1>
            <p className=' text-center font-poppins font-medium text-lg text-gray-400'>Where Fast Fingers Find Their Home" is the go-to platform for anyone seeking to improve their typing speed and accuracy.<br></br>
 From beginners to experts, our community welcomes you to enhance your typing skills and connect with like-minded enthusiasts.<br></br>
 Join us on this typing journey!</p>
            <div className='gap-[5vh] flex '>
            <button className='bg-[#E97451] px-[4vh] py-[2vh] rounded-md font-poppins font-medium mt-[5vh]'>Get Started</button>
            <button className='bg-[#E97451] px-[4vh] py-[2vh] rounded-md font-poppins font-medium mt-[5vh]'>Follow Us</button>
            </div>

        </div>
    </div>
  )
}

export default Homepage