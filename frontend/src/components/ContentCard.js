import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';

const ContentCard = (props) => {

    const history = useHistory();

    const handleNavigation = () => {
        console.log("Navigating to Content Page: ", props.content.title);
    
        history.push({
            pathname: '/content/' + props.content.contentId,
            contentId: props.content.contentId
        });
    }

    return(

        <Card sx={{ maxWidth: 300 }}>
            <CardActionArea onClick={handleNavigation}>
                <CardMedia
                    component="img"
                    height="140"
                    image="/default-video-thumbnail.jpeg"
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {/* Video Title Here */}
                        {props.content.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        by: {props.content.creatorId}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ContentCard