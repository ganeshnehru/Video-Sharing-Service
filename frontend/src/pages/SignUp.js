import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import '../style.css';

function SignUp(props) {
    // Fields
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [creditcard, setCredit] = useState('');
    const [creator, setCreator] = useState(false);

    const history = useHistory();

    const validateEmail = (email) => {
        return email.match(
            /^\S+@\S+$/
        );
      };

    // Check all fields are filled
    const isFilled = () => {
        return (name && username && email && password && cpassword && creditcard);
    }

    // Signup API call
    const signUp = async (e) => {
        const newAcc = {username, email, name, password, creditcard};

        const body = JSON.stringify(newAcc);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try{
        if(creator){
            const res = await axios.post('http://localhost:5000/api/v1/auth/creator/signup', body, config)
            if (res.status === 200) {
                console.log('Creator Signup success');
                return res.data;
            }
        }
        else{
            const res = await axios.post('http://localhost:5000/api/v1/auth/user/signup', body, config)
            if (res.status === 200) {
                console.log('User Signup success');
                return res.data;
            }
        }
        } catch (error) {

        } 

        return null;
    };

    // Handle Login Button Press
    const handleSignUp = async (e) => {
        if ( password !== cpassword) {
            alert('Passwords do not match.')
        }
        else if ( !validateEmail(email) ){
            alert('Enter valid email')
        }
        else if (await signUp(e)) {
            history.push('/signin');
        }
        else {
            alert('An eror occurred.')
        }
    }

    return(
        <div className='page'>
            <h2 className='form-title'>
                Sign Up
            </h2>
            <div className='form-center'>
                
                <div className='form-field'>
                    <label className='form-field-label' htmlFor='name'>
                        Name
                    </label>
                    <input
                        className='form-field-input'
                        placeholder='Enter your username'
                        name='name'
                        value={ name }
                        onChange={ (e) => {setName(e.target.value)} }
                    />
                </div>
                <div className='form-field'>
                    <label className='form-field-label' htmlFor='email'>
                        Email
                    </label>
                    <input
                        type='email'
                        className='form-field-input'
                        placeholder='Enter your email'
                        name='email'
                        value={ email }
                        onChange={ (e) => {setEmail(e.target.value)} }
                    />
                </div>
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
                        type='password'
                        value={ password }
                        onChange={ (e) => {setPassword(e.target.value)} }
                    />
                </div>
                <div className='form-field'>
                    <label className='form-field-label' htmlFor='cpassword'>
                        Confirm Password
                    </label>
                    <input
                        className='form-field-input'
                        placeholder='Enter your password'
                        name='cpassword'
                        type='password'
                        value={ cpassword }
                        onChange={ (e) => {setCPassword(e.target.value)} }
                    />
                </div>
                <div className='form-field'>
                    <label className='form-field-label' htmlFor='credit'>
                        Credit Card
                    </label>
                    <input
                        className='form-field-input'
                        placeholder='Enter your password'
                        name='credit'
                        value={ creditcard }
                        onChange={ (e) => {setCredit(e.target.value)} }
                    />
                </div>
                <div className='form-field'>
                    <label className='form-field-label' htmlFor='creator'>
                        Creator Account?
                    </label>
                    <input
                        className=''
                        name='creator'
                        type='checkbox'
                        checked={ creator }
                        onChange={ (e) => {setCreator(!creator)} }
                    />
                </div>
                <div className='form-button-div'>
                    <button className='form-button' disabled={!isFilled()} onClick={()=>handleSignUp(null)}>Sign Up</button>
                </div>
                <p className= 'redirect-text-holder'>
                    <Link className='redirect-text' to="/signin">Already have an account? Sign In!</Link>
                </p>
                
            </div>
        </div>
    );
}

export default SignUp;