import { BrowserRouter } from "react-router-dom";
import React from 'react';

import { About, Contact, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import SectionDebug from './components/SectionDebug';

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Tech />
        <Works />
        <Feedbacks />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
      </div>
      <SectionDebug />
    </BrowserRouter>
  );
}

export default App;
