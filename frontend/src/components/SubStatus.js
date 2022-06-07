import React from 'react';
import axios from 'axios';

import '../style.css';

function SubStatus(props) {
    //api calls
    const sub = async () => {
        const res = await axios.patch(`http://localhost:5000/api/v1/users/sub/${sessionStorage.getItem('Subfluence-user')}`);
        console.log(res);
        if (res.status){
            console.log('success');
            sessionStorage.setItem("Subfluence-subscribed", "true");
        }
        window.location.reload(false);
    }

    const unsub = async () => {
        const res = await axios.patch(`http://localhost:5000/api/v1/users/unsub/${sessionStorage.getItem('Subfluence-user')}`);
        console.log(res);
        if (res.status){
            console.log('success');
            sessionStorage.setItem("Subfluence-subscribed", "false");
        }
        window.location.reload(false);
    }

    // do action on button press
    const handleButtonPress = () => {
        if (sessionStorage.getItem("Subfluence-subscribed") === 'true'){
            unsub();
        }
        else {
            sub();
        }
    }

    // get sub status
    const status = () => {
        if (sessionStorage.getItem("Subfluence-subscribed") === 'true'){
            return 'Subscribed';
        }
        else {
            return 'Not Subscribed';
        }
    }

    // get sub button action
    const action = () => {
        if (sessionStorage.getItem("Subfluence-subscribed") === 'true'){
            return 'Unsubscribe';
        }
        else {
            return 'Subscribe';
        }
    }

    return (
        <div className='inline-div'>
        <div className='profile-field'>
            <h2 className='profile-field-label'> Subscription Status </h2>
            <p className='profile-field-value'> {status()} </p>
        </div>
        <div className='profile-filler'></div>
        <button className='form-button' onClick={() => handleButtonPress()}> {action()} </button>
        </div>
    );
}

export default SubStatus;