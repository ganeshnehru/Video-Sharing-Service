import React, { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import VideoUploadComp from '../components/VideoUploadComp';
import ContentList from '../components/ContentList';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {  Link } from "react-router-dom";


const LandingPage = (props) => {


    return (
        <Fragment>
            <video className='video-container' autoPlay muted loop id="myVideo">
                <source src="homepage-video.mp4" type="video/mp4"></source>
            </video>
            <div id='wrapper' className='welcome'>
                <h1><strong>Welcome to Subfluence!</strong></h1>
            </div>
            <div id='wrapper' className='description'>
                <ul>
                    <li><h2>Learn anything, anywhere, anytime.</h2></li>
                    <li><h2>Real solutions from real experts.</h2></li>
                    <li><h2>Explore new concepts & possibilities.</h2></li>
                    <li><h2>24/7 access to numerous courses.</h2></li>
                    {/* <li><h2>Only $2.99 a month!</h2></li> */}
                </ul>
            </div>
            <button className='get-started-button' ><Link to="/signup">Get Started</Link></button>

            <div className='our-story'>
                <p><h1>About Us:</h1></p><br></br>
            </div>
            <div className='story-text'>
            <p><h2>Here at Subfluence, we believe that education is the cornerstone of a healthy future.
                    In today's day and age, many students are struggling to manage their lives 
                    between school and work. As a result, many of these students do not have the 
                    luxury of time to get assistance on the courses they are struggling with.
                    With Subfluence, students can get 24/7 assistance with their strenuous courseworks. 
                    Students can choose from thousands of tutorial videos on the subjects of their interests.
                    Are you a teacher or tutor, wanting spread your knowledge to the rest of the world? No 
                    problem! Sign up with Subfluence as a Creator, and start sharing your work today!
            </h2></p>
            </div>

            <div className='learn'>
                <h1>Endless courses to choose from. </h1>
            </div>
            <div className='course-images'>
                 <img src='courses.png'></img>
            </div>
            <div className='knowledge'>
                <h1>Gain the knowledge to make a difference.</h1>
            </div>
            <div className='knowledge-images'>
                 <img src='knowledge.png'></img>
            </div>
            <div className='access'>
                <h1>Get the help you need...wherever you are.</h1>
            </div>
            <div className='access-images'>
                 <img src='access.png'></img>
            </div>
            <div className='flexible-time'>
                <h1>Share your knowledge and influence others.</h1>
            </div>
            <div className='flexible-time-images'>
                 <img src='creator1.jpg'></img>
            </div>

            <div className='developers'>
                <h3>Developers</h3><br></br>
                <h3>Parmeet | Paramjot | Dylan | Ganesh</h3>
            </div>
        </Fragment>
    );
}

export default LandingPage;