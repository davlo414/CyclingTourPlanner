import { Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography, styled } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import React from "react";

function Trip({ trip }) {
    return (
        <Grid item style={{'display': 'flex'}} xs={4}>
            <Card width={'100%'}>
                <CardActionArea component={RouterLink} to={"/trip/" + trip.id}>
                    <CardMedia component="img" height={300} image={trip.image ? trip.image : 'https://wallpapercave.com/wp/wp10945186.jpg'}/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {trip.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {trip.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default Trip