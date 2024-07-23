import { Card, CardActionArea, CardContent, CardMedia, Grid, Paper, SpeedDial, SpeedDialAction, Typography, styled } from "@mui/material";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import React from "react";
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import MovingIcon from '@mui/icons-material/Moving';
import PlaceIcon from '@mui/icons-material/Place';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';

function POI({ tripPOI }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    const setPosition = (position) => (e) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(position)
        fetch(`${baseUrl}/trippois/${tripPOI.id}/set_position`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'position': `${position}`})
        })
            .then(response => response.json())
            .then(navigate(0))
            .catch(error => console.error('Error posting trips:', error));
    }

    const deleteTripPOI = (e) => {
        e.stopPropagation();
        e.preventDefault();
        fetch(`${baseUrl}/${tripPOI.id}/`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(navigate(0))
            .catch(error => console.error('Error deleting trip poi:', error));
    }

    return (
        <Grid item xs={12} md={4}>
            <Card>
                <CardActionArea component={RouterLink} to={"/trip/" + tripPOI.trip + "/poi/" + tripPOI.poi.id}>
                    <CardMedia component="img" image={tripPOI.poi.image ? tripPOI.poi.image : 'https://wallpapercave.com/wp/wp10945186.jpg'} height={300} />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {tripPOI.poi.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {tripPOI.poi.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {tripPOI.distance_from_start ? `${tripPOI.distance_from_start.toFixed(0)} miles from start` : ""}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {tripPOI.distance_to_end ? `${tripPOI.distance_to_end.toFixed(0)} miles to destination` : ""}
                        </Typography>
                        <SpeedDial ariaLabel="hello" sx={{ position: 'absolute', bottom: 16, right: 16 }} icon={<EditRoundedIcon />}>
                            <SpeedDialAction key="start" icon={<MovingIcon />} tooltipTitle="Set as trip start" onClick={setPosition('start')} />
                            <SpeedDialAction key="end" icon={<PlaceIcon />} tooltipTitle="Set as trip end" onClick={setPosition('end')} />
                            <SpeedDialAction key="edit" icon={<EditIcon />} tooltipTitle="Edit POI" />
                            <SpeedDialAction key="delete" icon={<ClearIcon />} tooltipTitle="Delete POI from trip" onClick={deleteTripPOI} />
                        </SpeedDial>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default POI