import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContentList from '../components/ContentList';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function FollowingList(props) {
    const [contentList, setContentList] = useState([]);
    const [following, setFollowing] = useState([]);
    const [focus, setFocus] = useState("");

    function FollowingBox(list){
        let boxes = [];
    
        list.forEach(element => {
            if (focus === element){
                boxes.push((
                    // <div>
                    //     <b className={classname} onClick={() => {setFocus(element)}}> {element} </b>
                    // </div>
                    <ListItemButton onClick={() => {setFocus(element)}} style={{backgroundColor: "rgb(221, 214, 214)"}}>
                        <ListItemText primary={element} />
                    </ListItemButton>
                ));
            }
            else{
            boxes.push((
                // <div>
                //     <b className={classname} onClick={() => {setFocus(element)}}> {element} </b>
                // </div>
                <ListItemButton onClick={() => {setFocus(element)}}>
                    <ListItemText primary={element} />
                </ListItemButton>
            ));
            }
        });
    
        return (
            <List>
                {boxes}
            </List>
        );
    }

    useEffect(() => {

        async function getContent(){
            if (focus !== ""){
            let response = axios.get(`http://localhost:5000/api/v1/content/bycreator/${focus}`);
            response = await response;

            //console.log(response.data);
            setContentList(response.data);
            }
        }
        getContent();
    },[focus]);

    useEffect(() => {

        async function getFollowing(){

            const response = await axios.get(`http://localhost:5000/api/v1/users/following/${sessionStorage.getItem('Subfluence-user')}`);

            await setFollowing(response.data);
            await setFocus(response.data[0]);
            console.log(focus);
        }
        getFollowing();
    },[]);

    return (
        <div>
        <div className='following-list'>
            <h3 className='following-label'>Following List</h3>
            {FollowingBox(following)}
        </div>
        <div className='inline-page'>
            <h1 className='following-video-label'> {focus} Videos</h1>
            <div className='video-list'>
            {contentList.length > 0 ?
                    <>

                    <Box sx={{ width: '80%' }}>     {/* rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }} */}
                        <Grid container spacing={4} >
                            <ContentList contentList={contentList} />
                        </Grid>
                    </Box>

                    </>
                :
                
                ""}
            </div>
        </div>
        </div>
    );
}

export default FollowingList;