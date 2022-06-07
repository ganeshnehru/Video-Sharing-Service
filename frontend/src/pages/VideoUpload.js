import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import '../style.css';
import VideoUploadComp from '../components/VideoUploadComp';

function VideoUpload(props) {
    return (
        <div className='page'>
            <h1>
                Upload Video
            </h1>
            <VideoUploadComp />
        </div>
    );
}

export default VideoUpload;