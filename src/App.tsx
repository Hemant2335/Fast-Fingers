import React from 'react'
import Homepage from './Pages/Homepage'
import Typing from './Pages/Typing'
import Navbar from './Components/Navbar'
import Wrapper from './Components/Wrapper'

const App = () => {
  return (
    <div>
      <Wrapper>
      <Navbar/>
      <Homepage/>
      <Typing/>
      </Wrapper>
    </div>
  )
}

export default App
