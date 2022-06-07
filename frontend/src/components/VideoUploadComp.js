import React, { useState } from 'react';
import '../style.css';
import Axios from 'axios';


function VideoUploadComp(props) {
    const [filename, setFilename] = useState('');
    const [url, setUrl] = useState('');
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');
    const [author, setAuthor] = useState('');
    const [creatorId, setCreatorId] = useState('');


    const newContent = {
        "creatorId": creatorId,
        "link": filename,
        "title": title,
        "tag": tag
    }

    const getTitle = (title) => {
        setTitle(title);
    }
    const createContentInfo = async () => {
        
        const resp = await Axios.post("http://localhost:5000/api/v1/content/", newContent)
            .then((response) => {
                console.log(response); 
            });
    }

    const uploadVideo = (files) => {
        const videoData = new FormData();
        videoData.append("file", files[0]);
        videoData.append("upload_preset", "subfluence");

        Axios.post("https://api.cloudinary.com/v1_1/ganesh-sjsu/video/upload", videoData)
            .then((response) => {
                console.log(response.data.secure_url);
                setFilename(response.data.secure_url)
            });
            
            var id = sessionStorage.getItem("Subfluence-user");
            console.log(id);
            setCreatorId(id);
    };
    

    const createContent = () => {
        <div>
            <input type="text">Enter video title</input>
            <input type="text">Enter video tag</input>
            <input type="text">Enter your name</input>
        </div>
    }


    return (

        <div className='form-center'>
            <div className='form-field'>
                <input className='upload-input' type="file" onChange={(event) => {
                    uploadVideo(event.target.files)
                    
                }}
                />
                {/* <button className='upload-button' onClick={uploadVideo}>Upload</button> */}
                <div>
                    <label>Title:</label>
                    <input id= "access" type="text" className='set-title' onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Tag:</label>
                    <input id= "access" type="text" className='set-tag' onChange={(e) => setTag(e.target.value)} />
                </div>
                <button className='upload-button' onClick={createContentInfo}>Create Content</button>
            </div>
        </div>
    );
}

export default VideoUploadComp;