import { React, Component } from "react"
import ContentCard from "./ContentCard";
import Grid from '@mui/material/Grid';

class ContentList extends Component {
    renderTile = (content) => {

        return (
            
            <Grid item xs={3}>
                <ContentCard content={content} />
            </Grid>
        )
    }

    render() {
        let tiles = [];
        for (let i = 0; i < this.props.contentList.length; i++) {
            const current_item = this.props.contentList[i];
            tiles.push(this.renderTile(current_item));
        }
        return tiles;    }
}

ContentList.defaultProps = {
    contentList: []
  };

export default ContentList;