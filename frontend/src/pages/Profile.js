import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import SubStatus from '../components/SubStatus';

import '../style.css';

function Profile(props) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [card, setCard] = useState('');
    const [followers, setFollowers] = useState(0);
    const [content, setContent] = useState(0);

    const history = useHistory();

    // api call to get user info
    const getUser = async (username) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try{
            const res = await axios.get(`http://localhost:5000/api/v1/users/${username}`, config);
            if (res.status === 200){
                setName(res.data.name);
                setUsername(res.data.username);
                setEmail(res.data.email);
                setCard(res.data.creditcard);
                console.log('profile grabbed successfully');
            }
            else {
                history.push('/');
                alert("failed to retrieve user data");
            }
        } catch (error) {
            console.log(error);
            history.push('/');
            alert("failed to retrieve user data");
        }
    }

    // api call to get creator info
    const getCreator = async (username) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try{
            const res = await axios.get(`http://localhost:5000/api/v1/creators/${username}`, config);
            if (res.status === 200){
                setName(res.data.name);
                setUsername(res.data.username);
                setEmail(res.data.email);
                setCard(res.data.creditcard);
                setFollowers(res.data.followers.length);
                setContent(res.data.content.length);
                console.log('profile grabbed successfully');
            }
            else {
                history.push('/');
                alert("failed to retrieve user data");
            }
        } catch (error) {
            console.log(error);
            history.push('/');
            alert("failed to retrieve user data");
        }
    }

    // Check if signed in
    if (sessionStorage.getItem('Subfluence')){
        // Profile for Users
        if (sessionStorage.getItem('Subfluence-type') === 'User'){
            getUser(sessionStorage.getItem("Subfluence-user"));
            return (
                <div className='page'>
                <div className='profile-div'>
                    <h1 className='big-title-sub'> Profile </h1>
                    <div className='profile-filler'></div>
                    <div className='profile-field'>
                        <h2 className='profile-field-label'> Name </h2>
                        <p className='profile-field-value'> {name} </p>
                    </div>
                    <div className='profile-filler'></div>
                    <div className='profile-field'>
                        <h2 className='profile-field-label'> Username </h2>
                        <p className='profile-field-value'> {username} </p>
                    </div>
                    <div className='profile-filler'></div>
                    <div className='profile-field'>
                        <h2 className='profile-field-label'> Email </h2>
                        <p className='profile-field-value'> {email}</p>
                    </div>
                    <div className='profile-filler'></div>
                    <div className='profile-field'>
                        <h2 className='profile-field-label'> Credit Card </h2>
                        <p className='profile-field-value'> {card} </p>
                    </div>
                    <div className='profile-filler-2'></div>
                    <SubStatus />
                </div>
                </div>
            );
        }
        // Profile for creators
        else {
            getCreator(sessionStorage.getItem("Subfluence-user"));
            return (
                <div className='page'>
                <div className='profile-div'>
                    <h1 className='big-title-sub'> Profile </h1>
                    <div className='profile-filler'></div>
                    <div className='profile-field'>
                        <h2 className='profile-field-label'> Name </h2>
                        <p className='profile-field-value'> {name} </p>
                    </div>
                    <div className='profile-filler'></div>
                    <div className='profile-field'>
                        <h2 className='profile-field-label'> Username </h2>
                        <p className='profile-field-value'> {username} </p>
                    </div>
                    <div className='profile-filler'></div>
                    <div className='profile-field'>
                        <h2 className='profile-field-label'> Email </h2>
                        <p className='profile-field-value'> {email}</p>
                    </div>
                    <div className='profile-filler'></div>
                    <div className='profile-field'>
                        <h2 className='profile-field-label'> Credit Card </h2>
                        <p className='profile-field-value'> {card} </p>
                    </div>
                    <div className='profile-filler'></div>
                    <div className='profile-field'>
                        <h2 className='profile-field-label'> Followers </h2>
                        <p className='profile-field-value'> {followers} </p>
                    </div>
                    <div className='profile-filler'></div>
                    <div className='profile-field'>
                        <h2 className='profile-field-label'> Content Uploaded </h2>
                        <p className='profile-field-value'> {content} </p>
                    </div>
                </div>
                </div>
            );
        }
    }
    else{
        history.push('/');
    } 
     
    // Page for the unsigned in
    return (
        <div className='page'>
            <h1>
                How did you even get here?
            </h1>
        </div>
    );
}

export default Profile;