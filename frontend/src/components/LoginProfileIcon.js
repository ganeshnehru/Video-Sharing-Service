import React from 'react';
import { useHistory, Link } from "react-router-dom";

function LoginProfile(props) {
    const history = useHistory();

    const signOut = () => {
        sessionStorage.removeItem('Subfluence'); 
        sessionStorage.removeItem('Subfluence-user'); 
        sessionStorage.removeItem('Subfluence-type'); 
        history.push("/");
        window.location.reload(false);
    }

    if(sessionStorage.getItem('Subfluence')){
        return (
            <p className='navbar-right'>
                <Link to="/profile">Profile |</Link>
                <Link to="/" onClick={()=>{signOut()}}> Sign Out</Link>
            </p>
        );
    }
    else {
        return (
            <p className='navbar-right'>
                <Link to="/signin">Sign In |</Link>
                <Link to="/signup"> Sign Up</Link>
            </p>
        );
    }
}

export default LoginProfile;