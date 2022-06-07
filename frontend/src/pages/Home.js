import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import VideoUploadComp from '../components/VideoUploadComp';
import ContentList from '../components/ContentList';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { LinearProgress } from '@mui/material';


import '../style.css';

const Home = (props) => {

    const [contentList, setContent] = useState([]);

    useEffect(() => {

        async function getContent() {

            let response = axios.get('http://localhost:5000/api/v1/content/');
            response = await response;

            console.log(response.data);
            setContent(response.data);
        }
        getContent();
    }, [setContent]);

    const handleSub = async () => {
        const res = await axios.patch(`http://localhost:5000/api/v1/users/sub/${sessionStorage.getItem('Subfluence-user')}`);
        console.log(res);
        if (res.status) {
            console.log('success');
            sessionStorage.setItem("Subfluence-subscribed", "true");
        }
        window.location.reload(false);
    }

    // Check if signed in
    if (sessionStorage.getItem('Subfluence')) {
        // Home page for Users
        if (sessionStorage.getItem('Subfluence-type') === 'User') {
            var sub = sessionStorage.getItem('Subfluence-subscribed');
            // home page for subscribed
            if (sub === 'true') {
            }
            // splash page for unsubscribed
            else {
                return (
                    <div className='centered-page'>
                        <h1 className='big-title'>
                            Welcome to Subfluence!
                        </h1>
                        <h1 className='big-title-sub'>
                            Subscribe to gain access to a huge library of tutors!
                        </h1>
                        <h2 className='splash-spaced-text'>
                            For only $9.99 a month, subscribers get access to a wonderful set of features:
                        </h2>
                        <ul className='splash-list'>
                            <li> Search through the wide variety of instructors on the site </li>
                            <li> Unlimited access to all learning material posted by instructors </li>
                            <li> Follow a set of instructors to get a personalized feed of learning </li>
                        </ul>
                        <button className='splash-button' onClick={() => handleSub()}> Subscribe </button>
                    </div>
                );
            }
        }
        // Home page for creators
        else {

        }
    }
    // Page for the unsigned in
    return (
        <Fragment>
            <div className='page'>
                {/* <video className='video-container' autoPlay muted loop id="myVideo">
                    <source src="homepage-video.mp4" type="video/mp4"></source>
                </video>
                <h1 className='welcome-dialog'>
                    Welcome to Subfluence
                </h1> */}
                {/* <p>
                    This is just a start.
                </p> */}
                {contentList.length > 0 ?
                    <>
                        <div style={{marginLeft:190}}>
                            <Box sx={{ width: '80%' }}>     {/* rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }} */}
                                <Grid container spacing={4} >
                                    <ContentList contentList={contentList} />
                                </Grid>
                            </Box>
                        </div>
                    </>
                    :

                    <LinearProgress />
                
                }
            </div>
        </Fragment>
    );
}

export default Home;