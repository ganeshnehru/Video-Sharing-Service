import React, { useState } from 'react';
import '../style.css';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from "@material-ui/icons/Close";
import { Link } from 'react-router-dom';
import ContentList from '../components/ContentList';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function VideoSearchComp({ placeholder, data }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    console.log(data);

    const videoFilterHandler = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const filteredData = data.filter((value) => {
            return value.tag.toLowerCase().includes(searchWord.toLowerCase());
        });
        
        if (searchWord === "") {
            setFilteredData([]);
        }
        else {
            setFilteredData(filteredData);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    return (
        <div className="search">
            <div className="searchInputs">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={videoFilterHandler}
                />
            </div>
            {/* <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div> */}
            {filteredData.length != 0 && (
                <div className="dataResult">{

                    // filteredData.map((value, key) => {
                         // return (
                            <Box sx={{ width: '90%' }}>     {/* rowSpacing={10} columnSpacing={{ xs: 1, sm: 2, md: 3 }} */}
                            <Grid container spacing={4} >
                                <ContentList contentList={filteredData} />
                            </Grid>
                        </Box>
                        // );
                    // })

                   
                }
                </div>
                )
            }
        </div>
    )

}

export default VideoSearchComp;