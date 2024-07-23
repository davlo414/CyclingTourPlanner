import { Box, Card, CardContent, Container, Grid, Paper, Typography, boxClasses, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageHeader from "./ImageHeader";
import Map from "./Map"
import TripPOIs from "./TripPOIs";

function POIDetails() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { tripId, poiId } = useParams();
    const [poi, setPOI] = useState(null);

    useEffect(() => {
        fetch(`${baseUrl}/pois/${poiId}/`)
            .then(response => response.json())
            .then(data => {
                setPOI(data);
            })
            .catch(error => console.error('Error fetching trips:', error));
    }, [poiId]);

    if (!poi) {
        return <Typography>Loading...</Typography>;
    }
    
    return (
        <Box>
            <ImageHeader imageUrl={poi.image} title={poi.name} subtitle={poi.description} backName="Back"/>
            <Container maxWidth='lg'>
                <Grid container spacing={1} my={1}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body1">{poi.details ? poi.details : "Edit this POI to add details."}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Map markers={[poi.location]}/>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default POIDetails