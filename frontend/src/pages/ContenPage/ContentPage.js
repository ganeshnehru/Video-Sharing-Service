import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useHistory} from 'react-router-dom';
import { LinearProgress , CircularProgress ,IconButton} from '@mui/material';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import './ContentPage.styles.css';

const ContentPage = () => {

    const [content, setContent] = useState();
    const {contentId} = useParams()
    const [upvoteCount , setUpvoteCount] = useState();
    const [upvoted, setUpvoted] = useState(false);
    const history = useHistory();

    useEffect(() => {

        async function getContent() {

            let response = axios.get('http://localhost:5000/api/v1/content/' + contentId);
            response = await response;

            console.log("Getting info for: ", contentId);
            console.log("Video URL: ", response.data.link);
            setContent(response.data);
            setUpvoteCount(response.data.upvotes);

            // Increment views upon entering page for Content
            axios.post('http://localhost:5000/api/v1/content/view/' + contentId)
            .then((response) => {
                console.log(response.data);
            })
        }
        getContent();
    },[setContent, setUpvoteCount])


    // Upvote content
    const handleUpvote = () => {

        if(!upvoted){

            axios.post('http://localhost:5000/api/v1/content/upvote/' + contentId)
            .then((response) => {

                console.log("UPVOTING VIDEO")

                setUpvoteCount(upvoteCount + 1);
                setUpvoted(true);
            })
        }
        else{
            console.log("Video already Upvoted")
        }
    }

    // Navigate to Creator Profile
    const handleNavigateToCreator = () => {

        console.log('Navigating to Creator: ', content.creatorId)
        history.push({
            pathname: '/creator/' + content.creatorId,
            creator: content.creatorId
        });
    }

    
    return (
        <div className="ContentPage">

            {content ? 
                <>
                <div className='Attributes'>
                    
                    <h1 className='ContentTitle'>{content.title}</h1>
                    <h3 className='by'>
                        <a onClick={() => handleNavigateToCreator()} >By: {content.creatorId}</a>
                    </h3>
                    <br />
                    
                    <video width="750" height="500" controls autoPlay>
                        <source src={content.link} type="video/mp4" />
                    </video>

                    <br/>
                    <div style={{width:750}} id="container">
                        <div className = 'thumb-button' style={{marginLeft:10}}>
                            <IconButton aria-label="thumbup" onClick={() => handleUpvote()}>
                                <ThumbUpIcon/>  {upvoteCount}
                            </IconButton>
                        </div>
                        {/* style={{position:'absolute', bottom:75, right:400}} */}
                        <div className='views-tag' >
                            <h4>Views: {content.views}</h4>
                            <h4>Tag: {content.tag}</h4>
                        </div>
                    </div>   
                    
                     

                </div></>
            
            :
                // <CircularProgress />
                <LinearProgress />

            }
        </div>
    )
}

export default ContentPage