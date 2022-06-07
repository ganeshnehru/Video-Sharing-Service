import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FollowButton from '../components/FollowButton';
import ContentList from '../components/ContentList';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Talk from "talkjs";



import '../style.css';

function CreatorProfile(props) {
    const { creator } = useParams();
    const [followers, setFollowers] = useState(0);
    const [content, setContent] = useState(0);
    const [valid, setvalid] = useState(false);
    const [contentList, setContentList] = useState([]);
    
    useEffect(() => {

        async function getContent(){

            let response = axios.get(`http://localhost:5000/api/v1/content/bycreator/${creator}`);
            response = await response;

            console.log(response.data);
            setContentList(response.data);
        }
        getContent();
    },[setContentList]);

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
                console.log('creator grabbed successfully');
                setFollowers(res.data.followers.length);
                setContent(res.data.content.length);
                setvalid(true);
            }
            else {
                setvalid(false);
            }
        } catch (error) {
            console.log(error);
            setvalid(false);
        }
    }

    getCreator(creator);

    // Handles Messaging the Creator 
    const handleMessage = () => {

        const currentUser = {
            id : sessionStorage.getItem("Subfluence-user"),
            name : sessionStorage.getItem("Subfluence-name-of-user")
        }

        const partner = {
            id : creator,
            name : creator
        }

        /* Session initialization code */
        Talk.ready
        .then(() => {
            /* Create the two users that will participate in the conversation */
            const me = new Talk.User(currentUser);
            const other = new Talk.User(partner)

            /* Create a talk session if this does not exist. Remember to replace tthe APP ID with the one on your dashboard */
            if (!window.talkSession) {
                window.talkSession = new Talk.Session({
                    appId: "tBLL8gSA",
                    me: me
                });
            } 
            
            /* Get a conversation ID or create one */
            const conversationId = Talk.oneOnOneId(me, other);
            const conversation = window.talkSession.getOrCreateConversation(conversationId);
            
            /* Set participants of the conversations */
            conversation.setParticipant(me);
            conversation.setParticipant(other);

            /* Create and mount chatbox in container */
            Talk.chatbox = window.talkSession.createChatbox(conversation);
            Talk.chatbox.mount(Talk.container);
        })            
        .catch(e => console.error(e));


    }

    // creator exists
    if (valid){
        return (
            <div className='centered-page'>
                <div className='profile-div'>
                    <br/>
                    <h1 className='big-title-sub'> {creator}'s Profile </h1>

                    <FollowButton />

                    <button style={{position:'absolute', top:70, right:330}} className='form-button' onClick={()=> {handleMessage()}}> Message </button>

                    <br/><br/><br/>

                    <div className='profile-filler'></div>
                    <div className='profile-field'>
                        <h2 className='profile-field-label'> Followers: {followers} </h2>
                        {/* <p className='profile-field-value'> {followers} </p> */}
                    </div>
                    <div className='profile-filler'></div>
                    <div style={{marginRight:100}} className='profile-field'>
                        <h2 className='profile-field-label'> Upload Count: {content} </h2>
                        {/* <p className='profile-field-value'> {content} </p> */}
                    </div>
                    <br/><br/><br/>
                </div>
                {contentList.length > 0 ?
                    <>
                    <div style={{marginLeft:200}}>
                        <Box sx={{ width: '80%' }}>     {/* rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }} */}
                            <Grid container spacing={4} >
                                <ContentList contentList={contentList} />
                            </Grid>
                        </Box>
                    </div>


                    </>
                :
                
                ""}

                {/* Chat Box Component */}
                <div className="chatbox-container" ref={c => Talk.container = c}>
                    <div id="talkjs-container" style={{ height: "300px" }}><i></i></div>
                </div>
            </div>
        );
    }
    //creator doesn't exist
    else {
        return(
            <div className='page'>
                {/* <h1 className='error-text'>404 CREATOR NOT FOUND</h1> */}
            </div>
        );
    }

}

export default CreatorProfile;