import React, {useState} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import '../style.css';

function FollowButton(props) {
    const { creator } = useParams();
    const [following, setFollowing] = useState(false);

    // deciding if person is following
    const getUserFollowing = async (username) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try{
            const res = await axios.get(`http://localhost:5000/api/v1/users/following/${username}`, config);
            if (res.status === 200){
                const arr = res.data;
                arr.forEach(element => {
                    if (element === creator){
                        setFollowing(true);
                    }
                });
            }
            else {
    
            }
        } catch (error) {
            console.log(error);
        }
    }

    // api calls
    const follow = async ()  => {
        const body = {
            "creatorUsername": creator
        }
        const res = await axios.patch(`http://localhost:5000/api/v1/users/follow/${sessionStorage.getItem('Subfluence-user')}`, body);
        if (res.status === 200){
            console.log('success');
        }
        window.location.reload(false);
    }

    const unfollow = async ()  => {
        const body = {
            "creatorUsername": creator
        }
        const res = await axios.patch(`http://localhost:5000/api/v1/users/unfollow/${sessionStorage.getItem('Subfluence-user')}`, body);
        if (res.status === 200){
            console.log('success');
        }
        window.location.reload(false);
    }

    if(sessionStorage.getItem('Subfluence-type') === 'User'){
        getUserFollowing(sessionStorage.getItem('Subfluence-user'));
        if(following){
            return(
                <div>
                <button style={{position:'absolute', top:70, right:550}} className='form-button' onClick={()=> {unfollow()}}> Unfollow </button>
                </div>
            );
        }
        else {
            return(
                <div>
                <button style={{position:'absolute', top:70, right:550}} className='form-button' onClick={()=> {follow()}}> Follow </button>
                </div>
            );
        }
    }
    else{
        return null;
    }

}

export default FollowButton;