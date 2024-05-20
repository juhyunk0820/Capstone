// import LandingPage from './LandingPage';
// import './App.css';

// const App = () => {
//     return (
//         <div>  
//                 <LandingPage />
//         </div>
//     );
// };

// export default App;


// App.js

import React from 'react';
import Main from '../Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../Component/Login/Login';
import Signup from '../Component/Login/Signup';
// import Mypage from './Component/Mypage/Mypage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        {/* <Route path='/mypage' element={<Mypage />} /> */}
      </Routes>
    </div>
  )
}

export default App;