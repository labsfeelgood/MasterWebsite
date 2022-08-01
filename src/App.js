
import React, { useEffect, useState } from "react";
import { HashRouter, Route } from 'react-router-dom';

import Page1 from "./projects/omnichain/components/Page1";
import Page2 from "./projects/omnichain/components/Page2";
import { Link } from 'react-router-dom'
import { Routes } from 'react-router-dom'



const App = () => {
 

  return (
    <div>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/page1'>page1</Link></li>
        <li><Link to='/page2'>page2</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route exact path='/' element={<Page1/>}/>
      <Route path='/page1' element={<Page1/>}/>
      <Route path='/page2' element={<Page2/>}/>
    </Routes>
    </div>


  );
};

export default App;