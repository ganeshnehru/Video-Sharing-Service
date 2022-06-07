import React from 'react';
import {  Link } from "react-router-dom";
import LoginProfile from './LoginProfileIcon';

import '../style.css';

function Navbar(props) {
  if (sessionStorage.getItem('Subfluence')){
    if (sessionStorage.getItem('Subfluence-type') === 'User'){
      //USER NAVBAR
      return (
        <div className='navbar-div'>
          <h1 className='navbar-left'>
          <Link to="/"><img className='logo' src="/logo.png"/></Link>
          </h1>
          <div className='navbar-mid-div'>
          <p className='navbar-center'>
            <Link to="/">Home</Link>
          </p >
          <p className='navbar-center'>
            <Link to="/following">Following List</Link>
          </p>
          {/* <p className='navbar-center'>
            <Link to="/creators">Find Creators</Link>
          </p> */}
          <p className='navbar-center'>
            <Link to="/search">Search</Link>
          </p >
          <p className='navbar-center'>
            <Link to="/messages">Messages</Link>
          </p >
          </div>
          <LoginProfile />
        </div>
        );
    }
    else{
      //CREATOR NAVBAR
      return (
        <div className='navbar-div'>
          <h1 className='navbar-left'>
          <Link to="/"><img className='logo' src="/logo.png"/></Link>
          </h1>
          <div className='navbar-mid-div'>
          <p className='navbar-center'>
            <Link to="/">Home</Link>
          </p>
          <p className='navbar-center'>
            <Link to="/upload">Upload</Link>
          </p >
          <p className='navbar-center'>
            <Link to="/search">Search</Link>
          </p >
          <p className='navbar-center'>
            <Link to="/messages">Messages</Link>
          </p >
          </div>
          <LoginProfile />
        </div>
        );
    }
  }
  else{
    //NOT LOGGED IN NAVBAR
    return (
      <div className='navbar-div'>
        <h1 className='navbar-left'>
        <Link to="/"><img className='logo' src="logo.png"/></Link>
        </h1>
        {/* <div className='navbar-mid-div'>
        <p className='navbar-center'>
          <Link to="/">Home</Link>
        </p>
        </div> */}
        <LoginProfile />
      </div>
      );
  }
}

export default Navbar;