import { Box, Card, CardContent, Container, Grid, Paper, Typography, boxClasses, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageHeader from "./ImageHeader";
import TripPOIs from "./TripPOIs";

function Trip() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { id } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        fetch(`${baseUrl}/trips/${id}/`)
            .then(response => response.json())
            .then(data => {
                setTrip(data);
            })
            .catch(error => console.error('Error fetching trips:', error));
    }, [id]);

    if (!trip) {
        return <Typography>Loading...This could take up to a minute.</Typography>;
    }
    
    return (
        <Box>
            <ImageHeader imageUrl={trip.image} title={trip.name} subtitle={trip.description}/>
            <Container maxWidth='lg'>
                <Box display='flex' flexDirection='column' gap={1} my={1}>
                </Box>
                <TripPOIs trip={trip}/>
            </Container>
        </Box>
    )
}

export default Trip