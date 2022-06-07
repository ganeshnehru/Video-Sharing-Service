import React, { useState } from 'react';
import VideoSearchComp from '../components/VideoSearchComp';
import '../style.css';
import Axios from 'axios';

function SearchPage(props) {
    const [data, setData] = useState('');

    const getData = async (e) => {
        
        const resp = await Axios.get("http://localhost:5000/api/v1/content/")
            .then((response) => {
               // console.log(response.data);
                setData(response.data);
            });
    }

    return (
        <div className='page'>
            <h1>
                Video Search
            </h1>
            
            <div className='search-bar' onChange={(e) => getData()}>
                <VideoSearchComp placeholder="Search for video..." data={data} />
            </div>
        </div>
    );
}

export default SearchPage;