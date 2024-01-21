import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Profile/Profile';
import ProfileContainer from './Components/Profile/ProfileContainer';
import UsersContainer from './Components/Users/UsersContainer'
import DialogsContainer from './Components/Dialogs/DialogsContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HeaderContainer from './Components/Header/HeaderContainer';
import LoginPage from './Components/Login/Login';
import {connect} from "react-redux";
import {initializeApp} from "./Redux/AppReducer";
import Preloader from "./Components/common/Preloader/Preloader";

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp()
  }

  render() { // store и state приходят. state - где наши данные. store - функции диспатч и тд.

    if(!this.props.initialized) {
      return  <Preloader />
    }

    return (
        <BrowserRouter>
          <div className='app-wrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='app-wrapper-content'>
              <Routes>
                <Route path='/dialogs*' element={<DialogsContainer/>}/>
                {/* <Route path='/profile' element={<ProfileContainer />} /> */}
                <Route path='/profile/:userId?' element={<ProfileContainer/>}/>
                <Route path='/users' element={<UsersContainer/>}/>
                <Route path='/news' element={<Profile/>}/>
                <Route path='/music' element={<Profile/>}/>
                <Route path='/settings' element={<Profile/>}/>
                <Route path='/login' element={<LoginPage/>}></Route>
              </Routes>
            </div>
          </div>
        </BrowserRouter>
    ); // /:userId? - параметр, ? - необязательный.
  }
}

const mapStateToProps = (state) => {
  return {
    initialized: state.app.initialized
  }
}

export default connect(mapStateToProps, {initializeApp})(App);
