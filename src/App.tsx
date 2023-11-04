import React from "react";
import Homepage from "./Pages/Homepage";
import Typing from "./Pages/Typing";
import Navbar from "./Components/Navbar";
import Wrapper from "./Components/Wrapper";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Wrapper>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/typing" element={<Typing />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </div>
  );
};

export default App;
