import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import '../style.css';

function SignIn(props) {
    // Fields
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    // Check all fields are filled
    const isFilled = () => {
        return (username && password);
    }

    // Clear Fields
    const clearState = () => {
        setUsername('');
        setPassword('');
    };

    // Login API call
    const login = async (e) => {
        const creds = {
            username, password
        };

        const body = JSON.stringify(creds);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/user/login', body, config)
            if (res.status === 200) {
                console.log('Login success');
                const decoded = jwt_decode(res.data.token.split('.')[1], { header: true });
                sessionStorage.setItem("Subfluence", decoded.user._id);                   
                sessionStorage.setItem("Subfluence-user", decoded.user.username);
                sessionStorage.setItem("Subfluence-name-of-user", decoded.user.name);
                sessionStorage.setItem("Subfluence-subscribed", decoded.user.subscribed);
                sessionStorage.setItem("Subfluence-type", "User");
                return res.data;
            }
        } catch (error) {
            //console.log(error);
        }

        try {
            const res = await axios.post('http://localhost:5000/api/v1/auth/creator/login', body, config)
            if (res.status === 200) {
                console.log('Login success');
                const decoded = jwt_decode(res.data.token.split('.')[1], { header: true });
                sessionStorage.setItem("Subfluence", decoded.user._id);                   
                sessionStorage.setItem("Subfluence-user", decoded.user.username);
                sessionStorage.setItem("Subfluence-type", "Creator");
                return res.data;
            }
        } catch (error) {
            //console.log(error);
        }

        return null;
    };

    // Handle Login Button Press
    const handleLogin = async (e) => {
        if (await login(e)) {
            history.push('/');
            window.location.reload(false);
        }
        else {
            clearState();
            alert('Invalid Email or Password.')
        }
    }

    return(
        <div className='page'>
            <h2 className='form-title'>
                Sign In
            </h2>
            <div className='form-center'>
               
                <div className='form-field'>
                    <label className='form-field-label' htmlFor='username'>
                        Username
                    </label>
                    <input
                        className='form-field-input'
                        placeholder='Enter your username'
                        name='username'
                        value={ username }
                        onChange={ (e) => {setUsername(e.target.value)} }
                    />
                </div>
                <div className='form-field'>
                    <label className='form-field-label' htmlFor='password'>
                        Password
                    </label>
                    <input
                        className='form-field-input'
                        placeholder='Enter your password'
                        name='password'
                        value={ password }
                        type='password'
                        onChange={ (e) => {setPassword(e.target.value)} }
                    />
                </div>
                <div className='form-button-div'>
                    <button className='form-button' disabled={!isFilled()} onClick={() =>handleLogin(null)}>Sign In</button>
                </div>
                <p className= 'redirect-text-holder'>
                    <Link className='redirect-text' to="/signup">Don't have an account? Sign Up!</Link>
                </p>
                
            </div>
        </div>
    );
}

export default SignIn;