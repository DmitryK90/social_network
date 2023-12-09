import React from 'react';
import './App.css';
import Header from './Components/Header/Header';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import Dialogs from './Components/Dialogs/Dialogs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = (props) => {
  return (
    <BrowserRouter>
      <div className='app-wrapper'>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path='/dialogs/*' element={<Dialogs dialogsPage={props.state.dialogsPage} dispatch = {props.dispatch} />} />
            <Route path='/profile' element={<Profile profilePage={props.state.profilePage} dispatch = {props.dispatch} />} />
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
