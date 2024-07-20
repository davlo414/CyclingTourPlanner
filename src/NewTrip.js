import React from "react";
import Trips from "./Trips";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import ImageHeader from "./ImageHeader"
import { FormContainer, TextFieldElement, useForm } from "react-hook-form-mui";

function NewTrip({ trip }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const formContext = useForm()
    
    const handleSubmit = (e) => {
        console.log(e)
        fetch(`${baseUrl}/trips/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(e)
        })
            .then(console.log("DONE"))
            .catch(error => console.error('Error posting trips:', error));
    }

    return (
        <Box>
            <ImageHeader imageUrl="https://wallpapercave.com/wp/wp10945186.jpg" title="New Trip" subtitle="Create a new trip below"/>
            <Container maxWidth='xl'>
                <Box display='flex' flexDirection='column' gap={1} my={1}>
                    <Typography variant="h5">Enter trip details</Typography>
                </Box>
                <FormContainer formContext={formContext} onSuccess={handleSubmit}>
                <Grid container spacing={2} mt={1}>
                    <Grid xs={12} md={6}>
                        <TextFieldElement fullWidth required name="name" label="Trip Name" inputProps={{maxLength: 200}}/>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <TextFieldElement fullWidth required name="description" label="Trip Description" inputProps={{maxLength: 200}}/>
                    </Grid>
                    <Grid xs={12}>
                        <TextFieldElement multiline fullWidth rows={4} name="details" label="Trip Details" />
                    </Grid>
                    <Grid xs={12}>
                        <TextFieldElement fullWidth name="image" label="Image URL (.jpg)" type={'url'} />
                    </Grid>
                </Grid>
                <Button type={'submit'}>Submit</Button>
                </FormContainer>
            </Container>
        </Box>
    )
}

export default NewTrip