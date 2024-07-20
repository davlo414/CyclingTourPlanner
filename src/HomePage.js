import React from "react";
import Trips from "./Trips";
import { Box, Container, Grid, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import ImageHeader from "./ImageHeader"

function HomePage() {
    const a = 5;

    return (
        <Box>
            <ImageHeader imageUrl="https://www.gochile.cl/fotos/header/107771-istock_91714835_medium.jpg" title="Trip Planner" subtitle="Build a multipart trip and share with friends" hideBack={true}/>
            <Container maxWidth='xl'>
                <Box display='flex' flexDirection='column' gap={1} my={1}>
                    <Typography variant="h5">Trip List</Typography>
                    <Typography variant="body1">Welcome to trip planner. Here you can create, edit, and view long distance adventure trips. Click on a trip below or create a new trip to get started!</Typography>
                </Box>
                <Trips />
            </Container>
        </Box>

    )
}

export default HomePage