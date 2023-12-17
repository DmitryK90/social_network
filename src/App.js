import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = (props) => { // store и state приходят. state - где наши данные. store - функции диспатч и тд.
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/dialogs/*' element={<DialogsContainer />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/news' element={<Profile />} />
            <Route path='/music' element={<Profile />} />
            <Route path='/settings' element={<Profile />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
